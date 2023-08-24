# ---- Base Node ----
FROM node:14.21.3-slim AS base
WORKDIR /app
COPY package.json .

# ---- Dependencies ----
FROM base AS dependencies
RUN npm config set registry https://registry.npmmirror.com && \
    npm install

# ---- Build ----
FROM dependencies AS build
COPY ./ .
RUN npm run build:h5:prod

# ---- Run ----
FROM nginx:1.24.0-alpine AS run
COPY --from=build /app/dist/build/h5 /usr/share/nginx/html
EXPOSE 80
CMD [ "sh", "-c", "nginx -g \"daemon off;\"" ]
