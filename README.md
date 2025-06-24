# Neakasa Project

## **一、系统概述**

这是一套以"内容"为核心驱动的增长决策系统，通过统一的左侧导航栏框架，实现对各环节（内容洞察、内容测试、内容赋能KOL、内容赋能投流广告、内容赋能私域）的无缝联动与可视化管理，确保数据闭环与业务高效落地。

**核心能力**

1. **内容洞察** – 深度解构社媒爆款与用户声音
2. **内容测试** – 矩阵化 A/B 测试与性能优化
3. **内容赋能KOL** – 为KOL输送优质的种草及转化视频素材，实现快速品牌影响力的快速传播和内容效果放大及转化。
4. **内容赋能投流广告** – 为广告提供优质的投流广告短视频素材，实现内容快速放大及高效转化。
5. **内容赋能私域** – 短视频内容赋能私域（Shopify、Offline、WhatsApp、EDM、LinkedIn）的经营绩效
6. **总览 Dashboard** – 核心指标与跨模块汇总视图

---

## **二、导航栏统一框架**

* **Overview --总览**
* **content-insight--内容洞察**
* **content-testing--内容测试**
* **content-for-kol--内容赋能KOL**
* **content-for-ads--内容赋能广告**
* **content-for-private--内容赋能私域**

> **规范** ：

> * 所有页面皆在此左侧结构下完成加载与切换；
> * 导航项名称均为英文（如上所示），严禁出现中文；
> * 样式与"Content for Private"一致，采用 2xl 圆角卡片、轻量阴影、清晰层级与一致配色。

---

## **三、模块功能与标签页设计**

### **1. OverviewCenter.tsx （总览看板）**

**主题** ：Content-Powered Growth Overview

**板块划分** （每块均采用 ECharts 可视化组件）

1. **内容洞察汇总**
   * Views / Engagement / Completion / VOC Sentiment 趋势折线图

2. **测试优化对比**
   * A/B 胜率、CTR、Completion Rate 柱状对比

3. **KOL 赋能全景**
   * Follower Growth vs. GMV Contribution 散点图

4. **广告赋能绩效**
   * ROI 热力图 & 平台分布饼图

5. **私域赋能表现**
   * 私域渠道（Shopify、Offline、WhatsApp、EDM、LinkedIn）Performance 雷达图

### **2. ContentInsight.tsx （内容洞察）**

**副标题**
> Deeply decode viral success—let data drive content, precisely empower KOL & ads, build a traffic loop, and achieve ultimate conversions!

**标签页**
* **Viral Video Insights**
* **Consumer Voice Analysis**
* **Search Insights**
* **Viral Factor Analysis**

每页均增加 ECharts 图表，并实现 Top50 搜索＋预览（见要求④）。

### **3. ContentTest.tsx （内容测试）**

**副标题**

**标签页**
* Content Ideation & Planning
* Content Testing Execution
* Performance Analysis & Optimization
* Content Refinement & Iteration

每页采用 ECharts 可视化，Execution 页展示三平台 Top5 视频及内嵌播放器。

### **4. Content for KOL （内容赋能KOL）**

**副标题**
> Content empower influencers, leveraging quality content to unlock market value.

**标签页**
* Overview
* KOL Content & Reach Analysis
* KOL Conversion & Revenue Analysis

### **5. Content for Ads （内容赋能广告）**

**副标题**
> Turn content into a growth engine—precisely driving ad traffic and maximizing conversions from audience to revenue!

**标签页**
* Ad Distribution Strategy
* Content Performance & Conversion
* Audience Insights & Behavior
* Content-Driven Optimization

### **6. Content for Private （内容赋能Private）**

**副标题**
> Content Empowerment for Shopify, Offline Stores, WhatsApp, EDM, LinkedIn, Channel Partners, Customer Service, and Training

**标签页**
* Shopify
* Offline Stores
* WhatsApp
* EDM
* LinkedIn

---

## **四、关键指标定义**

| 模块         | 核心指标                                                        |
| ------------ | --------------------------------------------------------------- |
| 内容洞察     | Total Views、Engagement Rate、Completion Rate、VOC Sentiment    |
| 内容测试     | A/B Win Rate、CTR、Completion Rate、Optimization Success Rate   |
| 内容赋能KOL  | Follower Growth、Engagement Quality、GMV Conversion Rate、ROI   |
| 内容赋能广告 | ROI、Conversion Rate (CVR)、CTR、CPA                            |
| 内容赋能私域 | Impression、Click‐Through Rate、Conversion in Private Channels |
| 总览看板     | 各模块核心指标汇总、Trend Comparison、Cross‐Module Correlation |

---

## **五、系统设置**

* 数据源管理（社媒 API、Amazon、内部 BI）
* 用户与权限（角色分配、数据可见范围）
* 主题配置（配色、LOGO、标签项增删）
* 日志与监控（页面埋点、API 性能）

---

## **六、落地与实施建议**

1. **前端框架** ：React + TypeScript + ECharts + Tailwind
2. **组件化** ：所有模块均拆分为独立 `<Page>` 与 `<TabPane>`
3. **数据层** ：GraphQL 聚合多源指标，支持实时 & 历史查询
4. **权限控制** ：基于 JWT 与 RBAC，前后端联动鉴权
5. **迭代路线** ：
   * 第一阶段：搭建导航与 Overview，Content Insight 基础视图
   * 第二阶段：完善 Content Testing、KOL/Ads/Private 各页
   * 第三阶段：CreativeWorkspace & ScriptEditor 集成
   * 第四阶段：系统设置、性能优化、用户培训

---

## **七、快速开始**

### **安装依赖**

```bash
npm install
```

### **启动项目**

```bash
npm start
```

### **构建生产版本**

```bash
npm run build
```

### **运行测试**

```bash
npm test
```

---

通过上述设计，内容驱动增长的决策系统将覆盖从内容洞察、内容测试、内容赋能KOL、内容赋能广告到创意执行的全链路业务，帮助品牌精准决策，实现高效转化与持续增长。