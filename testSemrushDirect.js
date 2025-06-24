const axios = require('axios');

// Semrush API configuration
const API_KEY = '818171b774aad4f5c0d8f3155cda8f5c';
const BASE_URL = 'https://api.semrush.com/';

// Test function to get domain overview
async function testDomainOverview(domain) {
  console.log(`\n🔍 Testing Domain Overview for: ${domain}`);
  console.log('=' .repeat(50));
  
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        type: 'domain_ranks',
        key: API_KEY,
        domain: domain,
        database: 'us'
      }
    });
    
    const data = response.data.trim().split(';');
    console.log('✅ Domain Overview Results:');
    console.log(`   - Organic Keywords: ${parseInt(data[0] || 0).toLocaleString()}`);
    console.log(`   - Organic Traffic: ${parseInt(data[1] || 0).toLocaleString()}`);
    console.log(`   - Traffic Value: $${parseFloat(data[2] || 0).toLocaleString()}`);
    console.log(`   - Paid Keywords: ${parseInt(data[3] || 0).toLocaleString()}`);
    console.log(`   - Paid Traffic: ${parseInt(data[4] || 0).toLocaleString()}`);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Test function to get top keywords
async function testDomainKeywords(domain) {
  console.log(`\n📊 Testing Top Keywords for: ${domain}`);
  console.log('=' .repeat(50));
  
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        type: 'domain_organic',
        key: API_KEY,
        domain: domain,
        database: 'us',
        display_limit: 5,
        display_sort: 'tr_desc'
      }
    });
    
    const lines = response.data.trim().split('\n');
    console.log('✅ Top 5 Keywords by Traffic:');
    
    lines.forEach((line, index) => {
      const fields = line.split(';');
      if (fields.length >= 8) {
        console.log(`\n${index + 1}. Keyword: "${fields[0]}"`);
        console.log(`   Position: ${fields[1]}`);
        console.log(`   Search Volume: ${parseInt(fields[2]).toLocaleString()}`);
        console.log(`   CPC: $${parseFloat(fields[3]).toFixed(2)}`);
        console.log(`   URL: ${fields[4]}`);
        console.log(`   Traffic %: ${parseFloat(fields[5]).toFixed(2)}%`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Test function to get competitors
async function testCompetitors(domain) {
  console.log(`\n🏆 Testing Competitors for: ${domain}`);
  console.log('=' .repeat(50));
  
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        type: 'domain_organic_organic',
        key: API_KEY,
        domain: domain,
        database: 'us',
        display_limit: 3
      }
    });
    
    const lines = response.data.trim().split('\n');
    console.log('✅ Top 3 Competitors:');
    
    lines.forEach((line, index) => {
      const fields = line.split(';');
      if (fields.length >= 5) {
        console.log(`\n${index + 1}. Competitor: ${fields[0]}`);
        console.log(`   Competition Level: ${(parseFloat(fields[1]) * 100).toFixed(1)}%`);
        console.log(`   Common Keywords: ${parseInt(fields[2]).toLocaleString()}`);
        console.log(`   Their Keywords: ${parseInt(fields[3]).toLocaleString()}`);
        console.log(`   Their Traffic: ${parseInt(fields[4]).toLocaleString()}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Main test function
async function runTests() {
  console.log('\n🚀 Starting Semrush API Tests...');
  console.log('================================\n');
  
  // Test with a popular domain
  const testDomain = 'nike.com';
  
  await testDomainOverview(testDomain);
  await testDomainKeywords(testDomain);
  await testCompetitors(testDomain);
  
  console.log('\n\n✨ Tests completed!');
  console.log('\n📱 Now you can access the app at: http://localhost:3001');
  console.log('   Navigate to: Content Insight > Search Insights');
  console.log('   Try searching for domains like: nike.com, amazon.com, apple.com\n');
}

// Run the tests
runTests();