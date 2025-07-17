#!/bin/bash

# Check if .env.development.local exists
if [ ! -f .env.development.local ]; then
  echo "[DEPLOY ERROR] .env.development.local not found"
  exit 1
fi

# Source the environment variables
source .env.development.local

# Check if required variables are set
if [ -z "$HOMEPAGE_URL" ] || [ -z "$VITE_BASE_URL" ]; then
  echo "[DEPLOY ERROR] HOMEPAGE_URL or VITE_BASE_URL not set in .env.development.local"
  exit 1
fi

echo "[DEPLOY INFO] HOMEPAGE_URL=$HOMEPAGE_URL"
echo "[DEPLOY INFO] VITE_BASE_URL=$VITE_BASE_URL"

# Update package.json homepage using jq
if [ -f package.json ]; then
  cp package.json package.json.bak
  jq ".homepage = \"$HOMEPAGE_URL\"" package.json > package.json.tmp && mv package.json.tmp package.json
else
  echo "[DEPLOY ERROR] package.json not found"
  exit 1
fi

# Update vite.config.ts base using sed
if [ -f vite.config.ts ]; then
  cp vite.config.ts vite.config.ts.bak
  sed -i "s|base: \"[^\"]*\"|base: \"$VITE_BASE_URL\"|" vite.config.ts
else
  echo "[DEPLOY ERROR] vite.config.ts not found"
  exit 1
fi

echo "[DEPLOY INFO] Updated homepage and base URLs successfully"

# Build+Deploy the project
echo "[DEPLOY INFO] Deploying to dev environment..."
npm run deploy:dev

# Check if the deployment was successful
if [ $? -ne 0 ]; then
  echo "[DEPLOY ERROR] Deployment failed"
  exit 1
fi

echo "[DEPLOY INFO] Deployment to dev environment completed successfully"

# Undo changes to package.json and vite.config.ts
mv package.json.bak package.json
mv vite.config.ts.bak vite.config.ts
echo "[DEPLOY INFO] Reverted changes to package.json and vite.config.ts"

# Clean up
rm -f package.json.tmp package.json.bak vite.config.ts.bak
echo "[DEPLOY INFO] Cleaned up temporary files"

# Exit successfully
echo "[DEPLOY INFO] Deployment script completed successfully"
exit 0