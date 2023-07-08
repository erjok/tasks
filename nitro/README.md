# Wizard World CLI (wizwo)

This repository contains .NET command line tool **wizwo** used to interact with Wizard World [API](https://wizard-world-api.herokuapp.com/swagger/index.html) and query all kinds of information relating to the Harry Potter universe.

# Installation

## Docker CLI image

### Building the CLI image

1. Navigate to the repository root folder.
2. Run the following command within that folder:
    
    ```shell
    docker compose build cli
    ```
     
    This command builds the `cli` service specified in the `docker-compose.yml` file 
and creates `wizardworld/cli` image tagget `latest` and `0.2.2`.

Alternatively, you can manually build the CLI image:

1. Navigate to the *\src\WizardWorld.Tools.Cli* folder.
2. Run the following command within that folder:

    ```shell
    docker build -t wizardworld/cli .
    ```

    This command builds the `wizardworld/cli` image from the CLI Dockerfile.

### Running the CLI image

The Wizard World CLI can be executed from the Docker CLI with the `docker run` command:

```shell
docker run --rm -it wizardworld/cli
```


