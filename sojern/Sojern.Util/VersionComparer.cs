namespace Sojern.Util;

public class VersionComparer : IComparer<string>
{
    public int Compare(string? version1, string? version2)
    {
        var v1 = new Version(version1!);
        var v2 = new Version(version2!);
        if (v1 == v2)
            return 0;

        return v1 > v2 ? 1 : -1;
    }
}
