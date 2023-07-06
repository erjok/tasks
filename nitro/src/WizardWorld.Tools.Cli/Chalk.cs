namespace WizardWorld.Tools.Cli;

public class Chalk : IDisposable
{
    private readonly ConsoleColor originalColor;

    public Chalk(ConsoleColor color)
    {
        originalColor = Console.ForegroundColor;
        Console.ForegroundColor = color;
    }
    public void Dispose()
    {
        Console.ForegroundColor = originalColor;
    }
}
