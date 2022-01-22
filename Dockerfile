FROM node:lts-alpine as build 

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install -g @angular/cli@latest
COPY . ./

RUN npm run build


FROM nginx:1.20.1

COPY --from=build /app/dist/client /usr/share/nginx/html

EXPOSE 4200:80