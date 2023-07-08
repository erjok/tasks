# Wizard World CLI (wizwo)

This repository contains .NET command line tool **wizwo** used to interact with Wizard World [API](https://wizard-world-api.herokuapp.com/swagger/index.html) and query all kinds of information relating to the Harry Potter universe.

# Installation

## Docker CLI image

### Building CLI image

1. Open the repository root directory that contains the `docker-compose.yml` file.
2. Run the following command within that directory:
    ```shell
    docker compose build cli
    ```
     This command builds the `wizardworld/cli` image and assigns `latest` and `0.2.2` tags to this image.
 







