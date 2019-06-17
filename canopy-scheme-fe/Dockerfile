FROM node:8-alpine
RUN mkdir /www
WORKDIR /www
RUN mkdir /www/app
COPY . /www/app/
RUN cd /www/app && npm install && npm run build
RUN mv /www/app/build/* /www/ && rm -r /www/app
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-l", "5000", "--single"]