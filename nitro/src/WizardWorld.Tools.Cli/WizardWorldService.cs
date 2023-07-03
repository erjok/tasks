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
        return ingredients.Where(i => i.Name != null).Select(i => i.Name!).Order().ToArray();
    }

    public async Task<string[]> GetElixirNamesAsync()
    {
        var elixirs = await api.GetElixirs();
        return elixirs.Where(e => e.Name != null).Select(e => e.Name!).Order().ToArray();
    }
}
