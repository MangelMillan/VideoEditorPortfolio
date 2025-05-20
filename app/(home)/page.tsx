// page.tsx
import React, { Suspense } from "react";
import Navbar from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import dynamic from 'next/dynamic';

// Lazy load with suspense for better performance
const VideoFormatSelector = dynamic(() => import('./components/VideoFormatSelector'), {
  ssr: false,
  loading: () => null, // or a spinner
});
const Footer = dynamic(() => import('./components/Footer'), {
  ssr: false,
  loading: () => null, // or a spinner
});

export default function page() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="bg-black/[0.96] antialiased bg-grid-white/[0.05]">
        <Spotlight className="absolute top-0 left-0 h-[100%]" fill="white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <HeroSection />
        </div>
      
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
