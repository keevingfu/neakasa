import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import KOLOverview from '../KOLOverview';
import KOLService from '../../../services/kolService';

// Mock the KOL service
jest.mock('../../../services/kolService');

// Mock react-window
jest.mock('react-window', () => ({
  FixedSizeList: ({
    children,
    itemCount,
    itemSize,
  }: {
    children: (props: { index: number; style: React.CSSProperties }) => React.ReactNode;
    itemCount: number;
    itemSize: number;
  }) => (
    <div data-testid="virtual-list">
      {Array.from({ length: Math.min(itemCount, 10) }).map((_, index) => (
        <div key={index} style={{ height: itemSize }}>
          {children({ index, style: { height: itemSize } })}
        </div>
      ))}
    </div>
  ),
}));

describe('KOLOverview', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('should render loading state initially', () => {
    (KOLService.getKOLs as jest.Mock).mockImplementation(
      () =>
        new Promise(() => {
          /* intentionally empty */
        })
    );
    (KOLService.getKOLMetrics as jest.Mock).mockImplementation(
      () =>
        new Promise(() => {
          /* intentionally empty */
        })
    );

    render(
      <BrowserRouter>
        <KOLOverview />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should display exactly 189 KOLs when loaded', async () => {
    const mockKOLs = Array.from({ length: 189 }, (_, i) => ({
      id: `kol_${i + 1}`,
      name: `KOL ${i + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=kol${i}`,
      verified: i % 3 === 0,
      category: 'Tech & Gadgets',
      platforms: [
        {
          platform: 'youtube',
          username: '@youtube_user',
          followers: 100000,
          followersGrowth: 5.2,
          avgViews: 50000,
          avgEngagement: 3.5,
          verified: true,
          url: 'https://youtube.com/user',
        },
      ],
      totalFollowers: 100000,
      avgEngagementRate: 3.5,
      totalVideos: 100,
      totalViews: 5000000,
      joinedDate: new Date().toISOString(),
      lastActiveDate: new Date().toISOString(),
      status: 'active' as const,
      tags: ['tech', 'review'],
      performanceScore: 85,
      monthlyReach: 80000,
      audienceDemographics: {
        gender: { male: 60, female: 35, other: 5 },
        ageGroups: { '18-24': 30, '25-34': 40, '35-44': 20, '45+': 10 },
        topCountries: [{ country: 'United States', percentage: 45 }],
      },
    }));

    const mockMetrics = {
      totalKOLs: 189,
      activeKOLs: 170,
      totalReach: 50000000,
      avgEngagementRate: 3.8,
      topCategories: [{ category: 'Tech & Gadgets', count: 45 }],
      platformDistribution: [{ platform: 'youtube', count: 150 }],
    };

    (KOLService.getKOLs as jest.Mock).mockResolvedValue(mockKOLs);
    (KOLService.getKOLMetrics as jest.Mock).mockResolvedValue(mockMetrics);

    render(
      <BrowserRouter>
        <KOLOverview />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Manage and analyze your 189 Key Opinion Leaders')
      ).toBeInTheDocument();
    });

    expect(screen.getByText('189')).toBeInTheDocument();
    expect(screen.getByText('Showing 189 of 189 KOLs')).toBeInTheDocument();
  });

  it('should have search and filter capabilities', async () => {
    (KOLService.getKOLs as jest.Mock).mockResolvedValue([]);
    (KOLService.getKOLMetrics as jest.Mock).mockResolvedValue({
      totalKOLs: 0,
      activeKOLs: 0,
      totalReach: 0,
      avgEngagementRate: 0,
      topCategories: [],
      platformDistribution: [],
    });

    render(
      <BrowserRouter>
        <KOLOverview />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Search KOLs by name, category, platform...')
      ).toBeInTheDocument();
    });

    expect(screen.getByText('Filters')).toBeInTheDocument();
  });
});
