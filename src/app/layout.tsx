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
  title: "Mukesh Yadav | Biosignal Processing & Wearable AI Researcher",
  description:
    "Official research portfolio of Mukesh Yadav. Department of Electronics & Communication Engineering (ECE), JSSATEN. Author of WESAD ECG Stress Detection Benchmark (DOI: 10.5281/zenodo.22806710).",
  keywords: [
    "Mukesh Yadav",
    "Biosignal Processing",
    "ECG Stress Detection",
    "WESAD Benchmark",
    "Heart Rate Variability",
    "Machine Learning",
    "Wearable Computing",
    "JSSATEN Noida",
    "Zenodo DOI",
  ],
  authors: [{ name: "Mukesh Yadav", url: "https://github.com/Mukesh-Yadav-4" }],
  openGraph: {
    title: "Mukesh Yadav | Biosignal Processing & Wearable AI Researcher",
    description:
      "Personalized ECG & HRV Dynamics for Acute Stress Detection (92.36% LOSO Accuracy, 0.9494 AUC, CERN Zenodo DOI: 10.5281/zenodo.22806710).",
    url: "https://github.com/Mukesh-Yadav-4",
    siteName: "Mukesh Yadav Portfolio",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-background text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
