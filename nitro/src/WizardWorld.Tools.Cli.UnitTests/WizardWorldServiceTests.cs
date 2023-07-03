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
            new ElixirDto() { Name = "ElixirNone", Ingredients = Array.Empty<IngredientDto>() },
            new ElixirDto() { Name = "ElixirA", Ingredients = new[] { ingredientA }},
            new ElixirDto() { Name = "ElixirB", Ingredients = new[] { ingredientB }}
        };

        api.GetElixirs().Returns(elixirs);
        var names = await service.GetElixirNamesAsync();
        names.Should().BeInAscendingOrder();
        names.Should().BeEquivalentTo("ElixirA", "ElixirB", "ElixirNone");
    }

    [Fact]
    public async Task Should_Not_Get_Elixirs_That_Require_Extra_Ingredients()
    {
        var elixirs = new[] {
            new ElixirDto() { Name = "ElixirAC", Ingredients = new[] { ingredientA, ingredientC }},
            new ElixirDto() { Name = "ElixirBC", Ingredients = new[] { ingredientB, ingredientC }},
            new ElixirDto() { Name = "ElixirC", Ingredients = new[] { ingredientC }},
        };

        api.GetElixirs().Returns(elixirs);
        var names = await service.GetElixirNamesThatCanBeCreatedFromAsync("A", "B");
        names.Should().BeEmpty();
    }

    [Fact]
    public async Task Should_Get_Elixirs_That_Can_Be_Created_From_Given_Ingredients()
    {
        var elixirs = new[] {
            new ElixirDto() { Name = "ElixirAB", Ingredients = new[] { ingredientA, ingredientB }},
            new ElixirDto() { Name = "ElixirA", Ingredients = new[] { ingredientA }},
            new ElixirDto() { Name = "ElixirB", Ingredients = new[] { ingredientB }},
        };

        api.GetElixirs().Returns(elixirs);
        var names = await service.GetElixirNamesThatCanBeCreatedFromAsync("A", "B");
        names.Should().BeInAscendingOrder();
        names.Should().BeEquivalentTo("ElixirA", "ElixirAB", "ElixirB");
    }

    [Fact]
    public async Task Should_Get_Elixirs_That_Dont_Require_Ingredients()
    {
        var elixirs = new[] {
            new ElixirDto() { Name = "ElixirNone", Ingredients = Array.Empty<IngredientDto>() },
            new ElixirDto() { Name = "ElixirNull", Ingredients = null },
        };

        api.GetElixirs().Returns(elixirs);
        var names = await service.GetElixirNamesThatCanBeCreatedFromAsync("A", "B");
        names.Should().BeInAscendingOrder();
        names.Should().BeEquivalentTo("ElixirNone", "ElixirNull");
    }
}