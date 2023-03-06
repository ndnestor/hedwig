FROM node:14.18.1-buster-slim

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Bundle app source
COPY src ./src

# Compile TypeScript files
COPY tsconfig.json ./
RUN npm run build

# Bundle the remaining app source
COPY whitelist.csv ./
COPY scripts ./scripts
COPY .env ./

# Start the app
CMD ["/bin/bash", "./scripts/deploy.sh"]
