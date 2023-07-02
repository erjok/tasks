using System.Diagnostics;

namespace WizardWorld.Tools.Cli.AcceptanceTests;

public static class WizardWorldCliDriver
{
    public static async Task<string[]> GetIngredientsAsync()
    {
        var output = await WizardWorldCliDriver.GetProcessOutputAsync("wizwo", "get", "ingredients");
        return output.Split(Environment.NewLine);
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
