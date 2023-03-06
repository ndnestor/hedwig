FROM node:14.18.1-buster-slim

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN if [ "$ENVIRONMENT" = "production" ]; then \
        npm install --production; \
    else \
        npm install; \
    fi

# Bundle app source
COPY tsconfig.json ./
COPY whitelist.csv ./
COPY .env ./
COPY scripts ./scripts
COPY src ./src

# Start the app
CMD ["/bin/bash", "./scripts/deploy.sh"]
