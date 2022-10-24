FROM node:16.13.2 as build-stage
WORKDIR /vue_app
COPY ./package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /vue_app/dist /usr/share/nginx/html
COPY --from=build-stage /vue_app/nginx.conf /etc/nginx/nginx.conf
ENV HOST=0.0.0.0
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]