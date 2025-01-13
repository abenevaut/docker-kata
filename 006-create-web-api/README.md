# Host a .Net app with Docker

This exercise is designed to create our first Dockerfile and then our first image to run an existing  Visual Studio dotnet app as a service accessible from the host.

## Subject

First of all, remember to update Visual Studio to the latest version.
The example accompanying this course is a simple web API project based on "ASP.NET Core Web Api" template (with .NET 8.0).

In your Visual Studio project, create a Dockerfile by right-clicking on the project and selecting "Add" > "Docker Support". 

![Add dockerfile to project](https://raw.githubusercontent.com/abenevaut/docker-kata/refs/heads/master/006-create-web-api/docs/add-dockerfile.png)

A setup window will appear to customise the Dockerfile details.

You are able to choose the "target OS", linux or windows and the "Image Distro", the distribution of the image, for example, "Debian" or "Alpine".
You can also the solution for which the Dockerfile will be created, the project to run in the container and the target framework.

![Follow the setup window to customise Dockerfile details](https://raw.githubusercontent.com/abenevaut/docker-kata/refs/heads/master/006-create-web-api/docs/add-dockerfile-details.png)

The generated `Dockerfile` will look like following.
This is a multi-stages `Dockerfile`, which means the first stage is used to build the project and the second stage is used to publish the project.
The final stage is used to run the project.
Like this, the final image is smaller because it only contains the necessary files to run the project.

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

The generated Dockerfile come also with a `.dockerignore` file to exclude unnecessary files from the image.

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

The last action that did is to add settings to run Docker in `launchSetting.json` file.

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

The application launch button now contains a new option to run the app in a container "Container (Dockerfile)".
Hit it to run the app in a container.

![Hit the Docker start up button to run docker container](https://raw.githubusercontent.com/abenevaut/docker-kata/refs/heads/master/006-create-web-api/docs/run-docker.png)

If everything is ok, the app will be running in a container and a new edge instance will open to show the app.
The chosen template expose a swagger interface to describe the API and expose the API endpoints.

![Swagger describe our API](https://raw.githubusercontent.com/abenevaut/docker-kata/refs/heads/master/006-create-web-api/docs/swagger-run.png)

## Exercise

Open Visual Studio, open an existing project OR create a new project then apply this document to it to generate a Dockerfile and run the app in a container.

<details>
  <summary>Solution</summary>

The is not much to do to run the app in a container.

Following, which project template to choose to create a new project in Visual Studio.

![Swagger describe our API](https://raw.githubusercontent.com/abenevaut/docker-kata/refs/heads/master/006-create-web-api/docs/create-new-project-2.png)

Then, right-click on the project and re-do the Dockerfile setup in this subject.

</details>
