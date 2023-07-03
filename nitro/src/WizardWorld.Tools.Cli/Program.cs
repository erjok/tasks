using System.Reflection;
using Refit;
using WizardWorld.Tools.Cli;

if (args.Length == 0)
    return;

var api = RestService.For<IWizardWorldApi>("http://localhost:3000");
var service = new WizardWorldService(api);

if (args.Length == 2 && args[0] == "get" && args[1] == "ingredients")
{
    foreach(var name in await service.GetIngredientNamesAsync())
        Console.WriteLine(name);
    return;
}

if (args.Length == 2 && args[0] == "get" && args[1] == "elixirs")
{
    foreach (var name in await service.GetElixirNamesAsync())
        Console.WriteLine(name);
    return;
}

if (args.Length > 2)
{
    var ingredientNames = new[] { args[3], args[5] };
    foreach (var name in await service.GetElixirNamesThatCanBeCreatedFromAsync(ingredientNames))
        Console.WriteLine(name);
    return;
}

var version = Assembly.GetExecutingAssembly().GetName().Version ?? new Version();
var versionWithoutRevision = new Version(version.Major, version.Minor, version.Build);
Console.WriteLine(versionWithoutRevision);
