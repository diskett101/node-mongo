FROM node:10

RUN apt-get update

RUN apt-get install -y vim

ADD ./api-app /app

WORKDIR /app

RUN ls -las /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
