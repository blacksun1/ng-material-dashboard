FROM node:12-alpine3.9 AS builder

WORKDIR /usr/src/app/ng-material-dashboard

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
LABEL "Application"="ng-material-dashboard"
LABEL "Author"="Simon Bruce"

COPY --from=builder /usr/src/app/ng-material-dashboard/dist/dashboard /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d
