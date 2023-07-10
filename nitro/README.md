# Wizard World CLI (wizwo)

This repository contains .NET command line tool **wizwo** used to interact with Wizard World [API](https://wizard-world-api.herokuapp.com/swagger/index.html) and query all kinds of information relating to the Harry Potter universe.

## Installation

### Docker CLI image
The [Wizard World CLI image](https://hub.docker.com/repository/docker/likbez/wizardworld-cli/general) contains the .NET SDK with Wizard World CLI installed as a
.NET global tool **wizwo**. You can download this image from Docker Hub, or you can use the source code from this repository to build the CLI image.

#### Prerequisites
[Docker Descktop](https://docs.docker.com/get-docker/) is required to run containerized applications.

#### Running the CLI image

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

#### Building the CLI image
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

### .NET tool
The Wizard World CLI can be installed on the host system as a .NET Core tool. 
You can install CLI from nuget package [WizardWorld.Cli](https://www.nuget.org/packages/WizardWorld.Cli/). 
Alternatively, you can use the source code from this repository to build and install the CLI package.

#### Prerequisites
You will need [.NET Core SDK 7](https://dotnet.microsoft.com/en-us/download) or above.

#### Installing CLI from the nuget package
1. Install the tool from the nuget package by running the [dotnet tool install](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install) command

    ```shell
    dotnet tool install --global WizardWorld.Cli
    ```
    The output shows the command used to call the tool and the version installed:
 
    ```Console
    You can invoke the tool using the following command: wizwo
    Tool 'wizardworld.cli' (version '0.2.2') was successfully installed.
    ```

#### Packing and installing CLI from the local package
1. Navigate to the *\src\WizardWorld.Tools.Cli* folder.
2. Run the following command within that folder:

    ```shell
    dotnet pack
    ```
   
   The *WizardWorld.Cli.0.2.2.nupkg* file is created in the *.\nupkg* folder.
3. Run the following command
    ```shell
    dotnet tool install --global --add-source ./nupkg WizardWorld.Cli
    ```
   The output shows the command used to call the tool and the version installed:
 
    ```Console
    You can invoke the tool using the following command: wizwo
    Tool 'wizardworld.cli' (version '0.2.2') was successfully installed.
    ```

## Available Commands
Wizard World CLI command has the following structure:

```shell
wizwo <command> <subcommand> [options and arguments]
```

For any Wizard World CLI command you can run its `help` command to get help information about the command:

```shell
wizwo get elixirs -h
```

The output shows the `get elixirs` command help:

```Console
Description:
  Displays elixirs (potions) that can be created in the universe.

Usage:
  wizwo get elixirs [options]

Options:
  -i, --ingredients <ingredients>  One or more ingredients available to create elixirs.
  --uri <uri>                      Wizard World API Uri. [default: https://wizard-world-api.herokuapp.com/]
  -?, -h, --help                   Show help and usage information
```

By default, the CLI connects to the Wizard World API running at https://wizard-world-api.herokuapp.com. 
Use the `--uri` option to configure API connection:

```shell
wizwo --uri http://localhost:3000 get ingredients
```

#### Get Ingredients
```shell
wizwo get ingredients
```
Gets an ordered list of the names of all ingredients.

#### Get Elixirs
```shell
wizwo get elixirs
```
Gets an ordered list of the names of all elixirs.

```shell
wizwo get elixirs -i "Nagini's venom" "Unicorn blood"
```
Gets an ordered list of the names of elixirs that can be created from the given ingredients.

```shell
wizwo get elixirs -i ""
```
Gets an ordered list of the names of elixirs that require no ingredients to create.

## Overview of the Approach

The Wizard World CLI has been developed using an increamenal and iterative approach. 
Incremental development builds a system feature by feature, instead of buidling all the layers and components and integrating them at the end.
Iterative development progressively refines the implementations of features in response to feedback until they are good enough.

The implementation of each feature began with writing an acceptance test that tested the required functionality.
Acceptance tests exercised the application end-to-end by interacting with system only from the outside.
Until the acceptance test passed, it showed that the system did not yet implement this feature.
A system is deployable when the acceptance tests all pass, because they give confidence that everything works. 

### Test infrastructure
Main components of the test infrastructure are:
1. `WizardWorldCliDriver` is an object that wraps up all communication with the Wizard World CLI application. 
   It runs the application as if from the command line, invokes commands, and captures application output.
2. Dummy `WizardWorld.API` service - a Node.js application that was generatated by Postman from the Wizard World Api [OpenAPI](https://wizard-world-api.herokuapp.com/swagger/v1/swagger.json) specification.
   It returns pre-configured dummy data for ingredients and elixirs endpoints.

### Running acceptance tests
1. Navigate to the repository root folder.
2. Run the PowerShell script `Run-AcceptanceTests.ps1`

Alternatively, you can execute script steps manually:

1. Run the following command:
    ```shell
    docker compose build cli
    ```
    This command builds the docker image with latest version of Wizard World CLI installed as a global .NET tool.

2. Run the following command:
    ```shell
    docker compose run --build tests
    ```
    This command builds and runs acceptance tests on top of the Wizard World CLI image. 
    It also starts the dummy Wizard World API service that the tests depend on.

3. Run the following command:
    ```shell
    docker compose down
    ```
    This command stops the dummy Wizard World API service and removes running containers.
 
### Libraries used
- [Refit](https://www.nuget.org/packages/Refit/) - library that generates REST API clients.
- [System.CommandLine](https://www.nuget.org/packages/System.CommandLine) - powerful command line parser.
