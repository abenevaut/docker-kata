# Hello, World!

This is a simple hello world program written in C.
The program prints the string "Hello, World!" to the standard output.

- https://www.programiz.com/c-programming/examples/print-sentence


<details>
  <summary>Solution</summary>

```shell
docker run --rm -v $(shell pwd):/usr/src/myapp -w /usr/src/myapp gcc:latest gcc -o hello /usr/src/myapp/main.c -static
```

This command executes a Docker container to compile a C program statically using GCC within an isolated environment. Here's a breakdown:

- `docker run`: Runs a command in a new container.
- `--rm`: Automatically removes the container when it exits. This cleans up any resources used by the container.
- `-v $(shell pwd):/usr/src/myapp`: Mounts the current directory ($(shell pwd)) on the host to /usr/src/myapp inside the container. This allows the container to access the host's file system, specifically the directory where the main.c file resides.
- `-w /usr/src/myapp`: Sets the working directory inside the container to /usr/src/myapp. This is where the command will be executed.
- `gcc:latest`: Specifies the Docker image to use, in this case, the latest version of the GCC image from Docker Hub. This image has GCC installed and is used to compile C programs.
- `gcc -o hello /usr/src/myapp/main.c -static`: The command executed inside the container. It compiles main.c into an executable named hello using static linking. Static linking includes all the necessary library code within the executable, making it larger but self-contained.

Overall, this command compiles a C program named main.c into a statically linked executable called hello using the GCC compiler within a Docker container, ensuring a consistent compilation environment.
</details>
