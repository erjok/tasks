ARG CLI_IMG
FROM ${CLI_IMG:-wizardworld/cli:latest}

WORKDIR /test
COPY ./WizardWorld.Tools.Cli.AcceptanceTests.csproj .
RUN dotnet restore

COPY . .
ARG API_URI
ENV WIZWO_API_URI=${API_URI:-http://host.docker.internal:3000}
RUN dotnet test ./WizardWorld.Tools.Cli.AcceptanceTests.csproj