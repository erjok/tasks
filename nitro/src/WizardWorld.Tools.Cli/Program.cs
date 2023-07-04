using System.CommandLine;
using Refit;
using WizardWorld.Tools.Cli;

var api = RestService.For<IWizardWorldApi>("http://localhost:3000");
var service = new WizardWorldService(api);

var getIngredientsCommand = new Command("ingredients", "Displayes ingredients.");
getIngredientsCommand.SetHandler(async () => {
    foreach (var name in await service.GetIngredientNamesAsync())
        Console.WriteLine(name);
});

var getElixirsCommand = new Command("elixirs", "Displays elixirs (potions) that can be created in the universe.");
var opt = new Option<string[]>("--craftable-from", description: "Maybe this one?");
opt.Arity = ArgumentArity.OneOrMore;
opt.AllowMultipleArgumentsPerToken = true;
getElixirsCommand.AddOption(opt);

getElixirsCommand.SetHandler(async (ingredientNames) => {
    var names = ingredientNames.Any()
        ? await service.GetElixirNamesThatCanBeCreatedFromAsync(ingredientNames)
        : await service.GetElixirNamesAsync();
    foreach (var name in names)
        Console.WriteLine(name);
}, opt);

var rootCommand = new RootCommand("WizardWorld CLI") {
    new Command("get", "Displays all kinds of information relating to the Harry Potter universe.") {
        getIngredientsCommand,
        getElixirsCommand,
    }
};

rootCommand.Name = "wizwo";
await rootCommand.InvokeAsync(args);