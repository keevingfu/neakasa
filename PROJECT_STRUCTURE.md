# Neakasa 项目目录结构

```
neakasa/
├── CLAUDE.md                    # 项目开发指南
├── PROJECT_GUIDE.md             # 项目说明文档
├── README.md                    # 项目自述文件
├── package.json                 # 项目依赖配置
├── package-lock.json            # 依赖锁定文件
├── tsconfig.json                # TypeScript配置
├── tailwind.config.js           # Tailwind CSS配置
├── postcss.config.js            # PostCSS配置
├── start-project.sh             # 项目启动脚本
├── test-search-insights.md      # 搜索洞察测试文档
├── testSemrushDirect.js         # Semrush API测试脚本
│
├── data/                        # 数据文件目录
│   ├── neakasa.db              # SQLite数据库
│   ├── kol_videos.csv          # KOL视频数据
│   ├── video_analysis.csv      # 视频分析数据
│   ├── videos_cube.csv         # 视频立方数据
│   ├── viral_video.csv         # 病毒视频数据
│   ├── neakasa_catbox_selfkoc_ins.csv   # 猫砂盆Instagram数据
│   ├── neakasa_catbox_selfkoc_tk.csv    # 猫砂盆TikTok数据
│   ├── neakasa_catbox_selfkoc_ytb.csv   # 猫砂盆YouTube数据
│   ├── neakasa_gyj_selfkoc_ins.csv      # 宠物梳Instagram数据
│   ├── neakasa_gyj_selfkoc_tk.csv       # 宠物梳TikTok数据
│   ├── neakasa_gyj_selfkoc_ytb.csv      # 宠物梳YouTube数据
│   └── neakasa_selfkoc_accounts.csv     # KOC账号数据
│
├── public/                      # 公共资源目录
│   └── index.html              # HTML入口文件
│
└── src/                        # 源代码目录
    ├── index.tsx               # React应用入口
    ├── index.css               # 全局样式
    ├── App.tsx                 # 主应用组件
    ├── AuthWrapper.tsx         # 认证包装组件
    ├── TestApp.tsx             # 测试应用组件
    ├── navigation-config.ts    # 导航配置
    │
    ├── components/             # 组件目录
    │   ├── content-insight/    # 内容洞察模块
    │   │   ├── ContentInsight.tsx          # 内容洞察主页
    │   │   ├── SearchInsights.tsx          # 搜索洞察
    │   │   ├── ViralVideoInsights.tsx      # 病毒视频洞察
    │   │   ├── ViralFactorAnalysis.tsx     # 病毒因子分析
    │   │   └── ConsumerVoiceAnalysis.tsx   # 消费者声音分析
    │   │
    │   ├── content-management/ # 内容管理模块
    │   │   ├── ContentAds.tsx             # 广告内容管理
    │   │   ├── ContentKOL.tsx             # KOL内容管理
    │   │   ├── ContentPrivate.tsx         # 私域内容管理
    │   │   └── ContentTesting.tsx         # 内容测试管理
    │   │
    │   ├── content-testing/    # 内容测试模块
    │   │   ├── ContentTest.tsx                        # 内容测试主页
    │   │   ├── ContentIdeationPlanning.tsx           # 内容创意规划
    │   │   ├── ContentTestingExecution.tsx           # 内容测试执行
    │   │   ├── PerformanceAnalysisOptimization.tsx   # 性能分析优化
    │   │   └── ContentRefinementIteration.tsx        # 内容优化迭代
    │   │
    │   ├── content-for-ads/    # 广告内容模块
    │   │   ├── ContentEmpowermentAds.tsx      # 广告内容赋能
    │   │   ├── AudienceInsightsBehavior.tsx   # 受众洞察行为
    │   │   ├── ContentPerformanceConversion.tsx # 内容效果转化
    │   │   ├── ContentDrivenOptimization.tsx   # 内容驱动优化
    │   │   └── AdDistributionStrategy.tsx      # 广告分发策略
    │   │
    │   ├── content-for-kol/    # KOL内容模块
    │   │   ├── KOLDashboard.tsx                   # KOL仪表板
    │   │   ├── KOLOverview.tsx                    # KOL概览
    │   │   ├── KOLContentReachAnalysis.tsx        # KOL内容触达分析
    │   │   └── KOLConversionRevenueAnalysis.tsx   # KOL转化收益分析
    │   │
    │   ├── content-for-private/ # 私域内容模块
    │   │   ├── ContentEmpowermentPrivate.tsx  # 私域内容赋能
    │   │   ├── ShopifyAnalytics.tsx          # Shopify分析
    │   │   ├── EDMAnalytics.tsx              # EDM分析
    │   │   ├── WhatsAppAnalytics.tsx         # WhatsApp分析
    │   │   ├── LinkedInAnalytics.tsx         # LinkedIn分析
    │   │   └── OfflineStoresAnalytics.tsx    # 线下门店分析
    │   │
    │   ├── Overview/           # 概览模块
    │   │   └── OverviewCenter.tsx         # 概览中心
    │   │
    │   ├── Settings/           # 设置模块
    │   │   └── SystemSettings.tsx         # 系统设置
    │   │
    │   ├── layout/             # 布局组件
    │   │   ├── MainLayout.tsx             # 主布局
    │   │   └── Sidebar.tsx                # 侧边栏
    │   │
    │   ├── login/              # 登录模块
    │   │   └── LoginPage.tsx              # 登录页面
    │   │
    │   └── SearchInsightsDemo.md         # 搜索洞察演示文档
    │
    ├── services/               # 服务层
    │   ├── semrushApi.ts              # Semrush API服务
    │   ├── mockSemrushData.ts         # Semrush模拟数据
    │   ├── domainMockData.ts          # 域名模拟数据
    │   └── testSemrushApi.ts          # API测试服务
    │
    ├── hooks/                  # React Hooks
    │   └── useSemrushData.ts          # Semrush数据Hook
    │
    └── db/                     # 数据库相关
        ├── migrations/                # 数据库迁移
        │   └── create_search_insights_tables.sql
        └── runMigration.js            # 迁移运行脚本
```

## 模块说明

### 1. content-insight（内容洞察）
- 搜索洞察：集成Semrush API，分析关键词和竞争对手
- 病毒视频洞察：分析病毒视频特征
- 病毒因子分析：提取病毒传播要素
- 消费者声音分析：分析用户反馈和评论

### 2. content-management（内容管理）
- 管理不同渠道的内容资产
- 支持广告、KOL、私域等多渠道管理

### 3. content-testing（内容测试）
- 内容创意规划和测试执行
- 性能分析和优化迭代

### 4. content-for-ads（广告内容）
- 广告内容创作和优化
- 受众洞察和转化分析

### 5. content-for-kol（KOL内容）
- KOL合作管理和效果分析
- 内容触达和转化收益分析

### 6. content-for-private（私域内容）
- 多平台私域内容管理
- 包括Shopify、EDM、WhatsApp等渠道

## 技术栈
- React 18 + TypeScript
- Tailwind CSS（样式）
- SQLite（数据存储）
- Semrush API（SEO数据）
- Recharts（数据可视化）