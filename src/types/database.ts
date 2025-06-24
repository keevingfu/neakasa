// Database type definitions

export interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  sentiment: number;
  platform: 'youtube' | 'tiktok' | 'instagram';
  videoId: string;
}

export interface DatabaseQueryResult<T> {
  rows: T[];
  rowCount: number;
}

export interface DatabaseParams {
  [key: string]: string | number | boolean | Date | null;
}
