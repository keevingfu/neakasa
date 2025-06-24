import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Video } from '../types/video';

interface VideoMetadata {
  video: Video;
  fetchedAt: number;
  expiresAt: number;
}

interface VideoStore {
  // State
  videoCache: Map<string, VideoMetadata>;
  isLoading: Map<string, boolean>;
  errors: Map<string, Error>;

  // Actions
  getCachedVideo: (id: string) => Video | null;
  setCachedVideo: (video: Video, ttl?: number) => void;
  invalidateVideo: (id: string) => void;
  clearCache: () => void;
  isVideoExpired: (id: string) => boolean;
  setLoading: (id: string, loading: boolean) => void;
  setError: (id: string, error: Error | null) => void;
}

// Default TTL: 1 hour
const DEFAULT_TTL = 60 * 60 * 1000;

export const useVideoStore = create<VideoStore>()(
  persist(
    (set, get) => ({
      videoCache: new Map(),
      isLoading: new Map(),
      errors: new Map(),

      getCachedVideo: (id: string) => {
        const state = get();
        const metadata = state.videoCache.get(id);

        if (!metadata) return null;

        // Check if expired
        if (Date.now() > metadata.expiresAt) {
          state.invalidateVideo(id);
          return null;
        }

        return metadata.video;
      },

      setCachedVideo: (video: Video, ttl: number = DEFAULT_TTL) => {
        set((state) => {
          const newCache = new Map(state.videoCache);
          newCache.set(video.id, {
            video,
            fetchedAt: Date.now(),
            expiresAt: Date.now() + ttl,
          });

          return { videoCache: newCache };
        });
      },

      invalidateVideo: (id: string) => {
        set((state) => {
          const newCache = new Map(state.videoCache);
          newCache.delete(id);

          const newErrors = new Map(state.errors);
          newErrors.delete(id);

          return {
            videoCache: newCache,
            errors: newErrors,
          };
        });
      },

      clearCache: () => {
        set({
          videoCache: new Map(),
          isLoading: new Map(),
          errors: new Map(),
        });
      },

      isVideoExpired: (id: string) => {
        const state = get();
        const metadata = state.videoCache.get(id);

        if (!metadata) return true;

        return Date.now() > metadata.expiresAt;
      },

      setLoading: (id: string, loading: boolean) => {
        set((state) => {
          const newLoading = new Map(state.isLoading);
          if (loading) {
            newLoading.set(id, true);
          } else {
            newLoading.delete(id);
          }

          return { isLoading: newLoading };
        });
      },

      setError: (id: string, error: Error | null) => {
        set((state) => {
          const newErrors = new Map(state.errors);
          if (error) {
            newErrors.set(id, error);
          } else {
            newErrors.delete(id);
          }

          return { errors: newErrors };
        });
      },
    }),
    {
      name: 'video-cache',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist the cache, not loading states or errors
        videoCache: Array.from(state.videoCache.entries()),
      }),
      onRehydrateStorage: () => (state) => {
        // Convert array back to Map after rehydration
        if (state && Array.isArray(state.videoCache)) {
          state.videoCache = new Map(state.videoCache);
        }
      },
    }
  )
);

// Hook for fetching videos with cache
export const useCachedVideo = (videoId: string) => {
  const { getCachedVideo, setCachedVideo, isLoading, errors, setLoading, setError } =
    useVideoStore();

  const cachedVideo = getCachedVideo(videoId);
  const loading = isLoading.get(videoId) || false;
  const error = errors.get(videoId) || null;

  const fetchVideo = async (fetcher: () => Promise<Video>) => {
    // Check cache first
    const cached = getCachedVideo(videoId);
    if (cached) return cached;

    // Set loading state
    setLoading(videoId, true);
    setError(videoId, null);

    try {
      const video = await fetcher();
      setCachedVideo(video);
      return video;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch video');
      setError(videoId, error);
      throw error;
    } finally {
      setLoading(videoId, false);
    }
  };

  return {
    video: cachedVideo,
    loading,
    error,
    fetchVideo,
  };
};
