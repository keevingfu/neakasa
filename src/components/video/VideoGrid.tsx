import React from 'react';
import { Video } from '../../types/video';
import { VideoPreviewCard } from './VideoPreviewCard';

interface VideoGridProps {
  videos: Video[];
  columns?: number;
  gap?: number;
  className?: string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  columns = 3,
  gap = 16,
  className = '',
}) => {
  return (
    <div
      className={`grid gap-${gap / 4} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {videos.map((video) => (
        <VideoPreviewCard key={video.id} video={video} lazy={true} />
      ))}
    </div>
  );
};

// Responsive video grid that adjusts columns based on screen size
export const ResponsiveVideoGrid: React.FC<Omit<VideoGridProps, 'columns'>> = ({
  videos,
  gap = 16,
  className = '',
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-${gap / 4} ${className}`}
    >
      {videos.map((video) => (
        <VideoPreviewCard key={video.id} video={video} lazy={true} />
      ))}
    </div>
  );
};
