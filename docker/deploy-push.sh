#!/bin/bash

set -e

read -r -p "Enter the version number for this build: " version

if [[ -z "$version" ]]; then
  echo "You must provide a version number."
  exit 1
fi

echo "Building frontend image for production..."
docker compose -f docker-compose.yml build --build-arg NGINX_CONF=nginx.conf frontend

echo "Building backend image..."
docker compose -f docker-compose.yml build backend

echo "Tagging frontend image..."
docker tag docker-frontend gcr.io/cashcompass-409018/cash_compass_frontend:"$version"

echo "Tagging backend image..."
docker tag docker-backend gcr.io/cashcompass-409018/cash_compass_backend:"$version"

echo "Pushing frontend image..."
docker push gcr.io/cashcompass-409018/cash_compass_frontend:"$version"

echo "Pushing backend image..."
docker push gcr.io/cashcompass-409018/cash_compass_backend:"$version"

echo "Images with version $version have been pushed to GCR."
