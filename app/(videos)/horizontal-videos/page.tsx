import { Suspense } from 'react';
import { VideoGrid } from './components/video-grid';
import { PageHeader } from '@/components/ui/page-header';

export const metadata = {
  title: 'Horizontal Videos',
  description: 'Collection of professional horizontal video edits and motion graphics',
};

export default function HorizontalVideos() {
  return (
    <>
      <PageHeader 
        title="Horizontal Videos"
        backLink="/video-selector"
        backText="Back to Selection"
      />
      <Suspense fallback={<VideoGridSkeleton />}>
        <VideoGrid />
      </Suspense>
    </>
  );
}

function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i}
          className="rounded-2xl bg-gray-800/50 animate-pulse h-[300px]"
        />
      ))}
    </div>
  );
} 