FROM node:6.11.0

RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app

COPY . .

CMD ["npm", "start"]