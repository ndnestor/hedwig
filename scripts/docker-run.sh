#!/bin/bash

# Build Typescript
npm run build

# Set environment variables
export IMAGE_NAME=my-node-app
export CONTAINER_NAME=my-node-app-container

# Build Docker image
docker build -t $IMAGE_NAME .

# Check if container is already running
RUNNING=$(docker inspect --format="{{ .State.Running }}" $CONTAINER_NAME 2> /dev/null)

# If container is not running, start it
if [ $? -eq 1 ] || [ "$RUNNING" == "false" ]; then
  docker run --name $CONTAINER_NAME -p 8080:8080 -d $IMAGE_NAME
else
  docker restart $CONTAINER_NAME
fi
