// page.tsx
import React from "react";
import Navbar from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import Phrase from "./components/Phrase";
import { BentoGridDemo } from "./components/BentoGrid";
import Footer from "./components/Footer";

export default function page() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="bg-black/[0.96] antialiased bg-grid-white/[0.05]">
        <Spotlight className="absolute top-0 left-0 h-[100%]" fill="white" />{" "}
        {/* Cambio aquí */}
        <div className="max-w-7x1 mx-auto p-8">
          {" "}
          <Navbar />
          <HeroSection />
          <div className="max-w-7x1 mx-auto p-5 mt-20">
            <Phrase />
            {/* <BentoGridDemo /> */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
