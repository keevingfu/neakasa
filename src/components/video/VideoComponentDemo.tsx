import React, { useState } from 'react';
import { VideoPreviewCard } from './VideoPreviewCard';
import { ResponsiveVideoGrid } from './VideoGrid';
import { VirtualizedVideoGrid } from './VirtualizedVideoGrid';
import { Video } from '../../types/video';

// Mock video data for demonstration
const generateMockVideos = (count: number): Video[] => {
  const platforms = ['youtube', 'tiktok', 'instagram'] as const;
  const categories = ['Pet Care', 'Cat Behavior', 'Product Review', 'Tips & Tricks'];

  return Array.from({ length: count }, (_, i) => ({
    id: `video-${i + 1}`,
    title: `Amazing Cat Video ${i + 1}: Best Practices for Pet Care`,
    description: 'Learn the best tips and tricks for taking care of your feline friend.',
    url: `https://example.com/video/${i + 1}`,
    thumbnailUrl: `https://picsum.photos/seed/${i + 1}/640/360`,
    platform: platforms[i % platforms.length],
    views: Math.floor(Math.random() * 1000000) + 10000,
    likes: Math.floor(Math.random() * 50000) + 1000,
    comments: Math.floor(Math.random() * 5000) + 100,
    shares: Math.floor(Math.random() * 1000) + 50,
    duration: Math.floor(Math.random() * 600) + 30,
    publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      'cats',
      'pets',
      'catcare',
      categories[i % categories.length].toLowerCase().replace(/\s+/g, ''),
    ],
    category: categories[i % categories.length],
    author: {
      id: `author-${i % 5}`,
      name: `PetExpert${i % 5}`,
      avatar: `https://i.pravatar.cc/150?img=${i % 5}`,
      verified: i % 3 === 0,
    },
  }));
};

export const VideoComponentDemo: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'responsive' | 'virtualized'>('responsive');
  const videos = generateMockVideos(50);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Video Components Demo</h1>

        {/* View mode selector */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-2xl font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Fixed Grid
          </button>
          <button
            onClick={() => setViewMode('responsive')}
            className={`px-4 py-2 rounded-2xl font-medium transition-colors ${
              viewMode === 'responsive'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Responsive Grid
          </button>
          <button
            onClick={() => setViewMode('virtualized')}
            className={`px-4 py-2 rounded-2xl font-medium transition-colors ${
              viewMode === 'virtualized'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Virtualized Grid
          </button>
        </div>

        {/* Info panel */}
        <div className="mb-6 p-4 bg-blue-50 rounded-2xl">
          <h2 className="font-semibold text-blue-900 mb-2">Current View: {viewMode}</h2>
          <p className="text-blue-700 text-sm">
            {viewMode === 'grid' && 'Fixed 3-column grid layout'}
            {viewMode === 'responsive' &&
              'Responsive grid that adjusts columns based on screen size'}
            {viewMode === 'virtualized' &&
              'Virtual scrolling for better performance with large datasets'}
          </p>
        </div>

        {/* Video grid display */}
        {viewMode === 'responsive' && <ResponsiveVideoGrid videos={videos} gap={16} />}

        {viewMode === 'virtualized' && (
          <VirtualizedVideoGrid
            videos={videos}
            height={800}
            itemHeight={400}
            columns={3}
            gap={16}
          />
        )}

        {/* Single card example */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Single Video Card Example</h2>
          <div className="max-w-md">
            <VideoPreviewCard video={videos[0]} />
          </div>
        </div>

        {/* Platform examples */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Different Platform Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">YouTube (16:9)</h3>
              <VideoPreviewCard video={videos.find((v) => v.platform === 'youtube') || videos[0]} />
            </div>
            <div>
              <h3 className="font-semibold mb-2">TikTok (9:16)</h3>
              <VideoPreviewCard video={videos.find((v) => v.platform === 'tiktok') || videos[1]} />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Instagram (9:16)</h3>
              <VideoPreviewCard
                video={videos.find((v) => v.platform === 'instagram') || videos[2]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
