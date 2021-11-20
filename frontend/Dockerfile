FROM node:14.15.0 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ls -la /
RUN npm run build:prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/frontend /usr/share/nginx/html
