#!/bin/bash

# Kill any existing processes on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Clean install dependencies
echo "Installing dependencies..."
npm ci || npm install

# Start the development server
echo "Starting development server..."
PORT=3001 npm start