#!/bin/bash

# Navigate to the directory where docker-compose.yml is located
cd docker

# Build the Docker image for the backend service
echo "Building Docker image for backend..."
docker compose build backend --no-cache

# Start up all the services
echo "Starting services..."
docker compose up

# Navigate back to the project root
cd ..

echo "Docker containers are up and running."
