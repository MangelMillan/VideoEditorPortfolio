import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto mt-40">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Motion Graphics",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Animation",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Color correction",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Titles",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Subtitles",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Visual Effects",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Dinamic Graphics",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: null,
  },
];
