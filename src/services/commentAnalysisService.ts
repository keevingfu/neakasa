// Comment Analysis Service
// Provides analysis of user comments from various social media platforms

// Comment Analysis Service implementation

export interface Comment {
  id: string;
  platform: 'youtube' | 'tiktok' | 'instagram';
  videoId: string;
  videoTitle: string;
  author: string;
  content: string;
  likes: number;
  replies: number;
  timestamp: Date;
  sentiment?: 'positive' | 'negative' | 'neutral';
  language?: string;
}

export interface SentimentAnalysis {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
  averageSentimentScore: number;
}

export interface KeywordFrequency {
  word: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface CommentTrend {
  date: string;
  count: number;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export interface TopComment {
  comment: Comment;
  score: number; // Based on likes and relevance
}

class CommentAnalysisService {
  // Mock sentiment analysis (in production, use NLP service)
  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = [
      'love',
      'great',
      'amazing',
      'excellent',
      'best',
      'perfect',
      'good',
      'like',
      'recommend',
    ];
    const negativeWords = [
      'hate',
      'bad',
      'worst',
      'terrible',
      'awful',
      'poor',
      'disappointed',
      'waste',
    ];

    const lowerText = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;

    positiveWords.forEach((word) => {
      if (lowerText.includes(word)) positiveScore++;
    });

    negativeWords.forEach((word) => {
      if (lowerText.includes(word)) negativeScore++;
    });

    if (positiveScore > negativeScore) return 'positive';
    if (negativeScore > positiveScore) return 'negative';
    return 'neutral';
  }

  // Generate mock comments based on real Neakasa M1 feedback
  private generateMockComments(videoCount = 100): Comment[] {
    const platforms = ['youtube', 'tiktok', 'instagram'] as const;
    const sampleComments = {
      positive: [
        'The open-top design is genius! All 3 of my cats use it without hesitation.',
        'Best value compared to Litter-Robot. Same features, much better price!',
        'The app notifications are fantastic - I know exactly when each cat uses it.',
        'Setup was super easy, took me 20 minutes. Love the modern design!',
        "Odor control is incredible. Can't smell anything even in my small apartment.",
        'Customer service was amazing when I had questions. Very responsive!',
        'My cats transitioned immediately. The open design makes all the difference.',
        "Quiet operation is a game changer. My cats aren't scared at all.",
        'Worth every penny! Saves so much time and the app tracking is brilliant.',
        'Finally a litter box that looks good in my home. Stylish and functional!',
      ],
      negative: [
        'Price is still high even though cheaper than competitors.',
        'WiFi disconnects occasionally, have to reconnect the app.',
        'Wish it came with more litter. Initial cost adds up.',
        'App could use some UI improvements, bit clunky.',
        'Takes up more space than expected, measure carefully.',
      ],
      neutral: [
        'Works well, does what it promises. Good product overall.',
        'App features are nice but not essential for basic operation.',
        'Litter tracking is about the same as any litter box.',
        'Design is modern, fits well in most homes.',
        'Customer service response time could be faster.',
      ],
    };

    const comments: Comment[] = [];
    const now = new Date();

    for (let i = 0; i < videoCount; i++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const sentimentType =
        Math.random() < 0.6 ? 'positive' : Math.random() < 0.7 ? 'neutral' : 'negative';
      const commentTexts = sampleComments[sentimentType];
      const content = commentTexts[Math.floor(Math.random() * commentTexts.length)];

      comments.push({
        id: `comment-${i}`,
        platform,
        videoId: `video-${Math.floor(Math.random() * 50)}`,
        videoTitle: `Product Review Video ${Math.floor(Math.random() * 50)}`,
        author: `User${Math.floor(Math.random() * 1000)}`,
        content,
        likes: Math.floor(Math.random() * 1000),
        replies: Math.floor(Math.random() * 50),
        timestamp: new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Last 90 days
        sentiment: sentimentType,
      });
    }

    return comments;
  }

  async getComments(filters?: {
    platform?: string;
    dateRange?: { start: Date; end: Date };
    sentiment?: string;
  }): Promise<Comment[]> {
    // In production, fetch from database
    // For now, return mock data
    let comments = this.generateMockComments(500);

    if (filters) {
      if (filters.platform) {
        comments = comments.filter((c) => c.platform === filters.platform);
      }
      if (filters.dateRange) {
        const { start, end } = filters.dateRange;
        comments = comments.filter(
          (c) => c.timestamp >= start && c.timestamp <= end
        );
      }
      if (filters.sentiment) {
        comments = comments.filter((c) => c.sentiment === filters.sentiment);
      }
    }

    return comments;
  }

  async getSentimentAnalysis(comments: Comment[]): Promise<SentimentAnalysis> {
    const analysis: SentimentAnalysis = {
      positive: 0,
      negative: 0,
      neutral: 0,
      total: comments.length,
      averageSentimentScore: 0,
    };

    comments.forEach((comment) => {
      const sentiment = comment.sentiment || this.analyzeSentiment(comment.content);
      if (sentiment === 'positive') analysis.positive++;
      else if (sentiment === 'negative') analysis.negative++;
      else analysis.neutral++;
    });

    // Calculate average sentiment score (positive: 1, neutral: 0, negative: -1)
    analysis.averageSentimentScore = (analysis.positive - analysis.negative) / analysis.total;

    return analysis;
  }

  async getKeywordFrequency(comments: Comment[]): Promise<KeywordFrequency[]> {
    const wordFrequency = new Map<string, { count: number; sentiment: Set<string> }>();

    // Common words to exclude
    const stopWords = new Set([
      'the',
      'is',
      'at',
      'which',
      'on',
      'and',
      'a',
      'an',
      'as',
      'are',
      'was',
      'were',
      'been',
      'be',
      'have',
      'has',
      'had',
      'it',
      'its',
      'for',
      'to',
      'of',
      'in',
      'that',
      'this',
      'my',
      'i',
      'me',
      'you',
      'your',
    ]);

    comments.forEach((comment) => {
      const words = comment.content
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 3 && !stopWords.has(word));

      words.forEach((word) => {
        const cleanWord = word.replace(/[^a-z0-9]/g, '');
        if (cleanWord) {
          if (!wordFrequency.has(cleanWord)) {
            wordFrequency.set(cleanWord, { count: 0, sentiment: new Set() });
          }
          const data = wordFrequency.get(cleanWord) || { count: 0, sentiment: new Set() };
          data.count++;
          data.sentiment.add(comment.sentiment || 'neutral');
        }
      });
    });

    // Convert to array and sort by frequency
    const keywords: KeywordFrequency[] = Array.from(wordFrequency.entries())
      .map(([word, data]) => ({
        word,
        count: data.count,
        sentiment: Array.from(data.sentiment)[0] as 'positive' | 'negative' | 'neutral', // Simplified: take the most common sentiment
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50); // Top 50 keywords

    return keywords;
  }

  async getCommentTrends(comments: Comment[], days = 30): Promise<CommentTrend[]> {
    const trends = new Map<string, CommentTrend>();
    const now = new Date();

    // Initialize days
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      trends.set(dateStr, {
        date: dateStr,
        count: 0,
        sentiment: { positive: 0, negative: 0, neutral: 0 },
      });
    }

    // Count comments by day
    comments.forEach((comment) => {
      const dateStr = comment.timestamp.toISOString().split('T')[0];
      if (trends.has(dateStr)) {
        const trend = trends.get(dateStr);
        if (!trend) return;
        trend.count++;
        const sentiment = comment.sentiment || 'neutral';
        trend.sentiment[sentiment]++;
      }
    });

    return Array.from(trends.values()).sort((a, b) => a.date.localeCompare(b.date));
  }

  async getTopComments(comments: Comment[], limit = 10): Promise<TopComment[]> {
    // Score based on likes and recency
    const now = new Date().getTime();

    return comments
      .map((comment) => {
        const ageInDays = (now - comment.timestamp.getTime()) / (1000 * 60 * 60 * 24);
        const recencyScore = Math.max(0, 100 - ageInDays); // Newer comments get higher score
        const engagementScore = comment.likes + comment.replies * 2; // Replies count more

        return {
          comment,
          score: engagementScore + recencyScore,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  async getUserPainPoints(comments: Comment[]): Promise<string[]> {
    const negativeComments = comments.filter(
      (c) => (c.sentiment || this.analyzeSentiment(c.content)) === 'negative'
    );

    const painPoints = new Map<string, number>();
    const painKeywords = [
      'expensive',
      'wifi',
      'app',
      'space',
      'litter',
      'price',
      'cost',
      'disconnect',
      'setup',
      'size',
    ];

    negativeComments.forEach((comment) => {
      const lowerContent = comment.content.toLowerCase();
      painKeywords.forEach((keyword) => {
        if (lowerContent.includes(keyword)) {
          painPoints.set(keyword, (painPoints.get(keyword) || 0) + 1);
        }
      });
    });

    return Array.from(painPoints.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([keyword]) => {
        // Convert keywords to user-friendly pain points
        const painPointMap: Record<string, string> = {
          expensive: 'Initial investment concern - $399 price point deters some buyers',
          wifi: 'WiFi connectivity issues - Occasional app disconnections',
          app: 'App functionality - UI improvements needed for better experience',
          space: 'Size considerations - Larger footprint than expected',
          litter: 'Litter costs - Additional expense for compatible litter',
          price: 'Value perception - Despite being cheaper than competitors',
          cost: 'Total cost of ownership - Initial unit plus ongoing litter',
          disconnect: 'Network stability - App requires reconnection occasionally',
          setup: 'Initial configuration - Some users find app setup complex',
          size: 'Space requirements - Need adequate room for placement',
        };
        return painPointMap[keyword] || keyword;
      });
  }
}

export const commentAnalysisService = new CommentAnalysisService();
