FROM node:6.6.0
MAINTAINER Jason Waldrip <jason@waldrip.net>

# Vars
ENV PORT 3000
EXPOSE $PORT

RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY package.json /app/package.json
RUN npm install

# Copy App
COPY . /app

# Set Command
CMD npm start
