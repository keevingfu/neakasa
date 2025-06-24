import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

// Mock data for demonstration
const mockVideos = [
  {
    platform: 'YouTube',
    url: 'https://www.youtube.com/embed/iche6xzXisM',
    title: 'Steam Cleaner Review',
    likes: 10,
    comments: 0,
    views: 420,
    date: '2025-03-11',
    account: '@AlardoRichter',
  },
  {
    platform: 'TikTok',
    url: 'https://www.tiktok.com/embed/7480378620847082798',
    title: 'Quick Cleaning Tips',
    likes: 17,
    comments: 1,
    views: 237,
    date: '2025-03-11',
    account: '@obadia.goodman',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/reel/DHCqWPwuOXf/',
    title: 'Home Cleaning Hacks',
    likes: 0,
    comments: 0,
    views: 20,
    date: '2025-03-11',
    account: 'jacksonconstanciaia8',
  },
];

const tabList = [
  'Content Ideation & Planning',
  'Content Testing Execution',
  'Performance Analysis & Optimization',
  'Content Refinement & Iteration',
];

const ContentTestingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Example ECharts option for platform comparison
  const platformOption = {
    title: {
      text: 'Platform Content Performance',
    },
    tooltip: {},
    legend: {
      data: ['Likes', 'Comments', 'Views'],
    },
    xAxis: {
      data: ['YouTube', 'TikTok', 'Instagram'],
    },
    yAxis: {},
    series: [
      {
        name: 'Likes',
        type: 'bar',
        data: [10, 17, 0],
      },
      {
        name: 'Comments',
        type: 'bar',
        data: [0, 1, 0],
      },
      {
        name: 'Views',
        type: 'bar',
        data: [420, 237, 20],
      },
    ],
  };

  // Example ECharts option for trend
  const trendOption = {
    title: {
      text: 'Content Performance Trend',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Likes', 'Views'],
    },
    xAxis: {
      type: 'category',
      data: ['2025-03-11', '2025-03-12', '2025-03-13'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Likes',
        type: 'line',
        data: [10, 15, 20],
      },
      {
        name: 'Views',
        type: 'line',
        data: [420, 500, 600],
      },
    ],
  };

  // Video preview component
  const VideoPreview: React.FC<{ url: string; platform: string }> = ({ url, platform }) => {
    if (platform === 'YouTube') {
      return (
        <iframe
          width="320"
          height="180"
          src={url}
          title="YouTube video preview"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (platform === 'TikTok') {
      // TikTok embed workaround (for demo, use a placeholder)
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          View TikTok Video
        </a>
      );
    }
    if (platform === 'Instagram') {
      // Instagram embed workaround (for demo, use a placeholder)
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-pink-500 underline">
          View Instagram Reel
        </a>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Content Testing Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        {tabList.map((tab, idx) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-2xl font-semibold shadow-sm transition-colors ${
              activeTab === idx ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {activeTab === 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Content Ideation & Planning</h2>
            <ReactECharts option={trendOption} style={{ height: 300 }} />
            <div className="mt-6">(Mock ideation and planning data goes here...)</div>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Content Testing Execution</h2>
            <ReactECharts option={platformOption} style={{ height: 300 }} />
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Top 3 Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockVideos.map((video, idx) => (
                  <div key={idx} className="bg-gray-100 rounded-2xl p-4 flex flex-col items-center">
                    <div className="mb-2 font-semibold">{video.title}</div>
                    <VideoPreview url={video.url} platform={video.platform} />
                    <div className="mt-2 text-sm text-gray-600">
                      <div>Platform: {video.platform}</div>
                      <div>
                        Likes: {video.likes} | Comments: {video.comments} | Views: {video.views}
                      </div>
                      <div>Account: {video.account}</div>
                      <div>Date: {video.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Performance Analysis & Optimization</h2>
            <ReactECharts option={trendOption} style={{ height: 300 }} />
            <div className="mt-6">(Mock performance optimization data goes here...)</div>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Content Refinement & Iteration</h2>
            <ReactECharts option={trendOption} style={{ height: 300 }} />
            <div className="mt-6">(Mock refinement and iteration data goes here...)</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentTestingDashboard;
