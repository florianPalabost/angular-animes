FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app
COPY ./package-lock.json /usr/src/app
RUN npm install --only=dev
RUN npm install -g nodemon
COPY . /usr/src/app
EXPOSE 3001
CMD ["npm","start"]
