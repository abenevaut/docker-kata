# Host a .Net app with Docker

This exercise is designed to create our first Dockerfile and then our first image to run a dotnet app as a service accessible from the host with Visual Studio.

## Subject



![Add dockerfile to project](https://raw.githubusercontent.com/abenevaut/docker-kata/refs/heads/master/006-create-web-api/docs/add-dockerfile.png)


![Follow the setup window to customise Dockerfile details](https://raw.githubusercontent.com/abenevaut/docker-kata/refs/heads/master/006-create-web-api/docs/add-dockerfile-details.png)


Dockerfile

```Dockerfile
# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["006-web-api.csproj", "."]
RUN dotnet restore "./006-web-api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./006-web-api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./006-web-api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "006-web-api.dll"]
```

.dockerignore

```
**/.classpath
**/.dockerignore
**/.env
**/.git
**/.gitignore
**/.project
**/.settings
**/.toolstarget
**/.vs
**/.vscode
**/*.*proj.user
**/*.dbmdl
**/*.jfm
**/azds.yaml
**/bin
**/charts
**/docker-compose*
**/Dockerfile*
**/node_modules
**/npm-debug.log
**/obj
**/secrets.dev.yaml
**/values.dev.yaml
LICENSE
README.md
!**/.gitignore
!.git/HEAD
!.git/config
!.git/packed-refs
!.git/refs/heads/**
```

launchSetting.json

```json
{
  "profiles": {


    "Container (Dockerfile)": {
      "commandName": "Docker",
      "launchBrowser": true,
      "launchUrl": "{Scheme}://{ServiceHost}:{ServicePort}/swagger",
      "environmentVariables": {
        "ASPNETCORE_HTTPS_PORTS": "8081",
        "ASPNETCORE_HTTP_PORTS": "8080"
      },
      "publishAllPorts": true,
      "useSSL": true
    }


  },
  
  ...

}
```

![Hit the Docker start up button to run docker container](https://raw.githubusercontent.com/abenevaut/docker-kata/refs/heads/master/006-create-web-api/docs/run-docker.png)

![Swagger describe our API](https://raw.githubusercontent.com/abenevaut/docker-kata/refs/heads/master/006-create-web-api/docs/swagger-run.png)

## Exercise

Open Visual Studio and create a new project add apply this document to it to generate a Dockerfile and run the app in a container.

<details>
  <summary>Solution</summary>



visit [http://localhost:3000](http://localhost:3000) to see the app running.

</details>
