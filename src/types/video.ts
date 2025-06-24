// Video type definitions
export interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  platform: VideoPlatform;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  duration: number; // in seconds
  publishedAt: string;
  tags?: string[];
  category?: string;
  author?: VideoAuthor;
}

export type VideoPlatform = 'youtube' | 'tiktok' | 'instagram';

export interface VideoAuthor {
  id: string;
  name: string;
  avatar?: string;
  verified?: boolean;
}

export interface VideoAnalytics {
  engagementRate: number;
  viralScore: number;
  growthRate: number;
  audienceRetention: number;
}

export interface VideoPreviewProps {
  video: Video;
  onPlay?: () => void;
  onError?: (error: Error) => void;
  lazy?: boolean;
  autoplay?: boolean;
}
