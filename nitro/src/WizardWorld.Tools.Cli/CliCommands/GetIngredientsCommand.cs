using System.CommandLine;
using Refit;

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
        foreach (var name in await service.GetIngredientNamesAsync())
            Console.WriteLine(name);
    }
}
