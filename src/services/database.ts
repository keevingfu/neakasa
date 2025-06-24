// Mock database module for development
// In a real application, this would connect to an actual database

import { Comment, DatabaseParams } from '../types/database';

export interface Database {
  query: <T = unknown>(sql: string, params?: DatabaseParams[]) => Promise<T[]>;
  execute: (sql: string, params?: DatabaseParams[]) => Promise<void>;
}

class MockDatabase implements Database {
  async query<T = unknown>(sql: string, _params?: DatabaseParams[]): Promise<T[]> {
    // Mock implementation
    // Mock query implementation

    // Return mock data based on query
    if (sql.includes('comments')) {
      return this.getMockComments() as T[];
    }

    return [] as T[];
  }

  async execute(_sql: string, _params?: DatabaseParams[]): Promise<void> {
    // Mock implementation
    // Mock execute implementation
  }

  private getMockComments(): Comment[] {
    return [
      {
        id: '1',
        content: 'Great product! Love the quality.',
        author: 'user123',
        timestamp: new Date('2024-01-15'),
        sentiment: 0.8,
        platform: 'youtube',
        videoId: 'video1',
      },
      {
        id: '2',
        content: 'Could be better, but overall satisfied.',
        author: 'user456',
        timestamp: new Date('2024-01-16'),
        sentiment: 0.3,
        platform: 'tiktok',
        videoId: 'video2',
      },
      {
        id: '3',
        content: 'Amazing! Exceeded my expectations.',
        author: 'user789',
        timestamp: new Date('2024-01-17'),
        sentiment: 0.95,
        platform: 'instagram',
        videoId: 'video3',
      },
    ];
  }
}

export const db = new MockDatabase();
