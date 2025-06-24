import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { Video } from '../types/video';
import { KOLVideoService } from '../services/kolVideoService';
import { convertKOLVideoToVideo } from '../utils/videoAdapter';
import { useVideoStore } from '../stores/videoStore';

// Query keys
export const videoQueryKeys = {
  all: ['videos'] as const,
  lists: () => [...videoQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...videoQueryKeys.lists(), { filters }] as const,
  details: () => [...videoQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...videoQueryKeys.details(), id] as const,
};

// Fetch single video
export const useVideo = (videoId: string): UseQueryResult<Video, Error> => {
  const { getCachedVideo, setCachedVideo } = useVideoStore();

  return useQuery<Video, Error>({
    queryKey: videoQueryKeys.detail(videoId),
    queryFn: async (): Promise<Video> => {
      // Check Zustand cache first
      const cached = getCachedVideo(videoId);
      if (cached) return cached;

      // Fetch from service
      const videos = await KOLVideoService.getTopVideos(50);
      const kolVideo = videos.find((v) => v.kol_video_id === videoId);

      if (!kolVideo) {
        throw new Error(`Video ${videoId} not found`);
      }

      const video = convertKOLVideoToVideo(kolVideo);

      // Cache in Zustand
      setCachedVideo(video);

      return video;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch video list
export const useVideos = (
  limit = 20,
  filters?: {
    category?: string;
    minViews?: number;
    platform?: string;
  }
): UseQueryResult<Video[], Error> => {
  return useQuery<Video[], Error>({
    queryKey: videoQueryKeys.list(JSON.stringify(filters || {})),
    queryFn: async (): Promise<Video[]> => {
      const kolVideos = await KOLVideoService.getTopVideos(limit);

      // Apply filters
      let filtered = kolVideos;
      if (filters) {
        if (filters.category) {
          filtered = filtered.filter((v) => v.category === filters.category);
        }
        if (filters.minViews !== undefined) {
          const minViews = filters.minViews;
          filtered = filtered.filter((v) => v.kol_views >= minViews);
        }
      }

      // Convert to Video format
      return filtered.map(convertKOLVideoToVideo);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Prefetch videos
export const usePrefetchVideos = () => {
  const queryClient = useQueryClient();

  const prefetchVideos = async (limit = 20) => {
    await queryClient.prefetchQuery({
      queryKey: videoQueryKeys.list(''),
      queryFn: async () => {
        const kolVideos = await KOLVideoService.getTopVideos(limit);
        return kolVideos.map(convertKOLVideoToVideo);
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchVideos };
};

// Invalidate video queries
export const useInvalidateVideos = () => {
  const queryClient = useQueryClient();
  const { clearCache } = useVideoStore();

  const invalidateAll = async () => {
    await queryClient.invalidateQueries({ queryKey: videoQueryKeys.all });
    clearCache();
  };

  const invalidateVideo = async (videoId: string) => {
    await queryClient.invalidateQueries({ queryKey: videoQueryKeys.detail(videoId) });
  };

  return { invalidateAll, invalidateVideo };
};
