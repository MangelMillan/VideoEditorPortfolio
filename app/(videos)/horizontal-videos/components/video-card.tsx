'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { VideoPlayer } from '@/components/video-player';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    description: string;
    src: string;
    poster?: string;
  };
}

export function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 } 
      }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl bg-neutral-900 aspect-video group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <VideoPlayer
        src={video.src}
        poster={video.poster}
        className="w-full h-full object-cover"
        controls={isHovered}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/80 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
      
      {/* Description overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300 group-hover:translate-y-full">
        <p className="text-base font-medium line-clamp-2">{video.description}</p>
      </div>

      {/* Logo overlay */}
      <div className="absolute top-4 right-4 transition-opacity duration-300 group-hover:opacity-0">
        <span className="text-white/80 text-sm font-medium">MAIKONIK</span>
      </div>
    </motion.div>
  );
} 