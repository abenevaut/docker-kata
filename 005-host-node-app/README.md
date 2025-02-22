# Host a node app with node image

This exercise is designed to create our first Dockerfile and then our first image to run a node app as a service accessible from the host with [node](https://hub.docker.com/_/node) image.

## Subject

We will use node image to run a node app.

Let's read the image description from the [node image doc.](https://hub.docker.com/_/node)

We will inherit from the node image and copy the app.js file to our image and run it with node.

To inherit from node image, we will use the FROM command in Dockerfile.
It defines the starting point for the image build process.
    
```Dockerfile
FROM node:20-slim
```

The image has different tags like `node:20-slim`, `node:20-alpine`, `node:20-buster`, etc.

`node:20-slim` is an example of a tag in a Dockerfile. Tags are used to specify the version of an image to use.
In this case, node:20-slim refers to the node image with version 20 and the slim variant.
Tags help to identify specific versions of images and are useful for ensuring consistency and reproducibility in Docker builds.

The variant `slim` is a smaller version of the image with fewer dependencies, making it more lightweight and suitable for production use.

Depending on the environment and the dependencies needed, you can choose the appropriate tag for your Dockerfile.

When you choose a base image
- you can set the working directory with the `WORKDIR` instruction.
- you can copy files from the host to the image with the `COPY` instruction.
- you can set the user who will be used for execute scripts, commands & servers with the `USER` instruction.
- you can use the `RUN` instruction to execute commands during image build process.
- you can expose ports with the `EXPOSE` instruction.
- you can set the default command to run when the container starts with the `CMD` instruction.

Execution path of a Dockerfile?

The execution path of a Dockerfile is from top to bottom.
Each instruction in the Dockerfile is executed in order, building upon the previous steps to create the final image.
The instructions define how the image is built, what dependencies are installed, and how the container should run when started.

To do some commands executions, you (probably) should be in the right directory.
You can use the `WORKDIR` instruction to set the working directory for subsequent commands in the Dockerfile.

If you are not familiar with user management, on linux each user have a home directory.
On node image, the default user is `node` and its home directory is `/home/node`.

In our example, we will use an `app` directory in the `/home/node` directory as base directory for our app.

```Dockerfile
WORKDIR /home/node/app
```

Note that we already saw the `WORKDIR` instruction in command line when using gcc image to compile a C program (`docker run --rm <blahblah> -w /usr/src/myapp gcc:latest gcc <blahblah>`).
So remember we can override the working directory with `-w` option in `docker run` command.

Then we will be able to copy projects file to the image with the `COPY` instruction.
The `COPY` instruction copies files from the host to the image.
It takes two arguments: the source path on the host and the destination path in the image.
```Dockerfile
COPY ./<PATH TO FILE ON HOST> ./<PATH TO FILE IN IMAGE>
```

Note that we generally copy sources in the image when we build an image for testing or production purposes.
You will not be able to edit sources files and see the changes in the container without rebuilding the image.


## Exercise

In this directory, you will find an `app.js` file, a `package.json` file and a `package-lock.json` file.
This app is already working, you should `npm install` to install dependencies and `node app.js` to run the app.
You can visit [http://localhost:3000](http://localhost:3000) to see the app running.

Constitute a Dockerfile to build an image to run the node app. A file `example.Dockerfile` is provided to help you.
- Use `node:20-slim` image as base image for your Dockerfile
- Copy `app.js`, `package.json` & `package-lock.json` to the image
- Run the `app.js` with node

Finally, build the image and run a container with the image.

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

Visit [http://localhost:3000](http://localhost:3000) to see the app running.

</details>
