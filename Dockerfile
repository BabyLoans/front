FROM node:latest as builder

WORKDIR /app

COPY package.json package.json
RUN npm ci --production

COPY . .

RUN npm run build


FROM nginx:1.14-alpine as prod

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]