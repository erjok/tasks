namespace Sojern.Util;

public class VersionComparer : IComparer<string>
{
    public int Compare(string? version1, string? version2)
    {
        if (version1 == version2)
            return 0;

        var revisions1 = version1.Split('.').Select(Int32.Parse).GetEnumerator();
        var revisions2 = version2.Split('.').Select(Int32.Parse).GetEnumerator();

        while (true)
        {
            if (!revisions1.MoveNext())
                return -1;

            if (!revisions2.MoveNext())
                return 1;

            if (revisions1.Current < revisions2.Current)
                return -1;

            if (revisions1.Current > revisions2.Current)
                return 1;
        }
    }
}
