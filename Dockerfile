FROM node:10 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG API_URI
ENV API_URI ${API_URI:-http://api.a6design.net:8000/graphql/}
RUN API_URI=${API_URI} npm run build

FROM nginx:stable
WORKDIR /app
COPY ./nginx/cell.a6design.net /etc/nginx/vhost.d/cell.a6design.net
COPY --from=builder /app/dist/ /app/
RUN chown -R nginx:nginx /app
RUN chmod -R 755 /app
