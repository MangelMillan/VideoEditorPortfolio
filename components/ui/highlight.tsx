"use client";
import { cn } from "@/lib/utils";
import {
  useMotionValue,
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  let springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        "relative h-[20rem] flex items-center bg-white dark:bg-black justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-900  pointer-events-none opacity-20" />
      <motion.div
        className="pointer-events-none bg-dot-thick-red-400 dark:bg-dot-[#EE9CA7]   absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
      radial-gradient(
        70px circle at ${springX}px ${springY}px,
        black 0%,
        transparent 50%
      )
    `,
          maskImage: useMotionTemplate`
      radial-gradient(
        70px circle at ${springX}px ${springY}px,
        black 0%,
        transparent 0%
      )
    `,
        }}
        transition={{
          duration: 0.5, // Aumenta la duración de la transición
          ease: [0.43, 0.13, 0.23, 0.96], // Usa una función de easing más suave
        }}
      />
      <motion.div
        className="pointer-events-none bg-dot-thick-red-400 dark:bg-dot-[#EE9CA7]   absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
      radial-gradient(
        70px circle at ${springX}px ${springY}px,
        black 0%,
        transparent 100%
      )
    `,
          maskImage: useMotionTemplate`
      radial-gradient(
        70px circle at ${springX}px ${springY}px,
        black 5%,
        transparent 100%
      )
    `,
        }}
        transition={{
          duration: 0.1,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 70%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 1,
        ease: [0.9, 0.0, 0.3, 1],
        delay: 0,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-[2px] pt-[0px] px-3 rounded-xl bg-gradient-to-r from-[#9f9f9f] via-[#9f9f9f] to-[#9f9f9f] dark:to-[#b9babb]`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
