import React from "react";
import Navbar from "@/components/Navbar";
import EcgHeroBanner from "@/components/EcgHeroBanner";
import ResearchShowcase from "@/components/ResearchShowcase";
import PlayableArcade from "@/components/PlayableArcade";
import DeployedPlatforms from "@/components/DeployedPlatforms";
import HardwareDataSection from "@/components/HardwareDataSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30 selection:text-slate-900 dark:selection:text-white">
      <Navbar />
      <EcgHeroBanner />
      <ResearchShowcase />
      <HardwareDataSection />
      <PlayableArcade />
      <DeployedPlatforms />
      <Footer />
    </main>
  );
}
