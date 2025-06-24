import React from 'react';
import { X } from 'lucide-react';
import { Video } from '../../types/video';
import { PlatformAdapter } from './PlatformAdapter';

interface VideoPlayerProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
  autoplay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isOpen,
  onClose,
  autoplay = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Video container */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-sm">
          <div className="aspect-video">
            <PlatformAdapter video={video} autoplay={autoplay} />
          </div>

          {/* Video info */}
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            {video.description && <p className="text-gray-600 text-sm mb-3">{video.description}</p>}

            {/* Stats */}
            <div className="flex space-x-4 text-sm text-gray-500">
              <span>{video.views.toLocaleString()} views</span>
              <span>{video.likes.toLocaleString()} likes</span>
              <span>{video.comments.toLocaleString()} comments</span>
            </div>

            {/* Tags */}
            {video.tags && video.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
