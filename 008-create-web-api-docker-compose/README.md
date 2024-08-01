# Docker kata

```
docker build \
	-f "D:\projects\dev.abenevaut\docker-kata\004-web-api-docker-composer\Dockerfile" \
	--force-rm \
	-t image004webapidockercomposer:dev \
	--target base  \
	--build-arg "BUILD_CONFIGURATION=Debug" \
	--label "com.microsoft.created-by=visual-studio" \
	--label "com.microsoft.visual-studio.project-name=004-web-api-docker-composer" \
	"D:\projects\dev.abenevaut\docker-kata\004-web-api-docker-composer"
```
