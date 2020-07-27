/////////////////////
// Public API
/////////////////////


/////////////////////
// Public API - Generic Functions
/////////////////////

endpoint.get = function (url) {
    options = checkHttpOptions(url, {});
    return endpoint._getRequest(options);
};

endpoint.post = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._postRequest(options);
};

endpoint.put = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._putRequest(options);
};

endpoint.patch = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._patchRequest(options);
};

endpoint.delete = function (url) {
    var options = checkHttpOptions(url, {});
    return endpoint._deleteRequest(options);
};

/////////////////////
// Utilities
/////////////////////

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);