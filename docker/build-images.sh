#!/bin/bash

set -e

# Change the context to the workspace root directory
cd "$(dirname "$0")/.."

echo "Select the image(s) to build:"
echo "1) Frontend"
echo "2) Backend"
echo "3) Both Frontend and Backend"

read -r -p "Enter your choice (1/2/3): " choice

read -r -p "Enter the tag for the build (leave blank for 'latest'): " tag

if [[ -z "$tag" ]]; then
  tag="latest"
fi

read -r -p "Do you want to push the images to Google Artifact Registry? (y/n): " push_choice

build_and_push() {
  image_name=$1
  dockerfile_path=$2
  artifact_registry_path=$3

  echo "Building $image_name image..."
  docker build -t "$artifact_registry_path/$image_name:$tag" -f "$dockerfile_path" .

  if [[ "$push_choice" == "y" ]]; then
    echo "Pushing $image_name image to Google Artifact Registry..."
    docker push "$artifact_registry_path/$image_name:$tag"
  fi
}

case $choice in
  1)
    build_and_push "cash-compass-frontend" "apps/cash-compass/Dockerfile" "europe-west8-docker.pkg.dev/cashcompass-409018/frontend-images"
    ;;
  2)
    build_and_push "cash-compass-backend" "apps/backend/Dockerfile" "europe-west8-docker.pkg.dev/cashcompass-409018/backend-images"
    ;;
  3)
    build_and_push "cash-compass-frontend" "apps/cash-compass/Dockerfile" "europe-west8-docker.pkg.dev/cashcompass-409018/frontend-images"
    build_and_push "cash-compass-backend" "apps/backend/Dockerfile" "europe-west8-docker.pkg.dev/cashcompass-409018/backend-images"
    ;;
  *)
    echo "Invalid choice. Please run the script again and select 1, 2, or 3."
    exit 1
    ;;
esac

echo "Process complete."
