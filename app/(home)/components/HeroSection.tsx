"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/highlight";
import { HoverBorderGradient } from "@/components/ui/hoverborder";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="hero-video-container flex flex-col md:flex-row justify-between items-center h-screen overflow-hidden pt-20 md:pt-0 ">
      <div className="w-full md:w-1/2">
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-3xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
          >
            👋 Hey there,
            <br />
            <Highlight className="text-3xl md:text-5xl font-bold text-center  text-neutral-900">
              <span className="text-3xl md:text-3xl lg:text-5xl">
                It&apos;s Miguel Millán
              </span>
            </Highlight>
          </motion.h1>
          <div className="mt-12 flex justify-center text-center">
            <HoverBorderGradient
              containerClassName="rounded-2"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
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
        </HeroHighlight>
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
