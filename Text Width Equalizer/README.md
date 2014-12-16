# Text Width Equalizer
Equalize the width of given text elements.
## Use
Inclusion of **equate.js** and its dependencies increases the width of the
elements of the class **equate** to the width of the widest of them.  Example:
```html
<span class='equate'>
    I'm an adult!
</span><br/>
<span class='equate'>
    You can't buy me a hot dog, man!
</span>
```
The only requirement is that the last letter of the element is not enveloped 
in additional markup.  This is **not** acceptable:
```html
<span class='equate'>
    <b>
        This isn't my dad!
    </b>
</span>
```
This **is** acceptable:
```html
<span class='equate'>
    <b>
        This isn't my dad</b>!
</span>
```
So is this
```html
<span>
    <b class='equate'>
        Happy birthday to the ground!
    </b>
</span>
```

### Groups
It is possible to have more than one group of equally-sized text elements.  Use
**rel** property of an element to specify its group.
```html
<span class='equate' rel='lincoln'>
    Four score
</span><br/>
<span class='equate' rel='lincoln'>
    and seven years ago
</span><br/><br/>

<span class='equate' rel='bush'>
    Read my lips:
</span><br/>
<span class='equate' rel='bush'>
    no new taxes
</span>
```
### Explicit Width

Desired width, in pixels, can also be set explicitly:

```html
<span class='equate equate_width=320'>
    I threw it on the ground!
</span>
```

## Technical Details
**equate.js** equalizes the width of the elements by increasing the letter and word
spacing until all elements are as wide as the widest or as wide as requested.


