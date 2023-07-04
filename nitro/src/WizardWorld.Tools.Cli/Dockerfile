FROM mcr.microsoft.com/dotnet/sdk:7.0.101 as sdk
WORKDIR /src

COPY ./WizardWorld.Tools.Cli.csproj .
RUN dotnet restore

COPY . .
RUN dotnet pack ./WizardWorld.Tools.Cli.csproj -o /nupkg
RUN dotnet tool install --global --add-source /nupkg WizardWorld.Tool
ENV PATH="${PATH}:/root/.dotnet/tools"
