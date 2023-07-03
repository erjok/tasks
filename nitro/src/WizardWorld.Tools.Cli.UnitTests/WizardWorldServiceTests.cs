namespace WizardWorld.Tools.Cli.UnitTests;

public class WizardWorldServiceTests
{
    private readonly WizardWorldService service;
    private readonly IWizardWorldApi api = Substitute.For<IWizardWorldApi>();
    private readonly IngredientDto ingredientA = new() { Name = "A" };
    private readonly IngredientDto ingredientB = new() { Name = "B" };
    private readonly IngredientDto ingredientC = new() { Name = "C" };

    public WizardWorldServiceTests()
    {
        service = new WizardWorldService(api);
    }

    [Fact]
    public async Task Should_Get_Ingredient_Names()
    {
        api.GetIngredients().Returns(new[] { ingredientB, ingredientA });
        var names = await service.GetIngredientNamesAsync();
        names.Should().BeInAscendingOrder();
        names.Should().BeEquivalentTo("A", "B");
    }

    [Fact]
    public async Task Should_Get_Elixir_Names()
    {
        var elixirs = new[] {
            new ElixirDto() { Name = "None", Ingredients = Array.Empty<IngredientDto>() },
            new ElixirDto() { Name = "A", Ingredients = new[] { ingredientA }},
            new ElixirDto() { Name = "B", Ingredients = new[] { ingredientB }}
        };

        api.GetElixirs().Returns(elixirs);
        var names = await service.GetElixirNamesAsync();
        names.Should().BeInAscendingOrder();
        names.Should().BeEquivalentTo("A", "B", "None");
    }
}