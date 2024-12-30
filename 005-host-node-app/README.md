# Host a node app with node image

This exercise is designed to create our first Dockerfile and then our first image to run a node app as a service accessible from the host with [node](https://hub.docker.com/_/node) image.

## Subject

we will use node image to run a node app.

let's ready the image description from the [node image doc.](https://hub.docker.com/_/node)

we will inherit from the node image and copy the app.js file to the container and run it with node.

to inherit from node image, we will use the FROM command in Dockerfile.
It defines the starting point for the image build process.
    
```Dockerfile
FROM node:20-slim
```

The image has different tags like `node:20-slim`, `node:20-alpine`, `node:20-buster`, etc.

`node:20-slim` is an example of a tag in a Dockerfile. Tags are used to specify the version of an image to use.
In this case, node:20-slim refers to the node image with version 20 and the slim variant.
Tags help to identify specific versions of images and are useful for ensuring consistency and reproducibility in Docker builds.

the variant `slim` is a smaller version of the image with fewer dependencies, making it more lightweight and suitable for production use.

depending the environment and the dependencies needed, you can choose the appropriate tag for your Dockerfile.


When you choose a base image
- you can set the working directory with the `WORKDIR` instruction.
- you can copy files from the host to the container with the `COPY` instruction.
- you can set the user with the `USER` instruction.
- you can use the `RUN` instruction to execute commands inside the container.
- you can expose ports with the `EXPOSE` instruction.
- you can set the default command to run when the container starts with the `CMD` instruction.





execution path of a Dockerfile?

The execution path of a Dockerfile is from top to bottom.
Each instruction in the Dockerfile is executed in order, building upon the previous steps to create the final image.
The instructions define how the image is built, what dependencies are installed, and how the container should run when started.

to do some commands executions, you (probably) should be in the right directory.
you can use the `WORKDIR` instruction to set the working directory for subsequent commands in the Dockerfile.

If you are not familiar with user management, on linux each user have a home directory.
On node image, the default user is `node` and its home directory is `/home/node`.

In our example, we will use an `app` directory in the `/home/node` directory as base directory for our app.

```Dockerfile
WORKDIR /home/node/app
```

Then we will be able to copy projects file to the container with the `COPY` instruction.
The `COPY` instruction copies files from the host to the container.
It takes two arguments: the source path on the host and the destination path in the container.
```Dockerfile
COPY ./<PATH TO FILE ON HOST> ./<PATH TO FILE IN CONTAINER>
```




## Exercise

use `node:20-slim` image as base image for your Dockerfile.
copy app.js package.json and package-lock.json to the container and run the app.js with node.

<details>
  <summary>Solution</summary>

```Dockerfile
FROM node:20-slim

WORKDIR /home/node/app

COPY ./app.js .
COPY package*.json .

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "/home/node/app/app.js"]
```

```shell
docker build . -t my-node-app --no-cache
```

```shell
docker run --rm --init -p 3000:3000 my-node-app
```

visit [http://localhost:3000](http://localhost:3000) to see the app running.

</details>
