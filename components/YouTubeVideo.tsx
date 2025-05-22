import React from 'react';
import { motion } from 'framer-motion';

interface YouTubeVideoProps {
  videoId: string;
  className?: string;
  title?: string;
}

export const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, className = '', title }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&iv_load_policy=3&fs=0`}
        className="absolute inset-0 w-full h-full scale-[1.02]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title={title || 'YouTube video player'}
        style={{
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'scale(1.02)',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
}; 