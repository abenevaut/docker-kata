# Create a Web API with Docker Compose

This exercise is designed to create our first `docker-compose.yml` (or `compose.yml`) file and then build & run a dotnet app.

## Subject

blabla

## Exercise

blabla

<details>
  <summary>Solution</summary>

```
docker build \
	-f "D:\projects\dev.abenevaut\docker-kata\008-web-api-docker-composer\Dockerfile" \
	--force-rm \
	-t image008webapidockercomposer:dev \
	--target base  \
	--build-arg "BUILD_CONFIGURATION=Debug" \
	--label "com.microsoft.created-by=visual-studio" \
	--label "com.microsoft.visual-studio.project-name=008-web-api-docker-composer" \
	"D:\projects\dev.abenevaut\docker-kata\008-web-api-docker-composer"
```

visit [http://localhost:3000](http://localhost:3000) to see the app running.

</details>
