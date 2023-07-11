namespace Sojern.Util;

public class VersionComparer : IComparer<string>
{
    public int Compare(string? version1, string? version2)
    {
        if (version1 == version2)
            return 0;

        return 1;
    }
}
