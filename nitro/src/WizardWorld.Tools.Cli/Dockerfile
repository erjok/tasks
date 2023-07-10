FROM mcr.microsoft.com/dotnet/sdk:7.0.101 as sdk
WORKDIR /src

COPY ./WizardWorld.Tools.Cli.csproj .
RUN dotnet restore

COPY . .
RUN dotnet pack ./WizardWorld.Tools.Cli.csproj -o /nupkg
RUN dotnet tool install --tool-path /wizwo --add-source /nupkg WizardWorld.Cli
ENV PATH="${PATH}:/wizwo"
WORKDIR /

ENTRYPOINT ["wizwo"]