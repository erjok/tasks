using Refit;
using WizardWorld.Tools.Cli.WizardWorldApi.Dtos;

namespace WizardWorld.Tools.Cli.WizardWorldApi;

public interface IWizardWorldApi
{
    [Get("/ingredients")]
    Task<IEnumerable<IngredientDto>> GetIngredients();

    [Get("/elixirs")]
    Task<IEnumerable<ElixirDto>> GetElixirs();
}
