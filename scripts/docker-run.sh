#!/bin/bash

# Set environment variables
export IMAGE_NAME=hedwig
export CONTAINER_NAME=hedwig

# Build Docker image
docker build -t $IMAGE_NAME .

# If container already exists, delete it
if [ "$(docker ps -a | grep $CONTAINER_NAME)" ]; then
  # Stop and remove the container
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
fi

# Create and run Docker container
docker run --name $CONTAINER_NAME -p 8080:8080 -d $IMAGE_NAME
