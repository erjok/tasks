using System.Diagnostics;

namespace WizardWorld.Tools.Cli.AcceptanceTests;

public class WizardWorldCliDriver
{
    private static readonly string appName = "wizwo";
    private readonly string apiUri;

    public WizardWorldCliDriver(string apiUri)
    {
        this.apiUri = apiUri;
    }

    public async Task<string> GetVersionAsync()
    {
        var output = await GetProcessOutputAsync("--version");
        return output.Trim();
    }

    public async Task<string[]> GetIngredientsAsync()
    {
        var output = await GetProcessOutputAsync("--uri", apiUri, "get", "ingredients");
        return output.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    public async Task<string[]> GetElixirsAsync()
    {
        var output = await GetProcessOutputAsync("--uri", apiUri, "get", "elixirs");
        return output.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    public async Task<string[]> GetElixirsByIngredientsAsync(params string[] ingredientNames)
    {
        var args = new List<string>() { "--uri", apiUri, "get", "elixirs", "--ingredients" };
        foreach(var ingredientName in ingredientNames)
            args.Add($"\"{ingredientName}\"");

        var output = await GetProcessOutputAsync(args.ToArray());
        return output.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    public Task<string> GetHelpAsync() =>
        GetProcessOutputAsync("-h");

    private static async Task<string> GetProcessOutputAsync(params string[] args)
    {
        var process = new Process {
            StartInfo = new ProcessStartInfo {
                FileName = appName,
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
