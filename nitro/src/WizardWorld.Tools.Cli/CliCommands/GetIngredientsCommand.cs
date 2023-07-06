using System.CommandLine;
using Refit;
using WizardWorld.Tools.Cli.WizardWorldApi;

namespace WizardWorld.Tools.Cli.CliCommands;
public class GetIngredientsCommand : Command
{
    public GetIngredientsCommand(Option<Uri> uriOption)
        : base("ingredients", "Displays ingredients.")
    {
        this.SetHandler(Handle, uriOption);
    }

    private async Task Handle(Uri uri)
    {
        var api = RestService.For<IWizardWorldApi>(uri.ToString());
        var service = new WizardWorldService(api);

        using var _ = new Chalk(ConsoleColor.Cyan);
        foreach (var name in await service.GetIngredientNamesAsync())
            Console.WriteLine(name);
    }
}
