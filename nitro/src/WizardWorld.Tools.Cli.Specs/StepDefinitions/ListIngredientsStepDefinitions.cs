using System;
using TechTalk.SpecFlow;

namespace WizardWorld.Tools.Cli.Specs.StepDefinitions
{
    [Binding]
    public class ListIngredientsStepDefinitions
    {
        [Given(@"the following ingredients:")]
        public void GivenTheFollowingIngredients(Table table)
        {
            throw new PendingStepException();
        }

        [When(@"I list all ingredients")]
        public void WhenIListAllIngredients()
        {
            throw new PendingStepException();
        }

        [Then(@"the following ingredient names are displayed:")]
        public void ThenTheFollowingIngredientNamesAreDisplayed(Table table)
        {
            throw new PendingStepException();
        }
    }
}
