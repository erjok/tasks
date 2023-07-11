namespace Sojern.Util.Tests;

public class VersionComparerTests
{
    [Theory]
    [InlineData("1.1", "0.1")]
    [InlineData("1.2", "1.1")]
    [InlineData("1.3", "1.2.9.9.9")]
    [InlineData("1.3.4", "1.3")]
    [InlineData("1.10", "1.3.4")]
    public void Should_Return_1_When_Version1_Greater_Than_Version2(string version1, string version2)
    {
        var comparer = new VersionComparer();
        comparer.Compare(version1, version2).Should().Be(1);
    }
}