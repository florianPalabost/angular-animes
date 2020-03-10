FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY ./package-lock.json /usr/src/app
RUN npm install --only=dev
COPY . /usr/src/app
RUN npm install -g @angular/cli
RUN npm rebuild node-sass
EXPOSE 8080
CMD ["node","server.js"]
