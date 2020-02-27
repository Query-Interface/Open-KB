FROM node:lts-alpine as build
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY .babelrc.js /app/.babelrc.js
COPY tsconfig.json /app/tsconfig.json
COPY webpack.config.js /app/webpack.config.js
COPY src /app/src

RUN \
cd /app && \
npm install && \
npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf
LABEL maintainer=query-interface \
      version="1.0"
EXPOSE 8080
ENTRYPOINT ["nginx","-g","daemon off;"]
