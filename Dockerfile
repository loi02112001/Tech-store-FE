# Build stage
FROM node:18.20.2 as build

WORKDIR /techStore

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Run stage
FROM nginx:latest as deploy

COPY --from=build /techStore/dist /techStoreApplication

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]