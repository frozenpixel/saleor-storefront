FROM node:10 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG API_URI
ENV API_URI ${API_URI:-http://api.a6design.net:8000/graphql/}
RUN API_URI=${API_URI} npm run build

WORKDIR /app
COPY --from=builder /app/dist/ /app/