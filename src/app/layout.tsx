import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mukesh Yadav | Biosignal Processing & Neuromorphic Hardware",
  description:
    "Official research portfolio of Mukesh Yadav. Department of Electronics & Communication Engineering (ECE), JSSATEN. Reproducible Edge-to-Cloud ECG Stress Detection with Embedded Telemetry and Hardware-in-the-Loop Validation.",
  keywords: [
    "Mukesh Yadav",
    "Biosignal Processing",
    "ECG Stress Detection",
    "WESAD Benchmark",
    "Heart Rate Variability",
    "Neuromorphic Hardware",
    "Memristor",
    "JSSATEN Noida",
    "Hardware-in-the-Loop",
    "Embedded DSP",
  ],
  authors: [{ name: "Mukesh Yadav", url: "https://github.com/Mukesh-Yadav-4" }],
  openGraph: {
    title: "Mukesh Yadav | Biosignal Processing & Neuromorphic Hardware",
    description:
      "Reproducible Edge-to-Cloud ECG Stress Detection with Embedded Telemetry and Hardware-in-the-Loop Validation (92.13% LOSO Accuracy, 0.9493 AUC, 10,000-Packet HIL Run).",
    url: "https://github.com/Mukesh-Yadav-4",
    siteName: "Mukesh Yadav Portfolio",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-[#070A13] text-slate-900 dark:text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
