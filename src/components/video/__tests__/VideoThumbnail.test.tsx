import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoThumbnail } from '../VideoThumbnail';
import { Video } from '../../../types/video';

const mockVideo: Video = {
  id: 'test-1',
  title: 'Test Video',
  url: 'https://example.com/video',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
  platform: 'youtube',
  views: 1000,
  likes: 100,
  comments: 10,
  shares: 5,
  duration: 120,
  publishedAt: '2024-01-01',
};

describe('VideoThumbnail', () => {
  it('renders thumbnail image with correct attributes', () => {
    render(<VideoThumbnail video={mockVideo} />);

    const img = screen.getByAltText(mockVideo.title);
    expect(img).toHaveAttribute('src', mockVideo.thumbnailUrl);
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('shows play button by default', () => {
    render(<VideoThumbnail video={mockVideo} />);

    // Play icon should be visible
    const playButton = screen.getByRole('img', { hidden: true });
    expect(playButton).toBeInTheDocument();
  });

  it('hides play button when showPlayButton is false', () => {
    render(<VideoThumbnail video={mockVideo} showPlayButton={false} />);

    // Play button should not be present
    const playButtons = screen.queryAllByRole('img', { hidden: true });
    expect(playButtons.length).toBeLessThan(2); // Only platform icon
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<VideoThumbnail video={mockVideo} onClick={handleClick} />);

    // Find the thumbnail image and click its parent container
    const thumbnailImage = screen.getByAltText(mockVideo.title);
    const thumbnailContainer = thumbnailImage.closest('.cursor-pointer');

    expect(thumbnailContainer).toBeInTheDocument();

    if (thumbnailContainer) {
      fireEvent.click(thumbnailContainer);
    }

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays correct platform color for YouTube', () => {
    render(<VideoThumbnail video={mockVideo} />);

    const platformBadge = screen.getByText('YOUTUBE');
    expect(platformBadge).toHaveClass('bg-red-500');
  });

  it('displays correct platform color for TikTok', () => {
    const tiktokVideo = { ...mockVideo, platform: 'tiktok' as const };
    render(<VideoThumbnail video={tiktokVideo} />);

    const platformBadge = screen.getByText('TIKTOK');
    expect(platformBadge).toHaveClass('bg-black');
  });

  it('displays correct platform color for Instagram', () => {
    const instagramVideo = { ...mockVideo, platform: 'instagram' as const };
    render(<VideoThumbnail video={instagramVideo} />);

    const platformBadge = screen.getByText('INSTAGRAM');
    expect(platformBadge).toHaveClass('bg-gradient-to-r');
  });

  it('formats duration correctly for short videos', () => {
    render(<VideoThumbnail video={mockVideo} />);

    // 120 seconds = 2:00
    expect(screen.getByText('2:00')).toBeInTheDocument();
  });

  it('formats duration correctly for long videos', () => {
    const longVideo = { ...mockVideo, duration: 7265 }; // 2:01:05
    render(<VideoThumbnail video={longVideo} />);

    expect(screen.getByText('2:01:05')).toBeInTheDocument();
  });

  it('does not show duration when duration is 0', () => {
    const videoWithoutDuration = { ...mockVideo, duration: 0 };
    render(<VideoThumbnail video={videoWithoutDuration} />);

    expect(screen.queryByText(/:/)).not.toBeInTheDocument();
  });

  it('uses placeholder image when thumbnailUrl is missing', () => {
    const videoWithoutThumbnail = { ...mockVideo, thumbnailUrl: undefined };
    render(<VideoThumbnail video={videoWithoutThumbnail} />);

    const img = screen.getByAltText(mockVideo.title);
    expect(img).toHaveAttribute('src', '/placeholder-video.jpg');
  });
});
