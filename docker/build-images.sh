#!/bin/bash

set -e

# Change the context to the workspace root directory
cd "$(dirname "$0")/.."

# Set the tag for the build
tag="latest"

# Paths to Dockerfiles and Artifact Registry
frontend_dockerfile="apps/cash-compass/Dockerfile"
backend_dockerfile="apps/backend/Dockerfile"
frontend_registry_path="europe-west8-docker.pkg.dev/cashcompass-409018/frontend-images"
backend_registry_path="europe-west8-docker.pkg.dev/cashcompass-409018/backend-images"

# Function to build and push image
build_and_push() {
  image_name=$1
  dockerfile_path=$2
  registry_path=$3

  echo "Building $image_name image..."
  docker build -t "$registry_path/$image_name:$tag" -f "$dockerfile_path" .

  echo "Pushing $image_name image to Google Artifact Registry..."
  docker push "$registry_path/$image_name:$tag"
}

# Build and push frontend and backend images
build_and_push "cash-compass-frontend" "$frontend_dockerfile" "$frontend_registry_path"
build_and_push "cash-compass-backend" "$backend_dockerfile" "$backend_registry_path"

echo "Process complete."
