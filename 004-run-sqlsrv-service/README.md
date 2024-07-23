# SQL Server Service

This exercise is designed to mount a volume to persist data in a Docker service with [the azure sql edge](https://hub.docker.com/r/microsoft/azure-sql-edge) image. 

## Subject

Azure sql edge is a cloud-based relational database service.

## Exercise

Pull and run the Azure sql edge image twice as a background service.

- The first service should persist data in a docker volume.
- The second service should persist data in a mounted directory from the host.

Inspirate from the [docker run doc.](https://docs.docker.com/reference/cli/docker/container/run/), the [azure sql edge image doc.](https://hub.docker.com/r/microsoft/azure-sql-edge) and the [starter-kit](../000-starter-kit/README.md) if needed.

<details>
  <summary>Solution</summary>

With a volume
```shell
docker volume create sqlsrv-data
docker run -d -p 1433:1433 --name sqlsrv -v sqlsrv-data:/var/opt/mssql mcr.microsoft.com/azure-sql-edge
```

With a mounted directory from host
```shell
docker run -d -p 1433:1433 --name sqlsrv -v /path/to/host/directory:/var/opt/mssql -e 'ACCEPT_EULA=1' -e 'MSSQL_SA_PASSWORD=yourStrong(!)Password' mcr.microsoft.com/azure-sql-edge
```
</details>
