FROM node:18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN echo "VITE_API_URL=$VITE_API_URL" > .env

RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
