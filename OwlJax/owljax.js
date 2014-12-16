
/*
 * OwlJax v0.1 by Val Tenyotkin (val@tenyotk.in)
 *
 */

// OwlJax class declaration
function OwlJax(url) {

    // self-explanatory
    this.url = url;

    // unique handler function ID
    this.handler_id = Math.random().toString().substr(10).replace(/\D/g, '');

    // same origin request
    this.domestic = function(parameters, callback) {

        // self-explanatory
        var post = '';

        // create a new asynchronous request object
        var ajax = new XMLHttpRequest();

        // what to do if something happens
        ajax.onreadystatechange = function() {
            // if something good happens
            if(ajax.readyState == 4)
                // pass the response text to the success function
                callback['success'](JSON.parse(ajax.responseText));
        }

        // create the post
        for(var key in parameters)
            if(typeof key === 'string')
                post += '&' + key + '=' + encodeURIComponent(parameters[key]);

        // post
        ajax.open('POST', this.url, true);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.send(post);

    }

    // cross origin request
    this.foreign = function(parameters, callback) {

        // base URL
        var url = this.url + '?';

        // set the callback function
        if(typeof callback['success'] === 'function') {
            // create the callback function name
            parameters['callback'] = '_OWLJAX_CALLBACK_FUNCTION_' + this.handler_id++;
            // create the callback function
            window[parameters['callback']] = function(args) {
                // execute the function
                callback['success'](args);
                // delete it
                window[parameters['callback']] = undefined;
            }
        }
        // if the callback function name is passed, use it
        else
            parameters['callback'] = callback['success'];

        // create the request URL
        for(var key in parameters)
            if(typeof key === 'string')
                url += '&' + key + '=' + encodeURIComponent(parameters[key]);

        // create the <script> object
        var script = document.createElement('script');
        // attach it to the body of the document
        document.body.appendChild(script);

        // once loaded, destroy the script object, it is no longer necessary
        script.onload = function() {
            this.parentNode.removeChild(this);
        }

        // set the source of the <script></script>, thus initiating the request
        script.src = url;
    }

    this.request = (
        // if the URL is not absolute or matches the website URL, use a
        // legitimate HTTP request
            !url.match(/http:\/\//i)
        ||  new URL(url).hostname == parent.location.hostname)
        ? this.domestic
        // otherwise use a cross origin call
        : this.foreign;
}
