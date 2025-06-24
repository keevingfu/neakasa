import React from 'react';
import { Play } from 'lucide-react';
import { Video } from '../../types/video';

interface VideoThumbnailProps {
  video: Video;
  onClick?: () => void;
  showPlayButton?: boolean;
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  video,
  onClick,
  showPlayButton = true,
}) => {
  return (
    <div className="relative w-full h-full cursor-pointer group" onClick={onClick}>
      <img
        src={video.thumbnailUrl || '/placeholder-video.jpg'}
        alt={video.title}
        className="w-full h-full object-cover rounded-2xl"
        loading="lazy"
      />

      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-200 rounded-2xl">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm transform group-hover:scale-110 transition-transform duration-200">
            <Play className="w-8 h-8 text-gray-800 ml-1" />
          </div>
        </div>
      )}

      {/* Platform indicator */}
      <div className="absolute top-2 left-2">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${getPlatformColor(video.platform)}`}
        >
          {video.platform.toUpperCase()}
        </span>
      </div>

      {/* Duration */}
      {video.duration > 0 && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          {formatDuration(video.duration)}
        </div>
      )}
    </div>
  );
};

const getPlatformColor = (platform: string): string => {
  switch (platform) {
    case 'youtube':
      return 'bg-red-500 text-white';
    case 'tiktok':
      return 'bg-black text-white';
    case 'instagram':
      return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};
