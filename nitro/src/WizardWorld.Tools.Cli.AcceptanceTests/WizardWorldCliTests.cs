namespace WizardWorld.Tools.Cli.AcceptanceTests;

public class WizardWorldCliTests
{
    [Fact]
    public Task Should_Get_Version()
    {
        throw new NotImplementedException();
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