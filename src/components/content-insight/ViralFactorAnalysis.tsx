import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  Hash,
  Users,
  Video,
  BarChart3,
  Lightbulb,
  Award,
  PlayCircle,
  CheckCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ViralFactorAnalysis: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedContentType, setSelectedContentType] = useState('all');

  // Viral Factor Scores
  const viralFactors = [
    {
      factor: 'Cat Reaction',
      score: 92,
      impact: 'High',
      description: 'Genuine cat reactions to litter box',
    },
    {
      factor: 'Before/After',
      score: 88,
      impact: 'High',
      description: 'Visible cleanliness transformation',
    },
    {
      factor: 'Problem Solving',
      score: 85,
      impact: 'High',
      description: 'Addressing odor/mess issues',
    },
    { factor: 'Price Comparison', score: 82, impact: 'High', description: 'Cost vs competitors' },
    {
      factor: 'Multi-Cat Test',
      score: 78,
      impact: 'Medium',
      description: 'Multiple cats using same box',
    },
    { factor: 'Setup Demo', score: 75, impact: 'Medium', description: 'Easy assembly process' },
    {
      factor: 'Tech Features',
      score: 72,
      impact: 'Medium',
      description: 'App connectivity showcase',
    },
    {
      factor: 'User Testimonial',
      score: 70,
      impact: 'Medium',
      description: 'Real owner experiences',
    },
  ];

  // Platform-Specific Viral Factors
  const platformFactors = {
    tiktok: [
      { name: 'Quick Hook (0-3s)', effectiveness: 95 },
      { name: 'Trending Sounds', effectiveness: 88 },
      { name: 'Cat Challenge', effectiveness: 85 },
      { name: 'Time-lapse Clean', effectiveness: 82 },
      { name: 'Reaction Videos', effectiveness: 80 },
      { name: 'Duets/Stitches', effectiveness: 77 },
    ],
    youtube: [
      { name: 'Detailed Review', effectiveness: 90 },
      { name: 'Unboxing Videos', effectiveness: 85 },
      { name: 'Long-term Test', effectiveness: 83 },
      { name: 'Comparison Videos', effectiveness: 88 },
      { name: 'Troubleshooting', effectiveness: 75 },
      { name: 'Setup Tutorials', effectiveness: 72 },
    ],
    instagram: [
      { name: 'Aesthetic Shots', effectiveness: 92 },
      { name: 'Time-lapse', effectiveness: 87 },
      { name: 'User Stories', effectiveness: 85 },
      { name: 'Carousel Posts', effectiveness: 80 },
      { name: 'IGTV Reviews', effectiveness: 75 },
      { name: 'Reel Trends', effectiveness: 90 },
    ],
  };

  // Content Type Performance
  const contentTypeData = [
    {
      type: 'Cat Reaction Compilation',
      viralProbability: 89,
      avgViews: '2.8M',
      engagementRate: 12.5,
    },
    {
      type: 'Neakasa vs Litter-Robot',
      viralProbability: 85,
      avgViews: '1.5M',
      engagementRate: 10.2,
    },
    {
      type: 'First Time Cat Uses It',
      viralProbability: 82,
      avgViews: '980K',
      engagementRate: 11.8,
    },
    {
      type: 'Multi-Cat Household Test',
      viralProbability: 78,
      avgViews: '750K',
      engagementRate: 9.5,
    },
    { type: 'Owner Unboxing/Setup', viralProbability: 72, avgViews: '450K', engagementRate: 7.8 },
    {
      type: 'Long-term Review (30 days)',
      viralProbability: 70,
      avgViews: '380K',
      engagementRate: 8.2,
    },
  ];

  // Competitor Analysis
  const competitorAnalysis = [
    {
      competitor: 'Litter-Robot',
      topContent: 'Space-age design showcase',
      avgViews: '850K',
      weakness: 'Cats hesitant with enclosed design',
      opportunity: 'Open-top comfort comparison',
    },
    {
      competitor: 'PetSafe',
      topContent: 'Budget-friendly positioning',
      avgViews: '320K',
      weakness: 'Less tech features',
      opportunity: 'Advanced features demonstration',
    },
    {
      competitor: 'CatGenie',
      topContent: 'Self-washing feature',
      avgViews: '420K',
      weakness: 'Complex installation',
      opportunity: 'Simple setup advantage',
    },
  ];

  // Engagement Multipliers
  const engagementMultipliers = [
    { factor: 'Cat appears in first 3 seconds', multiplier: 2.8 },
    { factor: 'Shows odor elimination', multiplier: 2.5 },
    { factor: 'Multiple cats in video', multiplier: 2.3 },
    { factor: 'Owner testimonial included', multiplier: 2.1 },
    { factor: 'Price mentioned early', multiplier: 1.9 },
    { factor: 'Comparison with competitor', multiplier: 1.8 },
    { factor: 'Time-lapse cleaning cycle', multiplier: 1.7 },
    { factor: 'App features demonstration', multiplier: 1.5 },
  ];

  // Best Posting Times
  const postingTimes = [
    { day: 'Monday', bestTime: '7-9 AM', engagement: 82 },
    { day: 'Tuesday', bestTime: '12-1 PM', engagement: 78 },
    { day: 'Wednesday', bestTime: '5-7 PM', engagement: 85 },
    { day: 'Thursday', bestTime: '8-10 PM', engagement: 88 },
    { day: 'Friday', bestTime: '3-5 PM', engagement: 75 },
    { day: 'Saturday', bestTime: '10 AM-12 PM', engagement: 92 },
    { day: 'Sunday', bestTime: '7-9 PM', engagement: 90 },
  ];

  // Hashtag Performance
  const hashtagData = [
    { tag: '#CatsOfTikTok', reach: '12.5B', effectiveness: 95 },
    { tag: '#SmartLitterBox', reach: '892M', effectiveness: 88 },
    { tag: '#CatTech', reach: '567M', effectiveness: 85 },
    { tag: '#PetTech', reach: '2.3B', effectiveness: 82 },
    { tag: '#CatParents', reach: '4.1B', effectiveness: 90 },
    { tag: '#LitterBoxSolution', reach: '234M', effectiveness: 75 },
  ];

  // Creator Collaboration Success
  const creatorSuccess = [
    { creator: '@CatLadyKate', followers: '2.8M', avgViews: '1.2M', roi: 8.5 },
    { creator: '@TechPetReviews', followers: '890K', avgViews: '450K', roi: 6.2 },
    { creator: '@MultiCatMom', followers: '1.5M', avgViews: '780K', roi: 7.8 },
    { creator: '@PetProductPro', followers: '650K', avgViews: '320K', roi: 5.5 },
  ];

  // ROI Analysis
  const roiData = [
    { contentType: 'Influencer Review', investment: 5000, return: 42500, roi: 750 },
    { contentType: 'User Generated', investment: 500, return: 8200, roi: 1540 },
    { contentType: 'Brand Produced', investment: 2000, return: 12800, roi: 540 },
    { contentType: 'Paid Partnership', investment: 10000, return: 68000, roi: 580 },
  ];

  // Sample Viral Videos
  const viralExamples = [
    {
      title: "My Cats' Reaction to Neakasa M1 😻",
      views: '3.2M',
      engagement: '14.5%',
      platform: 'TikTok',
      thumbnail: '🐱',
      keyFactors: ['Cat reaction', 'First use', 'Multiple cats'],
    },
    {
      title: 'Neakasa vs Litter-Robot: 30-Day Test',
      views: '1.8M',
      engagement: '11.2%',
      platform: 'YouTube',
      thumbnail: '📊',
      keyFactors: ['Comparison', 'Long-term test', 'Data-driven'],
    },
    {
      title: 'The Open-Top Advantage No One Talks About',
      views: '980K',
      engagement: '12.8%',
      platform: 'Instagram',
      thumbnail: '✨',
      keyFactors: ['Unique angle', 'Problem-solving', 'Visual demo'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Viral Factor Analysis</h1>
        <div className="flex gap-4">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Platforms</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
          </select>
          <select
            value={selectedContentType}
            onChange={(e) => setSelectedContentType(e.target.value)}
            className="px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Content Types</option>
            <option value="reaction">Cat Reactions</option>
            <option value="comparison">Comparisons</option>
            <option value="review">Reviews</option>
            <option value="tutorial">Tutorials</option>
          </select>
        </div>
      </div>

      {/* Key Viral Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold">Top Viral Factors for Pet Tech</h2>
          </div>
          <div className="space-y-4">
            {viralFactors.map((factor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{factor.factor}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        factor.impact === 'High'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {factor.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{factor.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{factor.score}%</div>
                  <div className="text-xs text-gray-500">Viral Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Type Performance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Content Type Performance</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contentTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} fontSize={12} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="viralProbability" fill="#3B82F6" name="Viral Probability %" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {contentTypeData.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-blue-50 rounded-2xl"
              >
                <span className="text-sm font-medium">{item.type}</span>
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-600">
                    Avg Views: <strong>{item.avgViews}</strong>
                  </span>
                  <span className="text-gray-600">
                    Engagement: <strong>{item.engagementRate}%</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform-Specific Strategies */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Platform-Specific Viral Strategies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(platformFactors).map(([platform, factors]) => (
            <div key={platform} className="border rounded-2xl p-4">
              <h3 className="text-lg font-semibold mb-4 capitalize flex items-center gap-2">
                <Video className="w-5 h-5" />
                {platform}
              </h3>
              <div className="space-y-3">
                {factors.map((factor, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{factor.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                          style={{ width: `${factor.effectiveness}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {factor.effectiveness}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-semibold">Competitor Content Analysis</h2>
          </div>
          <div className="space-y-4">
            {competitorAnalysis.map((comp, index) => (
              <div
                key={index}
                className="border rounded-2xl p-4 hover:border-orange-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{comp.competitor}</h3>
                  <span className="text-sm text-gray-600">Avg Views: {comp.avgViews}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <strong>Top Content:</strong> {comp.topContent}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-500">⚠️</span>
                    <div>
                      <strong>Their Weakness:</strong> {comp.weakness}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-500">💡</span>
                    <div>
                      <strong>Your Opportunity:</strong> {comp.opportunity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Multipliers */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-semibold">Engagement Multipliers</h2>
          </div>
          <div className="space-y-3">
            {engagementMultipliers.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-yellow-50 rounded-2xl"
              >
                <span className="text-sm flex-1">{item.factor}</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-yellow-600">{item.multiplier}x</span>
                  <TrendingUp className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Posting Times & Hashtags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold">Best Times to Post Pet Content</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={postingTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ fill: '#6366F1' }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {postingTimes
              .filter((t) => t.engagement > 85)
              .map((time, index) => (
                <div key={index} className="text-sm p-2 bg-indigo-50 rounded">
                  <strong>{time.day}:</strong> {time.bestTime}
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Hash className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold">Top Performing Hashtags</h2>
          </div>
          <div className="space-y-3">
            {hashtagData.map((tag, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-green-50 rounded-2xl"
              >
                <div>
                  <span className="font-semibold text-green-700">{tag.tag}</span>
                  <span className="text-sm text-gray-600 ml-2">Reach: {tag.reach}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      style={{ width: `${tag.effectiveness}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{tag.effectiveness}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Collaboration & ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-pink-600" />
            <h2 className="text-xl font-semibold">Creator Collaboration Success</h2>
          </div>
          <div className="space-y-4">
            {creatorSuccess.map((creator, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-pink-50 rounded-2xl"
              >
                <div>
                  <h3 className="font-semibold">{creator.creator}</h3>
                  <p className="text-sm text-gray-600">{creator.followers} followers</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-pink-600">{creator.roi}x ROI</div>
                  <div className="text-sm text-gray-600">Avg Views: {creator.avgViews}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold">Content ROI Analysis</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="contentType" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="roi" fill="#10B981" name="ROI %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Viral Content Examples */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <PlayCircle className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-semibold">Viral Content Examples</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {viralExamples.map((video, index) => (
            <div
              key={index}
              className="border rounded-2xl overflow-hidden hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
                {video.thumbnail}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{video.title}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{video.views} views</span>
                  <span>{video.engagement} engagement</span>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                    {video.platform}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500 font-medium mb-2">Key Success Factors:</p>
                  <div className="flex flex-wrap gap-1">
                    {video.keyFactors.map((factor, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Actionable Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-2xl">
            <h3 className="font-semibold text-lg mb-3 text-blue-700">Immediate Actions</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>
                  Create "First Cat Reaction" video series focusing on hesitant cats trying Neakasa
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>
                  Produce side-by-side comparison showing open-top advantage vs Litter-Robot
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Partner with @CatLadyKate for multi-cat household testimonial</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Launch #OpenTopChallenge on TikTok showing cats easily entering</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-2xl">
            <h3 className="font-semibold text-lg mb-3 text-purple-700">Content Strategy</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-purple-500">📊</span>
                <span>Focus 40% of content on cat reactions and behavior</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-500">⏰</span>
                <span>Post on Saturday mornings and Thursday evenings for max reach</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-500">🏷️</span>
                <span>Always include #CatsOfTikTok and #CatParents in posts</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-500">💰</span>
                <span>Prioritize UGC campaigns - highest ROI at 1540%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViralFactorAnalysis;
