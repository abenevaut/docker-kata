# Host a node app with node image

This exercise is designed to create our first `docker-compose.yml` (or `compose.yml`) file and then build & run a node app.

## Subject

`docker compose` is a sub-command of `docker` that allows you to define and run multi-container.
With `docker compose`, you use a YAML file to configure your application’s services.
Then, with a single command, you create and start all the services from your configuration.

So far, we have seen how to pull or build and run a single container and some variations with arguments to customize the image build or container run.

Now, let's see how to define a multi-container application with `docker compose`.

Everything starts with a `docker-compose.yml` or a `compose.yml` file.
`docker compose` will look for this file in the current directory.
In this file, you can define the services you want to run, the image to use, the ports to expose, the volumes to mount, the environment variables to set, and more.

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

Note: In older versions of Docker Compose, it was necessary to specify the version of the YAML file. This is no longer required.

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

When you start both services, they can communicate with each other. The `app` service can reach the `redis` service using the hostname `redis`, and the `redis` service can reach the `app` service using the hostname `app`.
By default, the services are isolated from each other, but `docker compose` define a network to allow them to communicate. If needed, more networks can be defined.

Containers communicating through a network don’t need to expose ports to the host. They can communicate directly over the network and use the container's default ports.

Like `docker run`, `docker compose` can also set environment variables, volumes, etc.

```yml
services:

  redis:
    image: redis:alpine
    environment:
      - MY_CUSTOM_ENV_VAR=everything-you-want-1234 # to apply your configuration
    volumes:
      - /docker/host/dir:/data # to apply your persistence strategies
```

But, how to build and run services ? Let's start & run many containers:

```shell
# Start services in the terminal
docker-compose up

# Start services as daemon
docker-compose up -d

# Stop services
docker-compose down

# Build services
docker-compose build

# Rebuild services
docker-compose up --build

# List services
docker-compose ps

# List services logs
docker-compose logs
````

Now to build & run one container at a time:

```shell
# Start a service
docker-compose up -d <service>

# Build a service
docker-compose build <service>

# Rebuild a service
docker-compose up -d --build <service>

# List a service logs
docker-compose logs <service>

# Execute a command in a service’s container
docker-compose exec <service> <command>
docker-compose exec <service> /bin/bash
docker-compose exec <service> node -v
```

The whole documentation is available [here](https://docs.docker.com/compose/compose-file/).

## Exercise

Duplicate the `example.docker-compose.yml` file and name it `docker-compose.yml` then update it to run a node app with a redis service.

The node app is a simple express app that listen on port 3000.

This app communicate with a redis service to store/retrieve data.
The app calls the Redis service by its hostname, which is set via the `REDIS_HOST` environment variable.
That should be configurable to be able to switch between the local docker environment and production environment. 

Followings are the steps to achieve this exercise without using `docker compose`:

```shell
docker network create my-network --driver bridge
docker build . -t my-node-app
docker run -d -p 8000:3000 -e REDIS_HOST=my-redis --network my-network my-node-app
docker run -d --name my-redis --network my-network redis:alpine
```

To stop and remove the containers & network

```shell
docker rm my-node-app my-redis
docker network rm my-network
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
    environment:
      - REDIS_HOST=redis

  redis:
    image: redis:alpine
```

Visit [http://localhost:8000](http://localhost:8000) to see the application running.

</details>
