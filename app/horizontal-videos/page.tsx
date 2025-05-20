"use client";

import React from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Navbar from '../(home)/components/Navbar';

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

export default function HorizontalVideos() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-20">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
          >
            <IoMdArrowRoundBack className="w-6 h-6" />
            <span>Back to Selection</span>
          </Link>
          <h1 className="text-4xl font-bold text-center flex-1">Horizontal Videos</h1>
          <div className="w-[150px]"></div> {/* Spacer to balance the layout */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-stone-900/70 to-neutral-950/70 backdrop-blur-md border border-white/10 p-0"
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
          ))}
        </div>
      </div>
    </div>
  );
} 