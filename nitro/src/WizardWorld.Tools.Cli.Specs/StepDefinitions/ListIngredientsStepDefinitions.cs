using WizardWorld.Tools.Cli.Specs.Drivers;

namespace WizardWorld.Tools.Cli.Specs.StepDefinitions
{
    [Binding]
    public class ListIngredientsStepDefinitions
    {
        private string[] names = null!;

        [Given(@"the following ingredients:")]
        public void GivenTheFollowingIngredients(Table table)
        {
            // NOTE: Use dummy server data
        }

        [When(@"I get all ingredients")]
        public async Task WhenIGetAllIngredients()
        {
            names = await WizardWorldCliDriver.GetIngredientsAsync();
        }

        [Then(@"the following ingredient names are displayed:")]
        public void ThenTheFollowingIngredientNamesAreDisplayed(Table table)
        {
            var expectedNames = table.Rows.Select(r => r["Name"]);
            names.Should().BeEquivalentTo(expectedNames);
            names.Should().BeInAscendingOrder();
        }
    }
}
