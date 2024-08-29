"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/highlight";
import { HoverBorderGradient } from "@/components/ui/hoverborder";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

const DummyContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Videos editados usando Adobe Premiere Pro y After Effects.
              </span>{" "}
              por Miguel Millán
            </p>
          </div>
        );
      })}
    </>
  );
};

export function HeroSection() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

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
                download="Miguel Millán"
                href={"/Miguel Millán CV.pdf"}
              >
                <span>Download CV</span>{" "}
              </Link>
            </HoverBorderGradient>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <Carousel items={cards} />
      </div>
    </div>
  );
}

const data = [
  {
    category: "Clip de youtube",
    title: "Extractos de videos",
    src: "/videos/3Nriku.mp4",

    content: <DummyContent />,
  },
  {
    category: "Clip de youtube",
    title: "Extractos de Podcast",
    src: "/videos/Demo Reel.mp4",
    content: <DummyContent />,
  },
  {
    category: "Clip de twitch",
    title: "Extractos de Streams",
    src: "/videos/Tayu.mp4",
    content: <DummyContent />,
  },
];
