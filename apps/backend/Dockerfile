# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install global Nx CLI
RUN yarn global add nx

# Install dependencies
RUN yarn install

# Copy project files
COPY . .

# Build the application
RUN nx run backend:build:production

# Expose port
EXPOSE 3000

# Start the application (adjust as per your Nx commands for production)
CMD ["node", "dist/apps/backend/main"]
