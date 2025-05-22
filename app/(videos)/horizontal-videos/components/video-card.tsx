'use client';

import { useState, useEffect } from 'react';
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
  const [isDescriptionHidden, setIsDescriptionHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      setIsDescriptionHidden(!isDescriptionHidden);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 } 
      }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl bg-neutral-900 aspect-video"
      onClick={handleInteraction}
      onMouseEnter={() => !isMobile && setIsDescriptionHidden(true)}
      onMouseLeave={() => !isMobile && setIsDescriptionHidden(false)}
    >
      <VideoPlayer
        src={video.src}
        poster={video.poster}
        className="w-full h-full object-cover"
        controls={isDescriptionHidden}
      />

      {/* Overlays container */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isDescriptionHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/80" />
        
        {/* Description */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-base font-medium line-clamp-2">
            {video.description}
          </p>
        </div>

        {/* Logo */}
        <div className="absolute top-4 right-4">
          <span className="text-white/80 text-sm font-medium"></span>
        </div>

        {/* Mobile indicator */}
        {isMobile && (
          <div className="absolute top-4 left-4">
            <span className="text-white/80 text-sm bg-black/50 px-2 py-1 rounded">
              {isDescriptionHidden ? 'Tap to show info' : 'Tap to hide info'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
} 