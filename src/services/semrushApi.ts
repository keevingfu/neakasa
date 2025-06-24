import axios, { AxiosInstance } from 'axios';
import { RelatedKeyword, KeywordTrend, Competitor, KeywordOverview } from '../types/semrush';

interface SemrushConfig {
  apiKey: string;
  baseUrl?: string;
  database?: string;
  rateLimit?: number;
}

interface KeywordData {
  keyword: string;
  position: number;
  search_volume: number;
  cpc: number;
  url: string;
  traffic_percent: number;
  traffic_cost: number;
  competition: number;
  trend: string;
}

interface DomainOverview {
  organic_keywords: number;
  organic_traffic: number;
  organic_cost: number;
  adwords_keywords: number;
  adwords_traffic: number;
  adwords_cost: number;
}

class SemrushApiService {
  private apiKey: string;
  private baseUrl: string;
  private database: string;
  private axiosInstance: AxiosInstance;
  private lastRequestTime = 0;
  private minRequestInterval = 100; // 100ms between requests (10 requests per second)

  constructor(config: SemrushConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.semrush.com/';
    this.database = config.database || 'us';

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
    });
  }

  // Rate limiting function
  private async enforceRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    this.lastRequestTime = Date.now();
  }

  // Get domain organic keywords
  async getDomainOrganicKeywords(
    domain: string,
    limit = 100,
    exportColumns?: string[]
  ): Promise<KeywordData[]> {
    await this.enforceRateLimit();

    const params: Record<string, string | number> = {
      type: 'domain_organic',
      key: this.apiKey,
      domain: domain,
      database: this.database,
      display_limit: limit,
      display_sort: 'tr_desc', // Sort by traffic descending
    };

    if (exportColumns && exportColumns.length > 0) {
      params.export_columns = exportColumns.join(',');
    }

    try {
      const response = await this.axiosInstance.get('', { params });
      return this.parseOrganicKeywordsResponse(response.data);
    } catch (error) {
      console.error('Error fetching domain organic keywords:', error);
      throw error;
    }
  }

  // Get keyword overview (search volume, trends, etc.)
  async getKeywordOverview(keywords: string[]): Promise<KeywordOverview[]> {
    await this.enforceRateLimit();

    const params = {
      type: 'phrase_these',
      key: this.apiKey,
      phrase: keywords.join(';'),
      database: this.database,
      export_columns: 'Ph,Nq,Cp,Co,Nr,Td',
    };

    try {
      const response = await this.axiosInstance.get('', { params });
      return this.parseKeywordOverviewResponse(response.data);
    } catch (error) {
      console.error('Error fetching keyword overview:', error);
      throw error;
    }
  }

  // Get domain overview
  async getDomainOverview(domain: string): Promise<DomainOverview> {
    await this.enforceRateLimit();

    const params = {
      type: 'domain_ranks',
      key: this.apiKey,
      domain: domain,
      database: this.database,
    };

    try {
      const response = await this.axiosInstance.get('', { params });
      return this.parseDomainOverviewResponse(response.data);
    } catch (error) {
      console.error('Error fetching domain overview:', error);
      throw error;
    }
  }

  // Get keyword trends
  async getKeywordTrends(keyword: string): Promise<KeywordTrend[]> {
    await this.enforceRateLimit();

    const params = {
      type: 'phrase_trend',
      key: this.apiKey,
      phrase: keyword,
      database: this.database,
    };

    try {
      const response = await this.axiosInstance.get('', { params });
      return this.parseKeywordTrendsResponse(response.data);
    } catch (error) {
      console.error('Error fetching keyword trends:', error);
      throw error;
    }
  }

  // Get related keywords
  async getRelatedKeywords(keyword: string, limit = 50): Promise<RelatedKeyword[]> {
    await this.enforceRateLimit();

    const params = {
      type: 'phrase_related',
      key: this.apiKey,
      phrase: keyword,
      database: this.database,
      display_limit: limit,
      display_sort: 'nq_desc', // Sort by search volume
    };

    try {
      const response = await this.axiosInstance.get('', { params });
      return this.parseRelatedKeywordsResponse(response.data);
    } catch (error) {
      console.error('Error fetching related keywords:', error);
      throw error;
    }
  }

  // Get competitor domains
  async getCompetitorDomains(domain: string, limit = 20): Promise<Competitor[]> {
    await this.enforceRateLimit();

    const params = {
      type: 'domain_organic_organic',
      key: this.apiKey,
      domain: domain,
      database: this.database,
      display_limit: limit,
    };

    try {
      const response = await this.axiosInstance.get('', { params });
      return this.parseCompetitorDomainsResponse(response.data);
    } catch (error) {
      console.error('Error fetching competitor domains:', error);
      throw error;
    }
  }

  // Parse responses
  private parseOrganicKeywordsResponse(data: string): KeywordData[] {
    const lines = data.trim().split('\n');
    const keywords: KeywordData[] = [];

    for (const line of lines) {
      const fields = line.split(';');
      if (fields.length >= 8) {
        keywords.push({
          keyword: fields[0],
          position: parseInt(fields[1]),
          search_volume: parseInt(fields[2]),
          cpc: parseFloat(fields[3]),
          url: fields[4],
          traffic_percent: parseFloat(fields[5]),
          traffic_cost: parseFloat(fields[6]),
          competition: parseFloat(fields[7]),
          trend: fields[8] || '',
        });
      }
    }

    return keywords;
  }

  private parseKeywordOverviewResponse(data: string): KeywordOverview[] {
    const lines = data.trim().split('\n');
    const results: KeywordOverview[] = [];

    for (const line of lines) {
      const fields = line.split(';');
      if (fields.length >= 6) {
        results.push({
          keyword: fields[0],
          search_volume: parseInt(fields[1]),
          cpc: parseFloat(fields[2]),
          competition: parseFloat(fields[3]),
          results: parseInt(fields[4]),
          trend: fields[5],
        });
      }
    }

    return results;
  }

  private parseDomainOverviewResponse(data: string): DomainOverview {
    const fields = data.trim().split(';');

    return {
      organic_keywords: parseInt(fields[0]) || 0,
      organic_traffic: parseInt(fields[1]) || 0,
      organic_cost: parseFloat(fields[2]) || 0,
      adwords_keywords: parseInt(fields[3]) || 0,
      adwords_traffic: parseInt(fields[4]) || 0,
      adwords_cost: parseFloat(fields[5]) || 0,
    };
  }

  private parseKeywordTrendsResponse(data: string): KeywordTrend[] {
    const lines = data.trim().split('\n');
    const trends: KeywordTrend[] = [];

    for (const line of lines) {
      const fields = line.split(';');
      if (fields.length >= 2) {
        trends.push({
          date: fields[0],
          search_volume: parseInt(fields[1]),
        });
      }
    }

    return trends;
  }

  private parseRelatedKeywordsResponse(data: string): RelatedKeyword[] {
    const lines = data.trim().split('\n');
    const keywords: RelatedKeyword[] = [];

    for (const line of lines) {
      const fields = line.split(';');
      if (fields.length >= 4) {
        keywords.push({
          keyword: fields[0],
          search_volume: parseInt(fields[1]),
          cpc: parseFloat(fields[2]),
          competition: parseFloat(fields[3]),
        });
      }
    }

    return keywords;
  }

  private parseCompetitorDomainsResponse(data: string): Competitor[] {
    const lines = data.trim().split('\n');
    const competitors: Competitor[] = [];

    for (const line of lines) {
      const fields = line.split(';');
      if (fields.length >= 5) {
        competitors.push({
          domain: fields[0],
          competition_level: parseFloat(fields[1]),
          common_keywords: parseInt(fields[2]),
          organic_keywords: parseInt(fields[3]),
          organic_traffic: parseInt(fields[4]),
        });
      }
    }

    return competitors;
  }
}

export default SemrushApiService;
export type { SemrushConfig, KeywordData, DomainOverview };
