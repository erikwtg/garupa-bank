#!/bin/bash

IMAGE_NAME="consumer-work"

if [ -z "$1" ]; then
  IMAGE_TAG="latest"
else
  IMAGE_TAG="$1"
fi

DOCKERFILE_PATH="./docker/Dockerfile"

BUILD_CONTEXT="./"

echo "Building Docker image: $IMAGE_NAME:$IMAGE_TAG"

docker build \
  --build-arg user=$USER_ARG \
  --build-arg uid=$UID_ARG \
  -t $IMAGE_NAME:$IMAGE_TAG \
  -f $DOCKERFILE_PATH \
  $BUILD_CONTEXT

if [ $? -eq 0 ]; then
    echo "Docker image built successfully: $IMAGE_NAME:$IMAGE_TAG"
else
    echo "Failed to build Docker image."
    exit 1
fi