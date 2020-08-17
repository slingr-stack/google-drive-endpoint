/////////////////////
// Public API
/////////////////////

// Changes

endpoint.changes = {};

endpoint.changes.getStartPageToken = function(params) {
    return endpoint.get({
        path: '/changes/startPageToken',
        params: params
    });
};

endpoint.changes.list = function(params) {
    return endpoint.get({
        path: '/changes',
        params: params
    });
};

endpoint.changes.watch = function(params) {
    return endpoint.post({
        path: '/changes/watch',
        params: params
    });
};

// Channels

endpoint.channels = {};

endpoint.channels.stop = function(body) {
    return endpoint.post({
        path: '/channels/stop',
        body: body
    });
};

// Comments

endpoint.comments = {};

endpoint.comments.create = function(fileId, params, body) {
    return endpoint.post({
        path: '/files/'+fileId+'/comments',
        params: params,
        body: body
    });
};

endpoint.comments.delete = function(fileId, commentId) {
    return endpoint.delete('/files/'+fileId+'/comments/'+commentId);
};

endpoint.comments.get = function(fileId, commentId, params) {
    return endpoint.get({
        path: '/files/'+fileId+'/comments/'+commentId,
        params: params
    });
};

endpoint.comments.list = function(fileId, params) {
    return endpoint.get({
        path: '/files/'+fileId+'/comments',
        params: params
    });
};

endpoint.comments.update = function(fileId, commentId, params, body) {
    return endpoint.patch({
        path: '/files/'+fileId+'/comments/'+commentId,
        params: params,
        body: body
    });
};

// Files

endpoint.files = {};

endpoint.files.copy = function(fileId, params, body) {
    return endpoint.post({
        path: '/files/'+fileId+'/copy',
        params: params,
        body: body
    });
};

endpoint.files.create = function(params, body) {
    return endpoint.post({
        path: '/files/'+fileId,
        params: params,
        body: body
    });
};

endpoint.files.delete = function(fileId, params) {
    return endpoint.delete({
        path: '/files/'+fileId,
        params: params
    });
};

endpoint.files.downloadFile = function(fileId) {
    return endpoint._downloadFile({
        fileId: fileId
    });
};

endpoint.files.emptyTrash = function() {
    return endpoint.delete('/files/trash');
};

endpoint.files.export = function(fileId, params) {
    return endpoint._exportFile({
        fileId: fileId,
        path: '/files/'+fileId+'/export',
        params: params
    });
};

endpoint.files.generateIds = function(params) {
    return endpoint.get({
        path: '/files/generateIds',
        params: params
    });
};

endpoint.files.get = function(fileId, params) {
    return endpoint.get({
        path: '/files/'+fileId,
        params: params
    });
};

endpoint.files.list = function(params) {
    return endpoint.get({
        path: '/files',
        params: params
    });
};

endpoint.files.update = function(fileId, params, body) {
    return endpoint.patch({
        path: '/files/'+fileId,
        params: params,
        body: body
    });
};

endpoint.files.uploadFile = function(slingrFileId, name, mimeType, folderId) {
    return endpoint._uploadFile({
        fileId: slingrFileId,
        name: name,
        mimeType: mimeType,
        folderId: folderId
    });
};

endpoint.files.watch = function(fileId, params, body) {
    return endpoint.patch({
        path: '/files/'+fileId+'/watch',
        params: params,
        body: body
    });
};

// Permissions

endpoint.permissions = {};

endpoint.permissions.create = function(fileId, params, body) {
    return endpoint.post({
        path: '/files/'+fileId+'/permissions',
        params: params,
        body: body
    });
};

endpoint.permissions.delete = function(fileId, permissionId, params) {
    return endpoint.delete({
        path: '/files/'+fileId+'/permissions/'+permissionId,
        params: params
    });
};

endpoint.permissions.get = function(fileId, permissionId, params) {
    return endpoint.get({
        path: '/files/'+fileId+'/permissions/'+permissionId,
        params: params
    });
};

endpoint.permissions.list = function(fileId, params) {
    return endpoint.get({
        path: '/files/'+fileId+'/permissions',
        params: params
    });
};

endpoint.permissions.update = function(fileId, permissionId, params, body) {
    return endpoint.patch({
        path: '/files/'+fileId+'/permissions/'+permissionId,
        params: params,
        body: body
    });
};

// Replies

endpoint.replies = {};

endpoint.replies.create = function(fileId, commentId, params, body) {
    return endpoint.post({
        path: '/files/'+fileId+'/comments/'+commentId+'/replies',
        params: params,
        body: body
    });
};

endpoint.replies.delete = function(fileId, commentId, replyId, params) {
    return endpoint.delete({
        path: '/files/'+fileId+'/comments/'+commentId+'/replies/'+replyId,
        params: params
    });
};

endpoint.replies.get = function(fileId, commentId, replyId, params) {
    return endpoint.get({
        path: '/files/'+fileId+'/comments/'+commentId+'/replies/'+replyId,
        params: params
    });
};

endpoint.replies.list = function(fileId, commentId, params) {
    return endpoint.get({
        path: '/files/'+fileId+'/comments/'+commentId+'/replies',
        params: params
    });
};

endpoint.replies.update = function(fileId, commentId, replyId, params, body) {
    return endpoint.patch({
        path: '/files/'+fileId+'/comments/'+commentId+'/replies/'+replyId,
        params: params,
        body: body
    });
};

// Revisions

endpoint.revisions = {};

endpoint.revisions.delete = function(fileId, revisionId, params) {
    return endpoint.delete({
        path: '/files/'+fileId+'/revisions/'+revisionId,
        params: params
    });
};

endpoint.revisions.get = function(fileId, revisionId, params) {
    return endpoint.get({
        path: '/files/'+fileId+'/revisions/'+revisionId,
        params: params
    });
};

endpoint.revisions.list = function(fileId, params) {
    return endpoint.get({
        path: '/files/'+fileId+'/revisions',
        params: params
    });
};

endpoint.revisions.update = function(fileId, revisionId, params, body) {
    return endpoint.patch({
        path: '/files/'+fileId+'/revisions/'+revisionId,
        params: params,
        body: body
    });
};


// Drives

endpoint.drives = {};

endpoint.drives.create = function(params, body) {
    return endpoint.post({
        path: '/drives',
        params: params,
        body: body
    });
};

endpoint.drives.delete = function(driveId) {
    return endpoint.post('/drives/'+driveId);
};

endpoint.drives.get = function(driveId, params) {
    return endpoint.get({
        path: '/drives/'+driveId,
        params: params
    });
};

endpoint.drives.hide = function(driveId) {
    return endpoint.post('/drives/'+driveId+'/hide');
};

endpoint.drives.list = function(params) {
    return endpoint.get({
        path: '/drives',
        params: params
    });
};

endpoint.drives.unhide = function(driveId) {
    return endpoint.post('/drives/'+driveId+'/unhide');
};

endpoint.drives.update = function(driveId, params, body) {
    return endpoint.post({
        path: '/drives/'+driveId,
        params: params,
        body: body
    });
};

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