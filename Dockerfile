# Dockerfile for a Node.js application
FROM node:18-alpine
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Create dist directory
RUN npm run build
# Expose the application port
EXPOSE 8000
# Start the application
CMD ["npm", "run" , "start:dev"]
