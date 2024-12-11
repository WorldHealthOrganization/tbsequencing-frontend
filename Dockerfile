FROM node:17.4.0-alpine as builder
WORKDIR /app
COPY package.json /app/

ENV NODE_ENV=development
ENV TSC_COMPILE_ON_ERROR=true
ENV ESLINT_NO_DEV_ERRORS=true
ARG REACT_APP_SERVER_ENDPOINT

RUN npm install -g npm@8.12.2 typescript react-scripts@3.4.1
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]