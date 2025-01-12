# SQL Server Service

This exercise will lead to set up correctly the user and rights to run the container. 

## Subject

### Update dependencies

Ensure that your dependencies are up-to-date and free from known vulnerabilities.

### Scan for vulnerabilities

Regularly scan your images for vulnerabilities using tools like Clair, Trivy, or Docker's built-in scanning.

### Minimize the attack surface

Use a minimal base image to reduce the number of potential vulnerabilities.
We are using `node:20-slim`, which is a good choice rather than `node:20`, which is a full-fledged image.

### Use multi-stage builds

To reduce the size of the final image and remove unnecessary build dependencies.
This way to build the image will help you to remove dependencies and files only needed for the build.

```Dockerfile
# First stage: Build environment
FROM node:20-slim AS builder

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install --only=production

COPY ./app.js .

# Second stage: Runtime environment
FROM node:20-slim

WORKDIR /home/node/app

COPY --from=builder /home/node/app .

CMD ["node", "/home/node/app/app.js"]

EXPOSE 3000
```

### Use a non-root user

In Docker, using `USER 1000` is a way to specify that the container should run as a non-root user with the user ID (UID) 1000.
This is a common practice to enhance security by avoiding running containers as the root user, which has unrestricted access to the system.

Here is an example of how to use `USER 1000` in a Dockerfile:

```Dockerfile
RUN groupadd --force -g 1000 nodeapp
RUN useradd -ms /bin/bash --no-user-group -g 1000 -u 1000 nodeapp

RUN chown -R 1000:1000 /home/node/app
USER 1000
```

In a `docker-compose.yml` file, you can specify the user and group for a service like this:

```yml
services:
  app:
    image: my-node-app
    user: "1000:1000" # "UID:GID"
    group_add:
      - "1000"
```

By inheritance, the user `node` is already created in the `node` image, so you can use it directly.

```Dockerfile
RUN chown -R node:node /home/node/app
USER node
```

### Set environment variables securely

Avoid hardcoding sensitive information in the Dockerfile.
Use Docker secrets or environment variables.

```shell
docker run -d -p 8000:3000 -e REDIS_HOST=my-redis --network my-network my-node-app
```

In this example:

- `-e REDIS_HOST=my-redis` sets the `REDIS_HOST` environment variable to `my-redis`

### Limit resource usage

Use Docker's resource constraints to limit the CPU and memory usage of your container.

```shell
docker run -d --name my-node-app --cpus="1.0" --memory="512m" my-node-app
```

In this example:  
- `--cpus="1.0"` limits the container to use at most one CPU
- `--memory="512m"` limits the container to use at most 512 MB of memory

You can also specify resource limits in a `docker-compose.yml` file:

```yaml
services:
  app:
    image: my-node-app
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: '512M'
```

## Exercise

Execute container as Node user. You do not need to use multi-stage builds, but you can use it if you want.

<details>
  <summary>Solution</summary>

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
docker build . -t my-node-app --no-cache
docker run --rm --init -p 3000:3000 my-node-app
```

visit [http://localhost:3000](http://localhost:3000) to see the app running.

</details>
