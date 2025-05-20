"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

const VideoFormatSelector = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    // Reduced delay for faster appearance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const titleWords = ["Choose", "one", "of", "the", "options", "below", "to", "watch", "the", "videos", "you're", "interested", "in:"];

  return (
    <>
      <style jsx global>{`
        body {
          backdrop-filter: blur(10px);
        }
        
        .card-hover:hover {
          --border-from-opacity: 0.3;
          --border-to-opacity: 0.5;
        }
        
        .card-hover {
          --border-from-opacity: 0.1;
          --border-to-opacity: 0.2;
          transition: all 0.3s ease;
        }
        
        .card-left, 
        .card-right {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease-out;
        }
        
        .card-left {
          transition-delay: 0.1s;
        }
        
        .card-right {
          transition-delay: 0.2s;
        }
        
        .visible .card-left,
        .visible .card-right {
          opacity: 1;
          transform: translateY(0);
        }
        
        .card-left:hover,
        .card-right:hover {
          transition-delay: 0s;
          transform: scale(1.05);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .text-container {
          min-height: 4rem;
          overflow: visible;
          line-height: 1.6;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 1200px) {
          .card-left {
            width: 400px !important;
            height: 225px !important;
          }
          
          .card-right {
            width: 225px !important;
            height: 400px !important;
          }
        }
        
        @media (max-width: 768px) {
          .card-left {
            width: 320px !important;
            height: 180px !important;
          }
          
          .card-right {
            width: 180px !important;
            height: 320px !important;
          }
        }
        
        @media (max-width: 480px) {
          .card-left {
            width: 280px !important;
            height: 158px !important;
          }
          
          .card-right {
            width: 158px !important;
            height: 280px !important;
          }
        }
      `}</style>
      <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
        <div className="flex flex-wrap justify-center">
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mx-1 sm:mx-2 my-1"
              variants={wordAnimation}
              initial="hidden"
              animate="visible"
              custom={index}
              style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4)'
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center px-4">
        <div className={`flex flex-col md:flex-row justify-center items-center md:space-x-32 lg:space-x-48 xl:space-x-64 space-y-12 md:space-y-0 my-6 md:my-12 ${isVisible ? 'visible' : ''}`}>
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div
                className="card-left flex justify-center items-center w-[480px] h-[270px] bg-gradient-to-b from-stone-900/70 to-neutral-950/70 backdrop-blur-md rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 bg-clip-padding card-hover"
                onClick={() => handleCardClick('/horizontal-videos')}
                style={{
                  border: '0.5px solid transparent',
                  borderRadius: '16px',
                  backgroundImage: `linear-gradient(to bottom, #1c1917, #0a0a0a), linear-gradient(to bottom, rgba(192, 192, 192, var(--border-from-opacity)), rgba(255, 255, 255, var(--border-to-opacity)))`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}
              >
                <div className="flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-b from-neutral-100 to-neutral-400 rounded-full">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.14C8 3.73 9.57 2.89 10.74 3.67l9.03 5.86c.95.62.95 2.01 0 2.63l-9.03 5.86C9.57 18.8 8 17.97 8 16.56V5.14z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 sm:mt-6 text-center"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">Long Form</h2>
              <p className="text-gray-300 text-sm sm:text-base">Watch videos in long form</p>
            </motion.div>
          </div>
          
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="card-right flex justify-center items-center w-[270px] h-[480px] bg-gradient-to-b from-stone-900/70 to-neutral-950/70 backdrop-blur-md rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 bg-clip-padding card-hover"
                onClick={() => handleCardClick('/vertical-videos')}
                style={{
                  border: '0.5px solid transparent',
                  borderRadius: '16px',
                  backgroundImage: `linear-gradient(to bottom, #1c1917, #0a0a0a), linear-gradient(to bottom, rgba(192, 192, 192, var(--border-from-opacity)), rgba(255, 255, 255, var(--border-to-opacity)))`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}
              >
                <div className="flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-b from-neutral-100 to-neutral-400 rounded-full">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.14C8 3.73 9.57 2.89 10.74 3.67l9.03 5.86c.95.62.95 2.01 0 2.63l-9.03 5.86C9.57 18.8 8 17.97 8 16.56V5.14z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 sm:mt-6 text-center"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">Short Form</h2>
              <p className="text-gray-300 text-sm sm:text-base">Watch videos in short form</p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoFormatSelector; 