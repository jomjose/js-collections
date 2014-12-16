
/*
 *
 *  Selector Cheat by Val Tenyotkin (val@tenyotk.in)
 *
 *  PURPOSE
 *
 *      Return DOM elements satisfying a given CSS selector.
 *
 *  USE
 *
 *      selector_cheat.md
 *
 */

function $(selector) {

    var style;

    // A rare style composed of obscure CSS properties is used as a tracer.
    // NOTE.  These properties must be non-inherited, else the function
    // returns the matching elements and all descendants thereof.
    var tracer = {
        'outline-color'     : 'rgb(3, 5, 7)',
        'page-break-after'  : 'always',
        'page-break-before' : 'always',
        'page-break-inside' : 'avoid'
    };

    // if the tracer style doesn't exist, create it
    if(!(style = document.getElementById('selector_cheat'))) {

        // create the cheat style element, attach it to the <head>,
        // give it an ID, and store a reference to it... all in one statement
        // this is called Script-Fu
        document.getElementsByTagName('head')[0]
            .appendChild(style = document.createElement('style'))
            .id = 'selector_cheat';

        // create the tracer style CSS and store it for future use
        // this code is already slow due to a loop over all elements,
        // using JSON.stringify() and regular expressions is not going
        // to change that
        style.tracerCSS =
            JSON.stringify(tracer)
            .replace(/",/g, ';')
            .replace(/"/g, '');
    }

    // plant the tracer style
    style.innerHTML = selector + style.tracerCSS;

    /* find the tracer */

    // acquire all elements on the page
    var elements = document.getElementsByTagName('*');

    // loop through them
    for(var i = elements.length, found = []; i-->0;) {

        // compute the style of an element
        var _, css = window.getComputedStyle(elements[i]);

        // loop through the tracer styles
        for(var property in tracer)
            // make sure we're not looping over a prototype 
            if(typeof tracer[property] === 'string') {
                // if at least one is not as expected
                if(!(_ = (css.getPropertyValue(property) === tracer[property])))
                    // continue on to the next element
                    break;
            }

        // if all tracer styles match, store the element
        if(_)
            found.push(elements[i]);
    }

    // remove the tracer style
    style.innerHTML = '';

    return found;
}
