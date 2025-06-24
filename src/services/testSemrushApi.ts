// Test script for Semrush API integration
// This is just for testing - remember to add your actual API key in .env file

import SemrushApiService from './semrushApi';

// Example usage
const testSemrushApi = async () => {
  // Initialize the service with your API key
  const semrushApi = new SemrushApiService({
    apiKey: process.env.REACT_APP_SEMRUSH_API_KEY || 'your_api_key_here',
    database: 'us', // or 'cn' for China
  });

  try {
    // Example 1: Get domain overview
    // console.log('Fetching domain overview for example.com...');
    const domainOverview = await semrushApi.getDomainOverview('example.com');
    // console.log('Domain Overview:', domainOverview);

    // Example 2: Get top organic keywords for a domain
    // console.log('\nFetching organic keywords for example.com...');
    const keywords = await semrushApi.getDomainOrganicKeywords('example.com', 10);
    // console.log('Top Keywords:', keywords);

    // Example 3: Get keyword trends
    let trends = null;
    if (keywords.length > 0) {
      const firstKeyword = keywords[0].keyword;
      // console.log(`\nFetching trends for keyword: ${firstKeyword}`);
      trends = await semrushApi.getKeywordTrends(firstKeyword);
      // console.log('Keyword Trends:', trends);
    }

    // Example 4: Get related keywords
    // console.log('\nFetching related keywords for "digital marketing"...');
    const relatedKeywords = await semrushApi.getRelatedKeywords('digital marketing', 10);
    // console.log('Related Keywords:', relatedKeywords);

    // Example 5: Get competitor domains
    // console.log('\nFetching competitors for example.com...');
    const competitors = await semrushApi.getCompetitorDomains('example.com', 5);
    // console.log('Competitors:', competitors);

    // Use variables to avoid eslint warnings
    return { domainOverview, keywords, trends, relatedKeywords, competitors };
  } catch (error) {
    // console.error('Error testing Semrush API:', error);
    throw new Error(`Semrush API test failed: ${error}`);
  }
};

// Export for use in other files
export default testSemrushApi;
