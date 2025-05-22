"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
  memo,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
  IconPlayerPlay,
  IconPlayerPause,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { YouTubeVideo } from "@/components/YouTubeVideo";

export interface CarouselItem {
  id: string;
  src?: string;
  title: string;
  category: string;
  videoId?: string;
  content: React.ReactNode;
  isVideo?: boolean;
}

interface CarouselProps {
  items: CarouselItem[];
  initialScroll?: number;
}

const SCROLL_AMOUNT = 300;
const MOBILE_BREAKPOINT = 768;

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

const CarouselArrowButton = memo(({ 
  direction, 
  onClick, 
  disabled 
}: { 
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    className={cn(
      "relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center",
      "transform-gpu transition-transform duration-200 hover:scale-105 active:scale-95",
      "will-change-transform",
      disabled && "opacity-50 cursor-not-allowed"
    )}
    onClick={onClick}
    disabled={disabled}
    aria-label={`Scroll ${direction}`}
    style={{ 
      transform: 'translate3d(0,0,0)',
      backfaceVisibility: 'hidden'
    }}
  >
    {direction === 'left' ? (
      <IconArrowNarrowLeft className="h-6 w-6 text-gray-500 will-change-transform" />
    ) : (
      <IconArrowNarrowRight className="h-6 w-6 text-gray-500 will-change-transform" />
    )}
  </button>
));
CarouselArrowButton.displayName = 'CarouselArrowButton';

const CarouselVideo = memo(({ src }: { src: string }): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    video.play().catch(() => {});
    observer.observe(video);
    
    return () => observer.unobserve(video);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      className="absolute z-10 inset-0 object-cover"
      style={{ willChange: 'transform' }}
      onLoadedData={(e) => {
        const video = e.target as HTMLVideoElement;
        video.playbackRate = 0.5;
      }}
    />
  );
});
CarouselVideo.displayName = 'CarouselVideo';

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps): JSX.Element => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < MOBILE_BREAKPOINT ? 200 : window.innerWidth < 798 ? 240 : window.innerWidth < 1024 ? 320 : 360;
      const gap = window.innerWidth < MOBILE_BREAKPOINT ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")}></div>
          <div className={cn("flex flex-row justify-start gap-4 pl-4", "max-w-7xl mx-auto")}>
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                <Card card={item} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-4">
          <CarouselArrowButton direction="left" onClick={scrollLeft} disabled={!canScrollLeft} />
          <CarouselArrowButton direction="right" onClick={scrollRight} disabled={!canScrollRight} />
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CarouselItem;
  index: number;
  layout?: boolean;
}): JSX.Element => {
  return (
    <div className="rounded-3xl bg-gray-100 dark:bg-neutral-900 aspect-[9/16] w-[200px] md:w-[240px] lg:w-[320px] xl:w-[360px] overflow-hidden flex flex-col items-start justify-start relative z-10">
      {card.videoId ? (
        <div className="absolute inset-0 z-10 overflow-hidden rounded-3xl">
          <YouTubeVideo
            videoId={card.videoId}
            className="w-full h-full"
            title={card.title}
          />
        </div>
      ) : card.src ? (
        <CarouselVideo src={card.src} />
      ) : null}
    </div>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps): JSX.Element => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Videos muestra"}
      {...rest}
    />
  );
};
