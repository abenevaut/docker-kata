all:
	gcc -o hello main.c

static:
	gcc -o hello main.c -static

docker:
	docker run --rm -v $(shell pwd):/usr/src/myapp -w /usr/src/myapp gcc:latest gcc -o hello /usr/src/myapp/main.c -static
