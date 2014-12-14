
function $_(definition) {

    // self-explanatory
    var object = null;

    // allowed attributes, some are named differently in the DOM
    var attributes = {
        'id'    : true,
        'href'  : true,
        'src'   : true,
        'alt'   : true,
        'html'  : 'innerHTML',
        'class' : 'className',
    };

    // proceed only if the tag is specified
    if(isset(definition.tag)) {
        object = document.createElement(definition.tag);

        // loop through the supplied attributes and attach them to the object
        // if allowed
        for(var attribute in definition)
            // if the attribute is on the white list, proceed
            if(attributes[attribute])
                object[
                    // if the attribute is renamed in the DOM
                    typeof attributes[attribute] === 'string' ?
                    // use the DOM name
                    attributes[attribute] :
                    // otherwise use the common name
                    attribute
                    ] = definition[attribute];

        // attach the element to the parent, if necessary
        if(isset(definition.parent))
            definition.parent.appendChild(object);
    }
    return object;
}

// self-explanatory
function isset(x) {
    return typeof x !== 'undefined';
}

