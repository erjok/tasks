using System.CommandLine;
using System.CommandLine.Builder;
using System.CommandLine.Parsing;
using Refit;
using WizardWorld.Tools.Cli;
using WizardWorld.Tools.Cli.CliCommands;

return await BuildCommandLine()
    .UseDefaults()
    .UseExceptionHandler((ex, context) => {
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

    var ingredientsOption = new Option<string[]>(
        name: "--ingredients",
        description: "One or more ingredients available to create elixirs."
    );

    ingredientsOption.AddAlias("-i");
    ingredientsOption.Arity = ArgumentArity.OneOrMore;
    ingredientsOption.AllowMultipleArgumentsPerToken = true;

    var getElixirsCommand = new Command("elixirs", "Displays elixirs (potions) that can be created in the universe.");
    getElixirsCommand.AddOption(ingredientsOption);

    getElixirsCommand.SetHandler(async (ingredientNames, uri) => {
        var api = RestService.For<IWizardWorldApi>(uri.ToString());
        var service = new WizardWorldService(api);
        var names = ingredientNames.Any()
            ? await service.GetCraftableElixirNames(ingredientNames)
            : await service.GetElixirNamesAsync();
        foreach (var name in names)
            Console.WriteLine(name);
    }, ingredientsOption, uriOption);

    var rootCommand = new RootCommand("Wizard World CLI") {
        new Command("get", "Displays all kinds of information relating to the Harry Potter universe.") {
            new GetIngredientsCommand(uriOption),
            getElixirsCommand,
        }
    };

    rootCommand.Name = "wizwo";
    rootCommand.AddGlobalOption(uriOption);
    return new CommandLineBuilder(rootCommand);
}
