FROM node:10 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG API_URI
ENV API_URI ${API_URI:-http://api.a6design.net:8000/graphql/}
RUN API_URI=${API_URI} npm run build
COPY /app/dist/ /app/