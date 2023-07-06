using System.CommandLine;
using System.CommandLine.Builder;
using System.CommandLine.Parsing;
using WizardWorld.Tools.Cli;
using WizardWorld.Tools.Cli.CliCommands;

return await BuildCommandLine()
    .UseDefaults()
    .UseExceptionHandler((ex, _) => {
        using (new Chalk(ConsoleColor.Red))
            Console.WriteLine(ex.Message);
    }, 1)
    .Build()
    .InvokeAsync(args);

static CommandLineBuilder BuildCommandLine()
{
    var uriOption = new Option<Uri>(
        name: "--uri",
        getDefaultValue: () => new Uri("https://wizard-world-api.herokuapp.com/"),
        description: "Wizard World API Uri.");

    var rootCommand = new RootCommand("Wizard World CLI") {
        new Command("get", "Displays all kinds of information relating to the Harry Potter universe.") {
            new GetIngredientsCommand(uriOption),
            new GetElixirsCommand(uriOption),
        }
    };

    rootCommand.Name = "wizwo";
    rootCommand.AddGlobalOption(uriOption);
    return new CommandLineBuilder(rootCommand);
}
