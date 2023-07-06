using WizardWorld.Tools.Cli.WizardWorldApi.Dtos;

namespace WizardWorld.Tools.Cli.Specs;

public interface IElixirSpecification
{
    bool IsSatisfiedBy(ElixirDto elixir);
}
