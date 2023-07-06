namespace WizardWorld.Tools.Cli.Specs;

public interface IElixirSpecification
{
    bool IsSatisfiedBy(ElixirDto elixir);
}
