FROM node:20-slim

WORKDIR /home/node/app

COPY ./app.js .
COPY package*.json .

# chown right rights to /home/node/app directory

# use non-root (`node`) user

RUN npm install --only=production

CMD ["node", "/home/node/app/app.js"]

EXPOSE 3000