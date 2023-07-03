namespace WizardWorld.Tools.Cli;

public class ElixirDto
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public IngredientDto[]? Ingredients { get; set; }
}
