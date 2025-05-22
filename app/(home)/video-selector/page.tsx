import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import { Spotlight } from "@/components/ui/spotlight";
import dynamic from 'next/dynamic';

const VideoFormatSelector = dynamic(() => import('../components/VideoFormatSelector'), {
  ssr: false,
  loading: () => null,
});

export default function VideoSelectorPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden ">
      <div className="bg-black/[0.96] antialiased bg-grid-white/[0.05] ">
        <Spotlight className="absolute top-0 left-0 h-[100%]" fill="white " />
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 ">
          <Navbar />
          <VideoFormatSelector />
        </div>
      </div>
    </div>
  );
}
