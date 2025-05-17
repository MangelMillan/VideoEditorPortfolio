"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8">
        <Link 
          href="/" 
          className="inline-block mb-8 text-neutral-400 hover:text-white transition-colors duration-300"
        >
          ← Back to selection
        </Link>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Short Form Videos
        </motion.h1>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Main video view */}
        <div className="md:w-2/3 h-[80vh] flex items-center justify-center p-4">
          <div 
            className={`w-[340px] h-[600px] bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative opacity-0 scale-95 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : ''}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white opacity-80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M10 8.5c0-.28.22-.5.5-.5h.01c.13 0 .26.05.35.15l4.5 3.5c.2.18.2.52 0 .7l-4.5 3.5c-.09.1-.22.15-.35.15h-.01c-.28 0-.5-.22-.5-.5V8.5z" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-xl font-bold">{videos[activeVideo].title}</h3>
              <p className="text-neutral-300">{videos[activeVideo].description}</p>
            </div>
          </div>
        </div>
        
        {/* Video selection sidebar */}
        <div className="md:w-1/3 p-4">
          <h2 className="text-2xl font-semibold mb-4">More Videos</h2>
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-500 opacity-0 translate-x-4 ${
                  activeVideo === index ? 'bg-neutral-800' : 'hover:bg-neutral-900'
                } ${isVisible ? 'opacity-100 translate-x-0' : ''}`}
                onClick={() => setActiveVideo(index)}
                style={{
                  transitionDelay: `${index * 100 + 200}ms`,
                  transitionProperty: 'opacity, transform, background-color'
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