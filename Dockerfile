FROM node:latest as builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build


FROM nginx:1.14-alpine as prod

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]