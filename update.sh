#!/bin/bash

# 🔄 Portfolio Update Script
# Run this script to update your deployed application

set -e

APP_NAME="portfolio"
APP_DIR="/var/www/portfolio"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_status "🔄 Starting application update..."

# Navigate to app directory
cd $APP_DIR

# Pull latest changes
print_status "Pulling latest changes from repository..."
git pull origin main

# Install/update dependencies
print_status "Installing/updating dependencies..."
npm install

# Build application
print_status "Building application..."
npm run build

# Restart PM2 process
print_status "Restarting application..."
pm2 restart $APP_NAME

# Show status
print_status "Update completed! Current status:"
pm2 status

print_status "✅ Application updated successfully!"
print_warning "Check logs with: pm2 logs $APP_NAME"