"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

const VideoFormatSelector = () => {
  const router = useRouter();
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateRef.current < 50) return;
      lastUpdateRef.current = now;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate normalized position (0-1)
      const x = clientX / innerWidth;
      const y = clientY / innerHeight;
      // Update CSS custom properties
      document.documentElement.style.setProperty('--x', `${clientX}px`);
      document.documentElement.style.setProperty('--y', `${clientY}px`);
      document.documentElement.style.setProperty('--xp', `${x}`);
      document.documentElement.style.setProperty('--yp', `${y}`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --hue: 0;
          --spread: 0;
          --glow-size: 750px;
          --border-width: 1px;
        }
        .spotlight-card {
          position: relative;
          isolation: isolate;
          background: linear-gradient(135deg, rgb(28, 25, 23), rgba(10, 10, 10, 0.64));
          border-radius: 20px;
          overflow: hidden;
        }
        .spotlight-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x) var(--y),
            rgba(255, 255, 255, 0.8),
            transparent 30%
          );
          background-attachment: fixed;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: var(--border-width);
          border-radius: inherit;
          pointer-events: none;
          z-index: 2;
        }
        .spotlight-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x) var(--y),
            rgba(255, 255, 255, 0.4),
            transparent 30%
          );
          filter: blur(var(--glow-size));
          z-index: 1;
        }
        .play-button-container {
          position: relative;
          z-index: 3;
          transition: transform 0.3s ease;
        }
        .spotlight-card:hover .play-button-container {
          transform: scale(1.1);
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
          <h1 className="text-4xl font-bold mb-4">Choose Your Format</h1>
          <p className="text-lg text-gray-300">Select your preferred video format to continue</p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center px-4">
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-32 lg:space-x-48 xl:space-x-64 space-y-12 md:space-y-0 my-6 md:my-12">
          <div className="flex flex-col items-center">
            <div>
              <article
                className="spotlight-card card-left flex justify-center items-center w-[480px] h-[270px] cursor-pointer"
                onClick={() => handleCardClick('/horizontal-videos')}
                data-glow="horizontal"
              >
                <div className="inner-glow"></div>
                <div className="play-button-container flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-b from-neutral-100 to-neutral-400 rounded-full">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.14C8 3.73 9.57 2.89 10.74 3.67l9.03 5.86c.95.62.95 2.01 0 2.63l-9.03 5.86C9.57 18.8 8 17.97 8 16.56V5.14z" fill="currentColor" />
                  </svg>
                </div>
              </article>
            </div>
            <div className="mt-4 sm:mt-6 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">Long Form</h2>
              <p className="text-gray-300 text-sm sm:text-base">Watch videos in long form</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <article
                className="spotlight-card card-right flex justify-center items-center w-[270px] h-[480px] cursor-pointer"
                onClick={() => handleCardClick('/vertical-videos')}
                data-glow="vertical"
              >
                <div className="inner-glow"></div>
                <div className="play-button-container flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-b from-neutral-100 to-neutral-400 rounded-full">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.14C8 3.73 9.57 2.89 10.74 3.67l9.03 5.86c.95.62.95 2.01 0 2.63l-9.03 5.86C9.57 18.8 8 17.97 8 16.56V5.14z" fill="currentColor" />
                  </svg>
                </div>
              </article>
            </div>
            <div className="mt-4 sm:mt-6 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">Short Form</h2>
              <p className="text-gray-300 text-sm sm:text-base">Watch videos in short form</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoFormatSelector; 