namespace Sojern.Util.Tests;

public class VersionTests
{
    [Theory(DisplayName = "")]
    [InlineData("")]
    [InlineData("1.")]
    [InlineData("1,0")]
    [InlineData("1.2.a")]
    public void Should_Not_Parse_Invalid_Version_String(string str)
    {
        var act = () => new Version(str);
        act.Should().Throw<FormatException>();
    }

    [Theory(DisplayName = "")]
    [InlineData("1.1", "0.1")]
    [InlineData("1.2", "1.1")]
    [InlineData("1.3", "1.2.9.9.9")]
    [InlineData("1.3.4", "1.3")]
    [InlineData("1.10", "1.3.4")]
    public void Should_Implement_Comparison_Operator_Greater_Than(string version1, string version2)
    {
        var v1 = new Version(version1);
        var v2 = new Version(version2);
        (v1 > v2).Should().BeTrue();
    }

    [Theory(DisplayName = "")]
    [InlineData("1.1", "0.1")]
    [InlineData("1.2", "1.1")]
    [InlineData("1.3", "1.2.9.9.9")]
    [InlineData("1.3.4", "1.3")]
    [InlineData("1.10", "1.3.4")]
    public void Should_Implement_Comparison_Operator_Less_Than(string version1, string version2)
    {
        var v1 = new Version(version1);
        var v2 = new Version(version2);
        (v2 < v1).Should().BeTrue();
    }

    [Fact]
    public void Should_Implement_Comparison_Operator_Equal_To()
    {
        var v1 = new Version("1.2");
        var v2 = new Version("1.2");
        (v1 == v2).Should().BeTrue();
    }

    [Fact]
    public void Should_Implement_Comparison_Operator_Not_Equal_To()
    {
        var v1 = new Version("1.2");
        var v2 = new Version("1.2");
        (v1 != v2).Should().BeFalse();
    }
}
