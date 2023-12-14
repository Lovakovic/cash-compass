# Stage 1: Build the Angular application
FROM node:20.9.0 AS build-stage

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the app
COPY . .

# Use the local nx from node_modules to build the application
RUN ./node_modules/.bin/nx run cash-compass:build:production

# Copy env.sh to the build output directory
COPY apps/cash-compass/env.sh ./dist/apps/cash-compass

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build-stage /app/dist/apps/cash-compass /usr/share/nginx/html

# Copy the environment script from the build output directory
COPY --from=build-stage /app/dist/apps/cash-compass/env.sh /usr/share/nginx/html

# Make the script executable
RUN chmod +x /usr/share/nginx/html/env.sh

# Expose port 4200
EXPOSE 4200

# Start Nginx and run the environment script
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g 'daemon off;'"]
