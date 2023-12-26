# Stage 1: Build the Angular application
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
RUN yarn nx run cash-compass:build:production

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
ARG NGINX_CONF

COPY --from=build-stage /app/dist/apps/cash-compass /usr/share/nginx/html

# If NGINX_CONF is provided, copy it to the container
COPY /apps/cash-compass/${NGINX_CONF} /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
