using System.CommandLine;
using Refit;
using WizardWorld.Tools.Cli.Specs;
using WizardWorld.Tools.Cli.WizardWorldApi;

namespace WizardWorld.Tools.Cli.CliCommands;

public class GetElixirsCommand : Command
{
    public GetElixirsCommand(Option<Uri> uriOption)
        : base("elixirs", "Displays elixirs (potions) that can be created in the universe.")
    {
        var ingredientsOption = new Option<string[]>(
            name: "--ingredients",
            description: "One or more ingredients available to create elixirs."
        );

        ingredientsOption.AddAlias("-i");
        ingredientsOption.Arity = ArgumentArity.OneOrMore;
        ingredientsOption.AllowMultipleArgumentsPerToken = true;
        AddOption(ingredientsOption);

        this.SetHandler(Handle, uriOption, ingredientsOption);
    }

    private async Task Handle(Uri uri, string[] ingredientNames)
    {
        var api = RestService.For<IWizardWorldApi>(uri.ToString());
        var service = new WizardWorldService(api);

        var names = ingredientNames.Any()
            ? await service.GetElixirNamesAsync(new CraftableElixirSpecification(ingredientNames))
            : await service.GetElixirNamesAsync();

        using var _ = new Chalk(ConsoleColor.Cyan);
        foreach (var name in names)
            Console.WriteLine(name);
    }
}
