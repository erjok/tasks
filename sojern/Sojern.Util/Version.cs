namespace Sojern.Util;

public class Version
{
    private readonly int[] revisions;

    public Version(string version)
    {
        revisions = version.Split('.').Select(Int32.Parse).ToArray();
    }

    public static bool operator >(Version version1, Version version2)
    {
        var revisions1 = version1.revisions.AsEnumerable().GetEnumerator();
        var revisions2 = version2.revisions.AsEnumerable().GetEnumerator();

        while (revisions1.MoveNext() && revisions2.MoveNext())
        {
            if (revisions1.Current == revisions2.Current)
                continue;

            return revisions1.Current > revisions2.Current;
        }

        return version1.revisions.Length > version2.revisions.Length;
    }

    public static bool operator <(Version version1, Version version2) =>
        version2 > version1;

    public static bool operator ==(Version version1, Version version2) =>
        version1.Equals(version2);

    public static bool operator !=(Version version1, Version version2) =>
        !version1.Equals(version2);

    public override bool Equals(object? obj)
    {
        if (obj is not Version other)
            return false;

        if (ReferenceEquals(this, other))
            return true;

        return this.revisions.SequenceEqual(other.revisions);
    }

    public override int GetHashCode() => ToString().GetHashCode();

    public override string ToString() => String.Join('.', revisions);
}