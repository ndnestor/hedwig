#!/bin/bash

# Set environment variables
set -a
source .env
set +a

# Start server

if [ "$ENVIRONMENT" = "production" ]; then
  echo "Running in PRODUCTION mode"
  npm run build
  npm run start
elif [ "$ENVIRONMENT" = "development" ]; then
  echo "Running in DEVELOPMENT mode"
  npm run dev
else
  echo "Unknown environment type"
fi
