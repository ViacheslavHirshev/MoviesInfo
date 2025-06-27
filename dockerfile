# Build stage
FROM node:18-alpine as build
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY env.js /usr/share/nginx/html/env.js

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]