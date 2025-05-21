"use client";

import React, { useState } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Navbar from '../(home)/components/Navbar';
import { Spotlight } from "@/components/ui/spotlight";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  src: string;
  poster?: string;
}

const videos: VideoItem[] = [
  {
    id: '1',
    title: '',
    description: 'Intro and video sections with beautiful motion graphics',
    src: '/videos/horizontal/Gabriel 3.mp4',
  },
  {
    id: '2',
    title: '',
    description: 'Youtube intro with beautiful motion graphics',
    src: '/videos/horizontal/know.mp4',
  },
  {
    id: '3',
    title: '',
    description: 'Professional intro sequence with modern graphics',
    src: '/videos/horizontal/Intro6.mp4',
  },
  {
    id: '4',
    title: '',
    description: 'Creative youtube intro video with dynamic graphics and effects',
    src: '/videos/horizontal/Santi.mp4',
  },
  {
    id: '5',
    title: '',
    description: 'Brand promotion with engaging storytelling',
    src: '/videos/horizontal/Scuffers.mp4',
  },
  {
    id: '6',
    title: '',
    description: 'Artistic visualization of music lyrics',
    src: '/videos/horizontal/Lyrics.mp4',
  }
];

// Add spotlight effect logic
function useSpotlight() {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };
  const handleMouseLeave = () => setSpotlight((s) => ({ ...s, active: false }));
  return { spotlight, handleMouseMove, handleMouseLeave };
}

export default function HorizontalVideos() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <style jsx global>{`
        .spotlight-card {
          position: relative;
          isolation: isolate;
          background: linear-gradient(135deg, rgb(28, 25, 23), rgba(10, 10, 10, 0.64));
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .spotlight-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(255, 255, 255, 0.8),
            transparent 30%
          );
          background-attachment: fixed;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: 1px;
          border-radius: inherit;
          pointer-events: none;
          z-index: 2;
          transition: opacity 0.2s;
          opacity: 0;
        }
        .spotlight-card.active::before {
          opacity: 1;
        }
        .spotlight-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(255, 255, 255, 0.4),
            transparent 30%
          );
          filter: blur(750px);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .spotlight-card.active::after {
          opacity: 1;
        }
        .spotlight-card:hover {
          transform: scale(1.05);
        }
      `}</style>
      <div className="bg-black/[0.96] antialiased bg-grid-white/[0.05]">
        <Spotlight className="absolute top-0 left-0 h-[100%]" fill="white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <div className="pt-20">
            <div className="flex items-center justify-between mb-8">
              <Link 
                href="/video-selector/" 
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
              >
                <IoMdArrowRoundBack className="w-6 h-6" />
                <span>Back to Selection</span>
              </Link>
              <h1 className="text-4xl font-bold text-center flex-1">Horizontal Videos</h1>
              <div className="w-[150px]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => {
                const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight();
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`spotlight-card rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-stone-900/70 to-neutral-950/70 backdrop-blur-md border border-white/10 p-0${spotlight.active ? ' active' : ''}`}
                    style={{
                      '--x': `${spotlight.x}px`,
                      '--y': `${spotlight.y}px`,
                    } as React.CSSProperties}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ scale: 1.05 }}
                  >
                    <VideoPlayer
                      src={video.src}
                      poster={video.poster}
                      className="w-full rounded-t-2xl"
                      controls
                    />
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold mb-2">{video.title}</h2>
                      <p className="text-gray-300 text-base">{video.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 