import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoPreviewCard } from '../VideoPreviewCard';
import { Video } from '../../../types/video';

// Mock data
const mockVideo: Video = {
  id: 'test-video-1',
  title: 'Test Video Title',
  description: 'Test video description',
  url: 'https://www.youtube.com/watch?v=test123',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
  platform: 'youtube',
  views: 1234567,
  likes: 12345,
  comments: 1234,
  shares: 123,
  duration: 180,
  publishedAt: '2024-01-01T00:00:00Z',
  tags: ['test', 'video'],
  category: 'Test Category',
  author: {
    id: 'author-1',
    name: 'Test Author',
    avatar: 'https://example.com/avatar.jpg',
    verified: true,
  },
};

describe('VideoPreviewCard', () => {
  it('renders video information correctly', () => {
    // Disable lazy loading for testing
    render(<VideoPreviewCard video={mockVideo} lazy={false} />);

    // Check title is rendered
    expect(screen.getByText(mockVideo.title)).toBeInTheDocument();

    // Check author name is rendered
    expect(screen.getByText(mockVideo.author!.name)).toBeInTheDocument();

    // Check stats are formatted correctly
    expect(screen.getByText('1.2M')).toBeInTheDocument(); // Views
    expect(screen.getByText('12.3K')).toBeInTheDocument(); // Likes
    expect(screen.getByText('1.2K')).toBeInTheDocument(); // Comments
  });

  it('shows verified badge for verified authors', () => {
    render(<VideoPreviewCard video={mockVideo} lazy={false} />);

    // Check for verified badge
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('does not show verified badge for unverified authors', () => {
    const unverifiedVideo = {
      ...mockVideo,
      author: { ...mockVideo.author!, verified: false },
    };

    render(<VideoPreviewCard video={unverifiedVideo} lazy={false} />);

    // Check verified badge is not present
    expect(screen.queryByText('✓')).not.toBeInTheDocument();
  });

  it('opens video player modal when thumbnail is clicked', () => {
    render(<VideoPreviewCard video={mockVideo} lazy={false} />);

    // Click on thumbnail area - find the clickable thumbnail container
    const thumbnail = screen.getByRole('img', { name: mockVideo.title });
    // The thumbnail is inside a clickable div with cursor-pointer class
    const thumbnailContainer = thumbnail.closest('.cursor-pointer');

    expect(thumbnailContainer).toBeInTheDocument();
    if (thumbnailContainer) {
      fireEvent.click(thumbnailContainer);
    }

    // Check if modal context changed - should have multiple instances of title now
    expect(screen.getAllByText(mockVideo.title)).toHaveLength(2); // One in card, one in modal
  });

  it('displays correct platform indicator', () => {
    render(<VideoPreviewCard video={mockVideo} lazy={false} />);

    // Check for YouTube platform indicator
    expect(screen.getByText('YOUTUBE')).toBeInTheDocument();
  });

  it('formats video duration correctly', () => {
    render(<VideoPreviewCard video={mockVideo} lazy={false} />);

    // 180 seconds = 3:00
    expect(screen.getByText('3:00')).toBeInTheDocument();
  });

  it('formats long duration correctly', () => {
    const longVideo = { ...mockVideo, duration: 3661 }; // 1 hour, 1 minute, 1 second
    render(<VideoPreviewCard video={longVideo} lazy={false} />);

    expect(screen.getByText('1:01:01')).toBeInTheDocument();
  });

  it('does not render stats when showStats is false', () => {
    render(<VideoPreviewCard video={mockVideo} showStats={false} lazy={false} />);

    // Check that stats are not displayed
    expect(screen.queryByText('1.2M')).not.toBeInTheDocument();
    expect(screen.queryByText('12.3K')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VideoPreviewCard video={mockVideo} className="custom-class" lazy={false} />);

    // Find the main container by looking for the video title's parent
    const titleElement = screen.getByText(mockVideo.title);
    let element = titleElement.parentElement;

    // Traverse up the DOM tree to find the element with custom-class
    while (element && !element.classList.contains('custom-class')) {
      element = element.parentElement;
    }

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('custom-class');
  });

  it('handles missing author gracefully', () => {
    const videoWithoutAuthor = { ...mockVideo, author: undefined };
    render(<VideoPreviewCard video={videoWithoutAuthor} lazy={false} />);

    // Should render without errors
    expect(screen.getByText(mockVideo.title)).toBeInTheDocument();
  });

  it('uses lazy loading by default', () => {
    const { container } = render(<VideoPreviewCard video={mockVideo} />);

    // Check if the component container is rendered (for intersection observer)
    const mainContainer = container.firstElementChild;
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('bg-white', 'rounded-2xl');

    // When lazy loading is enabled, should show loading state initially
    const loadingElements = container.getElementsByClassName('animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('displays published date', () => {
    render(<VideoPreviewCard video={mockVideo} lazy={false} />);

    // Check if date is formatted and displayed - matches MM/DD/YYYY format
    const dateElement = screen.getByText(/\d{1,2}\/\d{1,2}\/\d{4}/);
    expect(dateElement).toBeInTheDocument();
  });
});
