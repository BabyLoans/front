FROM node:latest as builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build


FROM nginx:1.14-alpine as prod

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]