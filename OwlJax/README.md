# OwlJax
Originally written for [OwlScript](http://www.owlscript.org), OwlJax is an AJAX
contrivance with only one feature: fetch the goods from a given URL.
## Use
```javascript

var users = new OwlJax('http://www.domain.com/users.php');

users.request({
        action      : 'add',
        name        : 'Jom Jose',
        email       : 'hello@jomjose.com',
        occupation  : 'Front End Developer'
    },
    // what to do on a successful request
    {
        success: function(data) {

            // variable 'data' contains a returned object, not text, object

        }
    }
);
```
It is assumed that the returned data is in JSON, *e.g.*
```JavaScript
{'status': 'OK'}
```
### Same Origin Request
In case of a same origin request, *i.e.* the back end script resides on the same
domain as the JavaScript, no additional processing is required.
### Cross Origin Request
If the domain does not match the origin, a hacky, cross origin request is
initiated via the `<script src="..."></script>` trick.  Two issues here:
* It uses GET as opposed to POST, thus limiting the size and type of the data
upstream.
* Cross domain requests require the returned text to be in JSONP, meaning
that instead of merely sending
```JavaScript
{'status': 'OK'}
```
the back end must return the data as follows:
```JavaScript
callback_function({'status': 'OK'})
```
OwlJax creates a unique callback function and sends it in the argument `callback`.
Back end must envelop all output in whatever is passed via the argument `callback`
like so:
```PHP
<?php

    // stuff here

    $json = json_encode($data);
    $callback = sanitize($_REQUEST['callback']);
    echo "$callback($json)";

?>
```
