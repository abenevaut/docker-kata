# Hello, World!

This exercise is designed to introduce the use of binary software though Docker.

## Subject

The `main.c` file is a simple "hello world" program written in C.
The program prints the string "Hello, World!" to the standard output.

- [source and more details about the code](https://www.programiz.com/c-programming/examples/print-sentence)

Compiling a C program requires a compiler, such as [GCC](https://gcc.gnu.org/) or [CL](https://learn.microsoft.com/en-us/cpp/build/reference/compiler-command-line-syntax?view=msvc-170), to generate an executable file that can be run on the host machine.

Compilers are generally different from one operating system to another, and compiled executables too.
The generated executable may not work on other machines due to differences in the operating system or library dependencies.

On Linux, the GCC compiler is commonly used to compile C programs.
```shell
gcc -o hello main.c
```

On Windows, the CL compiler is commonly used to compile C programs.
```shell
cl /Fe:hello.exe main.c
```

Docker provides a way to create isolated environments that can be used to compile software the same way on different machines.

To re-use existing services, you can use images from the Docker Hub, like we will do with the GCC image.
Images are pre-built packages that contain everything needed to run a service, including the application code, dependencies, and configuration.

So the GCC image is a pre-built package that contains the GCC compiler and all its dependencies.
You will be able to execute GCC commands inside a container using this image by command line with docker.

The only thing we need to do is to mount the source code to the container, execute the compiler inside the container and get the compiled binary back to the host.

## Exercise

Here we go, you have to compile the "hello world" program with a Docker container.

I encourage you to use the GCC image from Docker Hub.
- [GCC image](https://hub.docker.com/_/gcc)

<details>
  <summary>Solution</summary>

This command executes a Docker container to compile a C program dynamically using GCC within an isolated environment.

> Take careful note of the part of the sentence "within an isolated environment".
> GCC will be executed in a container, and the compiled binary will be available on the host machine.
> To get this binary, you will have to mount a directory to the container.

```shell
docker run --rm -v $(shell pwd):/usr/src/myapp -w /usr/src/myapp gcc:latest gcc -o hello /usr/src/myapp/main.c
```

Here's a breakdown of the command:

- `docker run`: Runs a command in a new container.
- `--rm`: Automatically removes the container when it exits. This cleans up any resources used by the container.
- `-v $(shell pwd):/usr/src/myapp`: Mounts the current directory (``$(shell pwd)`` on Windows, `$PWD` on Linux) on the host to /usr/src/myapp inside the container. This allows the container to access the host's file system, specifically the directory where the ``main.c`` file resides.
- `-w /usr/src/myapp`: Sets the working directory inside the container to ``/usr/src/myapp``. This is where the command will be executed.
- `gcc:latest`: Specifies the Docker image to use, in this case, the latest version of the GCC image from Docker Hub.
- `gcc -o hello /usr/src/myapp/main.c`: The command executed inside the container. It compiles ``main.c`` into an executable named ``hello`` using dynamic linking.

Overall, this command compiles a C program named ``main.c`` into a dynamic linked executable called ``hello`` using the GCC compiler within a Docker container, ensuring a consistent compilation environment.

💯 Congratulations! You have compiled a C program using Docker 🎉
</details>
