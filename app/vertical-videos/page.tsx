"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Navbar from '../(home)/components/Navbar';

export default function VerticalVideosPage() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Example data - replace with your actual videos
  const videos = [
    { id: 1, title: "Short Video 1", description: "Trending content" },
    { id: 2, title: "Short Video 2", description: "Popular dance" },
    { id: 3, title: "Short Video 3", description: "Tutorial" },
    { id: 4, title: "Short Video 4", description: "Funny clip" },
    { id: 5, title: "Short Video 5", description: "Creative edit" },
  ];

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  const goToNextVideo = () => {
    setActiveVideo((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const goToPrevVideo = () => {
    setActiveVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Header with back button */}
      <div className="p-4 sm:p-6 md:p-8 pt-20">
        <div className="flex items-center justify-between mb-4 md:mb-8 max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
          >
            <IoMdArrowRoundBack className="w-6 h-6" />
            <span className="hidden sm:inline">Back to Selection</span>
          </Link>
          <motion.h1 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Short Form Videos
          </motion.h1>
          <div className="w-[30px] sm:w-[150px]"></div> {/* Spacer to balance the layout */}
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-2 sm:px-4">
        {/* Video Player Section with Navigation */}
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center pb-6 relative">
          {/* Video Player */}
          <div 
            className={`w-full max-w-[340px] h-[600px] bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative opacity-0 scale-95 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : ''}`}
          >
            {/* Video content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white opacity-80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M10 8.5c0-.28.22-.5.5-.5h.01c.13 0 .26.05.35.15l4.5 3.5c.2.18.2.52 0 .7l-4.5 3.5c-.09.1-.22.15-.35.15h-.01c-.28 0-.5-.22-.5-.5V8.5z" fill="currentColor" stroke="none" />
              </svg>
            </div>
            
            {/* Video info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-xl font-bold">{videos[activeVideo].title}</h3>
              <p className="text-neutral-300">{videos[activeVideo].description}</p>
            </div>
            
            {/* Side navigation buttons - attached to the video itself */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/30 to-transparent flex items-center justify-start pl-1">
              <button 
                onClick={goToPrevVideo}
                className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110 focus:outline-none border border-white/20"
                aria-label="Previous video"
              >
                <IoChevronBack className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/30 to-transparent flex items-center justify-end pr-1">
              <button 
                onClick={goToNextVideo}
                className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110 focus:outline-none border border-white/20"
                aria-label="Next video"
              >
                <IoChevronForward className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          
          {/* Video indicator dots */}
          <div className="mt-6 flex justify-center gap-3">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveVideo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeVideo === index ? 'bg-yellow-300' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Video Counter */}
          <div className="mt-3 text-center text-sm text-white/70">
            <span className="font-medium text-white">{activeVideo + 1}</span> / {videos.length}
          </div>
        </div>
        
        {/* Video selection sidebar */}
        <div className="w-full lg:w-1/3 p-4 border-t lg:border-t-0 lg:border-l border-white/10">
          <h2 className="text-2xl font-semibold mb-4">More Videos</h2>
          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-500 opacity-0 translate-x-4 ${
                  activeVideo === index ? 'bg-neutral-800 border-l-4 border-yellow-300' : 'hover:bg-neutral-900'
                } ${isVisible ? 'opacity-100 translate-x-0' : ''}`}
                onClick={() => setActiveVideo(index)}
                style={{
                  transitionDelay: `${index * 100 + 200}ms`,
                  transitionProperty: 'opacity, transform, background-color, border-color'
                }}
              >
                <div className="w-20 h-36 bg-neutral-700 rounded-md relative mr-4 flex-shrink-0">
                  {activeVideo === index && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <span className="text-black text-xs">▶</span>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{video.title}</h3>
                  <p className="text-sm text-neutral-400">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 