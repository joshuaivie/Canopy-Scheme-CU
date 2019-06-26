FROM node:8-alpine
RUN mkdir /www
WORKDIR /www
COPY package.json /www/
COPY package-lock.json /www/
RUN npm install
COPY . /www/
RUN npm i -g @adonisjs/cli
CMD ["npm", "start"]