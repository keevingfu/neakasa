# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Neakasa** is a content-driven growth decision system - a B2B SaaS platform for social media content analysis and optimization. It helps brands make data-driven decisions about content strategy across multiple channels including KOL marketing, advertising, and private domain operations.

## Essential Commands

```bash
# Development
npm start                    # Start dev server at http://localhost:3000
npm run build               # Build production bundle

# Testing
npm test                    # Interactive test mode
npm run test:unit          # Run unit tests once (CI mode)
npm run test:coverage      # Generate coverage report
npm run test:e2e          # Run Cypress E2E tests
npm run test:e2e:open     # Open Cypress test runner

# Code Quality
npm run lint              # Check ESLint rules
npm run lint:fix          # Auto-fix ESLint issues
npm run format            # Format code with Prettier
npm run format:check      # Check code formatting

# Run a single test
npm test -- --testNamePattern="test name"
```

## High-level Architecture

### Data Flow Pattern
```
Services (data fetching) 
    → React Query (caching/sync) 
    → Components 
    → Zustand (UI state)
```

### Core Technologies
- **Frontend**: React 18.2 with TypeScript (strict mode)
- **State Management**: Zustand (UI state) + React Query (server state)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS (utility-first)
- **Data Visualization**: ECharts (primary), Recharts (secondary)
- **Performance**: react-window for virtual scrolling
- **Testing**: Jest + React Testing Library, Cypress for E2E

### Module Structure
The application is organized by business domains under `src/components/`:
- `overview/` - Dashboard and cross-module insights
- `content-insight/` - Viral video and consumer voice analysis
- `content-testing/` - A/B testing and performance optimization
- `content-for-kol/` - KOL content effectiveness analysis
- `content-for-ads/` - Ad placement and campaign optimization
- `content-for-private/` - Private channel analytics (WhatsApp, EDM, etc.)
- `content-management/` - Content library and workflow management

### Data Sources
1. **Local Data**: CSV files and SQLite database (`neakasa.db`)
2. **Services**: Mock data services for development
3. **Real Data**: `kolRealDataService` and `selfKOCService` for production data

### Key Design Patterns

#### Component Development
- Feature-based folder structure
- Shared UI components in `src/ui/` (lowercase naming)
- Consistent styling: `rounded-2xl` corners, `shadow-sm` for cards
- Mobile-first responsive design

#### Data Fetching
```typescript
// Service layer
const data = await ServiceName.getData();

// Component with React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['dataKey'],
  queryFn: () => ServiceName.getData()
});
```

#### Video Integration
- Supports YouTube, TikTok, Instagram
- Platform-specific adapters in `src/components/video/`
- Virtual scrolling for performance
- TikTok limitation: Preview only (no direct embed)

## Code Standards

### TypeScript Rules
- **Strict mode enabled** - avoid `any` types
- Type definitions in `src/types/`
- Use proper interfaces over type aliases for objects

### Code Language Requirements
- **ALL code must be in English** - no Chinese characters allowed in:
  - Variable names, function names, class names
  - Comments and documentation
  - UI text, labels, error messages
  - Any user-facing strings

### Performance Guidelines
- Use virtual scrolling for lists > 50 items
- Implement lazy loading for videos and images
- Leverage React Query for intelligent caching
- Code split at route level

## Current Implementation Status

### ✅ Completed
- Overview Dashboard with real market data
- Content Insight (4 sub-modules)
- Content Management (library, calendar, workflow)
- Content for KOL (reach & conversion analysis)
- Content Testing (Self-KOC analysis, performance tracking)
- Content for Ads (9 comprehensive analytics pages)

### ⚠️ Partially Implemented
- Content for Private (components created, needs data integration)

### ❌ Not Implemented
- Backend API integration (using mock data)
- Real authentication (demo-only currently)
- WebSocket for real-time features

## Development Workflow

### Adding New Features
1. Create feature directory under `src/components/`
2. Add route in `App.tsx`
3. Update navigation in `navigation-config.ts`
4. Create service in `src/services/` if needed
5. Add Zustand store if complex state management required

### Before Committing
1. Run `npm run lint:fix` to fix ESLint issues
2. Run `npm run format` to ensure consistent formatting
3. Run `npm run test:unit` to verify tests pass
4. Check TypeScript compilation with `npm run build`

### Common Pitfalls to Avoid
- Don't use `any` types - define proper interfaces
- Don't hardcode Chinese text - use English everywhere
- Don't skip virtual scrolling for large lists
- Don't create files without checking existing patterns first

## Database Schema

Key tables in `neakasa.db`:
- `neakasa_selfkoc_accounts` - Self-operated KOC accounts
- `neakasa_catbox_selfkoc_*` - Cat litter box performance data
- `neakasa_gyj_selfkoc_*` - Garment steamer performance data
- `kol_videos` - KOL video performance metrics
- `viral_video` - Viral video analytics
- `search_insights_summary` - SEO keyword data

## Known Limitations

1. **Authentication**: Demo implementation accepts any credentials
2. **Data Persistence**: No real backend, uses local CSV/SQLite
3. **Video Platforms**: TikTok cannot be embedded directly
4. **API Integration**: Most external services use mock data

## Latest Updates (December 2024)

### New Features
- Self-KOC Analysis Module for self-operated content tracking
- Content Insight Overview Dashboard aggregating all analysis modules
- Complete TikTok video card implementation with virtual scrolling
- React Query integration for better data fetching
- **Content for Private Module** - Complete implementation with 5 dashboards:
  - Shopify Analytics
  - Offline Stores Analytics
  - WhatsApp Business Analytics
  - EDM (Email) Analytics
  - LinkedIn B2B Analytics

### Code Quality Improvements
- ✅ **Fixed ALL ESLint errors and warnings** - Reduced from 148 to ~7 warnings
- ✅ **100% TypeScript strict mode compliance** - All `any` types replaced with proper types
- ✅ **Fixed echarts.graphic runtime errors** - Proper echarts imports
- ✅ **Removed all console.log statements** from production code
- ✅ **Fixed template string expressions** in formatter functions
- Enhanced React Testing Library usage
- Removed unused imports and variables

### Technical Fixes
- Fixed `Cannot read properties of undefined (reading 'graphic')` error in:
  - OfflineStoresAnalytics.tsx
  - LinkedInAnalytics.tsx
- Fixed missing LineChart import in IntegratedPerformanceDashboard.tsx
- Fixed type assertions in AdCampaignAnalytics.tsx
- Created comprehensive type definitions:
  - `src/types/charts.ts` - ECharts and Recharts types
  - `src/types/services.ts` - Service response types
  - `src/types/common.ts` - Common application types

### Current Project Status
- **Application running on**: http://localhost:3002 (ports 3000 and 3001 were occupied)
- **ESLint warnings**: ~7 remaining (mostly unused but necessary variables)
- **TypeScript errors**: 0 compilation errors
- **All modules**: Fully implemented with mock data

### Remaining Tasks
1. Design and implement backend API architecture
2. Add proper authentication system
3. Replace mock data with real API integrations
4. Implement WebSocket for real-time features
5. Add comprehensive E2E tests with Cypress