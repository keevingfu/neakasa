import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  Search,
  Plus,
  Upload,
  Clock,
  TrendingUp,
  Users,
  Grid,
  List,
  FileText,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Share2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Badge } from '../ui/badge';

// Mock data for content library
const mockContentLibrary = [
  {
    id: 1,
    title: 'Summer Collection Launch Video',
    type: 'video',
    platform: ['YouTube', 'TikTok', 'Instagram'],
    status: 'published',
    performance: { views: 125000, engagement: 8.5, shares: 2300 },
    publishDate: '2024-06-15',
    thumbnail: 'https://picsum.photos/300/200?random=1',
    duration: '2:45',
    creator: 'Marketing Team',
    tags: ['summer', 'fashion', 'launch'],
  },
  {
    id: 2,
    title: 'Behind the Scenes - Product Design',
    type: 'video',
    platform: ['Instagram', 'TikTok'],
    status: 'scheduled',
    performance: { views: 0, engagement: 0, shares: 0 },
    publishDate: '2024-06-20',
    thumbnail: 'https://picsum.photos/300/200?random=2',
    duration: '1:30',
    creator: 'Design Team',
    tags: ['bts', 'design', 'process'],
  },
  {
    id: 3,
    title: 'Customer Success Story - Sarah M.',
    type: 'video',
    platform: ['YouTube'],
    status: 'draft',
    performance: { views: 0, engagement: 0, shares: 0 },
    publishDate: '2024-06-25',
    thumbnail: 'https://picsum.photos/300/200?random=3',
    duration: '3:20',
    creator: 'Content Team',
    tags: ['testimonial', 'success', 'customer'],
  },
  {
    id: 4,
    title: 'Product Photography Set A',
    type: 'image',
    platform: ['Instagram'],
    status: 'published',
    performance: { views: 45000, engagement: 12.3, shares: 890 },
    publishDate: '2024-06-10',
    thumbnail: 'https://picsum.photos/300/200?random=4',
    duration: null,
    creator: 'Photo Team',
    tags: ['product', 'photography', 'catalog'],
  },
  {
    id: 5,
    title: 'How-To Guide: Product Setup',
    type: 'video',
    platform: ['YouTube', 'TikTok'],
    status: 'published',
    performance: { views: 89000, engagement: 15.2, shares: 3400 },
    publishDate: '2024-06-05',
    thumbnail: 'https://picsum.photos/300/200?random=5',
    duration: '4:15',
    creator: 'Support Team',
    tags: ['tutorial', 'howto', 'setup'],
  },
];

// Mock calendar events
const mockCalendarEvents = [
  { date: '2024-06-15', title: 'Summer Collection Launch', type: 'campaign', platform: 'all' },
  { date: '2024-06-18', title: 'Instagram Story Series', type: 'content', platform: 'instagram' },
  { date: '2024-06-20', title: 'TikTok Challenge Start', type: 'campaign', platform: 'tiktok' },
  { date: '2024-06-22', title: 'YouTube Live Q&A', type: 'live', platform: 'youtube' },
  { date: '2024-06-25', title: 'Product Photography', type: 'content', platform: 'instagram' },
  { date: '2024-06-28', title: 'Monthly Performance Review', type: 'meeting', platform: 'all' },
];

const ContentManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<number | null>(null);

  // Performance overview chart options
  const performanceChartOption = {
    title: {
      text: 'Content Performance Overview',
      left: 'left',
      textStyle: { fontSize: 16, fontWeight: 600 },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['Views', 'Engagement Rate', 'Shares'],
      right: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: [
      {
        type: 'value',
        name: 'Views',
        position: 'left',
      },
      {
        type: 'value',
        name: 'Engagement %',
        position: 'right',
      },
    ],
    series: [
      {
        name: 'Views',
        type: 'bar',
        data: [32000, 45000, 38000, 52000, 48000, 62000, 55000],
        itemStyle: { color: '#3b82f6' },
      },
      {
        name: 'Engagement Rate',
        type: 'line',
        yAxisIndex: 1,
        data: [8.5, 9.2, 7.8, 10.5, 9.8, 12.3, 11.2],
        itemStyle: { color: '#10b981' },
      },
      {
        name: 'Shares',
        type: 'bar',
        data: [1200, 1800, 1500, 2100, 1900, 2500, 2200],
        itemStyle: { color: '#8b5cf6' },
      },
    ],
  };

  // Platform distribution chart
  const platformDistributionOption = {
    title: {
      text: 'Content by Platform',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600 },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
    },
    series: [
      {
        name: 'Platform',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
          },
        },
        labelLine: { show: false },
        data: [
          { value: 45, name: 'YouTube', itemStyle: { color: '#ef4444' } },
          { value: 35, name: 'TikTok', itemStyle: { color: '#000000' } },
          { value: 30, name: 'Instagram', itemStyle: { color: '#e11d48' } },
          { value: 15, name: 'Twitter', itemStyle: { color: '#3b82f6' } },
        ],
      },
    ],
  };

  // Content type distribution
  const contentTypeOption = {
    title: {
      text: 'Content Types',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600 },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '60',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: ['Videos', 'Images', 'Stories', 'Reels', 'Posts'],
    },
    series: [
      {
        type: 'bar',
        data: [120, 80, 60, 90, 50],
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
            return colors[params.dataIndex];
          },
        },
      },
    ],
  };

  // Filter content based on search and filters
  const filteredContent = mockContentLibrary.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPlatform =
      selectedPlatform === 'all' || content.platform.includes(selectedPlatform);
    const matchesStatus = selectedStatus === 'all' || content.status === selectedStatus;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  // Calendar component
  const CalendarView = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Content Calendar</h3>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">June 2024</span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[80px] p-2 border rounded-2xl ${
                day ? 'hover:bg-gray-50' : ''
              } ${day === today.getDate() ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
            >
              {day && (
                <>
                  <div className="text-sm font-medium mb-1">{day}</div>
                  {mockCalendarEvents
                    .filter((event) => parseInt(event.date.split('-')[2]) === day)
                    .slice(0, 2)
                    .map((event, i) => (
                      <div
                        key={i}
                        className={`text-xs p-1 mb-1 rounded truncate ${
                          event.type === 'campaign'
                            ? 'bg-blue-100 text-blue-700'
                            : event.type === 'content'
                              ? 'bg-green-100 text-green-700'
                              : event.type === 'live'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Content Management</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your content across all platforms
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Create Content
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Content</p>
                <p className="text-2xl font-bold mt-1">1,234</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold mt-1">856</p>
                <p className="text-xs text-blue-600 mt-1">69% of total</p>
              </div>
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold mt-1">234</p>
                <p className="text-xs text-orange-600 mt-1">Next: 2 hours</p>
              </div>
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Engagement</p>
                <p className="text-2xl font-bold mt-1">8.7%</p>
                <p className="text-xs text-green-600 mt-1">+2.3% increase</p>
              </div>
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <Tabs defaultValue="library" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 rounded-2xl">
          <TabsTrigger value="library" className="data-[state=active]:bg-white rounded">
            Content Library
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-white rounded">
            Calendar
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white rounded">
            Performance
          </TabsTrigger>
          <TabsTrigger value="workflow" className="data-[state=active]:bg-white rounded">
            Workflow
          </TabsTrigger>
        </TabsList>

        {/* Content Library Tab */}
        <TabsContent value="library" className="space-y-4">
          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search content by title, tags..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <select
                className="px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="all">All Platforms</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
              </select>

              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid/List */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-4'
            }
          >
            {filteredContent.map((content) => (
              <Card
                key={content.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedContent(content.id)}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative">
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-full h-48 object-cover"
                      />
                      {content.duration && (
                        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {content.duration}
                        </span>
                      )}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {content.platform.map((platform) => (
                          <Badge key={platform} variant="secondary" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{content.title}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>{content.creator}</span>
                        <span>{content.publishDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            content.status === 'published'
                              ? 'default'
                              : content.status === 'scheduled'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {content.status}
                        </Badge>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {content.performance.views > 0
                              ? `${(content.performance.views / 1000).toFixed(1)}k`
                              : '0'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {content.performance.engagement}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-24 h-16 object-cover rounded-2xl"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold mb-1">{content.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{content.creator}</span>
                              <span>{content.publishDate}</span>
                              <div className="flex gap-1">
                                {content.platform.map((platform) => (
                                  <Badge key={platform} variant="secondary" className="text-xs">
                                    {platform}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant={
                                content.status === 'published'
                                  ? 'default'
                                  : content.status === 'scheduled'
                                    ? 'secondary'
                                    : 'outline'
                              }
                            >
                              {content.status}
                            </Badge>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {content.performance.views > 0
                                  ? `${(content.performance.views / 1000).toFixed(1)}k`
                                  : '0'}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {content.performance.engagement}%
                              </span>
                              <span className="flex items-center gap-1">
                                <Share2 className="w-4 h-4" />
                                {content.performance.shares > 0
                                  ? `${(content.performance.shares / 1000).toFixed(1)}k`
                                  : '0'}
                              </span>
                            </div>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Batch Operations */}
          {selectedContent && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-sm flex items-center gap-4">
              <span className="text-sm">1 item selected</span>
              <button className="text-sm hover:text-blue-300">Edit</button>
              <button className="text-sm hover:text-blue-300">Duplicate</button>
              <button className="text-sm hover:text-blue-300">Schedule</button>
              <button className="text-sm hover:text-red-300">Delete</button>
              <button
                className="ml-4 text-gray-400 hover:text-white"
                onClick={() => setSelectedContent(null)}
              >
                ✕
              </button>
            </div>
          )}
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <ReactECharts option={performanceChartOption} style={{ height: '300px' }} />
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <ReactECharts option={platformDistributionOption} style={{ height: '300px' }} />
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <ReactECharts option={contentTypeOption} style={{ height: '300px' }} />
            </CardContent>
          </Card>

          {/* Top Performing Content */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Based on engagement and reach in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockContentLibrary
                  .filter((c) => c.status === 'published')
                  .sort((a, b) => b.performance.engagement - a.performance.engagement)
                  .slice(0, 5)
                  .map((content, index) => (
                    <div
                      key={content.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                    >
                      <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{content.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {content.platform.map((platform) => (
                            <Badge key={platform} variant="secondary" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {content.performance.engagement}% engagement
                        </p>
                        <p className="text-xs text-gray-600">
                          {(content.performance.views / 1000).toFixed(1)}k views
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workflow Tab */}
        <TabsContent value="workflow" className="space-y-6">
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Content Creation Workflow</CardTitle>
              <CardDescription>Manage your content creation pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center justify-between">
                    Ideas
                    <Badge variant="secondary">12</Badge>
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm font-medium">Product Tutorial Series</p>
                      <p className="text-xs text-gray-600 mt-1">YouTube • Added 2 days ago</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm font-medium">Customer Success Stories</p>
                      <p className="text-xs text-gray-600 mt-1">All platforms • Added 3 days ago</p>
                    </div>
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 mt-2">
                      + Add idea
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center justify-between">
                    In Production
                    <Badge>5</Badge>
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="text-sm font-medium">Summer Collection BTS</p>
                      <p className="text-xs text-gray-600 mt-1">Instagram • 60% complete</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="text-sm font-medium">How-To: Advanced Features</p>
                      <p className="text-xs text-gray-600 mt-1">YouTube • 30% complete</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: '30%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-2xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center justify-between">
                    Review
                    <Badge variant="secondary">3</Badge>
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border border-orange-200">
                      <p className="text-sm font-medium">Q2 Highlights Video</p>
                      <p className="text-xs text-gray-600 mt-1">YouTube • Awaiting approval</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-orange-200">
                      <p className="text-sm font-medium">Product Photography Set B</p>
                      <p className="text-xs text-gray-600 mt-1">Instagram • In review</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center justify-between">
                    Ready to Publish
                    <Badge variant="default">8</Badge>
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border border-green-200">
                      <p className="text-sm font-medium">Weekly Tips #23</p>
                      <p className="text-xs text-gray-600 mt-1">TikTok • Scheduled for tomorrow</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-200">
                      <p className="text-sm font-medium">Feature Announcement</p>
                      <p className="text-xs text-gray-600 mt-1">All platforms • Ready</p>
                    </div>
                    <button className="w-full text-center text-sm text-green-600 hover:text-green-700 mt-2">
                      View all →
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Activity */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Recent actions by team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Sarah Chen</span> published "Summer Collection
                      Launch Video"
                    </p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Mike Johnson</span> scheduled 5 Instagram posts
                      for next week
                    </p>
                    <p className="text-xs text-gray-600">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Emily Davis</span> completed editing "Behind the
                      Scenes" video
                    </p>
                    <p className="text-xs text-gray-600">6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
