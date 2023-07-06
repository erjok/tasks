using WizardWorld.Tools.Cli.Specs;
using WizardWorld.Tools.Cli.WizardWorldApi;

namespace WizardWorld.Tools.Cli;

public class WizardWorldService
{
    private readonly IWizardWorldApi api;

    public WizardWorldService(IWizardWorldApi api)
    {
        this.api = api;
    }

    public async Task<string[]> GetIngredientNamesAsync()
    {
        var ingredients = await api.GetIngredients();
        return ingredients.ToOrderedNames();
    }

    public async Task<string[]> GetElixirNamesAsync()
    {
        var elixirs = await api.GetElixirs();
        return elixirs.ToOrderedNames();
    }

    public async Task<string[]> GetElixirNamesAsync(IElixirSpecification specification)
    {
        var elixirs = await api.GetElixirs();
        return elixirs
            .Where(specification.IsSatisfiedBy)
            .ToOrderedNames();
    }
}
