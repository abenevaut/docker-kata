# FROM scratch

This exercise is designed to create and use our first Docker image FROM [scratch](https://hub.docker.com/_/scratch/).

## Subject

The `main.c` file is a simple "hello world" program written in C.
The program prints the string "Hello, World!" to the standard output.

- [source and more details about the code](https://www.programiz.com/c-programming/examples/print-sentence)

When you compile a C program, the compiler generates an executable file that can be run on the host machine.

The compilation is generally done as dynamically linked, which means that the executable depends on shared libraries installed on the host system.
This allows the executable to be smaller and share common code with other programs.

The following command compiles the `main.c` file into an executable named `hello`, all library dependencies are dynamically linked:
```shell
gcc -o hello main.c
```

However, the generated executable may not work on other machines due to differences in the operating system or library dependencies.

To ensure that the executable runs consistently across different environments, you can compile it statically.
Static linking includes all the necessary library code within the executable, making it larger but self-contained.

Add the `-static` flag to the compilation command to compile the program statically:
```shell
gcc -o hello main.c -static
```

Docker provides a way to create isolated environments for running applications, including compiling and running software.
As one of these ways is to use the `FROM scratch` image, which is an empty image (without operating system) that allows you to build minimal Docker able to run a statically compiled executable.

## Exercise

Here we go, you have to compile the "hello world" program statically, then build and run a Docker image with the compiled executable.

The required Dockerfile is already provided, you just have to compile the program and build the Docker image.

- [docker build image doc.](https://docs.docker.com/reference/cli/docker/image/build/)
- [docker run container doc.](https://docs.docker.com/reference/cli/docker/container/run/)

<details>
  <summary>Solution</summary>

This command executes a Docker container to compile a C program statically using GCC within an isolated environment.

```shell
docker run --rm -v $(shell pwd):/usr/src/myapp -w /usr/src/myapp gcc:latest gcc -o hello /usr/src/myapp/main.c -static
```

Here's a breakdown on what's changed from the previous exercise:

- `gcc -o hello /usr/src/myapp/main.c -static`: The command executed inside the container. It compiles ``main.c`` into an executable named ``hello`` using static linking. Static linking includes all the necessary library code within the executable, making it larger but self-contained.

Overall, this command compiles a C program named ``main.c`` into a statically linked executable called ``hello`` using the GCC compiler within a Docker container, ensuring a consistent compilation environment.

Now, our binary is ready to be used in a Docker image.

This command builds a Docker image using the current directory (where the Dockerfile is located) as the build context.
```shell
docker build . -t hello --no-cache
```

- `docker build`: This is the Docker command used to build an image from a Dockerfile and a "context". The Dockerfile contains all the commands a user could call on the command line to assemble an image.
- `.`: This specifies the build context to the Docker daemon. In this case, refers to the current directory. The build context includes the Dockerfile, any files, and folders in the current directory. These files can be added to the image during the build process.
- `-t hello`: The -t flag assigns a tag to the image, in this case, hello. Tags are used to identify different versions or variants of an image. Without a tag, it would be harder to manage different images and their versions. The hello tag here effectively names the image.
- `--no-cache`: This option tells Docker to build the image without using any cache from previous builds. This can be useful when you want to ensure that you're getting the freshest versions of everything that your Dockerfile instructs to download or add. Without this option, Docker might use cached intermediate images from previous builds, which could lead to outdated components being included in your image.

In summary, this command is used to build a fresh Docker image named hello from the Dockerfile in the current directory, ensuring that no cache is used during the build process. This is particularly useful for ensuring that all the steps in the Dockerfile are executed with the most up-to-date data and instructions, especially when pulling from external sources or when making frequent changes to the Dockerfile.

This command runs a Docker container using the `hello` image.
```shell
docker run --rm hello
```

- `docker run`: This is the Docker command used to create and start a Docker container from a specified image. When you run this command, Docker looks for the specified image locally on your machine. If it doesn't find it, Docker tries to pull it from a configured Docker registry (like Docker Hub).
- `--rm`: This flag automatically removes the container when it exits. Containers can consume disk space, especially if you run many of them over time. Using --rm helps manage disk usage by cleaning up the container file system when the container's process exits. This is particularly useful for temporary or one-off containers that you don't need to persist data or state for future use.
- `hello`: This specifies the name of the image from which the container should be created. In this context, hello refers to an image that likely contains the statically compiled "hello world" program mentioned in the README.md file. This image was previously built using the docker build command with the -t hello option to tag the image as hello.

In summary, this command starts a new container from the hello image, runs the default command specified in the Dockerfile (which, based on the context, would execute the "hello world" program), and then removes the container once the program completes and the container exits. This is a clean and efficient way to run short-lived processes in Docker.

💯 Congratulations! You've successfully displayed "Hello, World!" using a statically compiled C program within a Docker container 🎉
</details>
