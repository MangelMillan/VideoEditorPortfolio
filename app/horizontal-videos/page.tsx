"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HorizontalVideosPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
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
        Long Form Videos
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Example video cards - replace with your actual content */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <motion.div
            key={item}
            className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: item * 0.1 }}
          >
            <div className="aspect-video bg-neutral-800 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-white opacity-80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M10 8.5c0-.28.22-.5.5-.5h.01c.13 0 .26.05.35.15l4.5 3.5c.2.18.2.52 0 .7l-4.5 3.5c-.09.1-.22.15-.35.15h-.01c-.28 0-.5-.22-.5-.5V8.5z" fill="currentColor" stroke="none" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Video Title {item}</h3>
              <p className="text-neutral-400 text-sm">This is a brief description of the video content.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 