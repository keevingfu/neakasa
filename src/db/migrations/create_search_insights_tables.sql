-- Create search keywords table
CREATE TABLE IF NOT EXISTS search_keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword VARCHAR(255) NOT NULL,
    search_volume INTEGER,
    cpc DECIMAL(10, 2),
    competition DECIMAL(3, 2),
    trend_data TEXT,
    platform VARCHAR(50) DEFAULT 'semrush',
    database_region VARCHAR(10) DEFAULT 'us',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(keyword, platform, database_region)
);

-- Create domain keywords table
CREATE TABLE IF NOT EXISTS domain_keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain VARCHAR(255) NOT NULL,
    keyword VARCHAR(255) NOT NULL,
    position INTEGER,
    search_volume INTEGER,
    cpc DECIMAL(10, 2),
    url TEXT,
    traffic_percent DECIMAL(10, 2),
    traffic_cost DECIMAL(10, 2),
    competition DECIMAL(3, 2),
    trend TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_domain (domain),
    INDEX idx_keyword (keyword)
);

-- Create keyword trends table
CREATE TABLE IF NOT EXISTS keyword_trends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    search_volume INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(keyword, date),
    INDEX idx_keyword_date (keyword, date)
);

-- Create related keywords table
CREATE TABLE IF NOT EXISTS related_keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    base_keyword VARCHAR(255) NOT NULL,
    related_keyword VARCHAR(255) NOT NULL,
    search_volume INTEGER,
    cpc DECIMAL(10, 2),
    competition DECIMAL(3, 2),
    relevance_score DECIMAL(3, 2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_base_keyword (base_keyword)
);

-- Create competitor domains table
CREATE TABLE IF NOT EXISTS competitor_domains (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    base_domain VARCHAR(255) NOT NULL,
    competitor_domain VARCHAR(255) NOT NULL,
    competition_level DECIMAL(5, 2),
    common_keywords INTEGER,
    organic_keywords INTEGER,
    organic_traffic INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_base_domain (base_domain)
);

-- Create domain overview table
CREATE TABLE IF NOT EXISTS domain_overview (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain VARCHAR(255) NOT NULL UNIQUE,
    organic_keywords INTEGER,
    organic_traffic INTEGER,
    organic_cost DECIMAL(12, 2),
    adwords_keywords INTEGER,
    adwords_traffic INTEGER,
    adwords_cost DECIMAL(12, 2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create search insights summary table
CREATE TABLE IF NOT EXISTS search_insights_summary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    insight_type VARCHAR(50) NOT NULL,
    insight_data JSON,
    date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(insight_type, date)
);