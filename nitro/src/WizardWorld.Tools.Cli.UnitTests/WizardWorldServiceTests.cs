using WizardWorld.Tools.Cli.Specs;

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
    public async Task Should_Get_All_Ingredient_Names()
    {
        api.GetIngredients().Returns(new[] { ingredientB, ingredientA });
        var names = await service.GetIngredientNamesAsync();
        names.Should().BeInAscendingOrder();
        names.Should().BeEquivalentTo("A", "B");
    }

    [Fact]
    public async Task Should_Get_All_Elixir_Names()
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
    public async Task Should_Get_Elixirs_That_Satisfy_Specification()
    {
        var elixirA = new ElixirDto() { Name = "ElixirA" };
        var elixirB = new ElixirDto() { Name = "ElixirB" };
        var elixirC = new ElixirDto() { Name = "ElixirC" };

        var spec = Substitute.For<IElixirSpecification>();
        spec.IsSatisfiedBy(elixirA).Returns(true);
        spec.IsSatisfiedBy(elixirB).Returns(false);
        spec.IsSatisfiedBy(elixirC).Returns(true);

        api.GetElixirs().Returns(new[] { elixirA, elixirB, elixirC });
        var names = await service.GetElixirNamesAsync(spec);
        names.Should().BeInAscendingOrder();
        names.Should().BeEquivalentTo("ElixirA", "ElixirC");
    }
}