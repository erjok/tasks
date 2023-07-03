namespace WizardWorld.Tools.Cli.UnitTests;

public class WizardWorldServiceTests
{
    private readonly WizardWorldService service;
    private readonly IWizardWorldApi api = Substitute.For<IWizardWorldApi>();
    private readonly IngredientDto ingredientA = new() { Name = "A" };
    private readonly IngredientDto ingredientB = new() { Name = "B" };

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
}