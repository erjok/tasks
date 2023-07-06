using Microsoft.Extensions.Configuration;

namespace WizardWorld.Tools.Cli.AcceptanceTests;

public class WizardWorldCliTests
{
    private readonly WizardWorldCliDriver cliDriver;

    public WizardWorldCliTests()
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", false)
            .AddEnvironmentVariables()
            .Build();

        var apiUri = config["WIZWO_API_URI"];
        cliDriver = new WizardWorldCliDriver(apiUri!);
    }

    [Fact]
    public async Task Should_Display_Version()
    {
        var version = await cliDriver.GetVersionAsync();
        version.Should().Be("0.2.1");
    }

    [Fact]
    public async Task Should_Display_All_Ingredients()
    {
        var ingredients = await cliDriver.GetIngredientsAsync();
        ingredients.Should().BeInAscendingOrder();
        ingredients.Should().BeEquivalentTo(
            "Frog brains",
            "Red spider",
            "Snake fangs"
        );
    }

    [Fact]
    public async Task Should_Display_All_Elixirs()
    {
        var elixirs = await cliDriver.GetElixirsAsync();
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
    public async Task Should_Display_Elixirs_That_Can_Be_Created_From_Given_Ingredients()
    {
        var elixirs = await cliDriver.GetElixirsByIngredientsAsync("Frog brains", "Snake fangs");
        elixirs.Should().BeInAscendingOrder();
        elixirs.Should().BeEquivalentTo(
            "Null Potion",
            "Frog Potion",
            "Snake Potion",
            "Frog & Snake Potion"
        );
    }

    [Fact]
    public async Task Should_Display_Help()
    {
        var expected = """"
            Description:
              Wizard World CLI

            Usage:
              wizwo [command] [options]
            """";
        var help = await cliDriver.GetHelpAsync();
        help.Should().StartWith(expected.ReplaceLineEndings());
    }
}