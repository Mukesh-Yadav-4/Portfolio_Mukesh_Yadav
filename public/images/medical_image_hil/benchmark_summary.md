# Memristive 4D Hyperchaotic Cryptosystem: Multi-Model Benchmark

Comparative quantitative evaluation across 4 permutation paradigms on clinical scans (256x256).

| Modality | Permutation Architecture | Enc Time (ms) | Dec Time (ms) | Cipher Entropy | Corr (H) | NPCR (%) | UACI (%) | $\chi^2$ Uniformity | MSE Restoration |
|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Brain MRI (256x256x3) | **Cross-Ring Josephus** | 365.40 | 56.05 | 7.9990 | +0.0104 | 99.8606% | 33.4166% | 268.3 | **0.0e+00 (0.0)** |
| Brain MRI (256x256x3) | **2D Arnold Cat Map** | 69.73 | 58.15 | 7.9991 | +0.0074 | 100.0000% | 33.4221% | 246.8 | **0.0e+00 (0.0)** |
| Brain MRI (256x256x3) | **Diagonal Zigzag** | 101.90 | 55.31 | 7.9991 | +0.0014 | 100.0000% | 33.4843% | 246.9 | **0.0e+00 (0.0)** |
| Brain MRI (256x256x3) | **4D Memristive Sort** | 66.61 | 51.61 | 7.9991 | -0.0182 | 99.6114% | 33.4144% | 232.6 | **0.0e+00 (0.0)** |
| Retinal Fundus (256x256x3) | **Cross-Ring Josephus** | 253.14 | 51.29 | 7.9991 | -0.0032 | 99.8535% | 33.3159% | 249.7 | **0.0e+00 (0.0)** |
| Retinal Fundus (256x256x3) | **2D Arnold Cat Map** | 64.26 | 49.29 | 7.9991 | -0.0099 | 100.0000% | 33.4291% | 258.2 | **0.0e+00 (0.0)** |
| Retinal Fundus (256x256x3) | **Diagonal Zigzag** | 78.46 | 47.89 | 7.9989 | -0.0247 | 100.0000% | 33.3821% | 300.1 | **0.0e+00 (0.0)** |
| Retinal Fundus (256x256x3) | **4D Memristive Sort** | 61.35 | 49.15 | 7.9991 | +0.0101 | 99.6211% | 33.4373% | 258.9 | **0.0e+00 (0.0)** |

*Theoretical Ideal Limits: Shannon Entropy = 8.0000 bits/byte, NPCR = 99.6094%, UACI = 33.4635%, $\chi^2 < 310.457$ ($\alpha=0.01$).*
