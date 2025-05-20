"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  quality?: 'auto' | 'high' | 'medium' | 'low';
}

export const VideoPlayer = ({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
  className = '',
  quality = 'auto',
}: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle quality selection
  const getQualitySrc = (baseSrc: string, quality: string) => {
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    return `${baseName}_${quality}.${extension}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      setError('Error loading video. Please try again later.');
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleLoadedMetadata = () => {
      // Hide loading spinner when metadata is loaded
      setIsLoading(false);
    };

    // Clear loading state if video has already loaded metadata
    if (video.readyState >= 2) {
      setIsLoading(false);
    }

    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Force check loading state after a brief timeout
    const timeout = setTimeout(() => {
      if (video.readyState >= 2) {
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      clearTimeout(timeout);
    };
  }, [src]); // Re-run when src changes

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-white text-center p-4">
            <p className="text-lg font-semibold">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-auto rounded-lg shadow-lg"
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
      >
        <source
          src={quality === 'auto' ? src : getQualitySrc(src, quality)}
          type="video/mp4"
        />
        {src.includes('.mp4') && (
          <source
            src={quality === 'auto' ? src.replace('.mp4', '.webm') : getQualitySrc(src.replace('.mp4', '.webm'), quality)}
            type="video/webm"
          />
        )}
        Your browser does not support the video tag.
      </video>

      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-sm"
        >
          {quality === 'auto' ? 'Auto' : quality} Quality
        </motion.div>
      )}
    </motion.div>
  );
}; 