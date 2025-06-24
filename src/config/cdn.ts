// CDN Configuration for images and videos
export const CDN_CONFIG = {
  // Cloudinary CDN configuration (example)
  cloudinary: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'demo',
    apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY || '',
    apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET || '',
  },

  // Image optimization parameters
  imageOptimization: {
    quality: 'auto',
    format: 'auto',
    dpr: 'auto',
    responsive: true,
    width: 'auto',
  },

  // Video thumbnail sizes
  thumbnailSizes: {
    small: { width: 320, height: 180 },
    medium: { width: 640, height: 360 },
    large: { width: 1280, height: 720 },
  },
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (
  originalUrl: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
  }
): string => {
  // If using Cloudinary
  if (CDN_CONFIG.cloudinary.cloudName && originalUrl.includes('cloudinary')) {
    const { width = 'auto', height = 'auto', quality = 'auto', format = 'auto' } = options || {};
    const transformations = [
      width && `w_${width}`,
      height && `h_${height}`,
      `q_${quality}`,
      `f_${format}`,
      'c_fill',
      'g_auto',
    ]
      .filter(Boolean)
      .join(',');

    return originalUrl.replace('/upload/', `/upload/${transformations}/`);
  }

  // For other CDNs or direct URLs, return as-is
  // In a real implementation, you would add support for other CDNs
  return originalUrl;
};

// Helper function to get video thumbnail URL
export const getVideoThumbnailUrl = (
  videoId: string,
  platform: 'youtube' | 'tiktok' | 'instagram',
  size: 'small' | 'medium' | 'large' = 'medium'
): string => {
  const { width, height } = CDN_CONFIG.thumbnailSizes[size];

  switch (platform) {
    case 'youtube':
      // YouTube provides multiple thumbnail qualities
      const quality =
        size === 'large' ? 'maxresdefault' : size === 'medium' ? 'hqdefault' : 'default';
      return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

    case 'tiktok':
      // TikTok doesn't provide direct thumbnail URLs
      // In production, you would fetch this from TikTok API or use a proxy service
      return `https://picsum.photos/${width}/${height}?random=${videoId}`;

    case 'instagram':
      // Instagram requires API access for thumbnails
      // Using placeholder for demo
      return `https://picsum.photos/${width}/${height}?random=${videoId}`;

    default:
      return `https://picsum.photos/${width}/${height}`;
  }
};

// Preload critical images
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
};

// Batch preload images
export const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(urls.map(preloadImage));
};
