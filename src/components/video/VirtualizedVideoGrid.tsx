import React, { CSSProperties } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { Video } from '../../types/video';
import { VideoPreviewCard } from './VideoPreviewCard';

interface VirtualizedVideoGridProps {
  videos: Video[];
  height: number;
  itemHeight: number;
  columns?: number;
  gap?: number;
  width?: number;
}

export const VirtualizedVideoGrid: React.FC<VirtualizedVideoGridProps> = ({
  videos,
  height,
  itemHeight,
  columns = 3,
  gap = 16,
  width = window.innerWidth,
}) => {
  const rowCount = Math.ceil(videos.length / columns);
  const columnWidth = Math.floor((width - gap * (columns + 1)) / columns);

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: CSSProperties;
  }) => {
    const index = rowIndex * columns + columnIndex;
    if (index >= videos.length) return null;

    const video = videos[index];

    return (
      <div
        style={{
          ...style,
          left: Number(style.left) + gap,
          top: Number(style.top) + gap,
          width: columnWidth,
          height: itemHeight - gap,
        }}
      >
        <VideoPreviewCard
          video={video}
          lazy={false} // Virtualization handles lazy loading
        />
      </div>
    );
  };

  return (
    <Grid
      columnCount={columns}
      columnWidth={columnWidth + gap}
      height={height}
      rowCount={rowCount}
      rowHeight={itemHeight}
      width={width}
      style={{
        overflowX: 'hidden',
      }}
    >
      {Cell}
    </Grid>
  );
};
