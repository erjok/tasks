// See https://aka.ms/new-console-template for more information
using System.Reflection;

var version = Assembly.GetExecutingAssembly().GetName().Version ?? new Version();
var versionWithoutRevision = new Version(version.Major, version.Minor, version.Build);
Console.WriteLine(versionWithoutRevision);
