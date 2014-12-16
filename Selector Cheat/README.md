# Selector Cheat
Selector Cheat installs a tracer style for a given selector in the
`<head>` of the document, then loops over all of the elements returning
those which have the tracer.  It is a cheat because it indirectly uses
the browsers' own selector engine to achieve the result typically requiring
hundreds of lines of code.

## PURPOSE
* Return a list of elements satisfying a given CSS selector.
* Demonstrate the (ab)use of the browsers' internal selector engine.

## **USE**
```javascript
$('#taxes .state');
$('#taxes tr.odd');
```

**NOTE.** Just like **querySelectorAll()**, this function returns one element,
while jQuery <i>et al.</i> return none in the following scenario:
```html
<div>
    <p>
        <span>
            Stuff
        </span>
    </p>
</div>
```
Function | Syntax | Return
---|:---|:---
This | **$('div span')** | `<span>Stuff</span>`
jQuery |  **$('div span')** | `null`
Native | **document.querySelectorAll('div span')** |`<span>Stuff</span>`

To mimic jQuery's selector behavior, `<span>` must be explicitly specified as
an immediate descendant of the `<div>`, like so:
```javascript
$('div > span')
```

## **FUNCTION**
Looping through all elements is undoubtedly slow.  This function is
meant for demonstration and instruction, not deployment in the
production environment.

This function fails in an unlikely event of the style being overridden
in the middle of the call.

This, and many other selector libraries will become obsolete once
**querySelectorAll()** or its suitable equivalent is ubuquitous.  More on
**querySelectorAll()** is here: http://ejohn.org/blog/thoughts-on-queryselectorall/
