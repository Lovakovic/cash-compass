# Stage 1: Build the Angular application
# Use the official Node.js 20.9.0 image as a base image
FROM node:20.9.0 AS build-stage

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and yarn.lock file
COPY package.json yarn.lock /app/

# Install dependencies using Yarn
RUN yarn install

# Copy the Nx workspace files into the Docker image
COPY . /app/

# Build the Angular application using Yarn
RUN yarn nx run cash-compass:build:development

# Stage 2: Serve the application using Nginx
# Use the official Nginx image
FROM nginx:alpine

# Copy the built app to the Nginx server
COPY --from=build-stage /app/dist/apps/cash-compass /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
