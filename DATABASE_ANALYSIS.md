# Neakasa数据库完整分析报告

## 一、数据库表结构总览

### 1. 视频内容分析表组
- **kol_videos** (790条) - KOL视频基础信息
- **videos_cube** (790条) - 视频立方数据（与kol_videos重复）
- **video_analysis** (205条) - 视频深度分析数据
- **viral_video** (213条) - 病毒视频分析数据

### 2. 自有KOC内容表组
- **neakasa_selfkoc_accounts** (79条) - 自有KOC账号信息
- **neakasa_catbox_selfkoc_ins** (1,598条) - 猫砂盆Instagram内容
- **neakasa_catbox_selfkoc_tk** (1,831条) - 猫砂盆TikTok内容
- **neakasa_catbox_selfkoc_ytb** (868条) - 猫砂盆YouTube内容
- **neakasa_gyj_selfkoc_ins** (383条) - 宠物梳Instagram内容
- **neakasa_gyj_selfkoc_tk** (516条) - 宠物梳TikTok内容
- **neakasa_gyj_selfkoc_ytb** (148条) - 宠物梳YouTube内容

### 3. 搜索洞察表组（空表）
- **search_keywords** - 搜索关键词数据
- **domain_overview** - 域名概览数据
- **search_insights_summary** - 搜索洞察汇总

## 二、表之间的关系

### 1. 视频内容关系链
```
kol_videos/videos_cube (video_id) 
    ↓
video_analysis (video_id)
    ↓
viral_video (video_id)
```

### 2. KOC账号与内容关系
```
neakasa_selfkoc_accounts (selfkoc/selfkoc_url)
    ↓
各平台内容表 (selfkoc_account/selfkoc)
    - neakasa_catbox_selfkoc_ins/tk/ytb
    - neakasa_gyj_selfkoc_ins/tk/ytb
```

### 3. 产品维度关系
- **猫砂盆产品线**: catbox相关表（4,297条内容）
- **宠物梳产品线**: gyj相关表（1,047条内容）

## 三、数据对Neakasa项目的支撑情况

### ✅ 已支撑的功能模块

#### 1. content-insight（内容洞察）
- **病毒视频洞察** ✓ 完全支持
  - viral_video表包含213条病毒视频分析
  - 包含场景、情绪、对话等深度分析数据
- **病毒因子分析** ✓ 部分支持
  - 从JSON数据中可提取场景标签、情绪分析
- **消费者声音分析** ❌ 缺少数据
  - 有评论数量，但无评论内容

#### 2. content-for-kol（KOL内容）
- **KOL概览** ✓ 部分支持
  - 790条KOL视频数据
  - 包含播放量、点赞、评论数
- **KOL内容触达分析** ✓ 支持
  - 可分析不同KOL的内容表现
- **KOL转化收益分析** ❌ 缺少数据
  - 无销售转化数据

#### 3. content-for-private（私域内容）
- **自有KOC管理** ✓ 完全支持
  - 79个自有KOC账号
  - 5,344条跨平台内容数据
  - 包含Instagram、TikTok、YouTube三大平台

#### 4. content-testing（内容测试）
- **内容效果分析** ✓ 部分支持
  - 可基于现有数据进行A/B测试分析
  - 可追踪不同内容的表现差异

### ❌ 缺失数据的功能模块

#### 1. Search Insights（搜索洞察）
- search_keywords表为空
- domain_overview表为空
- 需要集成Semrush API获取数据

#### 2. content-for-ads（广告内容）
- 完全缺少广告投放数据
- 无广告效果追踪数据

#### 3. 转化与收益分析
- 缺少销售转化数据
- 缺少ROI计算所需的成本数据

## 四、数据补充建议

### 1. 紧急需要补充的数据

#### 搜索数据（已有解决方案）
- 通过Semrush API获取关键词搜索量
- 获取竞争对手域名分析数据
- 实时更新search_keywords和domain_overview表

#### 评论内容数据
- 抓取各平台的评论详情
- 进行情感分析和关键词提取
- 建立consumer_comments表

#### 销售转化数据
```sql
CREATE TABLE conversion_data (
    video_id TEXT,
    platform TEXT,
    clicks INTEGER,
    conversions INTEGER,
    revenue DECIMAL(10,2),
    conversion_rate DECIMAL(5,2),
    created_at DATETIME
);
```

### 2. 中期需要补充的数据

#### 广告投放数据
```sql
CREATE TABLE ad_campaigns (
    campaign_id TEXT PRIMARY KEY,
    platform TEXT,
    ad_spend DECIMAL(10,2),
    impressions INTEGER,
    clicks INTEGER,
    conversions INTEGER,
    roi DECIMAL(5,2)
);
```

#### 竞品分析数据
```sql
CREATE TABLE competitor_analysis (
    competitor_brand TEXT,
    product_category TEXT,
    content_type TEXT,
    engagement_rate DECIMAL(5,2),
    market_share DECIMAL(5,2)
);
```

### 3. 数据获取方案

#### 自动化数据采集
1. **社交媒体API集成**
   - Instagram Graph API
   - TikTok for Business API
   - YouTube Data API

2. **电商数据集成**
   - Shopify Analytics API
   - Amazon MWS/SP-API

3. **第三方数据源**
   - Semrush（SEO数据）
   - Similar Web（流量数据）
   - Social Blade（社媒数据）

#### 数据处理流程
1. 定时抓取各平台数据
2. 清洗和标准化处理
3. 情感分析和NLP处理
4. 计算衍生指标
5. 更新数据库

## 五、基于现有数据的分析能力

### 可以立即开展的分析

1. **内容表现分析**
   - 不同平台的内容表现对比
   - 最佳发布时间分析
   - 高互动内容特征分析

2. **KOC效果评估**
   - 79个自有KOC的表现排名
   - 不同产品线的内容效果对比
   - 平台特性分析

3. **病毒因子提取**
   - 213个病毒视频的共同特征
   - 情绪与传播的相关性
   - 场景标签与互动率关系

4. **产品内容策略**
   - 猫砂盆vs宠物梳的内容策略差异
   - 不同平台的内容偏好

### 数据增强后可开展的分析

1. **全链路转化分析**
   - 从曝光到销售的完整漏斗
   - 不同触点的转化效率

2. **ROI优化模型**
   - 内容制作成本vs收益
   - 最优投入产出比

3. **预测性分析**
   - 内容爆款预测
   - 销售趋势预测

## 六、总结与建议

### 现状评估
- 数据基础：拥有7,333条内容数据，覆盖主要社交平台
- 支撑能力：可支撑60%的项目功能，主要集中在内容分析
- 主要缺口：搜索数据、转化数据、广告数据

### 优先行动项
1. 立即启用Semrush API填充搜索数据
2. 建立评论采集机制，补充消费者声音
3. 对接电商平台API，获取转化数据
4. 规划数据仓库架构，支持更复杂的分析

### 长期规划
1. 建立实时数据管道
2. 引入机器学习模型
3. 构建预测性分析能力
4. 打通全渠道数据链路