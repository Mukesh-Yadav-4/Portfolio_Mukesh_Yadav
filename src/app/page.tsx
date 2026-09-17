import React from "react";
import Navbar from "@/components/Navbar";
import EcgHeroBanner from "@/components/EcgHeroBanner";
import ResearchSpotlight from "@/components/ResearchSpotlight";
import ProjectsGallery from "@/components/ProjectsGallery";
import SkillsMatrix from "@/components/SkillsMatrix";
import EducationSection from "@/components/EducationSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      <EcgHeroBanner />
      <ResearchSpotlight />
      <ProjectsGallery />
      <SkillsMatrix />
      <EducationSection />
      <Footer />
    </main>
  );
}
