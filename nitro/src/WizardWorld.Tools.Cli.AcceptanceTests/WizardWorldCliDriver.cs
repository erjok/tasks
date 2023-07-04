using System.Diagnostics;

namespace WizardWorld.Tools.Cli.AcceptanceTests;

public static class WizardWorldCliDriver
{
    private static readonly string apiUri = "http://localhost:3000";

    public static async Task<string> GetVersionAsync()
    {
        var output = await WizardWorldCliDriver.GetProcessOutputAsync("wizwo", "--version");
        return output.Trim();
    }

    public static async Task<string[]> GetIngredientsAsync()
    {
        var output = await WizardWorldCliDriver.GetProcessOutputAsync("wizwo", "--uri", apiUri, "get", "ingredients");
        return output.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    public static async Task<string[]> GetElixirsAsync()
    {
        var output = await WizardWorldCliDriver.GetProcessOutputAsync("wizwo", "--uri", apiUri, "get", "elixirs");
        return output.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    public static async Task<string[]> GetElixirsByIngredientsAsync(params string[] ingredientNames)
    {
        var args = new List<string>() { "--uri", apiUri, "get", "elixirs", "--ingredients" };
        foreach(var ingredientName in ingredientNames)
            args.Add($"\"{ingredientName}\"");

        var output = await WizardWorldCliDriver.GetProcessOutputAsync("wizwo", args.ToArray());
        return output.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    public static Task<string> GetHelpAsync() =>
        WizardWorldCliDriver.GetProcessOutputAsync("wizwo", "-h");

    public static async Task<string> GetProcessOutputAsync(string fileName, params string[] args)
    {
        var process = new Process {
            StartInfo = new ProcessStartInfo {
                FileName = fileName,
                Arguments = String.Join(" ", args),
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
            }
        };

        process.Start();
        await process.WaitForExitAsync();
        return process.StandardOutput.ReadToEnd();
    }
}
