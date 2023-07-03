using System.Reflection;
using Refit;
using WizardWorld.Tools.Cli;

if (args.Length == 0)
    return;

var api = RestService.For<IWizardWorldApi>("http://localhost:3000");

if (args.Length == 2 && args[0] == "get" && args[1] == "ingredients")
{
    var ingredients = await api.GetIngredients();
    foreach(var ingredient in ingredients.OrderBy(i => i.Name))
        Console.WriteLine(ingredient.Name);
    return;
}

if (args.Length == 2 && args[0] == "get" && args[1] == "elixirs")
{
    var elixirs = await api.GetElixirs();
    foreach (var elixir in elixirs.OrderBy(i => i.Name))
        Console.WriteLine(elixir.Name);
    return;
}

if (args.Length > 2)
{
    var ingredientNames = new[] { args[3], args[5] };
    foreach(var ingredientName in ingredientNames)
        Console.WriteLine(ingredientName);
}

var version = Assembly.GetExecutingAssembly().GetName().Version ?? new Version();
var versionWithoutRevision = new Version(version.Major, version.Minor, version.Build);
Console.WriteLine(versionWithoutRevision);
