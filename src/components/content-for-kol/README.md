# KOL Management Module

## Overview

The KOL (Key Opinion Leader) Management module provides comprehensive tools for managing and analyzing influencer partnerships. The module includes three main components:

1. **KOL Overview** - Main dashboard for managing all 189 KOLs
2. **Content Reach Analysis** - Analyze the reach and impact of KOL content
3. **Conversion Revenue Analysis** - Track conversions and revenue generated by KOLs

## KOL Overview Features

### Core Functionality

- **Display exactly 189 KOLs** with complete profile information
- **Virtual scrolling** for efficient rendering of large lists
- **Advanced search** across names, categories, platforms, and tags
- **Multi-faceted filtering** by category, platform, status, follower count, and engagement rate
- **Batch operations** for bulk status updates and exports
- **Real-time metrics** showing total reach, engagement rates, and platform distribution

### KOL Profile Information

Each KOL profile includes:

- Basic info (name, avatar, verification status)
- Category and tags
- Platform accounts with follower counts and growth rates
- Engagement metrics (avg engagement rate, total views)
- Performance score (0-100 scale)
- Audience demographics (gender, age groups, top countries)
- Activity status (active, inactive, pending)

### Performance Optimizations

- **React Window** for virtual scrolling - only renders visible items
- **Memoized sorting and filtering** to prevent unnecessary recalculations
- **Lazy data generation** - KOLs are generated once and cached
- **Debounced search** to reduce filter operations

### Data Management

- Mock data generation for 189 unique KOLs
- Consistent data across categories and platforms
- Realistic follower counts and engagement rates
- Export functionality to CSV format

## Usage

### Accessing KOL Overview

Navigate to: `/content-kol/overview`

### Search and Filtering

1. Use the search bar to find KOLs by name, category, or platform
2. Click "Filters" to expand advanced filtering options
3. Select multiple filters across different categories
4. Clear all filters with the "Clear all" button

### Batch Operations

1. Select KOLs using individual checkboxes or "Select all"
2. Use batch actions bar to:
   - Update status (active/inactive)
   - Export selected KOLs to CSV
3. Clear selection when done

### Sorting

- Sort by: Followers, Engagement Rate, or Performance Score
- Toggle between ascending/descending order

## Technical Implementation

### Components

- `KOLOverview.tsx` - Main component with virtual scrolling
- `KOLService.ts` - Service layer for data management
- `kol.ts` - TypeScript type definitions

### Key Dependencies

- `react-window` - Virtual scrolling
- `lucide-react` - Icon library
- `zustand` - State management (if needed)

### Performance Considerations

- Virtual list renders only visible items (100px per row)
- Batch operations are optimized for large selections
- Filter operations are memoized to prevent unnecessary recalculations

## Future Enhancements

- Integration with real KOL APIs
- Advanced analytics dashboards
- Automated performance tracking
- Campaign management features
- Direct messaging capabilities
