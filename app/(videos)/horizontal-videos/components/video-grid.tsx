import { VideoCard } from '@/app/(videos)/horizontal-videos/components/video-card';

const videos = [
  {
    id: '1',
    title: '',
    description: 'Intro and video sections with animations and motion graphics',
    src: '/videos/horizontal/Gabriel 3.mp4',
  },
  {
    id: '2',
    title: '',
    description: 'Youtube intro with beautiful graphics and animations',
    src: '/videos/horizontal/know.mp4',
  },
  {
    id: '3',
    title: '',
    description: 'Professional intro sequence with modern graphics',
    src: '/videos/horizontal/Intro6.mp4',
  },
  {
    id: '4',
    title: '',
    description: 'Creative youtube intro video with dynamic graphics and effects',
    src: '/videos/horizontal/Santi.mp4',
  },
  {
    id: '5',
    title: '',
    description: 'Brand promotion with engaging storytelling',
    src: '/videos/horizontal/Scuffers.mp4',
  },
  {
    id: '6',
    title: '',
    description: 'Artistic visualization of music lyrics',
    src: '/videos/horizontal/Lyrics.mp4',
  },
  {
    id: '7',
    title: '',
    description: 'Visual name intros for games, music videos and more',
    src: '/videos/horizontal/intros.mp4',
  },
  {
    id: '8',
    title: '',
    description: 'Restaurant promotion videos',
    src: '/videos/horizontal/Zarandeado.mp4',
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