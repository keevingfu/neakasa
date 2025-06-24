import React from 'react';
import { Video, VideoPlatform } from '../../types/video';

interface PlatformAdapterProps {
  video: Video;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
}

export const PlatformAdapter: React.FC<PlatformAdapterProps> = ({
  video,
  width = '100%',
  height = '100%',
  autoplay = false,
}) => {
  const getVideoId = (url: string, platform: VideoPlatform): string => {
    switch (platform) {
      case 'youtube':
        const youtubeMatch = url.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
        );
        return youtubeMatch ? youtubeMatch[1] : '';
      case 'tiktok':
        const tiktokMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
        return tiktokMatch ? tiktokMatch[1] : '';
      case 'instagram':
        const instagramMatch = url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
        return instagramMatch ? instagramMatch[1] : '';
      default:
        return '';
    }
  };

  const renderPlayer = () => {
    const videoId = getVideoId(video.url, video.platform);

    switch (video.platform) {
      case 'youtube':
        return (
          <iframe
            width={width}
            height={height}
            src={`https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-2xl"
          />
        );

      case 'tiktok':
        // TikTok doesn't support direct embed with autoplay
        // Show thumbnail with link to TikTok
        return (
          <div className="relative w-full h-full">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Watch on TikTok
              </a>
            </div>
          </div>
        );

      case 'instagram':
        // Instagram embed
        return (
          <div className="relative w-full h-full">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={video.url}
              data-instgrm-version="14"
            >
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                View this post on Instagram
              </a>
            </blockquote>
            <script async src="//www.instagram.com/embed.js"></script>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full bg-gray-100 rounded-2xl">
            <p className="text-gray-500">Unsupported video platform</p>
          </div>
        );
    }
  };

  return <div className="w-full h-full">{renderPlayer()}</div>;
};
