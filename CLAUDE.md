# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Latest Updates (December 2024)

### ✨ New Features
- **Self-KOC Analysis Module** - Performance analysis of self-operated content accounts across platforms
- **Content Insight Overview Dashboard** - Comprehensive dashboard aggregating all analysis modules
- **TikTok Video Card Implementation Guide** - Complete technical documentation in section 3.8
- **React Query Integration** - Fixed QueryClientProvider setup for proper data fetching

### 🛠️ Code Quality Improvements
- ✅ **All ESLint Issues Resolved** - Fixed 52 errors and warnings
- ✅ **100% TypeScript Strict Mode** - Eliminated all `any` types
- ✅ **Testing Best Practices** - Fixed all React Testing Library violations
- ✅ **Clean Codebase** - Removed unused imports, variables, and improved Hook dependencies

### 📊 Current Status
- **5 Modules Completed**: Overview, Content Insight, Content Management, Content for KOL, Infrastructure
- **3 Modules Partial**: Content Testing, Content for Ads, Content for Private
- **3 Features Pending**: Backend Integration, Authentication System, Real-time Features

---

## Project Overview

**Neakasa** is a content-driven growth decision system, a B2B SaaS platform focused on social media content analysis and optimization.

**Core Modules**:
- **Overview**: Core metrics dashboard
- **Content Insight**: Viral video analysis, consumer voice analysis
- **Content Testing**: A/B testing and performance optimization
- **Content for KOL**: KOL content effectiveness analysis
- **Content for Ads**: Ad placement optimization
- **Content for Private**: Private channel operations

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
```

## Architecture Overview

### Data Flow Architecture
1. **Services Layer** (`src/services/`): Handles all external data fetching
   - `kolVideoService.ts`: CSV data parsing for KOL videos
   - `viralVideoService.ts`: Viral video data management
   - `commentAnalysisService.ts`: User comment analysis with mock data
   - `semrushApi.ts`: SEO and competitor analysis integration
   - `selfKOCService.ts`: Self-operated KOC account performance data

2. **State Management**: 
   - **Zustand** (`src/stores/`): Local state for UI and cached data
   - **React Query** (`@tanstack/react-query`): Server state, caching, and synchronization
   - Pattern: Services → React Query → Components (with Zustand for UI state)

3. **Data Sources**:
   - CSV files in `data/` directory (KOL videos, viral videos)
   - SQLite database (`neakasa.db`) for structured data:
     - `neakasa_selfkoc_accounts`: Self-operated KOC account metadata
     - `neakasa_catbox_selfkoc_*`: Cat litter box product performance data
     - `neakasa_gyj_selfkoc_*`: Garment steamer product performance data
   - Mock data for development (comment analysis, domain data)
   - External APIs (Semrush for SEO insights)

### Component Architecture
- **Page Components**: Each module has its own directory under `src/components/`
  - `overview/`: Dashboard and summary views
  - `content-insight/`: Consumer voice, viral videos, search insights
  - `content-testing/`: A/B testing and optimization
  - `content-for-kol/`: KOL performance and management
  - `content-for-ads/`: Ad distribution and optimization
  - `content-for-private/`: Private channel analytics
- **Shared Components**: 
  - `ui/`: Reusable UI primitives (card, tabs, select, badge) - lowercase naming
  - `video/`: Video handling components with platform adapters
  - `layout/`: App structure (Sidebar, MainLayout)
- **Routing**: React Router v6 with navigation config in `navigation-config.ts`

### Video Platform Integration
- **Supported Platforms**: YouTube, TikTok, Instagram
- **Architecture**: 
  - `PlatformAdapter.tsx`: Unified interface for different platforms
  - `VideoPlayer.tsx`: Handles platform-specific embedding
  - `VirtualizedVideoGrid.tsx`: Performance-optimized video lists
- **Performance**: Lazy loading, virtual scrolling with react-window

### Authentication Flow
- Simple demo auth in `AuthWrapper.tsx` (any non-empty username/password)
- Login state managed locally, no backend integration
- Future: Replace with actual authentication service

## Key Technical Decisions

### TypeScript Configuration
- Strict mode enabled for type safety
- Custom types in `src/types/` directory
- Avoid `any` types; use proper type definitions

### Styling System
- Tailwind CSS for utility-first styling
- Design tokens: 2xl rounded corners, light shadows
- Responsive design with mobile-first approach

### Performance Optimizations
- Virtual scrolling for large lists (react-window)
- Lazy loading for videos and images
- React Query for intelligent caching
- Code splitting at route level

### Data Visualization
- **ECharts**: Primary charting library for complex visualizations
- **Recharts**: Secondary option for simpler React-friendly charts
- Consistent chart theming across modules

## Common Development Patterns

### Adding a New Module
1. Create module directory in `src/components/`
2. Add route in `App.tsx`
3. Update navigation in `navigation-config.ts`
4. Create module-specific store if needed

### Working with Videos
```typescript
// Use the video query hook
const { data: videos, isLoading } = useVideos(limit, filters);

// Video component will handle platform differences
<VideoPlayer video={video} />
```

### Data Fetching Pattern
```typescript
// Service layer
const data = await ServiceName.getData();

// Component with React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['dataKey'],
  queryFn: () => ServiceName.getData()
});
```

## Current Limitations

1. **Authentication**: Demo-only, accepts any credentials
2. **Data Persistence**: No real backend, uses local CSV/SQLite
3. **API Integration**: Semrush API uses mock data in development
4. **Video Embedding**: TikTok shows preview only (platform limitation)

## Testing Strategy

- **Unit Tests**: Components and utilities with React Testing Library
- **E2E Tests**: Critical user flows with Cypress (configured but not yet implemented)
- **Test Data**: Mock data generators in service files
- Run single test: `npm test -- --testNamePattern="test name"`

## Database Schema

The SQLite database (`data/neakasa.db`) contains the following key tables:

### Self-operated KOC Analysis Tables
- `neakasa_selfkoc_accounts`: Account metadata (brand, product, channel, URL)
- `neakasa_catbox_selfkoc_ytb/tk/ins`: Cat litter box content performance
- `neakasa_gyj_selfkoc_ytb/tk/ins`: Garment steamer content performance

### Other Key Tables
- `kol_videos`: KOL video performance data
- `viral_video`: Viral video analytics
- `search_insights_summary`: SEO keyword performance
- `domain_overview`: Domain-level metrics

## Claude AI Interaction Rules

### 1. Language Rules

- **Communication Language**: Use Chinese for all dialogue and communication with users
- **Code Language**: All code generation must use English, including comments, variable names, function names, etc.
- **CRITICAL RULE**: Code generation MUST be 100% in English. NO Chinese characters in code! Everything must be in English, including:
  - Variable names, function names, class names
  - Code comments
  - UI text, button labels, form labels
  - Error messages, notifications, alerts
  - Placeholder text
  - Any text displayed to users

### 2. Interaction Principles

- **Critical Thinking**: Always examine user input with a critical eye, carefully analyzing potential issues
- **Proactive Suggestions**: Point out potential problems users may have and provide innovative suggestions beyond the user's thinking framework
- **Constructive Feedback**: Directly point out unreasonable aspects in a professional and respectful manner, and provide specific improvement solutions

## 3. Video Preview Implementation Standards (Optimized Version)

### 3.1 Technical Architecture
```javascript
// Recommended video preview component architecture
VideoPreviewCard
├── VideoThumbnail (default display)
├── VideoPlayer (load on demand)
├── PlatformAdapter (platform adapter)
└── LoadingState (loading state)
```

### 3.2 Platform Adaptation Strategy

#### YouTube
- **Embeddable**: Use YouTube IFrame API
- **Landscape videos**: 16:9 standard container
- **Shorts**: 9:16 portrait container
```javascript
// YouTube embed example
<iframe src="https://www.youtube.com/embed/VIDEO_ID" />
```

#### TikTok
- **Limitation**: Direct embed playback not supported
- **Solutions**:
  1. Display video cover + TikTok logo
  2. Click to redirect to TikTok website
  3. Or use TikTok Embed API (display only, not playable)

#### Instagram
- **Limitation**: Strict embedding restrictions
- **Solutions**:
  1. Use Instagram oEmbed API for preview
  2. Display static preview + play button
  3. Click to open in modal

### 3.3 Video Container Standard Sizes

```css
/* Landscape video container (16:9) */
.video-container-landscape {
  aspect-ratio: 16/9;
  max-width: 100%;
  height: auto;
}

/* Portrait video container (9:16) */
.video-container-portrait {
  aspect-ratio: 9/16;
  max-height: 500px;
  width: auto;
}

/* Responsive grid layout */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
```

### 3.4 Performance Optimization Strategies

#### 1. Virtual Scrolling Implementation
```javascript
// Using react-window or react-virtualized
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={videos.length}
  itemSize={300}
  width="100%"
>
  {({ index, style }) => (
    <VideoCard video={videos[index]} style={style} />
  )}
</FixedSizeList>
```

#### 2. Intersection Observer Lazy Loading
```javascript
// Video lazy loading Hook
const useVideoLazyLoad = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
};
```

#### 3. Preloading Strategy
- First screen videos: Load thumbnails immediately
- Second screen videos: Delay load by 1 second
- Remaining videos: Load when scrolled into view

### 3.5 Error Handling and Fallback Solutions

1. **Video Load Failure**
   - Display default placeholder image
   - Provide retry button
   - Log errors

2. **Platform API Limitations**
   - Implement request throttling
   - Cache video metadata
   - Provide offline preview mode

3. **CORS Issue Handling**
   - Use proxy server
   - Implement CORS-friendly API gateway
   - Backup CDN solution

### 3.6 User Experience Optimization

1. **Loading States**
   - Skeleton screen display
   - Progress bar indication
   - Smooth transition animations

2. **Interactive Feedback**
   - Show play button on hover
   - Immediate response on click
   - Display spinner while loading

3. **Multi-device Adaptation**
   - Mobile: Click for fullscreen playback
   - Tablet: Adaptive layout
   - Desktop: Hover preview

### 3.7 Implementation Priority

1. **Phase 1**: YouTube embed playback (simplest)
2. **Phase 2**: Video thumbnails + modal player
3. **Phase 3**: Virtual scrolling + lazy loading
4. **Phase 4**: Multi-platform adaptation + advanced features

### 3.8 TikTok Style Video Card Implementation

#### Component Architecture
```typescript
// TikTok video card component structure
interface TikTokVideoCardProps {
  video: {
    id: string;
    url: string;
    thumbnail: string;
    creator: {
      username: string;
      avatar: string;
      verified: boolean;
    };
    hashtags: string[];
    timestamp: Date;
    stats: {
      likes: number;
      comments: number;
      shares: number;
      saves: number;
    };
  };
}
```

#### Key Features Implementation

##### 1. Video Player with Thumbnail
```typescript
const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowThumbnail(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="video-container" onClick={togglePlay}>
      {showThumbnail && (
        <img src={video.thumbnail} alt="Video thumbnail" className="thumbnail" />
      )}
      <video
        ref={videoRef}
        src={video.url}
        className={`video-player ${!showThumbnail ? 'visible' : 'hidden'}`}
        loop
        playsInline
        muted
      />
      {!isPlaying && <PlayButton />}
    </div>
  );
};
```

##### 2. Expandable Hashtags
```typescript
const HashtagSection: React.FC<{ hashtags: string[] }> = ({ hashtags }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = 3;
  
  const displayedHashtags = expanded ? hashtags : hashtags.slice(0, visibleCount);
  const hasMore = hashtags.length > visibleCount;

  return (
    <div className="hashtag-container">
      {displayedHashtags.map((tag, index) => (
        <a key={index} href={`#${tag}`} className="hashtag">
          #{tag}
        </a>
      ))}
      {hasMore && !expanded && (
        <button onClick={() => setExpanded(true)} className="show-more">
          ... more
        </button>
      )}
    </div>
  );
};
```

##### 3. Collection System with Zustand
```typescript
// Store for video collections
interface CollectionStore {
  collections: Collection[];
  addCollection: (name: string) => void;
  saveToCollection: (videoId: string, collectionId: string) => void;
  removeFromCollection: (videoId: string, collectionId: string) => void;
}

const useCollectionStore = create<CollectionStore>()(
  persist(
    (set) => ({
      collections: [],
      addCollection: (name) =>
        set((state) => ({
          collections: [
            ...state.collections,
            { id: Date.now().toString(), name, videos: [] }
          ]
        })),
      saveToCollection: (videoId, collectionId) =>
        set((state) => ({
          collections: state.collections.map(col =>
            col.id === collectionId
              ? { ...col, videos: [...col.videos, videoId] }
              : col
          )
        })),
      removeFromCollection: (videoId, collectionId) =>
        set((state) => ({
          collections: state.collections.map(col =>
            col.id === collectionId
              ? { ...col, videos: col.videos.filter(id => id !== videoId) }
              : col
          )
        }))
    }),
    {
      name: 'video-collections'
    }
  )
);
```

##### 4. Responsive Layout
```css
/* TikTok-style video card responsive design */
.video-card {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 9/16;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

@media (max-width: 768px) {
  .video-card {
    max-width: 100%;
    height: 100vh;
    border-radius: 0;
  }
}

/* Touch gesture support */
.video-container {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
```

##### 5. Performance Optimizations

###### Lazy Loading with Intersection Observer
```typescript
const useLazyLoad = (threshold = 0.5) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
```

###### Memory Management
```typescript
// Pause and release video resources when not in viewport
const useVideoMemoryOptimization = (videoRef: RefObject<HTMLVideoElement>) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          video.src = ''; // Release memory
        }
      },
      { threshold: 0 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef]);
};
```

##### 6. Download Functionality
```typescript
const downloadVideo = async (videoUrl: string, filename: string) => {
  try {
    // Use proxy server to handle CORS
    const proxyUrl = `/api/proxy/download?url=${encodeURIComponent(videoUrl)}`;
    const response = await fetch(proxyUrl);
    const blob = await response.blob();
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback: Open video in new tab
    window.open(videoUrl, '_blank');
  }
};
```

##### 7. Accessibility Features
```typescript
// Accessible video controls
<div
  role="button"
  tabIndex={0}
  aria-label={isPlaying ? 'Pause video' : 'Play video'}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePlay();
    }
  }}
>
  {/* Video content */}
</div>
```

#### Testing Strategy
```typescript
// Example test for video playback
describe('VideoCard', () => {
  it('should toggle play/pause on click', async () => {
    const { getByRole } = render(<VideoCard video={mockVideo} />);
    const playButton = getByRole('button', { name: /play video/i });
    
    fireEvent.click(playButton);
    await waitFor(() => {
      expect(playButton).toHaveAttribute('aria-label', 'Pause video');
    });
    
    fireEvent.click(playButton);
    await waitFor(() => {
      expect(playButton).toHaveAttribute('aria-label', 'Play video');
    });
  });
});
```

## 8. Sub-agents Application Guide

### 8.1 Sub-agent Architecture Pattern

#### When to Use Sub-agents
1. **Complex Search Tasks**: Need to find specific patterns or related code in large codebases
2. **Multi-file Refactoring**: Need to modify multiple related files simultaneously
3. **Exploratory Analysis**: Uncertain about specific implementation location, need broad search
4. **Parallel Task Processing**: Multiple subtasks that can be executed independently

#### Sub-agent Usage Principles
```typescript
// Sub-agent task template
const subAgentTask = {
  description: "Brief clear task description (3-5 words)",
  prompt: `
    Specific task instructions:
    1. Clear objectives and expected results
    2. Search scope and constraints
    3. Specific information to return
    4. Priority and time limits
  `,
  parallel: true, // Whether can be executed in parallel
  timeout: 60000  // Timeout duration
};
```

### 8.2 Sub-agent Best Practices

#### 1. Code Search and Analysis
```javascript
// Example: Find all video-related components
const videoSearchAgent = {
  description: "Find video components",
  prompt: `
    Search for all video-related components and features in the project:
    1. Find files containing 'video', 'player', 'preview'
    2. Analyze all usage locations of VideoPreview component
    3. Identify video data processing flow
    4. List all video-related API endpoints
    
    Return format:
    - File path list
    - Component dependency relationships
    - Data flow diagram
    - Improvement suggestions
  `
};
```

#### 2. Batch Refactoring Tasks
```javascript
// Example: Upgrade component library
const refactorAgent = {
  description: "Upgrade Ant Design",
  prompt: `
    Upgrade Ant Design v4 to v5 in the project:
    1. Find all components using antd
    2. Identify breaking changes
    3. Generate migration plan
    4. Upgrade file by file
    
    Notes:
    - Maintain backward compatibility
    - Update test files first
    - Document all changes
  `
};
```

#### 3. Performance Optimization Analysis
```javascript
// Example: Performance bottleneck analysis
const performanceAgent = {
  description: "Analyze performance",
  prompt: `
    Analyze application performance bottlenecks:
    1. Find large components (>500 lines)
    2. Identify re-rendering issues
    3. Analyze bundle size
    4. Find unoptimized images/videos
    
    Generate optimization report including:
    - Problem severity ranking
    - Specific optimization suggestions
    - Expected performance improvements
    - Implementation priority
  `
};
```

### 8.3 Sub-agent Collaboration Patterns

#### Parallel Execution Pattern
```typescript
// Launch multiple sub-agents simultaneously
async function parallelAgents() {
  const agents = [
    { task: "Search user authentication code", scope: "/src/auth" },
    { task: "Analyze database models", scope: "/src/models" },
    { task: "Find API endpoints", scope: "/src/api" }
  ];
  
  // Parallel execution for efficiency
  const results = await Promise.all(
    agents.map(agent => executeSubAgent(agent))
  );
  
  return combineResults(results);
}
```

#### Sequential Execution Pattern
```typescript
// Sequential execution with dependencies
async function sequentialAgents() {
  // Step 1: Analyze existing architecture
  const architecture = await subAgent({
    task: "Analyze project architecture",
    output: "Architecture diagram and module list"
  });
  
  // Step 2: Based on architecture analysis results
  const issues = await subAgent({
    task: "Identify architecture issues",
    input: architecture,
    output: "Issue list and impact scope"
  });
  
  // Step 3: Generate improvement solutions
  const solutions = await subAgent({
    task: "Design solutions",
    input: issues,
    output: "Detailed implementation plan"
  });
  
  return { architecture, issues, solutions };
}
```

### 8.4 Real Application Scenarios

#### Scenario 1: New Feature Development
```yaml
Main Task: Add real-time chat feature
Sub-agent Division:
  - Agent1: Research existing messaging system
  - Agent2: Search WebSocket implementation
  - Agent3: Analyze user authentication integration
  - Agent4: Find chat components in UI library

Execution Flow:
  1. Execute all search tasks in parallel
  2. Synthesize analysis results
  3. Generate implementation plan
  4. Implement features step by step
```

#### Scenario 2: Performance Optimization
```yaml
Main Task: Optimize homepage loading performance
Sub-agent Division:
  - Agent1: Analyze current performance metrics
  - Agent2: Find large dependencies
  - Agent3: Identify rendering bottlenecks
  - Agent4: Search optimizable images/videos

Optimization Strategy:
  1. Collect all performance data
  2. Sort by impact level
  3. Create optimization plan
  4. Implement and verify each item
```

#### Scenario 3: Code Quality Improvement
```yaml
Main Task: Improve code quality
Sub-agent Division:
  - Agent1: ESLint error scanning
  - Agent2: Type safety checking
  - Agent3: Duplicate code detection
  - Agent4: Complexity analysis

Improvement Process:
  1. Comprehensive codebase scan
  2. Generate quality report
  3. Auto-fix simple issues
  4. List issues requiring manual handling
```

### 8.5 Sub-agent Usage Tips

#### 1. Task Splitting Principles
- **Single Responsibility**: Each sub-agent handles one clear task
- **Measurable**: Task results must be verifiable
- **Time-bound**: Set reasonable timeout periods
- **Result Standards**: Clear output format

#### 2. Prompt Optimization
```typescript
// Effective sub-agent prompt template
const effectivePrompt = `
Task Objective: [Specific clear objective]

Search Scope:
- Include paths: [Specific paths]
- Exclude paths: [Paths to exclude]
- File types: [.ts, .tsx, .js, .jsx]

Expected Output:
1. [Specific output item 1]
2. [Specific output item 2]
3. [Specific output item 3]

Constraints:
- Time limit: [Complete within X minutes]
- Priority: [Critical path first]
- Depth limit: [Maximum X levels of recursion]

Notes:
- [Special case handling]
- [Common pitfall avoidance]
`;
```

#### 3. Result Integration Strategies
- **Deduplication**: Multiple agents may return duplicate information
- **Conflict Resolution**: Different agent results may conflict
- **Priority Sorting**: Organize results by importance
- **Format Unification**: Ensure consistent output format

### 8.6 Advanced Application Patterns

#### Intelligent Task Distribution
```typescript
class IntelligentTaskDistributor {
  async distribute(mainTask: string) {
    // 1. Analyze task complexity
    const complexity = await this.analyzeComplexity(mainTask);
    
    // 2. Determine number of sub-agents based on complexity
    const agentCount = this.calculateAgentCount(complexity);
    
    // 3. Intelligently split tasks
    const subTasks = await this.splitTask(mainTask, agentCount);
    
    // 4. Allocate and execute
    return await this.executeSubTasks(subTasks);
  }
}
```

#### Adaptive Execution Strategy
```typescript
// Select execution strategy based on task characteristics
function selectExecutionStrategy(task: Task) {
  if (task.dependencies.length === 0) {
    return 'parallel';  // No dependencies, parallel execution
  } else if (task.complexity > 8) {
    return 'hierarchical';  // Complex task, hierarchical execution
  } else if (task.urgency === 'high') {
    return 'fast-track';  // Urgent task, fast track
  } else {
    return 'sequential';  // Default sequential execution
  }
}
```

## Project Status and Implementation Progress

### Current Implementation Status (As of June 2025)

#### ✅ Completed Modules

1. **Overview Dashboard**
   - Full implementation with real Neakasa market data
   - KOL statistics, search insights, A/B testing results
   - Private domain marketing summary
   - All text converted to English

2. **Content Insight Module**
   - ✅ **Content Insight Overview Dashboard**: NEW - Aggregates data from all four analysis modules
   - ✅ **Consumer Voice Analysis**: Complete with sentiment analysis, competitor comparison
   - ✅ **Search Insights**: Keyword trends, CPC analysis, geographic distribution
   - ✅ **Viral Video Insights**: Video preview functionality, platform metrics
   - ✅ **Viral Factor Analysis**: Content success factors, ROI analysis

3. **Content Management**
   - Content library with grid/list views
   - Content calendar implementation
   - Performance dashboard with ECharts
   - Workflow management with kanban board

4. **Content for KOL**
   - KOL Overview with 189 KOLs display
   - Virtual scrolling for performance
   - Filtering and search capabilities
   - Batch management features

5. **Infrastructure**
   - ✅ **Code Quality**: Zero ESLint errors/warnings (fixed 52 issues)
   - ✅ **TypeScript**: 100% strict mode compliance, no `any` types
   - ✅ **Testing**: All tests follow Testing Library best practices
   - ✅ **Formatting**: Consistent Prettier formatting across codebase
   - ✅ **React Query**: Integrated with QueryClientProvider for data fetching
   - ✅ **TikTok Video Cards**: Complete implementation guide in section 3.8
   - Tailwind CSS design consistency
   - Video preview components for all platforms
   - Mock data services with realistic data

#### ⚠️ Partially Implemented

1. **Content Testing Module**
   - Basic structure in place
   - Needs full A/B testing workflow implementation
   - Requires performance tracking integration

2. **Content for Ads**
   - Component structure created
   - Needs real ad platform integration
   - Requires performance metrics dashboard

3. **Content for Private**
   - Channel components created (WhatsApp, EDM, etc.)
   - Needs data integration and analytics

#### ❌ Not Yet Implemented

1. **Backend Integration**
   - Currently using mock data
   - Needs real API endpoints
   - Database persistence required

2. **Authentication System**
   - Currently demo-only (any credentials work)
   - Needs proper auth service integration
   - User role management

3. **Real-time Features**
   - WebSocket for live updates
   - Real-time notifications
   - Collaborative features

### Recent Improvements (December 2024)

1. **Code Quality Overhaul**
   - Fixed all 52 ESLint errors and warnings
   - Removed all TypeScript `any` types
   - Fixed React Hook dependency issues
   - Cleaned up unused imports and variables
   - Improved test reliability with Testing Library best practices

2. **Type Safety Enhancements**
   - Proper TypeScript interfaces for all components
   - Strict mode compliance throughout
   - Better type inference and safety

3. **New Features Added**
   - **Self-KOC Analysis Module**: Track and analyze self-operated content accounts
   - **Content Insight Overview Dashboard**: Comprehensive view aggregating all analysis data
   - **React Query Integration**: Fixed QueryClientProvider setup in App.tsx
   - **TikTok Video Implementation Guide**: Added complete technical documentation

4. **Testing Improvements**
   - Fixed all Testing Library violations
   - Removed direct DOM access in tests
   - Improved test performance and reliability

### Immediate Priorities

1. **Complete Content Testing Module**
   - Implement full A/B testing workflow
   - Add test result analytics
   - Create test templates

2. **Enhance Content for Ads**
   - Add campaign management
   - Implement budget tracking
   - Create ROI dashboards

3. **Backend API Integration**
   - Design RESTful API endpoints
   - Implement authentication service
   - Add data persistence layer

### Future Enhancements

1. **API Integration**
   - Replace mock data with real APIs
   - Implement data persistence
   - Add caching strategies

2. **Performance Optimization**
   - Implement code splitting for all routes
   - Optimize bundle size
   - Add service workers for offline support

3. **Advanced Features**
   - AI-powered content recommendations
   - Predictive analytics
   - Multi-language support (UI)

### Known Issues

1. **Platform Limitations**: TikTok videos cannot be embedded directly (use preview + link approach)
2. **Mock Data**: All data is currently mocked, not persistent
3. **Authentication**: Demo-only implementation (accepts any credentials)
4. **Navigation Issues**: Self-KOC Analysis is currently placed under Content Testing but should be under Content Insight

### Development Guidelines for New Features

1. **Always use English in code** - No Chinese characters in any code files
2. **Follow TypeScript strict mode** - Avoid `any` types
3. **Use established patterns** - Services → React Query → Components
4. **Maintain design consistency** - `rounded-2xl` and `shadow-sm` for cards
5. **Test with mock data first** - Create realistic mock data before API integration
6. **Use sub-agents for complex tasks** - Leverage parallel processing for efficiency