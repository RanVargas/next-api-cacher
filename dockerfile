# Use the official Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Use the official Node.js image again for the runtime environment
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Install only production dependencies
RUN npm install --production

# Expose the port on which your Next.js application will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
