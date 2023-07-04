using System.CommandLine;
using System.CommandLine.Builder;
using System.CommandLine.Parsing;
using Refit;
using WizardWorld.Tools.Cli;

var uriOption = new Option<Uri>(
    name: "--uri",
    description: "Wizard World API Uri.",
    getDefaultValue: () => new Uri("https://wizard-world-api.herokuapp.com/")
);

var getIngredientsCommand = new Command("ingredients", "Displayes ingredients.");
getIngredientsCommand.SetHandler(async (uri) => {
    var api = RestService.For<IWizardWorldApi>(uri.ToString());
    var service = new WizardWorldService(api);
    foreach (var name in await service.GetIngredientNamesAsync())
        Console.WriteLine(name);
}, uriOption);

var getElixirsCommand = new Command("elixirs", "Displays elixirs (potions) that can be created in the universe.");
var ingredientsOption = new Option<string[]>("--ingredients", description: "One or more ingredients available to create elixirs.");
ingredientsOption.AddAlias("-i");
ingredientsOption.Arity = ArgumentArity.OneOrMore;
ingredientsOption.AllowMultipleArgumentsPerToken = true;
getElixirsCommand.AddOption(ingredientsOption);

getElixirsCommand.SetHandler(async (ingredientNames, uri) => {
    var api = RestService.For<IWizardWorldApi>(uri.ToString());
    var service = new WizardWorldService(api);
    var names = ingredientNames.Any()
        ? await service.GetElixirNamesThatCanBeCreatedFromAsync(ingredientNames)
        : await service.GetElixirNamesAsync();
    foreach (var name in names)
        Console.WriteLine(name);
}, ingredientsOption, uriOption);

var rootCommand = new RootCommand("Wizard World CLI") {
    new Command("get", "Displays all kinds of information relating to the Harry Potter universe.") {
        getIngredientsCommand,
        getElixirsCommand,
    }
};

rootCommand.Name = "wizwo";
rootCommand.AddGlobalOption(uriOption);

return await new CommandLineBuilder(rootCommand)
    .UseDefaults()
    .UseExceptionHandler((ex, context) => {
        Console.WriteLine(ex.Message);
    }, 1)
    .Build()
    .InvokeAsync(args);
