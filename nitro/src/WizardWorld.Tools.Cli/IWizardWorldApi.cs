using Refit;

namespace WizardWorld.Tools.Cli;

public interface IWizardWorldApi
{
    [Get("/ingredients")]
    Task<IEnumerable<IngredientDto>> GetIngredients();

    [Get("/elixirs")]
    Task<IEnumerable<ElixirDto>> GetElixirs();
}
