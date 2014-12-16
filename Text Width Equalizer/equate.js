/*
 *
 * Equate v0.12 by Val Tenyotkin (val@tenyotk.in)
 *
 *  PURPOSE
 *
 *      Set the width of selected [text] elements to match each other.
 *
 *  USE
 *
 *      README.md
 *
 */

// execute on load
window.addEventListener('load', function() {

    // find all elements of the class 'equate'
    var equated = document.querySelectorAll('.equate');

    // self-explanatory
    var max_width = {};

    // loop through the elements
    for(var i = equated.length, found = false; i-->0;)
        with($ = equated[i]) {

            // acquire the group, set to zero if not present
            $.group = getAttribute('rel') || 0;

            // encapsulate the last letter in <span></span> with zero letter
            // spacing to ensure zero trailing space, also remove space padding
            innerHTML = innerHTML.replace(/(\S)\s*$/,
                '<span style="letter-spacing:0">$1</span>').trim();

            // if the maximum has not been found
            if(!found)
                // if the size is explicitly set, use it
                if(className.match(/equate_width=(\d+)/)) {
                    max_width[group] = RegExp.$1;
                    // stop the search
                    found = true;
                }

                // otherwise, find the width of the widest element
                else
                    // || 0 because max_width[group] is initally undefined
                    if(getBoundingClientRect().width > (max_width[group] || 0))
                        max_width[group] = getBoundingClientRect().width;
            }

    // make all marked elements the same width (max_width)
    for(var i = equated.length; i-->0;)
        with(equated[i]) {

            // keep increasing letter spacing until the width exceeds the target
            // width
            for(var ds = 0; getBoundingClientRect().width < max_width[group]
                    && ds < 1024; ds++)
                style.letterSpacing = ds+'px';

            // if the text contains at least thee words, try to increase the
            // word spacing to better fit the width
            if(     (textContent || innerText).match(/\S\s+\S.*\s\S/) 
                &&  getBoundingClientRect().width > max_width[group]) {
                // set the letter spacing back, before the width exceeded the
                // target width
                while(getBoundingClientRect().width > max_width[group] && ds > -1024)
                    style.letterSpacing = --ds+'px';

                // increase the word spacing until the element reaches the
                // target width
                for(var w = 0; getBoundingClientRect().width < max_width[group]
                        && w < 1024; w++)
                    style.wordSpacing = w + 'px';
            }

            // try to insure the element does not shrink on window resize
            style.whiteSpace = 'pre';
        }
}, false);
