using WizardWorld.Tools.Cli.Specs;
using WizardWorld.Tools.Cli.WizardWorldApi.Dtos;

namespace WizardWorld.Tools.Cli.UnitTests;

public class CraftableElixirSpecificationTests
{
    [Theory(DisplayName = "")]
    [InlineData(new object[] { new[] { "C" } })]
    [InlineData(new object[] { new[] { "A", "C" } })]
    [InlineData(new object[] { new[] { "B", "C" } })]
    public void Should_Not_Be_Satisfied_When_Elixir_Requires_Extra_Ingredients(string[] requiredIngredientNames)
    {
        var spec = new CraftableElixirSpecification("A", "B");
        var requiredIngredients = requiredIngredientNames.Select(name => new IngredientDto { Name = name }).ToArray();
        var elixir = new ElixirDto() { Ingredients = requiredIngredients };
        spec.IsSatisfiedBy(elixir).Should().BeFalse();
    }

    [Theory(DisplayName = "")]
    [InlineData(new object[] { new[] { "A" } })]
    [InlineData(new object[] { new[] { "B" } })]
    [InlineData(new object[] { new[] { "A", "B" } })]
    public void Should_Be_Satisfied_When_All_Required_Ingredients_Given(string[] requiredIngredientNames)
    {
        var spec = new CraftableElixirSpecification("A", "B");
        var requiredIngredients = requiredIngredientNames.Select(name => new IngredientDto { Name = name }).ToArray();
        var elixir = new ElixirDto() { Ingredients = requiredIngredients };
        spec.IsSatisfiedBy(elixir).Should().BeTrue();
    }

    [Fact]
    public void Should_Be_Satisfied_When_Elixir_Dont_Require_Ingredients()
    {
        var spec = new CraftableElixirSpecification();
        var elixir = new ElixirDto() { Ingredients = Array.Empty<IngredientDto>() };
        spec.IsSatisfiedBy(elixir).Should().BeTrue();
    }
}
