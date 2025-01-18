# Filter expression

FinalGit support a powerful filter expression to filter commits.

## Usage

When you input `$` in the commit filter. Then you will use the filter expression.

here is some examples:

| expression       | meaning                           |
| ---------------- | --------------------------------- |
| since=2020-01-02 | get commits since 2020-01-02      |
| HEAD~1           | commits before HEAD~1             |
| 123456 234567    | pick commit 123456 and 234567     |
| author=cathaysia | commits with author is cathaysia  |
| 123456..234567   | commits in range [123456, 234567) |

## reference

```antlr
{%
    include-markdown "../src/lib/parser/reversion.g4"
%}
```
