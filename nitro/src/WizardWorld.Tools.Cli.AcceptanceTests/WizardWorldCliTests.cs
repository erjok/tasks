namespace WizardWorld.Tools.Cli.AcceptanceTests;

public class WizardWorldCliTests
{
    [Fact]
    public async Task Should_Get_Version()
    {
        var version = await WizardWorldCliDriver.GetVersionAsync();
        version.Should().Be("0.1.5");
    }

    [Fact]
    public async Task Should_Get_Ingredients()
    {
        var ingredients = await WizardWorldCliDriver.GetIngredientsAsync();
        ingredients.Should().BeInAscendingOrder();
        ingredients.Should().BeEquivalentTo(
            "Frog brains",
            "Red spider",
            "Snake fangs"
        );
    }

    [Fact]
    public async Task Should_Get_Elixirs()
    {
        var elixirs = await WizardWorldCliDriver.GetElixirsAsync();
        elixirs.Should().BeInAscendingOrder();
        elixirs.Should().BeEquivalentTo(
            "Null Potion",
            "Frog Potion",
            "Snake Potion",
            "Spider Potion",
            "Frog & Snake Potion",
            "Frog & Spider Potion",
            "All at Once Potion"
        );
    }

    [Fact]
    public async Task Should_Get_Elixirs_By_Ingredients()
    {
        var elixirs = await WizardWorldCliDriver.GetElixirsByIngredientsAsync("Frog brains", "Snake fangs");
        elixirs.Should().BeInAscendingOrder();
        elixirs.Should().BeEquivalentTo(
            "Null Potion",
            "Frog Potion",
            "Snake Potion",
            "Frog & Snake Potion"
        );
    }
}