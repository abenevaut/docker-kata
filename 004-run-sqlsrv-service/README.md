# FROM scratch

This exercise is designed to create and use our first Docker service with [the redis](https://hub.docker.com/_/redis/) image.

## Subject

Redis is a popular in-memory data structure store, used as a database, cache, and message broker.
We will focus the cache usage of Redis, as a key-value store.

## Exercise

Pull and run the Redis image as a background service, running on port 1337.
Inspirate from the [docker run doc.](https://docs.docker.com/reference/cli/docker/container/run/), the [redis image doc.](https://hub.docker.com/_/redis/) and the [starter-kit](../000-starter-kit/README.md) if needed.

<details>
  <summary>Solution</summary>

```shell
docker run -d -p 1337:6379 --name redis redis:latest
```

</details>
