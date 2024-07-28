# Are you Redis ?

This exercise is designed to create and use our first Docker service with [the redis](https://hub.docker.com/_/redis/) image.

## Subject

Docker provides a way to create isolated environments that can be used to run services the same way on different machines.

Redis is a popular in-memory data structure store, used as a database, cache, and message broker.
We will focus the cache usage of Redis, as a key-value store.

## Exercise

Here we go, you have to run and connect to your own Redis server using Docker.

- [Redis image](https://hub.docker.com/_/redis)

Pull and run the Redis image as a background service, running on port 1337.
Inspirate from the [docker run doc.](https://docs.docker.com/reference/cli/docker/container/run/), the [redis image doc.](https://hub.docker.com/_/redis/) and the [starter-kit](../000-starter-kit/README.md) if needed.

<details>
  <summary>Solution</summary>

This command executes a Docker container to compile a C program dynamically using GCC within an isolated environment.

```shell
docker run -d -p 1337:6379 --name my-redis redis:latest
```

Explanation of options:
- `--name my-redis`: Assigns a name to the container to make it easier to identify. Here, the container is named "my-redis".
- `-d`: Runs the container in the background (detached mode).
- `-p 1337:6379`: Maps port 6379 of the container to port 1337 of the host. This allows applications on the host to access Redis in the container using port 1337.

💯 Congratulations! You have run a redis server using Docker 🎉
</details>
