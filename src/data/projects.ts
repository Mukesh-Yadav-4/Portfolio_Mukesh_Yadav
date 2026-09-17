export interface ProjectMetric {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export interface PublicationInfo {
  doi: string;
  doiUrl: string;
  venue: string;
  year: number;
  authors: string;
  bibtex: string;
  pdfUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Research & Biosignals" | "Data Science & ML" | "Hardware & Embedded" | "Game Dev & Creative";
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
  {
    id: "ecg-stress-detection-wesad",
    title: "Personalized ECG & HRV Dynamics for Acute Stress Detection",
    subtitle: "A Leave-One-Subject-Out (LOSO) Cross-Validation Benchmark on the WESAD Dataset",
    category: "Research & Biosignals",
    featured: true,
    statusBadge: "Official CERN Publication (DOI)",
    badgeColor: "cyan",
    date: "2026",
    summary:
      "Automated acute stress classification pipeline addressing inter-individual baseline heterogeneity across all 15 subjects (N=15, 445 standardized windows) of the public WESAD benchmark. Formulated a personalized baseline transform resulting in +10.79% accuracy and +16.00% F1 boosts on held-out test subjects.",
    publication: {
      doi: "10.5281/zenodo.22806710",
      doiUrl: "https://doi.org/10.5281/zenodo.22806710",
      venue: "Zenodo (CERN, Geneva)",
      year: 2026,
      authors: "Mukesh Yadav (JSS Academy of Technical Education, Noida)",
      pdfUrl: "/ECG_Stress_Detection_WESAD_Benchmark_Paper.pdf",
      bibtex: `@article{yadav2026ecg,
  title     = {Personalized Electrocardiographic and HRV Dynamics for Acute Stress Detection: A Leave-One-Subject-Out Benchmark on WESAD},
  author    = {Yadav, Mukesh},
  journal   = {Zenodo},
  year      = {2026},
  doi       = {10.5281/zenodo.22806710},
  url       = {https://doi.org/10.5281/zenodo.22806710}
}`,
    },
    metrics: [
      { label: "LOSO Accuracy", value: "92.36%", subtext: "+10.79% vs uncalibrated", highlight: true },
      { label: "Stress F1-Score", value: "89.03%", subtext: "+16.00% boost", highlight: true },
      { label: "ROC-AUC", value: "0.9494", subtext: "Diagnostic separation" },
      { label: "Clinical Sensitivity", value: "86.25%", subtext: "138 / 160 stress windows" },
      { label: "Specificity", value: "95.79%", subtext: "273 / 285 calm windows" },
      { label: "Latency & Memory", value: "<0.85 ms", subtext: "<5 KB RAM (Edge-ready)" },
    ],
    techStack: ["MATLAB", "Python", "SciPy", "Scikit-Learn", "Streamlit", "Plotly", "LaTeX", "Pan-Tompkins DSP"],
    githubUrl: "https://github.com/Mukesh-Yadav-4/ECG_STRESS_DETECTION",
    demoUrl: "https://doi.org/10.5281/zenodo.22806710",
    keyContributions: [
      "Overcame cross-subject baseline drift via relative baseline normalization: X* = (X - Bs) / |Bs|.",
      "Engineered 4th-order zero-phase Butterworth filter (0.5–40 Hz) and adaptive prominence R-peak detection.",
      "Benchmarked 6 machine learning architectures (LR, MLP, SVM, RF, ET, HGB) with all achieving ROC-AUC > 0.937.",
      "Identified autonomic interval compression (ΔMeanRR) and heart rate acceleration (ΔMeanHR) as primary decision drivers.",
      "Built interactive Streamlit clinical telemetry web app with live ECG visualizer and dynamic threshold slider.",
    ],
  },
  {
    id: "customer-segmentation-rfm",
    title: "Customer Lifetime Value & RFM Segmentation Pipeline",
    subtitle: "Unsupervised Machine Learning & Revenue Forecasting on 500k+ Transaction Records",
    category: "Data Science & ML",
    featured: false,
    statusBadge: "Machine Learning / Analytics",
    badgeColor: "emerald",
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
  "Data Science & ML",
  "Hardware & Embedded",
  "Game Dev & Creative",
] as const;
