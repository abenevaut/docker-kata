# Host a node app with node image

This exercise is designed to create our first `docker-compose.yml` (or `compose.yml`) file and then build & run node app we do in fifth exercice.

## Subject


REMEMBER `docker-compose` is a distinct tool thant `docker` itself


## Exercise

blablabla...

Re-adapt following command in docker-composer to run app

```shell
docker build . -t my-node-app --no-cache
```

```shell
docker run --rm --init -p 3000:3000 my-node-app
```

<details>
  <summary>Solution</summary>

```yml
services:

  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 8000:3000

  redis:
    image: redis:alpine
```

Visit [http://localhost:3000](http://localhost:3000) to see the app running.

</details>
