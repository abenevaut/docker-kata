# Host a node app with node image

This exercise is designed to create our first `docker-compose.yml` (or `compose.yml`) file and then build & run a node app.

## Subject

`docker compose` is a sub-command of `docker` that allows you to define and run multi-container.
With `docker compose`, you use a YAML file to configure your application’s services.
Then, with a single command, you create and start all the services from your configuration.

So far we have seen how to pull or build and run a single container and some variations with arguments to customize the image build or container run.

Now, let's see how to define a multi-container application with `docker compose`.

Everything start with a `docker-compose.yml` or a `compose.yml` file, `docker compose` will look for this file in the current directory.
In this file, you can define the services you want to run, the image to use, the ports to expose, the volumes to mount, the environment variables to set, etc.

Here is an example to run a redis service, previously seen in the [003-run-redis-service](../003-run-redis-service/README.md) exercise:

```shell
docker run -d -p 1337:6379 --name my-redis redis:alpine
```

Below is the equivalent `docker-compose.yml` file:

```yml
services:

  redis:
    image: redis:alpine
    container_name: my-redis
    ports:
      - 1337:6379
```

Note: few previous versions needs to precise the version of the YAML file, but now it's not necessary anymore.

Compose command is also able to build image from a Dockerfile, here is an example to build our node app:

```yml
services:

  app:
    build:
      context: .
      dockerfile: Dockerfile

  redis:
    image: redis:alpine
```

When starting both services, they are able to communicate with each other, the `app` service can reach the `redis` service by using the hostname `redis` and the `redis` service can reach the `app` service by using the hostname `app`.
By default, the services are isolated from each other, but `docker compose` define a network to allow them to communicate. If needed, more networks can be defined.

Containers communicating though a network does not need to expose ports to the host, they can communicate through the network and container default ports.

Like `docker run`, `docker compose` can also set environment variables, volumes, etc.

```yml
services:

  app:
    build:
      context: .
      dockerfile: Dockerfile

  redis:
    image: redis:alpine
    environment:
      - MY_CUSTOM_ENV_VAR=everything-you-want-1234 # to apply your configuration
    volumes:
      - /docker/host/dir:/data # to apply your persistence strategies
```

The whole documentation is available [here](https://docs.docker.com/compose/compose-file/).

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
