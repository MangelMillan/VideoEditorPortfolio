'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { VideoPlayer } from '@/components/video-player';
import { YouTubeVideo } from '@/components/YouTubeVideo';
import { IconPlayerPlay, IconPlayerPause, IconVolume, IconVolumeOff, IconMaximize, IconMinimize } from '@tabler/icons-react';

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const isYouTubeVideo = video.src.includes('youtube.com/embed/');
  const videoId = isYouTubeVideo ? video.src.split('/').pop() : '';

  const togglePlay = () => {
    if (isYouTubeVideo && iframeRef.current) {
      const message = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: message, args: [] }),
        '*'
      );
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isYouTubeVideo && iframeRef.current) {
      const message = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: message, args: [] }),
        '*'
      );
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      } else if ((containerRef.current as any).msRequestFullscreen) {
        (containerRef.current as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 } 
      }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl bg-neutral-900 aspect-video mb-8"
      onClick={handleInteraction}
      onMouseEnter={() => !isMobile && setIsDescriptionHidden(true)}
      onMouseLeave={() => !isMobile && setIsDescriptionHidden(false)}
    >
      {isYouTubeVideo ? (
        <div className="relative w-full h-full">
          <YouTubeVideo
            videoId={videoId || ''}
            className="w-full h-full"
            title={video.title}
            ref={iframeRef}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between gap-4">
              {/* Play/Pause button bottom left */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="text-white hover:text-white/80 transition-colors"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.14C8 3.73 9.57 2.89 10.74 3.67l9.03 5.86c.95.62.95 2.01 0 2.63l-9.03 5.86C9.57 18.8 8 17.97 8 16.56V5.14z" fill="currentColor" />
                  </svg>
                )}
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  {isMuted ? (
                    <IconVolumeOff className="w-6 h-6" />
                  ) : (
                    <IconVolume className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  {isFullscreen ? (
                    <IconMinimize className="w-6 h-6" />
                  ) : (
                    <IconMaximize className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <VideoPlayer
          src={video.src}
          poster={video.poster}
          className="w-full h-full object-cover"
          controls={isDescriptionHidden}
          autoPlay={false}
        />
      )}

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