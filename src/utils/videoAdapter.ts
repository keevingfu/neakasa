import { KOLVideo } from '../services/kolVideoService';
import { Video, VideoPlatform } from '../types/video';

export const convertKOLVideoToVideo = (kolVideo: KOLVideo): Video => {
  // Extract platform from URL
  const getPlatform = (url: string): VideoPlatform => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('instagram.com')) return 'instagram';
    return 'youtube'; // default
  };

  // Generate thumbnail URL based on platform
  const getThumbnailUrl = (videoId: string, platform: VideoPlatform): string => {
    switch (platform) {
      case 'youtube':
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      case 'tiktok':
        // For demo purposes, using placeholder
        return `https://picsum.photos/seed/${videoId}/640/360`;
      case 'instagram':
        return `https://picsum.photos/seed/${videoId}/640/360`;
      default:
        return `https://picsum.photos/seed/${videoId}/640/360`;
    }
  };

  const platform = getPlatform(kolVideo.kol_video_url);

  return {
    id: kolVideo.kol_video_id,
    title: kolVideo.kol_title,
    description: kolVideo.kol_title, // Using title as description for now
    url: kolVideo.kol_video_url,
    thumbnailUrl: getThumbnailUrl(kolVideo.kol_video_id, platform),
    platform,
    views: kolVideo.kol_views,
    likes: kolVideo.kol_likes,
    comments: kolVideo.kol_comments,
    shares: Math.floor(kolVideo.kol_likes * 0.1), // Estimate shares as 10% of likes
    duration: Math.floor(Math.random() * 300) + 30, // Random duration for demo
    publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    tags: kolVideo.hashtags || [],
    category: kolVideo.category,
    author: {
      id: `author-${kolVideo.kol_video_id}`,
      name: extractAuthorFromUrl(kolVideo.kol_video_url),
      verified: kolVideo.kol_views > 1000000, // Verified if views > 1M
    },
  };
};

const extractAuthorFromUrl = (url: string): string => {
  const tiktokMatch = url.match(/tiktok\.com\/@([^/]+)/);
  if (tiktokMatch) return tiktokMatch[1];

  const youtubeMatch = url.match(/youtube\.com\/(@[^/]+)/);
  if (youtubeMatch) return youtubeMatch[1];

  return 'Unknown Creator';
};
