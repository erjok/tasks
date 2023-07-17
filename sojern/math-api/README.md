# Math API

This repository a web service that provides a simple API for math operations.

## Running API

### Node

1. Navigate to the api root folder
2. Run the following commands:

    ```shell
    npm install
    npm start
    ```
    This will start the API on host port `3000`. To change the port, change the value of the `NODE_PORT` environment variable.

### Docker

1. Navigate to the api root folder
2. Run the following command:

    ```shell
    docker compose up api
    ```

    This will build the `math-api` image and start the API container. Host port `3000` will be mapped for API access. To use a different host port, change the `api` service port mapping in the `docker-compose.yml` file.

## Using API

Swagger UI will be available at http://localhost:3000/swagger. You can use it to discover and interact with API resources.

> Change the port accordingly if the API is not running on host port `3000`.

## Running acceptance tests

### Node
1. Ensure that API is running
2. Navigate to the api root folder
3. Run the following command:

    ```shell
    npm test
    ```
> If the API is not running on host port `3000`, use `TEST_API_URI` environment 
> variable to configure API server base path.

### Docker
1. Navigate to the api root folder
2. Run the following command:

    ```shell
    docker compose run --build test
    ```
3. Once the tests are complete, run the following command to stop the API container:

    ```shell
    docker compose down
    ```