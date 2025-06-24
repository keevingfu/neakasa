import { useState, useCallback } from 'react';
import { KeywordData, DomainOverview } from '../services/semrushApi';
import { RelatedKeyword, KeywordTrend, Competitor } from '../types/semrush';
import {
  mockDomainOverview,
  mockKeywords,
  mockRelatedKeywords,
  mockKeywordTrends,
  mockCompetitors,
} from '../services/mockSemrushData';
import { domainMockData } from '../services/domainMockData';

interface UseSemrushDataReturn {
  keywords: KeywordData[];
  domainOverview: DomainOverview | null;
  relatedKeywords: RelatedKeyword[];
  keywordTrends: KeywordTrend[];
  competitors: Competitor[];
  loading: boolean;
  error: string | null;
  fetchDomainKeywords: (domain: string) => Promise<void>;
  fetchKeywordData: (keyword: string) => Promise<void>;
  fetchCompetitors: (domain: string) => Promise<void>;
}

const useSemrushData = (): UseSemrushDataReturn => {
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [domainOverview, setDomainOverview] = useState<DomainOverview | null>(null);
  const [relatedKeywords, setRelatedKeywords] = useState<RelatedKeyword[]>([]);
  const [keywordTrends, setKeywordTrends] = useState<KeywordTrend[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch domain keywords and overview
  const fetchDomainKeywords = useCallback(async (domain: string) => {
    setLoading(true);
    setError(null);

    try {
      // For now, always use mock data since API units are exhausted
      throw new Error('Using mock data');
    } catch (err) {
      // Using mock data for domain

      // Check if we have specific mock data for this domain
      const domainSpecificData = domainMockData[domain];
      if (domainSpecificData) {
        setKeywords(domainSpecificData.keywords);
        setDomainOverview(domainSpecificData.overview);
        setError(`Using demo data for ${domain}`);
      } else {
        // Use default mock data
        setKeywords(mockKeywords);
        setDomainOverview(mockDomainOverview);
        setError(
          'Using default demo data - try neakasa.com, litter-robot.com, petkit.com, petsnowy.com, or petsafe.com'
        );
      }

      // Also set competitors
      setCompetitors(mockCompetitors);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch keyword-specific data
  const fetchKeywordData = useCallback(async (_keyword: string) => {
    setLoading(true);
    setError(null);

    try {
      // For now, always use mock data since API units are exhausted
      throw new Error('Using mock data');
    } catch (err) {
      // Using mock data for keyword
      setKeywordTrends(mockKeywordTrends);
      setRelatedKeywords(mockRelatedKeywords);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch competitor domains
  const fetchCompetitors = useCallback(async (_domain: string) => {
    setLoading(true);
    setError(null);

    try {
      // For now, always use mock data since API units are exhausted
      throw new Error('Using mock data');
    } catch (err) {
      // Using mock data for competitors
      setCompetitors(mockCompetitors);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    keywords,
    domainOverview,
    relatedKeywords,
    keywordTrends,
    competitors,
    loading,
    error,
    fetchDomainKeywords,
    fetchKeywordData,
    fetchCompetitors,
  };
};

export default useSemrushData;
