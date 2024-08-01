# Use the official Node.js image as the base image
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG MONGODB_URI
ARG API_KEY
ARG API_URL

ENV MONGODB_URI=${MONGODB_URI}
ENV API_KEY=${API_KEY}
ENV API_URL=${API_URL}

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

RUN npm install --production

EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
