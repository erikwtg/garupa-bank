#!/bin/bash

if docker network inspect garupa_network &>/dev/null; then
  echo "Network garupa_network already exists."
else
  docker network create garupa_network
  echo "Network garupa_network created."
fi

docker-compose -f docker-compose.yml up -d --build

echo "Containers started successfully."

if docker ps | grep -q "garupa_network"; then
  echo "Container is running."
else
  echo "Container is not running."  
fi