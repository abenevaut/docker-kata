# SQL Server Service

This exercise is designed to create our first Dockerfile and then our first image to run a node app as a service accessible from the host with [node](https://hub.docker.com/_/node) image.

## Subject

```
RUN chown -R node:node /home/node/app
USER node
```

## Exercise

execute container as node user

<details>
  <summary>Solution</summary>

```Dockerfile
RUN chown -R node:node /home/node/app
USER node
```

```Dockerfile
FROM node:20-slim

WORKDIR /home/node/app

COPY ./app.js .
COPY package*.json .

RUN chown -R node:node /home/node/app
USER node

RUN npm install --only=production

CMD ["node", "/home/node/app/app.js"]

EXPOSE 3000
```

```shell
docker build . -t my-no-app:v2 --no-cache
```

```shell
docker run --rm --init -p 3000:3000 my-no-app:v2
```

visit [http://localhost:3000](http://localhost:3000) to see the app running.

</details>
