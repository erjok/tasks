using WizardWorld.Tools.Cli.WizardWorldApi.Dtos;

namespace WizardWorld.Tools.Cli;

public static class DtoFormatExtensions
{
    public static string[] ToOrderedNames(this IEnumerable<IngredientDto> ingredients) =>
        ingredients
        .Where(i => i.Name != null)
        .Select(i => i.Name!)
        .Order()
        .ToArray();

    public static string[] ToOrderedNames(this IEnumerable<ElixirDto> elixirs) =>
        elixirs
        .Where(i => i.Name != null)
        .Select(i => i.Name!)
        .Order()
        .ToArray();
}
