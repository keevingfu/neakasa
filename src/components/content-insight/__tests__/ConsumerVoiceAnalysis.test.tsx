import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConsumerVoiceAnalysis from '../ConsumerVoiceAnalysis';
import { commentAnalysisService } from '../../../services/commentAnalysisService';

// Mock the comment analysis service
jest.mock('../../../services/commentAnalysisService', () => ({
  commentAnalysisService: {
    getComments: jest.fn(),
    getSentimentAnalysis: jest.fn(),
    getKeywordFrequency: jest.fn(),
    getCommentTrends: jest.fn(),
    getTopComments: jest.fn(),
    getUserPainPoints: jest.fn(),
  },
}));

// Mock recharts to avoid render issues in tests
jest.mock('recharts', () => ({
  PieChart: () => <div data-testid="pie-chart" />,
  Pie: () => null,
  Cell: () => null,
  BarChart: () => <div data-testid="bar-chart" />,
  Bar: () => null,
  LineChart: () => <div data-testid="line-chart" />,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  RadarChart: () => <div data-testid="radar-chart" />,
  Radar: () => null,
  PolarGrid: () => null,
  PolarAngleAxis: () => null,
  PolarRadiusAxis: () => null,
}));

describe('ConsumerVoiceAnalysis Component', () => {
  const mockComments = [
    {
      id: '1',
      platform: 'youtube' as const,
      videoId: 'v1',
      videoTitle: 'Test Video 1',
      author: 'User1',
      content: 'Great product!',
      likes: 100,
      replies: 5,
      timestamp: new Date(),
      sentiment: 'positive' as const,
    },
    {
      id: '2',
      platform: 'tiktok' as const,
      videoId: 'v2',
      videoTitle: 'Test Video 2',
      author: 'User2',
      content: 'Not worth the price',
      likes: 50,
      replies: 10,
      timestamp: new Date(),
      sentiment: 'negative' as const,
    },
  ];

  const mockSentimentData = {
    positive: 60,
    negative: 25,
    neutral: 15,
    total: 100,
    averageSentimentScore: 0.35,
  };

  const mockKeywords = [
    { word: 'product', count: 50, sentiment: 'positive' as const },
    { word: 'price', count: 30, sentiment: 'negative' as const },
    { word: 'quality', count: 25, sentiment: 'positive' as const },
  ];

  const mockTrends = [
    { date: '2024-01-01', count: 10, sentiment: { positive: 6, negative: 3, neutral: 1 } },
    { date: '2024-01-02', count: 15, sentiment: { positive: 9, negative: 4, neutral: 2 } },
  ];

  const mockTopComments = [
    { comment: mockComments[0], score: 150 },
    { comment: mockComments[1], score: 100 },
  ];

  const mockPainPoints = [
    'Price concerns - Product is perceived as too expensive',
    'Durability issues - Product breaks or malfunctions',
  ];

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    (commentAnalysisService.getComments as jest.Mock).mockResolvedValue(mockComments);
    (commentAnalysisService.getSentimentAnalysis as jest.Mock).mockResolvedValue(mockSentimentData);
    (commentAnalysisService.getKeywordFrequency as jest.Mock).mockResolvedValue(mockKeywords);
    (commentAnalysisService.getCommentTrends as jest.Mock).mockResolvedValue(mockTrends);
    (commentAnalysisService.getTopComments as jest.Mock).mockResolvedValue(mockTopComments);
    (commentAnalysisService.getUserPainPoints as jest.Mock).mockResolvedValue(mockPainPoints);
  });

  describe('Initial Render', () => {
    test('should display loading state initially', () => {
      const { container } = render(<ConsumerVoiceAnalysis />);
      // Check for animate-pulse class in loading skeletons
      const loadingElements = container.querySelectorAll('.animate-pulse');
      expect(loadingElements.length).toBeGreaterThan(0);
    });

    test('should display header and filters after loading', async () => {
      render(<ConsumerVoiceAnalysis />);

      await waitFor(() => {
        expect(screen.getByText('Consumer Voice Analysis')).toBeInTheDocument();
      });

      expect(
        screen.getByText('Understand what your customers are saying across platforms')
      ).toBeInTheDocument();

      // Check filters
      expect(screen.getByText('All Platforms')).toBeInTheDocument();
      expect(screen.getByText('Last 30 days')).toBeInTheDocument();
    });
  });

  describe('Key Metrics Display', () => {
    test('should display all key metrics', async () => {
      render(<ConsumerVoiceAnalysis />);

      await waitFor(() => {
        expect(screen.getByText('Total Comments')).toBeInTheDocument();
      });

      expect(screen.getByText('Sentiment Score')).toBeInTheDocument();
      expect(screen.getByText('Positive Rate')).toBeInTheDocument();
      expect(screen.getByText('Response Needed')).toBeInTheDocument();

      // Check metric values
      expect(screen.getByText('2')).toBeInTheDocument(); // Total comments
      expect(screen.getByText('35.0%')).toBeInTheDocument(); // Sentiment score
      expect(screen.getByText('60.0%')).toBeInTheDocument(); // Positive rate
      expect(screen.getByText('25')).toBeInTheDocument(); // Negative comments
    });
  });

  describe('Tab Navigation', () => {
    test('should display all tabs', async () => {
      render(<ConsumerVoiceAnalysis />);

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Sentiment Analysis' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Keywords & Topics' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Top Comments' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Pain Points' })).toBeInTheDocument();
      });
    });

    test('should switch between tabs', async () => {
      render(<ConsumerVoiceAnalysis />);

      await waitFor(() => {
        expect(screen.getByText('Sentiment Distribution')).toBeInTheDocument();
      });

      // Click on Sentiment Analysis tab
      fireEvent.click(screen.getByRole('tab', { name: 'Sentiment Analysis' }));
      await waitFor(() => {
        expect(screen.getByText('Sentiment Trends Over Time')).toBeInTheDocument();
      });

      // Click on Keywords tab
      fireEvent.click(screen.getByRole('tab', { name: 'Keywords & Topics' }));
      await waitFor(() => {
        expect(screen.getByText('Keyword Cloud')).toBeInTheDocument();
      });
    });
  });

  describe('Overview Tab', () => {
    test('should display sentiment distribution and trends', async () => {
      render(<ConsumerVoiceAnalysis />);

      await waitFor(() => {
        expect(screen.getByText('Sentiment Distribution')).toBeInTheDocument();
        expect(screen.getByText('Comment Volume Trends')).toBeInTheDocument();
      });

      // Check for chart placeholders
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    });
  });

  describe('Keywords Tab', () => {
    test('should display keyword cloud and bar chart', async () => {
      render(<ConsumerVoiceAnalysis />);

      // Wait for initial load, then click tab
      await waitFor(() => {
        expect(screen.getByRole('tab', { name: 'Keywords & Topics' })).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('tab', { name: 'Keywords & Topics' }));

      await waitFor(() => {
        expect(screen.getByText('Keyword Cloud')).toBeInTheDocument();
      });

      expect(screen.getByText('Top Keywords by Sentiment')).toBeInTheDocument();

      // Check for keywords
      expect(screen.getByText('product (50)')).toBeInTheDocument();
      expect(screen.getByText('price (30)')).toBeInTheDocument();
      expect(screen.getByText('quality (25)')).toBeInTheDocument();
    });
  });

  describe('Top Comments Tab', () => {
    test('should display top comments with metadata', async () => {
      render(<ConsumerVoiceAnalysis />);

      // Wait for initial load, then click tab
      await waitFor(() => {
        expect(screen.getByRole('tab', { name: 'Top Comments' })).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('tab', { name: 'Top Comments' }));

      await waitFor(() => {
        expect(screen.getByText('Great product!')).toBeInTheDocument();
      });

      expect(screen.getByText('Not worth the price')).toBeInTheDocument();

      // Check for engagement metrics
      expect(screen.getByText('👍 100')).toBeInTheDocument();
      expect(screen.getByText('💬 5')).toBeInTheDocument();
    });
  });

  describe('Pain Points Tab', () => {
    test('should display pain points and recommendations', async () => {
      render(<ConsumerVoiceAnalysis />);

      // Wait for initial load, then click tab
      await waitFor(() => {
        expect(screen.getByRole('tab', { name: 'Pain Points' })).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('tab', { name: 'Pain Points' }));

      await waitFor(() => {
        expect(screen.getByText('Customer Pain Points')).toBeInTheDocument();
      });

      expect(
        screen.getByText('Price concerns - Product is perceived as too expensive')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Durability issues - Product breaks or malfunctions')
      ).toBeInTheDocument();

      // Check recommendations
      expect(screen.getByText('Recommendations')).toBeInTheDocument();
      expect(screen.getByText('Address Price Concerns')).toBeInTheDocument();
      expect(screen.getByText('Improve Product Durability')).toBeInTheDocument();
    });
  });

  describe('Filter Functionality', () => {
    test('should call service with platform filter', async () => {
      render(<ConsumerVoiceAnalysis />);

      await waitFor(() => {
        expect(screen.getByText('All Platforms')).toBeInTheDocument();
      });

      // Open platform dropdown and select YouTube
      fireEvent.click(screen.getByText('All Platforms'));
      fireEvent.click(screen.getByText('YouTube'));

      await waitFor(() => {
        expect(commentAnalysisService.getComments).toHaveBeenCalled();
      });

      expect(commentAnalysisService.getComments).toHaveBeenCalledWith(
        expect.objectContaining({
          platform: 'youtube',
        })
      );
    });

    test('should call service with date range filter', async () => {
      render(<ConsumerVoiceAnalysis />);

      await waitFor(() => {
        expect(screen.getByText('Last 30 days')).toBeInTheDocument();
      });

      // Open date range dropdown and select 7 days
      fireEvent.click(screen.getByText('Last 30 days'));
      fireEvent.click(screen.getByText('Last 7 days'));

      await waitFor(() => {
        expect(commentAnalysisService.getComments).toHaveBeenCalled();
      });

      // Check the service call parameters outside of waitFor
      const calls = (commentAnalysisService.getComments as jest.Mock).mock.calls;
      const lastCall = calls[calls.length - 1][0];
      const daysDiff = Math.floor(
        (lastCall.dateRange.end - lastCall.dateRange.start) / (1000 * 60 * 60 * 24)
      );
      expect(daysDiff).toBe(7);
    });
  });

  describe('Error Handling', () => {
    test('should handle service errors gracefully', async () => {
      // Mock service to throw error
      (commentAnalysisService.getComments as jest.Mock).mockRejectedValue(
        new Error('Service error')
      );

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(<ConsumerVoiceAnalysis />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
      });

      expect(consoleSpy).toHaveBeenCalledWith('Error loading comment data:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });
});
