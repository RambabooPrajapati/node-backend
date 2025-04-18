FROM node:23-alpine3.20

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variable (overridden by .env at runtime)
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "src/index.js"]
