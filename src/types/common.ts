// Common type definitions used across the application

// Event Types
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

// Filter Types
export type PeriodType = '7d' | '30d' | '90d' | 'all';
export type ProductType = 'all' | 'm1' | 'magic1' | 'f1' | 'catbox' | 'steamer';
export type PlatformType = 'all' | 'instagram' | 'youtube' | 'tiktok';
export type RegionType = 'all' | 'US' | 'UK' | 'EU' | 'CA' | 'JP' | 'AU';
export type ChannelType = 'all' | 'online' | 'offline' | 'social' | 'email';
export type ContentType = 'all' | 'video' | 'image' | 'carousel' | 'story';

// Date Range Types
export interface DateRange {
  start: Date | string;
  end: Date | string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

// Sort Types
export type SortDirection = 'asc' | 'desc';

export interface SortParams {
  field: string;
  direction: SortDirection;
}

// Filter Params
export interface FilterParams {
  period?: PeriodType;
  product?: ProductType;
  platform?: PlatformType;
  region?: RegionType;
  channel?: ChannelType;
  contentType?: ContentType;
  dateRange?: DateRange;
}

// Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Status Types
export type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'failed';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';