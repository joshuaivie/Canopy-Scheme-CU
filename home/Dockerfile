FROM node:8-alpine
RUN mkdir /www
WORKDIR /www
COPY . /www/
RUN npm install -g serve
EXPOSE 3001
CMD ["serve", "-l", "3001", "--single"]