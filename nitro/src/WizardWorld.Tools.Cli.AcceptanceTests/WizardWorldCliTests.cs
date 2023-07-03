namespace WizardWorld.Tools.Cli.AcceptanceTests;

public class WizardWorldCliTests
{
    [Fact]
    public async Task Should_Get_Version()
    {
        var version = await WizardWorldCliDriver.GetVersionAsync();
        version.Should().Be("0.1.4");
    }

    [Fact]
    public async Task Should_Get_Ingredients()
    {
        var ingredients = await WizardWorldCliDriver.GetIngredientsAsync();
        ingredients.Should().BeEquivalentTo(
            "Frog brains",
            "Red spider",
            "Snake fangs"
        );
        ingredients.Should().BeInAscendingOrder();
    }

    [Fact]
    public async Task Should_Get_Elixirs()
    {
        var elixirs = await WizardWorldCliDriver.GetElixirsAsync();
        elixirs.Should().BeEquivalentTo(
            "Null Potion",
            "Frog Potion",
            "Snake Potion",
            "Spider Potion",
            "Frog & Snake Potion",
            "Frog & Spider Potion",
            "All at Once Potion"
        );
        elixirs.Should().BeInAscendingOrder();
    }
}