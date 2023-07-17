# Util

This is a simple utils library. It provides `VersionComparer` class to compare two versions of a software.

## VersionComparer Class

Namespace: Sojern.Util

``` c#
public class VersionComparer : IComparer<string>
```

Represents a software version comparison operation.

### Examples

``` c#
var comparer = new VersionComparer();
var result = comparer.Compare("1.1.10", "1.2.3");
```

### Methods:

`Compare(string version1, string version2)`

  Compares two versions and retuns and indication of their relative sort order:
  - -1 if `version1` is less than `version2`
  - 0 if `version1` is equal to `version2`
  - 1 if `version1` is greater than `version2`