using WizardWorld.Tools.Cli.WizardWorldApi.Dtos;

namespace WizardWorld.Tools.Cli.Specs;

public class CraftableElixirSpecification : IElixirSpecification
{
    private readonly string[] ingredientNames;

    public CraftableElixirSpecification(params string[] ingredientNames)
    {
        this.ingredientNames = ingredientNames;
    }

    public bool IsSatisfiedBy(ElixirDto elixir)
    {
        if (elixir.Ingredients == null || elixir.Ingredients.Length == 0)
            return true;

        return elixir.Ingredients.Select(i => i.Name).All(ingredientNames.Contains);
    }
}