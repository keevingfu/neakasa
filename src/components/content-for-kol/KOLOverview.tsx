import React, { useState, useEffect, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import {
  Search,
  Filter,
  Download,
  UserPlus,
  Users,
  TrendingUp,
  Eye,
  Heart,
  MoreVertical,
  Check,
  ChevronDown,
  Globe,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  ExternalLink,
} from 'lucide-react';
import { KOL, KOLFilter, KOLMetrics } from '../../types/kol';
import KOLService from '../../services/kolService';

const KOLOverview: React.FC = () => {
  const [kols, setKOLs] = useState<KOL[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<KOLMetrics | null>(null);
  const [selectedKOLs, setSelectedKOLs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'followers' | 'engagement' | 'performance'>('followers');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [filter, setFilter] = useState<Partial<KOLFilter>>({
    search: '',
    categories: [],
    platforms: [],
    status: [],
    tags: [],
  });

  // Categories and platforms for filters
  const categories = [
    'Tech & Gadgets',
    'Beauty & Fashion',
    'Food & Cooking',
    'Travel & Lifestyle',
    'Gaming & Entertainment',
    'Fitness & Health',
    'Home & Garden',
    'Pet Care',
    'Education & Learning',
    'Business & Finance',
  ];

  const platforms = ['youtube', 'tiktok', 'instagram', 'twitter', 'facebook'];
  const statuses = ['active', 'inactive', 'pending'];

  // Load KOLs and metrics
  useEffect(() => {
    loadData();
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    setLoading(true);
    try {
      const [kolsData, metricsData] = await Promise.all([
        KOLService.getKOLs(filter),
        KOLService.getKOLMetrics(),
      ]);
      setKOLs(kolsData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Failed to load KOL data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sort KOLs
  const sortedKOLs = useMemo(() => {
    const sorted = [...kols];
    sorted.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'followers':
          aValue = a.totalFollowers;
          bValue = b.totalFollowers;
          break;
        case 'engagement':
          aValue = a.avgEngagementRate;
          bValue = b.avgEngagementRate;
          break;
        case 'performance':
          aValue = a.performanceScore;
          bValue = b.performanceScore;
          break;
      }
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });
    return sorted;
  }, [kols, sortBy, sortOrder]);

  // Handle batch operations
  const handleSelectAll = () => {
    if (selectedKOLs.size === sortedKOLs.length) {
      setSelectedKOLs(new Set());
    } else {
      setSelectedKOLs(new Set(sortedKOLs.map((kol) => kol.id)));
    }
  };

  const handleSelectKOL = (kolId: string) => {
    const newSelected = new Set(selectedKOLs);
    if (newSelected.has(kolId)) {
      newSelected.delete(kolId);
    } else {
      newSelected.add(kolId);
    }
    setSelectedKOLs(newSelected);
  };

  const handleBatchStatusUpdate = async (status: KOL['status']) => {
    if (selectedKOLs.size === 0) return;
    await KOLService.updateKOLStatus(Array.from(selectedKOLs), status);
    await loadData();
    setSelectedKOLs(new Set());
  };

  const handleExport = async () => {
    const ids = selectedKOLs.size > 0 ? Array.from(selectedKOLs) : sortedKOLs.map((k) => k.id);
    const blob = await KOLService.exportKOLs(ids);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kols_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Platform icon component
  const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'tiktok':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        );
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // KOL row component for virtual list
  const KOLRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const kol = sortedKOLs[index];
    const isSelected = selectedKOLs.has(kol.id);

    return (
      <div style={style} className="px-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-sm transition-shadow border border-gray-100">
          <div className="flex items-center gap-4">
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelectKOL(kol.id)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />

            {/* Avatar and basic info */}
            <div className="flex items-center gap-3 flex-1">
              <img
                src={kol.avatar}
                alt={kol.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{kol.name}</h3>
                  {kol.verified && (
                    <Check className="w-4 h-4 text-blue-500 bg-blue-100 rounded-full p-0.5" />
                  )}
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      kol.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : kol.status === 'inactive'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {kol.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{kol.category}</p>
              </div>
            </div>

            {/* Platform accounts */}
            <div className="flex items-center gap-2">
              {kol.platforms.slice(0, 3).map((platform, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-2xl"
                  title={`${platform.username} - ${formatNumber(platform.followers)} followers`}
                >
                  <PlatformIcon platform={platform.platform} />
                  <span className="text-xs text-gray-600">{formatNumber(platform.followers)}</span>
                </div>
              ))}
              {kol.platforms.length > 3 && (
                <span className="text-xs text-gray-500">+{kol.platforms.length - 3}</span>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Total Reach</p>
                <p className="font-semibold text-gray-900">{formatNumber(kol.totalFollowers)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement</p>
                <p className="font-semibold text-gray-900">{kol.avgEngagementRate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Performance</p>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${kol.performanceScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold">{kol.performanceScore}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-2xl transition-colors">
                <ExternalLink className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-2xl transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
          data-testid="loading-spinner"
        ></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with metrics */}
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KOL Management</h1>
            <p className="text-gray-600 mt-1">
              Manage and analyze your {metrics?.totalKOLs || 0} Key Opinion Leaders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors">
              <UserPlus className="w-4 h-4" />
              Add KOL
            </button>
          </div>
        </div>

        {/* Metrics cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">Total KOLs</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{metrics?.totalKOLs || 0}</p>
            <p className="text-sm text-blue-700 mt-1">{metrics?.activeKOLs || 0} active</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-purple-600 font-medium">Total Reach</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">
              {formatNumber(metrics?.totalReach || 0)}
            </p>
            <p className="text-sm text-purple-700 mt-1">Combined followers</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Avg Engagement</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{metrics?.avgEngagementRate || 0}%</p>
            <p className="text-sm text-green-700 mt-1">Across all KOLs</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-orange-600 font-medium">Top Category</span>
            </div>
            <p className="text-lg font-bold text-orange-900">
              {metrics?.topCategories[0]?.category || 'N/A'}
            </p>
            <p className="text-sm text-orange-700 mt-1">
              {metrics?.topCategories[0]?.count || 0} KOLs
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search KOLs by name, category, platform..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(filter.categories?.length || 0) +
              (filter.platforms?.length || 0) +
              (filter.status?.length || 0) >
              0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {(filter.categories?.length || 0) +
                  (filter.platforms?.length || 0) +
                  (filter.status?.length || 0)}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 border-l pl-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'followers' | 'engagement' | 'performance')
              }
              className="px-3 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="followers">Followers</option>
              <option value="engagement">Engagement</option>
              <option value="performance">Performance</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  sortOrder === 'asc' ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
            <div className="grid grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filter.categories?.includes(category) || false}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...(filter.categories || []), category]
                            : filter.categories?.filter((c) => c !== category) || [];
                          setFilter({ ...filter, categories: newCategories });
                        }}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Platforms</h3>
                <div className="space-y-2">
                  {platforms.map((platform) => (
                    <label key={platform} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filter.platforms?.includes(platform) || false}
                        onChange={(e) => {
                          const newPlatforms = e.target.checked
                            ? [...(filter.platforms || []), platform]
                            : filter.platforms?.filter((p) => p !== platform) || [];
                          setFilter({ ...filter, platforms: newPlatforms });
                        }}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <PlatformIcon platform={platform} />
                      <span className="text-sm text-gray-700 capitalize">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Status</h3>
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <label key={status} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filter.status?.includes(status as KOL['status']) || false}
                        onChange={(e) => {
                          const newStatus = e.target.checked
                            ? [...(filter.status || []), status as KOL['status']]
                            : filter.status?.filter((s) => s !== status) || [];
                          setFilter({ ...filter, status: newStatus });
                        }}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-700 capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() =>
                  setFilter({ search: '', categories: [], platforms: [], status: [], tags: [] })
                }
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Batch actions bar */}
      {selectedKOLs.size > 0 && (
        <div className="px-6 py-3 bg-blue-50 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-blue-900">
              {selectedKOLs.size} KOL{selectedKOLs.size > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => handleBatchStatusUpdate('active')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Mark as Active
            </button>
            <button
              onClick={() => handleBatchStatusUpdate('inactive')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Mark as Inactive
            </button>
            <button onClick={handleExport} className="text-sm text-blue-600 hover:text-blue-700">
              Export Selected
            </button>
          </div>
          <button
            onClick={() => setSelectedKOLs(new Set())}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* KOL list with virtual scrolling */}
      <div className="flex-1 bg-gray-50">
        <div className="px-6 py-3 flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedKOLs.size === sortedKOLs.length && sortedKOLs.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-600">Select all</span>
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Showing {sortedKOLs.length} of {metrics?.totalKOLs || 0} KOLs
            </span>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>

        {sortedKOLs.length > 0 ? (
          <List
            height={window.innerHeight - 380} // Adjust based on header height
            itemCount={sortedKOLs.length}
            itemSize={100} // Height of each row
            width="100%"
          >
            {KOLRow}
          </List>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <Users className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium">No KOLs found</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KOLOverview;
