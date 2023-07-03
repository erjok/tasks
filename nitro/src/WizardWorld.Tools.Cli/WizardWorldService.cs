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
        throw new NotImplementedException();
    }
}
