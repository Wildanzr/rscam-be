FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the application code to the container
COPY . .

# Expose the port the NestJS application listens on
EXPOSE 8000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]