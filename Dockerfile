# Dockerfile for code-browser
FROM node:18-slim

# Create app directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose the server port
EXPOSE 3000

# Start the app
CMD ["node", "server.mjs"]
