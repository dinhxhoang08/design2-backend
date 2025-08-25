FROM node:22.18
USER root
ENV TZ "Asia/Ho_Chi_Minh"
COPY . /app/
RUN cd /app/ && npm install
WORKDIR /app
ENTRYPOINT node server.js
