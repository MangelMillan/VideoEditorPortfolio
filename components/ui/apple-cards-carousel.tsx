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

interface CarouselProps {
  items: CarouselItem[];
  initialScroll?: number;
}

interface CarouselItem {
  id: string;
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  isVideo?: boolean;
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

const CarouselVideo = memo(({ src }: { src: string }) => {
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

const CarouselImage = memo(({ 
  src, 
  alt, 
  priority 
}: { 
  src: string;
  alt: string;
  priority?: boolean;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn(
        "object-cover absolute z-10 inset-0 transition duration-300",
        isLoading ? "blur-sm" : "blur-0"
      )}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
      onLoad={() => setLoading(false)}
    />
  );
});
CarouselImage.displayName = 'CarouselImage';

const CarouselCard = memo(({ 
  item, 
  index 
}: { 
  item: CarouselItem;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96",
        "overflow-hidden flex flex-col items-start justify-start relative",
        "transform-gpu transition-transform duration-200 hover:scale-[1.02]",
        "will-change-transform"
      )}
      style={{ 
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none"
        style={{ willChange: 'opacity' }}
      />
      <div className="relative z-40 p-8">
        <p className="text-white text-sm md:text-base font-medium">
          {item.category}
        </p>
      </div>
      {item.isVideo ? (
        <CarouselVideo src={item.src} />
      ) : (
        <CarouselImage 
          src={item.src} 
          alt={item.title} 
          priority={index === 0} 
        />
      )}
    </div>
  );
});
CarouselCard.displayName = 'CarouselCard';

export function Carousel({ items, initialScroll = 0 }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const amount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    requestAnimationFrame(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ 
          left: amount, 
          behavior: 'smooth' 
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft = initialScroll;
    checkScrollability();
  }, [initialScroll, checkScrollability]);

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        onScroll={checkScrollability}
        className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none] will-change-scroll"
        style={{ 
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div 
          className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto"
          style={{ willChange: 'transform' }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="last:pr-[5%] md:last:pr-[33%] opacity-0 animate-fadeIn"
              style={{ 
                animationDelay: `${index * 100}ms`,
                willChange: 'transform, opacity'
              }}
            >
              <CarouselCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 mr-10">
        <CarouselArrowButton 
          direction="left" 
          onClick={() => scroll('left')} 
          disabled={!canScrollLeft} 
        />
        <CarouselArrowButton 
          direction="right" 
          onClick={() => scroll('right')} 
          disabled={!canScrollRight} 
        />
      </div>
    </div>
  );
}

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CarouselItem;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [onCardClose, index]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const isVideo = card.src.endsWith(".mp4");

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit  z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left"
          >
            {card.category}
          </motion.p>
        </div>
        {isVideo ? (
          <video
            src={card.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute z-10 inset-0 object-cover"
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 0.5; // Slower playback for better performance
            }}
          />
        ) : (
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute z-10 inset-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
          />
        )}
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
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
