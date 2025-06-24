describe('Consumer Voice Analysis E2E Tests', () => {
  beforeEach(() => {
    // Visit the consumer voice analysis page
    cy.visit('/content-insight/consumer-voice-analysis');
    
    // Wait for initial data load
    cy.get('[class*="animate-pulse"]').should('not.exist');
  });

  describe('Page Load and Initial Display', () => {
    it('should display the page header and description', () => {
      cy.contains('h2', 'Consumer Voice Analysis').should('be.visible');
      cy.contains('Understand what your customers are saying across platforms').should('be.visible');
    });

    it('should display filter controls', () => {
      // Platform filter
      cy.get('[role="combobox"]').first().should('contain', 'All Platforms');
      
      // Date range filter
      cy.get('[role="combobox"]').last().should('contain', 'Last 30 days');
    });

    it('should display key metrics cards', () => {
      // Check all four metric cards
      cy.contains('Total Comments').should('be.visible');
      cy.contains('Sentiment Score').should('be.visible');
      cy.contains('Positive Rate').should('be.visible');
      cy.contains('Response Needed').should('be.visible');
      
      // Check that metrics have values
      cy.get('[class*="text-2xl font-bold"]').should('have.length', 4);
      cy.get('[class*="text-2xl font-bold"]').each(($el) => {
        expect($el.text()).to.match(/[\d,]+\.?\d*%?/);
      });
    });
  });

  describe('Tab Navigation', () => {
    it('should navigate between all tabs', () => {
      const tabs = [
        { name: 'Overview', content: 'Sentiment Distribution' },
        { name: 'Sentiment Analysis', content: 'Sentiment Trends Over Time' },
        { name: 'Keywords & Topics', content: 'Keyword Cloud' },
        { name: 'Top Comments', content: 'Most engaging comments' },
        { name: 'Pain Points', content: 'Customer Pain Points' }
      ];

      tabs.forEach(tab => {
        cy.contains('button', tab.name).click();
        cy.contains(tab.content).should('be.visible');
      });
    });
  });

  describe('Overview Tab', () => {
    it('should display sentiment distribution pie chart', () => {
      cy.contains('button', 'Overview').click();
      
      // Check for pie chart
      cy.get('.recharts-pie').should('exist');
      
      // Check for legend items
      cy.contains('Positive').should('be.visible');
      cy.contains('Negative').should('be.visible');
      cy.contains('Neutral').should('be.visible');
    });

    it('should display comment volume trends', () => {
      cy.contains('button', 'Overview').click();
      
      // Check for line chart
      cy.contains('Comment Volume Trends').should('be.visible');
      cy.get('.recharts-line').should('exist');
    });
  });

  describe('Sentiment Analysis Tab', () => {
    it('should display sentiment trends chart', () => {
      cy.contains('button', 'Sentiment Analysis').click();
      
      // Check for multi-line chart
      cy.get('.recharts-line').should('have.length.at.least', 3); // Positive, Negative, Neutral lines
    });

    it('should display platform sentiment comparison', () => {
      cy.contains('button', 'Sentiment Analysis').click();
      
      // Check for platform comparisons
      ['YouTube', 'TikTok', 'Instagram'].forEach(platform => {
        cy.contains(platform).should('be.visible');
        cy.contains(`${platform}`).parent().parent().find('[class*="bg-green-600"]').should('exist');
      });
    });
  });

  describe('Keywords & Topics Tab', () => {
    it('should display keyword cloud with badges', () => {
      cy.contains('button', 'Keywords & Topics').click();
      
      // Check for keyword badges
      cy.get('[class*="bg-green-100"]').should('exist'); // Positive keywords
      cy.get('[class*="bg-red-100"]').should('exist');   // Negative keywords
      cy.get('[class*="bg-gray-100"]').should('exist');  // Neutral keywords
      
      // Check that badges have different sizes
      cy.get('[role="status"]').should('have.length.at.least', 10);
    });

    it('should display top keywords bar chart', () => {
      cy.contains('button', 'Keywords & Topics').click();
      
      // Check for bar chart
      cy.contains('Top Keywords by Sentiment').should('be.visible');
      cy.get('.recharts-bar').should('exist');
    });
  });

  describe('Top Comments Tab', () => {
    it('should display comment cards with metadata', () => {
      cy.contains('button', 'Top Comments').click();
      
      // Check for comment cards
      cy.get('[class*="border rounded-lg p-4"]').should('have.length.at.least', 5);
      
      // Check first comment card structure
      cy.get('[class*="border rounded-lg p-4"]').first().within(() => {
        // Sentiment badge
        cy.get('[role="status"]').should('exist');
        
        // Platform badge
        cy.contains(/youtube|tiktok|instagram/i).should('exist');
        
        // Date
        cy.get('[class*="text-gray-500"]').should('contain.text', '/');
        
        // Engagement metrics
        cy.contains('👍').should('exist');
        cy.contains('💬').should('exist');
        cy.contains('@User').should('exist');
      });
    });
  });

  describe('Pain Points Tab', () => {
    it('should display customer pain points list', () => {
      cy.contains('button', 'Pain Points').click();
      
      // Check for pain points
      cy.contains('Customer Pain Points').should('be.visible');
      cy.get('[class*="flex items-start gap-3"]').should('have.length.at.least', 3);
      
      // Check for alert icons
      cy.get('[class*="text-red-500"]').should('have.length.at.least', 3);
    });

    it('should display recommendations', () => {
      cy.contains('button', 'Pain Points').click();
      
      // Check for recommendations
      cy.contains('Recommendations').should('be.visible');
      
      const recommendations = [
        'Address Price Concerns',
        'Improve Product Durability',
        'Enhance Customer Support',
        'Create Educational Content'
      ];
      
      recommendations.forEach(rec => {
        cy.contains(rec).should('be.visible');
      });
    });
  });

  describe('Filter Functionality', () => {
    it('should filter by platform', () => {
      // Click on platform filter
      cy.get('[role="combobox"]').first().click();
      
      // Select YouTube
      cy.contains('[role="option"]', 'YouTube').click();
      
      // Verify filter is applied
      cy.get('[role="combobox"]').first().should('contain', 'YouTube');
      
      // Data should update (checking sentiment score changes)
      cy.contains('Sentiment Score').parent().parent().find('[class*="text-2xl"]').invoke('text').then(text1 => {
        // Switch to TikTok
        cy.get('[role="combobox"]').first().click();
        cy.contains('[role="option"]', 'TikTok').click();
        
        // Check that sentiment score is different
        cy.contains('Sentiment Score').parent().parent().find('[class*="text-2xl"]').invoke('text').should('not.equal', text1);
      });
    });

    it('should filter by date range', () => {
      // Get initial total comments count
      cy.contains('Total Comments').parent().parent().find('[class*="text-2xl"]').invoke('text').then(text1 => {
        // Change date range to 7 days
        cy.get('[role="combobox"]').last().click();
        cy.contains('[role="option"]', 'Last 7 days').click();
        
        // Check that total comments changed
        cy.contains('Total Comments').parent().parent().find('[class*="text-2xl"]').invoke('text').then(text2 => {
          expect(parseInt(text1.replace(/,/g, ''))).to.be.greaterThan(parseInt(text2.replace(/,/g, '')));
        });
      });
    });
  });

  describe('Data Visualization', () => {
    it('should render all charts without errors', () => {
      // Check Overview tab charts
      cy.contains('button', 'Overview').click();
      cy.get('.recharts-wrapper').should('have.length.at.least', 2);
      
      // Check Sentiment Analysis tab charts
      cy.contains('button', 'Sentiment Analysis').click();
      cy.get('.recharts-wrapper').should('have.length.at.least', 1);
      
      // Check Keywords tab charts
      cy.contains('button', 'Keywords & Topics').click();
      cy.get('.recharts-wrapper').should('have.length.at.least', 1);
    });

    it('should show tooltips on hover', () => {
      cy.contains('button', 'Overview').click();
      
      // Hover over pie chart
      cy.get('.recharts-pie-sector').first().trigger('mouseover');
      cy.get('.recharts-tooltip-wrapper').should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    it('should adapt layout for mobile devices', () => {
      // Test mobile viewport
      cy.viewport('iphone-x');
      
      // Check that filters stack vertically
      cy.get('[class*="flex gap-4"]').should('have.css', 'flex-direction', 'column');
      
      // Check that metric cards are in single column
      cy.get('[class*="grid-cols-1"]').should('exist');
    });

    it('should adapt layout for tablet devices', () => {
      // Test tablet viewport
      cy.viewport('ipad-2');
      
      // Check that metric cards show 2 columns
      cy.get('[class*="md:grid-cols-4"]').should('exist');
    });
  });

  describe('Loading States', () => {
    it('should show loading skeleton while fetching data', () => {
      // Reload page and check for loading state
      cy.reload();
      
      // Should show skeleton cards
      cy.get('[class*="animate-pulse"]').should('exist');
      
      // Should hide skeleton after load
      cy.get('[class*="animate-pulse"]', { timeout: 5000 }).should('not.exist');
    });
  });

  describe('Error Handling', () => {
    it('should handle empty data gracefully', () => {
      // Navigate to comments tab
      cy.contains('button', 'Top Comments').click();
      
      // Even with mock data, should show at least placeholder or message
      cy.get('body').should('not.contain', 'undefined');
      cy.get('body').should('not.contain', 'null');
    });
  });

  describe('Performance', () => {
    it('should load page within acceptable time', () => {
      // Measure page load time
      const startTime = Date.now();
      
      cy.visit('/content-insight/consumer-voice-analysis');
      cy.get('[class*="animate-pulse"]').should('not.exist');
      
      cy.then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(3000); // Should load within 3 seconds
      });
    });
  });
});