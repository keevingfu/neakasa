import React, { useState } from 'react';
import { Video } from '../../types/video';
import { VideoThumbnail } from './VideoThumbnail';
import { VideoPlayer } from './VideoPlayer';
import { LoadingState } from './LoadingState';
import { useVideoLazyLoad } from '../../hooks/useVideoLazyLoad';
import { Eye, Heart, MessageCircle, Share2 } from 'lucide-react';

interface VideoPreviewCardProps {
  video: Video;
  className?: string;
  showStats?: boolean;
  lazy?: boolean;
}

export const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({
  video,
  className = '',
  showStats = true,
  lazy = true,
}) => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { ref, isInView } = useVideoLazyLoad();

  const shouldRender = !lazy || isInView;

  return (
    <>
      <div
        ref={lazy ? ref : undefined}
        className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-sm transition-shadow duration-200 ${className}`}
      >
        {shouldRender ? (
          <>
            {/* Thumbnail with proper aspect ratio based on platform */}
            <div className={getAspectRatioClass(video.platform)}>
              <VideoThumbnail video={video} onClick={() => setIsPlayerOpen(true)} />
            </div>

            {/* Video info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">{video.title}</h3>

              {video.author && (
                <div className="flex items-center mb-3">
                  {video.author.avatar && (
                    <img
                      src={video.author.avatar}
                      alt={video.author.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <span className="text-sm text-gray-600">
                    {video.author.name}
                    {video.author.verified && <span className="ml-1 text-blue-500">✓</span>}
                  </span>
                </div>
              )}

              {/* Stats */}
              {showStats && (
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {formatNumber(video.views)}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {formatNumber(video.likes)}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {formatNumber(video.comments)}
                    </span>
                  </div>
                  <button className="hover:text-gray-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Published date */}
              <div className="mt-2 text-xs text-gray-400">
                {new Date(video.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </>
        ) : (
          <LoadingState />
        )}
      </div>

      {/* Video player modal */}
      <VideoPlayer video={video} isOpen={isPlayerOpen} onClose={() => setIsPlayerOpen(false)} />
    </>
  );
};

const getAspectRatioClass = (platform: string): string => {
  switch (platform) {
    case 'youtube':
      return 'aspect-video'; // 16:9
    case 'tiktok':
    case 'instagram':
      return 'aspect-[9/16]'; // 9:16
    default:
      return 'aspect-video';
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};
