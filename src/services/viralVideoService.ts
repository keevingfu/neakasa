// Service to fetch viral video data from the database
// Since we're in a React app without backend, we'll use mock data based on actual database content

import {
  ViralVideoData,
  EmotionAnalysis,
  SceneAnalysis,
  ContentRecommendation,
  Emotion,
} from '../types/viralVideo';

export class ViralVideoService {
  // Mock data based on actual database analysis
  private static mockVideos: ViralVideoData[] = [
    {
      id: '27',
      video_id: '7.43931E+18',
      general_name: 'Underwater Camera',
      product: 'Action Camera',
      brand: 'Neakasa',
      tags: ['fishing', 'underwater camera', 'ocean', 'marine life', 'gadget', 'tech'],
      scene_tags: ['Beach', 'Ocean', 'Underwater'],
      scenes: {
        scenes: [
          {
            scene_number: 1,
            start_time: '00:00',
            end_time: '00:06',
            main_emotion_atmosphere: 'Curiosity about what lies beneath the surface',
            lighting_color: 'Late afternoon sunset lighting with warm hues',
            main_actions_activities: [
              'Standing in water',
              'Casting fishing rod',
              'Camera flying up',
            ],
            location_environment: 'Sandy beach with waves crashing on shore',
          },
          {
            scene_number: 2,
            start_time: '00:06',
            end_time: '00:08',
            main_emotion_atmosphere: 'Surprise and wonder at encountering marine life',
            lighting_color: 'Bright underwater sunlight filtering down',
            main_actions_activities: ['Fish approaching camera', 'Direct eye contact with fish'],
            location_environment: 'Clear blue underwater environment',
          },
        ],
      },
      emotions: [
        { frame_time: '00:00', main_emotion: 'Curiosity', intensity: 'Medium' },
        { frame_time: '00:01', main_emotion: 'Action', intensity: 'High' },
        { frame_time: '00:03', main_emotion: 'Wonder', intensity: 'High' },
        { frame_time: '00:07', main_emotion: 'Surprise', intensity: 'Very High' },
      ],
      shots: {},
      dialogues: {},
      environment: {},
      filter: '',
      classify: {
        level1: 'Product Showcase',
        level2: ['Extreme Environment Challenge', 'Creative Usage Display'],
      },
    },
    {
      id: '45',
      video_id: '7.43932E+18',
      general_name: 'Smart Litter Box',
      product: 'M1 Automatic Cat Litter Box',
      brand: 'Neakasa',
      tags: ['pet care', 'cat litter box', 'smart home', 'automation', 'pet tech'],
      scene_tags: ['Home', 'Living Room', 'Pet Area'],
      scenes: {
        scenes: [
          {
            scene_number: 1,
            start_time: '00:00',
            end_time: '00:15',
            main_emotion_atmosphere: 'Relief and satisfaction',
            lighting_color: 'Natural daylight, clean and bright',
            main_actions_activities: [
              'Cat using litter box',
              'Automatic cleaning cycle',
              'Owner checking app',
            ],
            location_environment: 'Modern home interior',
          },
        ],
      },
      emotions: [
        { frame_time: '00:00', main_emotion: 'Problem Recognition', intensity: 'Medium' },
        { frame_time: '00:05', main_emotion: 'Relief', intensity: 'High' },
        { frame_time: '00:10', main_emotion: 'Satisfaction', intensity: 'Very High' },
      ],
      shots: {},
      dialogues: {},
      environment: {},
      filter: '',
      classify: { level1: 'Product Demo', level2: ['Problem Solution', 'Feature Highlight'] },
    },
    {
      id: '89',
      video_id: '7.43933E+18',
      general_name: 'Pet Grooming Kit',
      product: 'P1 Pro Pet Grooming Vacuum',
      brand: 'Neakasa',
      tags: ['pet grooming', 'vacuum', 'pet care', 'dog', 'cat', 'shedding'],
      scene_tags: ['Home', 'Pet Grooming', 'Living Room'],
      scenes: {
        scenes: [
          {
            scene_number: 1,
            start_time: '00:00',
            end_time: '00:20',
            main_emotion_atmosphere: 'Amazement at mess-free grooming',
            lighting_color: 'Bright natural light',
            main_actions_activities: [
              'Grooming dog',
              'Vacuum collecting fur',
              'Happy pet reaction',
            ],
            location_environment: 'Home grooming setup',
          },
        ],
      },
      emotions: [
        { frame_time: '00:00', main_emotion: 'Frustration', intensity: 'Medium' },
        { frame_time: '00:08', main_emotion: 'Amazement', intensity: 'High' },
        { frame_time: '00:15', main_emotion: 'Joy', intensity: 'Very High' },
      ],
      shots: {},
      dialogues: {},
      environment: {},
      filter: '',
      classify: { level1: 'Product Demo', level2: ['Before/After Comparison', 'Pet Reaction'] },
    },
  ];

  static async getViralVideos(): Promise<ViralVideoData[]> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return more realistic data with Neakasa products
    return this.mockVideos.map((video) => ({
      ...video,
      // Parse JSON strings if needed
      tags: Array.isArray(video.tags) ? video.tags : JSON.parse(video.tags || '[]'),
      scene_tags: Array.isArray(video.scene_tags)
        ? video.scene_tags
        : JSON.parse(video.scene_tags || '[]'),
      scenes: typeof video.scenes === 'object' ? video.scenes : JSON.parse(video.scenes || '{}'),
      emotions: Array.isArray(video.emotions) ? video.emotions : JSON.parse(video.emotions || '[]'),
    }));
  }

  static getEmotionAnalysis(videos: ViralVideoData[]): EmotionAnalysis[] {
    const emotionMap = new Map<string, number>();

    videos.forEach((video) => {
      if (video.emotions && Array.isArray(video.emotions)) {
        video.emotions.forEach((emotion: Emotion) => {
          const key = emotion.main_emotion;
          emotionMap.set(key, (emotionMap.get(key) || 0) + 1);
        });
      }
    });

    const totalEmotions = Array.from(emotionMap.values()).reduce((a, b) => a + b, 0);
    return Array.from(emotionMap.entries())
      .map(([emotion, count]) => ({
        emotion,
        count,
        percentage: Math.round((count / totalEmotions) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }

  static getSceneAnalysis(videos: ViralVideoData[]): SceneAnalysis[] {
    const sceneMap = new Map<string, { count: number; totalEngagement: number }>();

    videos.forEach((video) => {
      if (video.scene_tags && Array.isArray(video.scene_tags)) {
        video.scene_tags.forEach((scene) => {
          const current = sceneMap.get(scene) || { count: 0, totalEngagement: 0 };
          // Mock engagement based on emotion intensity
          const engagement = video.emotions?.length
            ? video.emotions.filter(
                (e: Emotion) => e.intensity === 'High' || e.intensity === 'Very High'
              ).length * 25
            : 50;

          sceneMap.set(scene, {
            count: current.count + 1,
            totalEngagement: current.totalEngagement + engagement,
          });
        });
      }
    });

    return Array.from(sceneMap.entries())
      .map(([scene, data]) => ({
        scene,
        count: data.count,
        avgEngagement: Math.round(data.totalEngagement / data.count),
      }))
      .sort((a, b) => b.avgEngagement - a.avgEngagement);
  }

  static getContentRecommendations(): ContentRecommendation[] {
    return [
      {
        title: 'Pet Reaction Shots',
        description:
          'Capture genuine pet reactions during product use. Happy pets using Neakasa products create emotional connection.',
        priority: 'high' as const,
        category: 'Pet Products',
      },
      {
        title: 'Problem-Solution Format',
        description:
          'Start with messy litter or shedding fur, then show Neakasa solution. Clear before/after creates compelling narrative.',
        priority: 'high' as const,
        category: 'Storytelling',
      },
      {
        title: 'App Integration Demo',
        description:
          'Show smart features and app control. Tech-savvy pet owners love convenience and monitoring capabilities.',
        priority: 'medium' as const,
        category: 'Technology',
      },
      {
        title: 'Multi-Pet Households',
        description:
          'Feature homes with multiple cats/dogs. Shows product capacity and reliability for demanding situations.',
        priority: 'medium' as const,
        category: 'Use Cases',
      },
      {
        title: 'Time-Lapse Cleaning',
        description:
          'Speed up automatic cleaning cycles. Visual proof of efficiency in seconds rather than minutes.',
        priority: 'high' as const,
        category: 'Visual Effects',
      },
      {
        title: 'Owner Testimonials',
        description:
          'Real pet owners sharing relief and satisfaction. Authentic voices build trust and relatability.',
        priority: 'medium' as const,
        category: 'Social Proof',
      },
    ];
  }
}
