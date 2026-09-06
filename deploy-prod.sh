#!/usr/bin/env bash
# ==============================================================================
# Farmer-to-Market Exchange: Linux/Unix Production Deployment Script
# ==============================================================================

set -euo pipefail

ENV_FILE="${1:-.env.production}"

echo "=========================================================="
echo "🚀 Starting Farmer-to-Market Production Deployment..."
echo "=========================================================="

# 1. Check for .env.production
if [ ! -f "$ENV_FILE" ]; then
    echo "⚠️  Warning: '$ENV_FILE' not found!"
    echo "📋 Copying from '.env.production.example'..."
    cp .env.production.example "$ENV_FILE"
    echo "❗ Please configure real production secrets in '$ENV_FILE'."
fi

# 2. Check docker
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed or not in PATH."
    exit 1
fi

# 3. Build containers
echo "📦 Building production containers..."
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" build

# 4. Launch services in daemon mode
echo "⚡ Starting production stack..."
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" up -d

# 5. Check health status
echo "🔍 Checking container status..."
sleep 8
docker compose -f docker-compose.prod.yml ps

echo "=========================================================="
echo "✅ Production Deployment Complete!"
echo "=========================================================="
