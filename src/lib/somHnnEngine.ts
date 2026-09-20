/**
 * 5D Second-Order Memristor-Based Hopfield Neural Network (SOM-HNN) Engine
 * Implements IEEE TCAS-I (2026) multi-butterfly strange attractor dynamics:
 * "A Second-Order Memristor Method to Construct Memristive Neural Networks With Multi-Butterfly and Multi-Scroll Dynamics"
 * Reference: Mukesh Yadav (JSSATEN), MATLAB ode23 simulation reproduction.
 */

export interface SomHnnParams {
  alpha: number;
  beta: number;
  gamma: number;
  a: number;
  b: number;
  c: number;
  p: number;
  q: number;
  k: number; // Memristive coupling coefficient (k = 0.40 gives 4-butterfly)
  M: number; // Multi-wing parameter (M = 2 produces 4 distinct wings)
}

export const DEFAULT_SOM_HNN_PARAMS: SomHnnParams = {
  alpha: 1.0,
  beta: 1.0,
  gamma: 0.01,
  a: 1.0,
  b: 1.0,
  c: 0.1,
  p: 2.2,
  q: 5.0,
  k: 0.4,
  M: 2,
};

// Verified steady-state initial point on the strange attractor (t >= 500)
export const STEADY_STATE_SEED: [number, number, number, number, number] = [
  1.321119,
  -0.166981,
  0.198803,
  0.939808,
  -1.101954,
];

export type SomHnnState = [number, number, number, number, number];

export interface SomHnnTelemetry {
  x1: number;
  x2: number;
  x3: number;
  phi1: number;
  phi2: number;
  memductance: number; // W(phi1, phi2) in mS
  couplingCurrent: number; // k * W * (x2 - x3)
  activeWing: 1 | 2 | 3 | 4; // Current butterfly wing quadrant
  phaseVelocity: number; // Orbital velocity ||dx/dt||
  lyapunovMetric: number; // Local divergence index
}

/**
 * Calculates continuous time derivatives of the 5D SOM-HNN ODE system.
 */
export function computeDerivatives(state: SomHnnState, p: SomHnnParams): SomHnnState {
  const [x1, x2, x3, phi1, phi2] = state;

  // Second-order memristance/memductance W(phi1, phi2)
  const W = p.alpha - p.beta * phi1 - p.gamma * phi2;

  // Multi-piecewise staircase function h(phi2) for M = 2
  let sumSign = 0;
  for (let i = 0; i <= p.M; i++) {
    sumSign += Math.sign(phi2 + 2 * i);
  }
  const h = phi2 + p.M - sumSign;
  const diff23 = x2 - x3;

  // Eq. (19) from IEEE TCAS-I
  const dx1 = -x1 + 0.4 * Math.tanh(x2) - 4.0 * Math.tanh(x3);
  const dx2 = -x2 - 0.23 * Math.tanh(x1) - 0.3 * Math.tanh(x2) - p.k * W * diff23;
  const dx3 = -x3 - 4.5 * Math.tanh(x2) + p.k * W * diff23;
  const dphi1 = p.a - p.b * (diff23 * diff23) - p.c * phi1;
  const dphi2 = p.p * diff23 - p.q * h;

  return [dx1, dx2, dx3, dphi1, dphi2];
}

/**
 * Classical Runge-Kutta 4th-order (RK4) single numerical integration step.
 */
export function rk4Step(state: SomHnnState, dt: number, p: SomHnnParams): SomHnnState {
  const k1 = computeDerivatives(state, p);

  const s2: SomHnnState = [
    state[0] + 0.5 * dt * k1[0],
    state[1] + 0.5 * dt * k1[1],
    state[2] + 0.5 * dt * k1[2],
    state[3] + 0.5 * dt * k1[3],
    state[4] + 0.5 * dt * k1[4],
  ];
  const k2 = computeDerivatives(s2, p);

  const s3: SomHnnState = [
    state[0] + 0.5 * dt * k2[0],
    state[1] + 0.5 * dt * k2[1],
    state[2] + 0.5 * dt * k2[2],
    state[3] + 0.5 * dt * k2[3],
    state[4] + 0.5 * dt * k2[4],
  ];
  const k3 = computeDerivatives(s3, p);

  const s4: SomHnnState = [
    state[0] + dt * k3[0],
    state[1] + dt * k3[1],
    state[2] + dt * k3[2],
    state[3] + dt * k3[3],
    state[4] + dt * k3[4],
  ];
  const k4 = computeDerivatives(s4, p);

  return [
    state[0] + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
    state[1] + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
    state[2] + (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]),
    state[3] + (dt / 6) * (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]),
    state[4] + (dt / 6) * (k1[4] + 2 * k2[4] + 2 * k3[4] + k4[4]),
  ];
}

/**
 * Real-time 5D SOM-HNN Simulation State Machine
 */
export class SomHnnSimulator {
  private state: SomHnnState;
  private params: SomHnnParams;
  private trajectoryBuffer: Array<{ phi2: number; phi1: number; x1: number; x2: number }>;
  private maxBufferSize: number;

  constructor(params: Partial<SomHnnParams> = {}, maxBufferSize = 3500) {
    this.params = { ...DEFAULT_SOM_HNN_PARAMS, ...params };
    this.state = [...STEADY_STATE_SEED];
    this.trajectoryBuffer = [];
    this.maxBufferSize = maxBufferSize;
  }

  public step(dt = 0.005, subSteps = 12): SomHnnTelemetry {
    let latestDerivatives: SomHnnState = [0, 0, 0, 0, 0];

    for (let s = 0; s < subSteps; s++) {
      this.state = rk4Step(this.state, dt, this.params);
      latestDerivatives = computeDerivatives(this.state, this.params);

      // Store point in ring buffer
      this.trajectoryBuffer.push({
        phi2: this.state[4],
        phi1: this.state[3],
        x1: this.state[0],
        x2: this.state[1],
      });

      if (this.trajectoryBuffer.length > this.maxBufferSize) {
        this.trajectoryBuffer.shift();
      }
    }

    const [x1, x2, x3, phi1, phi2] = this.state;
    const memductance = this.params.alpha - this.params.beta * phi1 - this.params.gamma * phi2;
    const couplingCurrent = this.params.k * memductance * (x2 - x3);

    // Identify active wing quadrant in the phi2-phi1 plane
    let activeWing: 1 | 2 | 3 | 4 = 1;
    if (phi2 < -2.2) activeWing = 1;
    else if (phi2 < -0.9) activeWing = 2;
    else if (phi2 < 0.4) activeWing = 3;
    else activeWing = 4;

    const phaseVelocity = Math.hypot(
      latestDerivatives[0],
      latestDerivatives[1],
      latestDerivatives[2],
      latestDerivatives[3],
      latestDerivatives[4]
    );

    return {
      x1,
      x2,
      x3,
      phi1,
      phi2,
      memductance,
      couplingCurrent,
      activeWing,
      phaseVelocity,
      lyapunovMetric: Math.abs(x2 - x3) * Math.abs(memductance),
    };
  }

  public getTrajectory() {
    return this.trajectoryBuffer;
  }

  public clearTrajectory() {
    this.trajectoryBuffer = [];
  }

  public perturb(magnitude = 0.08) {
    // Small perturbation creates chaotic divergence across orbits (Butterfly effect)
    this.state[0] += (Math.random() - 0.5) * magnitude;
    this.state[3] += (Math.random() - 0.5) * magnitude;
    this.state[4] += (Math.random() - 0.5) * magnitude;
  }

  public reset() {
    this.state = [...STEADY_STATE_SEED];
    this.clearTrajectory();
  }

  public setCoupling(k: number) {
    this.params.k = Math.max(0.1, Math.min(0.8, k));
  }

  public getCoupling(): number {
    return this.params.k;
  }

  public getState(): SomHnnState {
    return [...this.state];
  }
}
