"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { HiOutlineSpeakerXMark, HiOutlineSpeakerWave } from 'react-icons/hi2';
import { BsThreeDots } from 'react-icons/bs';
import { FaHeart, FaCommentDots, FaShare, FaMusic } from 'react-icons/fa';
import Navbar from '../(home)/components/Navbar';
import { Spotlight } from "@/components/ui/spotlight";

export default function VerticalVideosPage() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  // YouTube video IDs
  const videos = [
    { id: 1, videoId: "mO2YP4bsWmE", title: "", description: "Motion Graphics y videos", hashtags: ["Motion", "Premiere"], user: { name: "Maiki", avatar: "/img/inio.jpg" }, stats: { likes: 46000, comments: 8400, shares: 2400, views: 183900 } },
    { id: 2, videoId: "8-ms9xAHm4o", title: "", description: "Popular dance", hashtags: ["dance"], user: { name: "Maiki", avatar: "/img/inio.jpg" }, stats: { likes: 1200, comments: 80, shares: 50,  views: 2000 } },
    { id: 3, videoId: "Cdc1ZspnYM4", title: "", description: "Tutorial", hashtags: ["tutorial"], user: { name: "Maiki", avatar: "/img/inio.jpg" }, stats: { likes: 900, comments: 40, shares: 20, views: 1000 } },
    { id: 4, videoId: "dM1jglmRxIc", title: "", description: "Funny clip", hashtags: ["funny"], user: { name: "Maiki", avatar: "/img/inio.jpg" }, stats: { likes: 800, comments: 30, shares: 10, views: 800 } },
    { id: 5, videoId: "skdv-i_3TXE", title: "", description: "Creative edit", hashtags: ["creative"], user: { name: "Maiki", avatar: "/img/inio.jpg" }, stats: { likes: 700, comments: 20, shares: 5,  views: 600 } },
    { id: 6, videoId: "TD5JXKEP5uI", title: "", description: "Creative edit", hashtags: ["creative"], user: { name: "Maiki", avatar: "/img/inio.jpg" }, stats: { likes: 700, comments: 20, shares: 5,  views: 600 } },
    { id: 7, videoId: "00CaJUJDYRU", title: "", description: "Creative edit", hashtags: ["creative"], user: { name: "Maiki", avatar: "/img/inio.jpg" }, stats: { likes: 700, comments: 20, shares: 5,  views: 600 } },
  ];

  // Set up observer for videos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    if (containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const videoIndex = parseInt((entry.target as HTMLElement).getAttribute('data-index') || '0');
            if (entry.isIntersecting) {
              setActiveVideo(videoIndex);
              // Update iframe src to autoplay the current video
              const iframe = iframeRefs.current[videoIndex];
              if (iframe) {
                const videoId = videos[videoIndex].videoId;
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&iv_load_policy=3&fs=0`;
              }
            } else {
              // Pause the video when it's not visible
              const iframe = iframeRefs.current[videoIndex];
              if (iframe) {
                const videoId = videos[videoIndex].videoId;
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&iv_load_policy=3&fs=0`;
              }
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.7,
        }
      );
      const videoContainers = containerRef.current.querySelectorAll('.video-item');
      videoContainers.forEach((el) => observer.observe(el));
      return () => {
        videoContainers.forEach((el) => observer.unobserve(el));
      };
    }
    return () => clearTimeout(timer);
  }, [isVisible, muted, videos]);

  // Handle mute state changes
  useEffect(() => {
    const iframe = iframeRefs.current[activeVideo];
    if (iframe) {
      const videoId = videos[activeVideo].videoId;
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&iv_load_policy=3&fs=0`;
    }
  }, [muted, activeVideo, videos]);

  // Format numbers (e.g. 4.6M)
  const formatNumber = (num: number) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="bg-black/[0.96] antialiased bg-grid-white/[0.05]">
        <Spotlight className="absolute top-0 left-0 h-[100%]" fill="white" />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* Header with back button and title */}
          <div className="w-full flex flex-col items-center justify-center pt-8 pb-4 py-10 pt-24">
            <div className="flex items-center justify-between w-full max-w-xl px-4 mb-2">
              <Link href="/video-selector" className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
                <IoMdArrowRoundBack className="w-6 h-6" />
                <span className="hidden sm:inline">Back to Selection</span>
              </Link>
              <div className="flex-1 flex justify-center">
                <h1 className="text-2xl md:text-3xl font-bold text-center">Short Form Videos</h1>
              </div>
              <div className="w-8" /> {/* Spacer for symmetry */}
            </div>
          </div>
          {/* TikTok-style vertical scrolling container */}
          <div
            ref={containerRef}
            className="h-[100vh] w-full overflow-y-scroll snap-y snap-mandatory flex flex-col items-center pt-16 md:pt-20 gap-y-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                data-index={index}
                className={`video-item flex items-center justify-center snap-start snap-always w-full h-[100vh] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.5s ease' }}
              >
                <div className="relative flex items-center justify-center w-full h-full">
                  {/* Video container with overlays inside only */}
                  <div
                    className="relative w-full h-full flex items-center justify-center"
                    style={{
                      maxWidth: '420px',
                      maxHeight: '90vh',
                      borderRadius: '0',
                    }}
                  >
                    <div
                      className="relative w-full h-full bg-black flex items-center justify-center
                        md:rounded-2xl md:shadow-2xl md:overflow-hidden"
                      style={{ aspectRatio: '9/16' }}
                    >
                      <iframe
                        ref={(el) => { iframeRefs.current[index] = el; }}
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&mute=${muted ? 1 : 0}&loop=1&playlist=${video.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&iv_load_policy=3&fs=0`}
                        className="absolute inset-0 w-full h-full scale-[1.02]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        title={video.title || 'YouTube video player'}
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
                      {/* Top overlays */}
                      <div className="absolute top-0 left-0 w-full flex justify-between items-start p-3 z-10">
                        <button
                          className="bg-black/60 rounded-full p-2 text-white hover:bg-black/80 transition"
                          onClick={() => setMuted((m) => !m)}
                          aria-label={muted ? 'Unmute' : 'Mute'}
                        >
                          {muted ? <HiOutlineSpeakerXMark className="w-6 h-6" /> : <HiOutlineSpeakerWave className="w-6 h-6" />}
                        </button>
                      </div>
                      {/* Caption overlay */}
                      <div className="absolute top-16 left-0 w-full px-5 z-10 pointer-events-none">
                        <div className="text-lg md:text-xl font-semibold text-white text-shadow drop-shadow-lg whitespace-pre-line">
                          {video.title}
                        </div>
                      </div>
                      {/* Bottom overlays */}
                      <div className="absolute bottom-0 left-0 w-full flex flex-row justify-between items-end p-5 z-10">
                        {/* User info and description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Image
                              src={video.user.avatar}
                              alt={video.user.name}
                              width={32}
                              height={32}
                              className="rounded-full border-2 border-white object-cover"
                            />
                            <span className="font-semibold text-white text-sm">{video.user.name}</span>
                          </div>
                          <div className="text-white text-sm mb-1 truncate">
                            {video.description}
                          </div>
                          <div className="text-white/80 text-xs flex flex-wrap gap-1 mb-1">
                            {video.hashtags.map((tag) => (
                              <span key={tag}>#{tag}</span>
                            ))}
                          </div>
                        </div>
                        {/* Action bar */}
                        <div className="flex flex-col items-center gap-4 ml-4">
                          <Image
                            src={video.user.avatar}
                            alt={video.user.name}
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-white object-cover mb-2"
                          />
                          <button className="flex flex-col items-center group">
                            <FaHeart className="w-7 h-7 mb-1 group-hover:scale-110 transition text-white" />
                            <span className="text-xs text-white font-semibold">{formatNumber(video.stats.likes)}</span>
                          </button>
                          <button className="flex flex-col items-center group">
                            <FaCommentDots className="w-7 h-7 mb-1 group-hover:scale-110 transition text-white" />
                            <span className="text-xs text-white font-semibold">{formatNumber(video.stats.comments)}</span>
                          </button>
                          <button className="flex flex-col items-center group">
                            <FaShare className="w-7 h-7 mb-1 group-hover:scale-110 transition text-white" />
                            <span className="text-xs text-white font-semibold">{formatNumber(video.stats.shares)}</span>
                          </button>
                          <button className="flex flex-col items-center group">
                            <FaMusic className="w-7 h-7 mb-1 group-hover:scale-110 transition text-white" />
                            <span className="text-xs text-white font-semibold">{formatNumber(video.stats.views)}</span>
                          </button>
                        </div>
                      </div>
                      {/* Overlay for dark background outside video on desktop */}
                      <div className="hidden md:block absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 