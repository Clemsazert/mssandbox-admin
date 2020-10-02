### -------- Stage 1: Base environment ---------- ###

FROM node:12.16.1-alpine as base
WORKDIR /usr/src/app

# Dependencies
ENV NODE_ENV development
COPY .env* ./
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install

### -------------- Stage 2: Build --------------- ###

FROM base as build

COPY ./src ./src
COPY ./public ./public
RUN yarn build


### ------- Stage 3: Production environment ------- ###

FROM nginx:1.17.8-alpine

# Nginx configuration
RUN rm -rf /etc/nginx/conf.d
COPY nginx/default.conf /etc/nginx/conf.d/

# Copy files to serve
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Launch
RUN set PORT=$PORT
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
