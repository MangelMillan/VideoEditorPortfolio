import { VideoCard } from '@/app/(videos)/horizontal-videos/components/video-card';

const videos = [
  {
    id: '9',
    title: '',
    description: 'Apple-style UI animation with camera effects in After Effects',
    src: 'https://www.youtube.com/embed/Pc68aisBIJE',
  },
  {
    id: '1',
    title: '',
    description: 'Intro and video sections with animations and motion graphics',
    src: 'https://www.youtube.com/embed/w-ecpxHmRz8',
  },
  {
    id: '2',
    title: '',
    description: 'Youtube intro with beautiful graphics and animations',
    src: 'https://www.youtube.com/embed/AdMngOqDYTo',
  },
  {
    id: '3',
    title: '',
    description: 'Professional intro sequence with modern graphics',
    src: 'https://www.youtube.com/embed/XfdouwsadII',
  },
  {
    id: '4',
    title: '',
    description: 'Creative youtube intro video with dynamic graphics and effects',
    src: 'https://www.youtube.com/embed/uNy4PTgeUKg',
  },
  {
    id: '5',
    title: '',
    description: 'Brand promotion with engaging storytelling',
    src: 'https://www.youtube.com/embed/9JPHD5cdXzg',
  },
  {
    id: '6',
    title: '',
    description: 'Artistic visualization of music lyrics',
    src: 'https://www.youtube.com/embed/izc1_STh5y0',
  },
  {
    id: '7',
    title: '',
    description: 'Visual name intros for games, music videos and more',
    src: 'https://www.youtube.com/embed/gYJ_NI4K0FI',
  },
  {
    id: '8',
    title: '',
    description: 'Restaurant promotion videos',
    src: 'https://www.youtube.com/embed/QnxMZ5ElFYY',
  }
] as const;

export function VideoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard 
          key={video.id}
          video={video}
        />
      ))}
    </div>
  );
} 