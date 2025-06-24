// Viral video type definitions

export interface Scene {
  scene_number: number;
  start_time: string;
  end_time: string;
  main_emotion_atmosphere: string;
  lighting_color: string;
  main_actions_activities: string[];
  location_environment: string;
}

export interface Emotion {
  frame_time: string;
  main_emotion: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Very High';
}

export interface VideoClassification {
  level1: string;
  level2: string[];
}

export interface ScenesData {
  scenes: Scene[];
}

export interface ViralVideoData {
  id: string;
  video_id: string;
  general_name: string;
  product: string;
  brand: string;
  tags: string[];
  scene_tags: string[];
  scenes: ScenesData;
  shots: Record<string, unknown>;
  dialogues: Record<string, unknown>;
  environment: Record<string, unknown>;
  emotions: Emotion[];
  filter: string;
  classify: VideoClassification;
}

export interface EmotionAnalysis {
  emotion: string;
  count: number;
  percentage: number;
}

export interface SceneAnalysis {
  scene: string;
  count: number;
  avgEngagement: number;
}

export interface ContentRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}
