# FROM node:14-alpine
FROM node:14.16.1-alpine3.13

RUN apk update && apk upgrade

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install for bcrpyt
RUN apk add --no-cache python3
RUN apk add --no-cache --virtual builds-deps
RUN apk add --no-cache build-base

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install --prod
# RUN npm rebuild bcrypt --build-from-source

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
