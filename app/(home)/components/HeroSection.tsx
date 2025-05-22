"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/highlight";
import { HoverBorderGradient } from "@/components/ui/hoverborder";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { FiDownload } from "react-icons/fi";
import { FaRegEye, FaEye } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { YouTubeVideo } from "@/components/YouTubeVideo";


const DummyContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 "
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto ">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Edited using Premiere pro and After effects.
              </span>{" "}
              By Miguel Millán
            </p>
          </div>
        );
      })}
    </>
  );
};

export function HeroSection() {
  const [eyeHover, setEyeHover] = useState(false);
<<<<<<< HEAD
  const cards = data.map((card, index) => (
    <Card key={card.videoId} card={card} index={index} />
  ));
=======
>>>>>>> d3d3f5ee73212c83aa69af5ec1847d17160bfb5e

  return (
    <div className="relative hero-video-container flex flex-col md:flex-row justify-between items-center h-screen overflow-hidden pt-20 md:pt-0 ">
      <div className="absolute inset-0 backdrop-filter  backdrop-blur bg-gradient-to-circle from-transparent to-white opacity-50 pointer-events-none "></div>
      <div className="w-full md:w-1/2 ">
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
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 w-auto h-auto text-xl group"
              onMouseEnter={() => setEyeHover(true)}
              onMouseLeave={() => setEyeHover(false)}
            >
              <motion.span
                animate={{ scale: eyeHover ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center"
              >
                {eyeHover ? <FaEye /> : <FaRegEye />}
              </motion.span>
              <Link
                href="/video-selector/"
                className="focus:outline-none"
              >
                <span>See my work</span>{" "}
              </Link>
            </HoverBorderGradient>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <Carousel items={data} />
      </div>
    </div>
  );
}

const data = [
  {
    id: "1",
    category: "",
    title: "Creator: TayluSs",
<<<<<<< HEAD
    videoId: "6PT0FgCcfug",
=======
    src: "/videos/adtay.mp4",
>>>>>>> d3d3f5ee73212c83aa69af5ec1847d17160bfb5e
    content: <DummyContent />,
    isVideo: true
  },
  {
    id: "2",
    category: "",
    title: "Creator: TayluSs",
    videoId: "tHqZvpe_WHs",
    content: <DummyContent />,
    isVideo: true
  },
  {
    id: "3",
    category: "",
    title: "Creator: KaroEmpowerment",
    videoId: "Z7h2ulM-KUQ",
    content: <DummyContent />,
    isVideo: true
  },
  {
    id: "4",
    category: "",
    title: "Creator: GreenerWear",
    videoId: "289oaKJbw5o",
    content: <DummyContent />,
    isVideo: true
  },
];
