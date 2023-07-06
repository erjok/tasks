ARG CLI_IMG
FROM ${CLI_IMG:-wizardworld/cli:latest}

WORKDIR /test
COPY ./WizardWorld.Tools.Cli.AcceptanceTests.csproj .
RUN dotnet restore

COPY . .

ENTRYPOINT ["dotnet", "test", "--logger:\"console;verbosity=detailed\""]