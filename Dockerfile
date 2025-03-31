

# Define the Node.js version to use.
ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-alpine AS build-stage

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache for npm install.
COPY package*.json ./

# Install the application dependencies.
RUN npm install

# Switch to root user for creating directories.
USER root

# Create the dist directory and set the correct permissions.
RUN chmod -R 777 /app

# Switch to the non-root user for running the app.
USER node

# Copy the application source code from the host to the container.
COPY . .

# Run the TypeScript build process.
RUN npm run build

# Expose the port that the application listens on (3000).
EXPOSE 3000:3000

# Start the application.
CMD ["npm", "start"]
