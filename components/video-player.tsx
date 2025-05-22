'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, className, ...props }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.currentTime = 0;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={cn('w-full h-full object-cover', className)}
      playsInline
      loop
      muted
      autoPlay
      {...props}
    />
  );
} 