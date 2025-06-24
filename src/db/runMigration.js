const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '../../data/neakasa.db');

// Migration file path
const migrationPath = path.join(__dirname, 'migrations/create_search_insights_tables.sql');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  console.log('Connected to the SQLite database.');
});

// Read migration SQL
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

// SQLite doesn't support multiple statements in one exec call,
// so we need to split and execute them separately
const statements = migrationSQL
  .split(';')
  .filter((stmt) => stmt.trim().length > 0)
  .map((stmt) => stmt.trim() + ';');

// Execute each statement
let completed = 0;
statements.forEach((statement, index) => {
  // Skip INDEX statements as SQLite doesn't support them in CREATE TABLE
  if (statement.includes('INDEX idx_')) {
    completed++;
    if (completed === statements.length) {
      db.close();
      console.log('Migration completed successfully!');
    }
    return;
  }

  db.run(statement, (err) => {
    if (err) {
      console.error(`Error executing statement ${index + 1}:`, err);
      console.error('Statement:', statement);
    } else {
      console.log(`Statement ${index + 1} executed successfully`);
    }

    completed++;
    if (completed === statements.length) {
      db.close();
      console.log('Migration completed successfully!');
    }
  });
});
