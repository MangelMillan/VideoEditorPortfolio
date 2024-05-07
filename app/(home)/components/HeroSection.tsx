"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/highlight";
import { HoverBorderGradient } from "@/components/ui/hoverborder";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative hero-video-container flex flex-col md:flex-row justify-between items-center h-screen overflow-hidden pt-20 md:pt-0">
      <div className="absolute inset-0 backdrop-filter backdrop-blur bg-gradient-to-circle from-transparent to-white opacity-50 pointer-events-none"></div>
      <div className="w-full md:w-1/2">
        <div className="text-3xl px-4 md:text-3xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
          <h1 className="">
            👋 Hey there,
            <br />
            <span className="text-5xl md:text-5xl lg:text-6xl text-yellow-300 animate-flicker duration-1000">
              It&apos;s Miguel Millán
            </span>
          </h1>
          <div className="mt-12 flex justify-center text-center">
            <HoverBorderGradient
              containerClassName="rounded-2"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 w-auto h-auto text-lg"
            >
              <FiDownload />
              <Link
                target="_blank"
                download="CV miguel millan"
                href={"/Miguel Millán.pdf"}
              >
                <span>Download CV</span>{" "}
              </Link>
            </HoverBorderGradient>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center h-[40%]">
        <div className="video-container w-3/4  md:h-full">
          <iframe
            src="https://www.youtube.com/embed/FEGdwlyg1Kk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
