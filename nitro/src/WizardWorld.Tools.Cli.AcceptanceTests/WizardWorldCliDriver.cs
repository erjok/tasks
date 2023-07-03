using System.Diagnostics;

namespace WizardWorld.Tools.Cli.AcceptanceTests;

public static class WizardWorldCliDriver
{
    public static async Task<string> GetVersionAsync()
    {
        var output = await WizardWorldCliDriver.GetProcessOutputAsync("wizwo", "--version");
        return output.Trim();
    }

    public static async Task<string[]> GetIngredientsAsync()
    {
        var output = await WizardWorldCliDriver.GetProcessOutputAsync("wizwo", "get", "ingredients");
        return output.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    public static async Task<string[]> GetElixirsAsync()
    {
        var output = await WizardWorldCliDriver.GetProcessOutputAsync("wizwo", "get", "elixirs");
        return output.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    internal static async Task<string[]> GetElixirsByIngredientsAsync(params string[] ingredientNames)
    {
        var args = new List<string>() { "get", "elixirs" };
        foreach(var ingredientName in ingredientNames)
        {
            args.Add("-i");
            args.Add($"\"{ingredientName}\"");
        }

        var output = await WizardWorldCliDriver.GetProcessOutputAsync("wizwo", args.ToArray());
        return output.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

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
