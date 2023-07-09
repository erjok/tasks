# Wizard World CLI (wizwo)

This repository contains .NET command line tool **wizwo** used to interact with Wizard World [API](https://wizard-world-api.herokuapp.com/swagger/index.html) and query all kinds of information relating to the Harry Potter universe.

# Installation

## Docker CLI image
The [Wizard World CLI image](https://hub.docker.com/repository/docker/likbez/wizardworld-cli/general) contains the .NET SDK with Wizard World CLI installed as a
.NET global tool **wizwo**.

### Running the CLI image

The Wizard World CLI can be executed from the Docker CLI with the `docker run` command:

```shell
docker run --rm -it likbez/wizardworld-cli
```

For any Wizard World CLI command you can run its `help` command to get help information about the command:

```shell
docker run --rm -it likbez/wizardworld-cli get elixirs -h
```

In order to shorten the length of docker commands, you can add an alias or create PowerShell function:

```PowerShell
Function wizwo { docker run --rm -it likbez/wizardworld-cli $args }
```

This will allow you to run the Wizard World CLI from within a Docker container as if
it was installed on the host system:

```shell
wizwo get ingredients
```

### Building the CLI image
You can build the CLI image using Docker Compose: 

1. Navigate to the repository root folder.
2. Run the following command within that folder:
    
    ```shell
    docker compose build cli
    ```
     
    This command builds the `cli` service specified in the `docker-compose.yml` file 
and creates `wizardworld-cli` image tagget `latest` and `0.2.2`.

Alternatively, you can build the CLI image from the CLI Dockerfile:

1. Navigate to the *\src\WizardWorld.Tools.Cli* folder.
2. Run the following command within that folder:

    ```shell
    docker build -t wizardworld-cli .
    ```

    This command builds the `wizardworld-cli` image tagged `latest`.

## .NET tool

### Prerequisites
You will need .NET Core SDK 7 or above.

### Installing CLI from nuget
1. Install the tool from the nuget package by running the [dotnet tool install](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install) command

    ```shell
    dotnet tool install --global WizardWorld.Cli
    ```