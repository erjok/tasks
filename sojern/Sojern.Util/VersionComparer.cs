namespace Sojern.Util;

public class VersionComparer : IComparer<string>
{
    public int Compare(string? version1, string? version2)
    {
        if (version1 == version2)
            return 0;

        var revisions1 = Array.ConvertAll(version1.Split('.'), Int32.Parse);
        var revisions2 = Array.ConvertAll(version2.Split('.'), Int32.Parse);

        int i = 0;
        while(true)
        {
            if (revisions1[i] < revisions2[i])
                return -1;

            if (revisions1[i] > revisions2[i])
                return 1;

            i++;
            if (i == revisions1.Length)
                return -1;

            if (i == revisions2.Length)
                return 1;
        }
    }
}
