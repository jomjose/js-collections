
/*
 *  Vertical Table Highlighter v0.12 by Val Tenyotkin (val@tenyotk.in)
 *
 *  PURPOSE
 *
 *      Enable column highlighting on hover in tables.
 *
 *  USE
 *
 *      README.md
 *
 */


(function() {
    // attach the column highlighting code to a table
    function attach_vertical_highlighter(table) {

        // if the table hasn't an ID, invent one
        // the table itself doesn't need an ID but, a unique identifier is necessary
        // for the style object and the columns
        if(!table.id) {
            // unique ID is formed from the coordinates of the table
            var id = table.getBoundingClientRect();
            table.id = ['table', id.top, id.left].join('_').replace(/\W/g,'');
        }

        // create a style for column highlighting
        document.getElementsByTagName('head')[0]
            .appendChild(document.createElement('style'))
                .id = table.id+'_style';

        /* find the highlight style */

        // create the regular expression for matching the table class
        var table_regex = 
            new RegExp(
                    'table.('
                        + table.className.trim().replace(/\s+/g, '|') 
                        + ')\\s+vertical_highlight'
                    );

        // loop through the style sheets
        for(var i = document.styleSheets.length; i-->0;)
            with(document.styleSheets[i])
                // loop through the rules
                for(var j = cssRules.length; j-->0;)
                    // if a match is found
                    if(cssRules[j].selectorText.match(table_regex)) {
                        // record the CSS
                        table.highlightCSS = cssRules[j]
                            .cssText.replace(/^[^{}]+{/,'{');
                        // stop looking
                        i = j = -1;
                    }


        // acquire the rows of the table
        var rows = table.getElementsByTagName('tr');

        // loop through the rows
        for(var i = rows.length; i-->0;) {

            // acquire the cells of row i
            var cells = rows[i].getElementsByTagName('td');

            // loop through the cells/columns
            for(var j = cells.length; j-->0;) {

                // append the highlighted class to the cell and store it
                cells[j].className 
                    += ' ' + (cells[j].styleClass = table.id + '_' + j);

                // hover event
                cells[j].onmouseover = function() {
                    // highlight the column by activating its custom style
                    document.getElementById(table.id+'_style').innerHTML =
                        'td.' + this.styleClass + table.highlightCSS;
                }
            }
        }

        // de-hover event
        table.onmouseout = function() {
            // unhighlight everything by nulling out the highlight style
            document.getElementById(table.id+'_style').innerHTML = '';
        }
    }

    // attach vertical highlighting code on load
    window.addEventListener('load', function() {

        // find all tables of the class vertical_highlight
        var tables = document.querySelectorAll('table.vertical_highlight');

        // loop through them
        for(var i = tables.length; i-->0;)
            // attach the vertical highlighting code
            attach_vertical_highlighter(tables[i]);

    }, false);
})();
