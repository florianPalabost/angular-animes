FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app
COPY ./package-lock.json /usr/src/app
RUN npm install --only=dev
COPY . /usr/src/app
EXPOSE 3001
CMD ["npm","start"]
