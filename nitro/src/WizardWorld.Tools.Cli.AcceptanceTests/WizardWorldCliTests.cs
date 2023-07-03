namespace WizardWorld.Tools.Cli.AcceptanceTests;

public class WizardWorldCliTests
{
    [Fact]
    public async Task Should_Get_Version()
    {
        var version = await WizardWorldCliDriver.GetVersionAsync();
        version.Should().Be("0.1.3");
    }

    [Fact]
    public async Task Should_Get_Ingredients()
    {
        var names = await WizardWorldCliDriver.GetIngredientsAsync();
        names.Should().BeEquivalentTo(
            "Frog brains",
            "Red spider",
            "Snake fangs"
        );
        names.Should().BeInAscendingOrder();
    }
}