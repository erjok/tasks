// See https://aka.ms/new-console-template for more information
using System.Reflection;
using Refit;
using WizardWorld.Tools.Cli;

if (args.Length == 0)
    return;

var api = RestService.For<IWizardWorldApi>("https://wizard-world-api.herokuapp.com");

if (args.Length == 2 && args[0] == "get" && args[1] == "ingredients")
{
    var ingredients = await api.GetIngredients();
    foreach(var ingredient in ingredients)
        Console.WriteLine(ingredient.Name);
    return;
}

var version = Assembly.GetExecutingAssembly().GetName().Version ?? new Version();
var versionWithoutRevision = new Version(version.Major, version.Minor, version.Build);
Console.WriteLine(versionWithoutRevision);
