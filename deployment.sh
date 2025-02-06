#!/bin/bash

if docker network inspect garupa-bank-network &>/dev/null; then
  echo "Network garupa-bank-network already exists."
else
  docker network create garupa-bank-network
  echo "Network garupa-bank-network created."
fi

docker-compose -f docker-compose.yml up -d --build

echo "Containers started successfully."

# Verifica se o container está rodando
if docker ps | grep -q "garupa-bank-network"; then
  echo "Container is running."
else
  echo "Container is not running."  
fi