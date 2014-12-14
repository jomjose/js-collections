# Table Column Highlighter

## PURPOSE
Enable vertical/column highlighting of tables on hover, [like so](http://2deviant.github.io/js/vertical_highlight.html).

## USE
Inclusion of **vertical_highlight.js** enables vertical
highlighting in tables of the class **vertical_highlight**.  The highlighting
style is specified in a style sheet like so:
```css
table.awesome vertical_highlight {
    background: #800;
    color: #ff0;
}
```
Where **awesome** is (one of) the class(es) of the table, which is required (any
class is required, it doesn't have to be **awesome**).
Horizontal, row highlighting can be achieved via straight-forward CSS:
```css
tr:hover td {
    background: #800;
    color: #ff0;
}
```
## FUNCTION
Each cell in a given column is assigned the same class.  Style of the
class is dynamically varied on hover. Example: all `<td></td>` in first
column are of the class **abc1**, all `<td></td>` in the second column are
of the class **abc2**.  On hover above the first column, a style sheet is
generated where the class **abc1** is given a highlighted style.

## ALTERNATIVE  
A partial highlighting effect can be achieved with an obscure HTML
element `<colgroup></colgroup>` as described here:
* http://css-tricks.com/row-and-column-highlighting/

It is an incomplete solution because `<colgroup></colgroup>` can only be
used to change the background color of the cells.  This code provides
full styling support: color, font, size, opacity, <i>etc.</i>

