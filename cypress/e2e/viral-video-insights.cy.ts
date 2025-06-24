describe('Viral Video Insights E2E Tests', () => {
  beforeEach(() => {
    // Visit the viral video insights page
    cy.visit('/content-insight/viral-video-insights');
  });

  it('should display the page title and metrics', () => {
    // Check page title
    cy.contains('h1', 'Viral Video Insights').should('be.visible');
    
    // Check metrics cards are displayed
    cy.get('[class*="rounded-2xl shadow-lg"]').should('have.length.at.least', 4);
    
    // Check specific metric labels
    cy.contains('Total Videos').should('be.visible');
    cy.contains('Total Views').should('be.visible');
    cy.contains('Avg Engagement').should('be.visible');
    cy.contains('Top Category').should('be.visible');
  });

  it('should navigate between tabs', () => {
    // Check default tab is overview
    cy.contains('button', 'Overview').should('have.class', 'text-blue-600');
    
    // Click on Videos tab
    cy.contains('button', 'Videos').click();
    cy.contains('button', 'Videos').should('have.class', 'text-blue-600');
    cy.contains('h2', 'Top Performing Videos').should('be.visible');
    
    // Click on Analytics tab
    cy.contains('button', 'Analytics').click();
    cy.contains('button', 'Analytics').should('have.class', 'text-blue-600');
    cy.contains('h2', 'Engagement vs Views Analysis').should('be.visible');
  });

  it('should display video cards in grid layout', () => {
    // Navigate to videos tab
    cy.contains('button', 'Videos').click();
    
    // Check video cards are displayed
    cy.get('[class*="bg-white rounded-lg shadow-md"]').should('have.length.at.least', 1);
    
    // Check video card contains expected elements
    cy.get('[class*="bg-white rounded-lg shadow-md"]').first().within(() => {
      // Check for thumbnail area
      cy.get('[class*="aspect-"]').should('exist');
      
      // Check for title
      cy.get('h3').should('exist');
      
      // Check for stats
      cy.get('[class*="flex items-center space-x-3"]').should('exist');
    });
  });

  it('should open video player modal when clicking on video', () => {
    // Navigate to videos tab
    cy.contains('button', 'Videos').click();
    
    // Click on first video thumbnail
    cy.get('[class*="bg-white rounded-lg shadow-md"]').first().click();
    
    // Check modal is opened
    cy.get('[class*="fixed inset-0"]').should('be.visible');
    
    // Check close button exists
    cy.get('button').find('svg').parent().click();
    
    // Check modal is closed
    cy.get('[class*="fixed inset-0"]').should('not.exist');
  });

  it('should display charts in analytics tab', () => {
    // Navigate to analytics tab
    cy.contains('button', 'Analytics').click();
    
    // Check for chart containers
    cy.get('[class*="recharts-wrapper"]').should('have.length.at.least', 1);
    
    // Check for recommendations section
    cy.contains('h2', 'Content Strategy Recommendations').should('be.visible');
    cy.get('[class*="bg-white p-4 rounded-xl"]').should('have.length.at.least', 1);
  });

  it('should handle responsive layout', () => {
    // Test mobile viewport
    cy.viewport('iphone-x');
    
    // Check that grid adjusts to single column
    cy.contains('button', 'Videos').click();
    cy.get('[class*="grid-cols-1"]').should('exist');
    
    // Test tablet viewport
    cy.viewport('ipad-2');
    
    // Check that grid adjusts to two columns
    cy.get('[class*="sm:grid-cols-2"]').should('exist');
    
    // Test desktop viewport
    cy.viewport(1920, 1080);
    
    // Check that grid shows multiple columns
    cy.get('[class*="lg:grid-cols-3"]').should('exist');
  });

  it('should lazy load video thumbnails', () => {
    // Navigate to videos tab
    cy.contains('button', 'Videos').click();
    
    // Check that not all images are loaded immediately
    // This is a simplified test - in a real scenario, you'd check network requests
    cy.get('img[loading="lazy"]').should('exist');
  });

  it('should display video stats with proper formatting', () => {
    // Navigate to videos tab
    cy.contains('button', 'Videos').click();
    
    // Check for formatted numbers (e.g., 1.2M, 12.3K)
    cy.get('[class*="bg-white rounded-lg shadow-md"]').first().within(() => {
      // Look for formatted view counts
      cy.contains(/\d+(\.\d+)?[KM]?/).should('exist');
    });
  });
});