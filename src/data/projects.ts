export interface ProjectMetric {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export interface PublicationInfo {
  venue?: string;
  year?: number;
  authors: string;
  pdfUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Research & Biosignals" | "Hardware & Embedded" | "Data Science & ML" | "Game Dev & Creative";
  featured: boolean;
  statusBadge: string;
  badgeColor: "cyan" | "ruby" | "emerald" | "amber" | "violet";
  date: string;
  summary: string;
  publication?: PublicationInfo;
  metrics?: ProjectMetric[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  keyContributions: string[];
}

export const PROJECTS_DATA: Project[] = [
  // 1. ECG STRESS DETECTION (Flagship Paper)
  {
    id: "ecg-stress-detection-wesad",
    title: "Reproducible Edge-to-Cloud ECG Stress Detection with Embedded Telemetry and Hardware-in-the-Loop Validation",
    subtitle: "A Leave-One-Subject-Out (LOSO) Benchmark with 4D Hyperchaotic Telemetry and Bare-Metal STM32 Edge Validation",
    category: "Research & Biosignals",
    featured: true,
    statusBadge: "Research Paper",
    badgeColor: "cyan",
    date: "2026",
    summary:
      "Mitigated inter-subject baseline variability across 15 WESAD benchmark subjects using relative baseline calibration: X* = (X - Bs) / (|Bs| + ε). Evaluated with 15-fold Leave-One-Subject-Out (LOSO) validation (92.13% primary accuracy, 0.9493 ROC-AUC), paired with a bare-metal STM32G474RE ARM Cortex-M4 edge DSP, experimental 4D memristive hyperchaotic stream cipher (M-4DCHS), and physical 10,000-packet HIL validation (0.0% packet loss).",
    publication: {
      authors: "Mukesh Yadav (JSS Academy of Technical Education, Noida)",
      year: 2026,
      venue: "Research Paper",
      pdfUrl: "/Reproducible_Edge_to_Cloud_ECG_Stress_Detection_with_Embedded_Telemetry_and_Hardware_in_the_Loop_Validation_v5.pdf",
    },
    metrics: [
      { label: "Primary Accuracy (τ=0.50)", value: "92.13%", subtext: "410 / 445 windows (15 folds)", highlight: true },
      { label: "Primary Specificity", value: "97.54%", subtext: "278 / 285 calm (only 7 false alarms)", highlight: true },
      { label: "ROC-AUC", value: "0.9493", subtext: "PR-AUC = 0.9467 (unseen subjects)" },
      { label: "Screening Sens (τ=0.35)", value: "86.88%", subtext: "139 / 160 stress episodes caught" },
      { label: "Physical HIL Testbed", value: "10,000 Pkts", subtext: "200k wire bytes, 0.0% loss, 0 CRC err" },
      { label: "STM32 DSP Latency", value: "1.87 μs", subtext: "5-stage Biquad (0.065% CPU @ 170MHz)" },
    ],
    techStack: ["STM32G474RE", "ARM Cortex-M4", "CMSIS-DSP", "4D Hyperchaotic Cipher", "Hardware-in-the-Loop (HIL)", "WESAD Benchmark", "Python", "MATLAB", "Three.js WebGL", "LaTeX"],
    githubUrl: "https://github.com/Mukesh-Yadav-4/ECG_STRESS_DETECTION",
    demoUrl: "https://ecgstressdetection-2bremsry4npbmx9yn7whju.streamlit.app/",
    keyContributions: [
      "Mitigated cross-subject baseline drift via relative baseline normalization: X* = (X - Bs) / (|Bs| + ε), producing a +10.79% accuracy leap and +15.64% F1-score boost under strict 15-fold LOSO cross-validation.",
      "Established authoritative primary benchmark at τ = 0.50 (92.13% accuracy, 88.29% F1, 97.54% specificity with only 7 false positive alarms across 445 windows) and exploratory screening point at τ = 0.35 (92.36% accuracy, 86.88% sensitivity).",
      "Deployed on bare-metal ARM Cortex-M4 (STM32G474RE @ 170 MHz) with CMSIS-DSP 5-stage Biquad IIR filter cascade executing in 1.87 μs per sample (0.065% CPU load).",
      "Integrated novel 4D memristive hyperchaotic stream cipher (HC1 M-4DCHS) via RK4 with 2 positive Lyapunov exponents (λ₁ ≈ +0.438, λ₂ ≈ +0.254) and wire Shannon entropy H = 7.9977 bits/byte.",
      "Conducted physical Hardware-in-the-Loop (HIL) telemetry streaming over physical USB-UART at 350.02 Hz across 10,000 consecutive 20-byte packets (200,000 wire bytes) with 0 packet loss, 0 CRC errors, and 0.0 mV reconstruction error.",
      "Benchmarked 6 machine learning architectures (LR, MLP, SVM, RF, ET, HGB) with explainability permutation importance confirming autonomic vagal withdrawal and sympathetic acceleration.",
    ],
  },

  // 2. SECOND-ORDER MEMRISTOR EMULATOR & HOPFIELD NETWORK
  {
    id: "second-order-memristor-emulator",
    title: "Second-Order Memristor Circuit Emulator & Hopfield Dynamics",
    subtitle: "LTspice & MATLAB Numerical Simulation",
    category: "Hardware & Embedded",
    featured: true,
    statusBadge: "Hardware Reproduction Study",
    badgeColor: "ruby",
    date: "2026",
    summary:
      "Emulated a dual-state active memristor in LTspice using CFA/multiplier stages and verified frequency-dependent pinched hysteresis from 5–80 kHz; modeled a 5D memristive Hopfield network in MATLAB, reproducing a 4-butterfly chaotic attractor (M = 2).",
    metrics: [
      { label: "Pinched Hysteresis", value: "5 – 80 kHz", subtext: "Frequency sweep verified", highlight: true },
      { label: "Attractor Topology", value: "4-Butterfly", subtext: "Multi-scroll chaos", highlight: true },
      { label: "System Dimension", value: "5D Nonlinear", subtext: "Dual internal state variables" },
    ],
    techStack: ["LTspice XVII/24", "Analog Multipliers", "Operational Amplifiers", "MATLAB R2022b+", "Nonlinear Dynamics", "ODE45"],
    githubUrl: "https://github.com/Mukesh-Yadav-4/second-order-memristor-emulator",
    demoUrl: "https://github.com/Mukesh-Yadav-4/second-order-memristor-emulator",
    keyContributions: [
      "Designed analog equivalent circuit schematic in LTspice using off-the-shelf op-amps and analog multipliers.",
      "Engineered custom hyperbolic saturation macro-model (UniversalOpAmp1.lib) preventing SPICE singular matrix traps.",
      "Verified fingerprint pinched hysteresis loops across wide frequency sweeps (5 kHz to 80 kHz).",
      "Synthesized a 5D memristively coupled Hopfield neural network exhibiting multi-butterfly chaotic attractors.",
    ],
  },

  // 3. ECG FILTER PROJECT (FIR vs IIR Comparative Study)
  {
    id: "ecg-signal-denoising-fir-iir",
    title: "ECG Signal Denoising: Comparative Study of FIR vs. IIR Filtering",
    subtitle: "Clinical Telemetry Noise Modeling & Benchmark on PhysioNet MIT-BIH Database",
    category: "Research & Biosignals",
    featured: true,
    statusBadge: "PhysioNet MIT-BIH Validated",
    badgeColor: "emerald",
    date: "2026",
    summary:
      "Biomedical digital signal processing (DSP) investigation evaluating the fundamental trade-offs between Infinite Impulse Response (IIR) and Finite Impulse Response (FIR) bandpass filtering for ECG denoising, validated on authentic clinical telemetry from MIT-BIH Record 100.",
    metrics: [
      { label: "IIR SNR Improvement", value: "+6.17 dB", subtext: "3.95 dB → 10.12 dB SNR", highlight: true },
      { label: "FIR Beat Alignment", value: "100.00%", subtext: "2,274 / 2,274 clinical beats", highlight: true },
      { label: "IIR Efficiency", value: "12.5× Boost", subtext: "8 coefficients vs 100 taps" },
    ],
    techStack: ["MATLAB", "PhysioNet MIT-BIH", "Format 212 Decoding", "4th-Order Butterworth", "100-Tap Equiripple", "Zero-Phase Filtfilt"],
    githubUrl: "https://github.com/Mukesh-Yadav-4/ECG-FIR-IIR-filter-comparison",
    demoUrl: "https://physionet.org/content/mitdb/1.0.0/",
    keyContributions: [
      "Decoded raw MIT-BIH Format 212 12-bit packed binary telemetry directly without third-party toolboxes.",
      "Simulated composite physiological noise: 50 Hz powerline interference, 0.3 Hz baseline wander, and EMG tremor.",
      "Demonstrated that 4th-order Butterworth IIR provides superior noise suppression with 12.5× lower computational complexity.",
      "Showed that 100-tap Equiripple FIR achieves 100% morphology alignment with exact linear phase stability.",
    ],
  },

  // 4. CUSTOMER SEGMENTATION & RFM
  {
    id: "customer-segmentation-rfm",
    title: "Customer Lifetime Value & RFM Segmentation Pipeline",
    subtitle: "Unsupervised Machine Learning & Revenue Forecasting on 500k+ Transaction Records",
    category: "Data Science & ML",
    featured: false,
    statusBadge: "Machine Learning / Analytics",
    badgeColor: "amber",
    date: "2026",
    summary:
      "End-to-end data analytics and unsupervised customer segmentation framework on the UCI Online Retail II dataset. Combines Recency, Frequency, and Monetary (RFM) clustering with K-Means and time-series revenue forecasting.",
    metrics: [
      { label: "Dataset Scale", value: "541,909", subtext: "Raw transactions" },
      { label: "Optimal Clusters", value: "K = 4", subtext: "Elbow & Silhouette verified" },
      { label: "Forecast Horizon", value: "12 Months", subtext: "Revenue trajectory" },
    ],
    techStack: ["Python", "Pandas", "Scikit-Learn", "K-Means", "Seaborn", "Jupyter Notebook"],
    githubUrl: "https://github.com/Mukesh-Yadav-4",
    keyContributions: [
      "Extracted and engineered RFM feature matrices with robust handling of cancellations and returns.",
      "Optimized cluster count using Elbow inertia sweeps and Silhouette score maximization.",
      "Formulated targeted marketing cohort recommendations based on high-value customer churn risk.",
    ],
  },

  // 5. ULTRASONIC ARDUINO TELEMETRY
  {
    id: "ultrasonic-arduino-telemetry",
    title: "Ultrasonic Embedded Distance & Spatial Telemetry System",
    subtitle: "Microcontroller Edge Sensing & Signal Conditioning",
    category: "Hardware & Embedded",
    featured: false,
    statusBadge: "Embedded Hardware",
    badgeColor: "amber",
    date: "2026",
    summary:
      "Embedded C++ firmware and hardware interfacing for real-time acoustic echo time-of-flight (ToF) measurement. Implements temperature-compensated speed of sound calculations and moving-average jitter suppression.",
    metrics: [
      { label: "Measurement Range", value: "2 – 400 cm", subtext: "High precision" },
      { label: "Resolution", value: "0.3 cm", subtext: "Acoustic ToF" },
      { label: "Processing Latency", value: "< 10 ms", subtext: "On-device loop" },
    ],
    techStack: ["Arduino", "Embedded C++", "HC-SR04", "Sensors", "Hardware UART"],
    githubUrl: "https://github.com/Mukesh-Yadav-4",
    keyContributions: [
      "Engineered hardware timer-driven pulse width capture avoiding blocking delay calls.",
      "Implemented digital moving-window outlier filtering for specular acoustic reflections.",
      "Designed serial telemetry protocol for streaming real-time distance metrics to desktop monitoring tools.",
    ],
  },

  // 6. SPELLSEED GAME ENGINE
  {
    id: "spellseed-godot-exploration",
    title: "Spellseed: 2D Procedural Action & Exploration Engine",
    subtitle: "Physics Simulation, Finite State Machines, and Pixel Rendering Pipeline",
    category: "Game Dev & Creative",
    featured: false,
    statusBadge: "Game Development",
    badgeColor: "violet",
    date: "2026",
    summary:
      "Interactive 2D game developed in Godot Engine featuring responsive kinematic character physics, hierarchical finite state machines (FSM) for animation blends, and modular inventory/spellcasting systems.",
    metrics: [
      { label: "Target Framerate", value: "60 FPS", subtext: "Zero stutter" },
      { label: "Architecture", value: "Node FSM", subtext: "Decoupled state management" },
    ],
    techStack: ["Godot 4", "GDScript", "2D Physics", "Sprite Animation", "State Machines"],
    githubUrl: "https://github.com/Mukesh-Yadav-4",
    keyContributions: [
      "Architected a modular Finite State Machine governing player locomotion, dashing, and combat transitions.",
      "Engineered custom camera smoothing with velocity-based lookahead and screen shake dampening.",
      "Implemented pixel-perfect collision detection and tilemap layer sorting.",
    ],
  },
];

export const CATEGORIES = [
  "All",
  "Research & Biosignals",
  "Hardware & Embedded",
  "Data Science & ML",
  "Game Dev & Creative",
] as const;
