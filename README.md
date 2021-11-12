---
title: Google Drive endpoint
keywords: 
last_updated: July 28, 2020
tags: []
summary: "Detailed description of the API of the Google Drive endpoint."
---

## Overview

The Google Drive endpoint is a user endpoint (see [Global vs user endpoints](app_development_model_endpoints.html#global-vs-user-endpoints)), 
which means that each user should connect to the endpoint.

This endpoint allows direct access to the [Google Drive API](https://developers.google.com/drive/api/v3/reference),
however it provides shortcuts and helpers for most common use cases.

Some features available in this endpoint are:

- Authentication and authorization
- Direct access to the Google Drive API
- Helpers for API methods
- Helpers to download and upload files

## Configuration

In order to use the Google Drive endpoint you must create an app in the [Google Developer Console](https://console.developers.google.com)
by following these instructions:

- Access to Google Developer Console
- Access to `API Manager > Library`. Enable `Drive API`.
- Access to `API Manager > Credentials > OAuth consent screen`. Complete the form as you prefer and save it.
- Access to `API Manager > Credentials > Credentials`, then `Create credentials > OAuth client ID`.
- Select `Web application` as `Application Type` and add your domain as `Authorized Javascript Origins` (per example 
  `https://myapp.slingrs.io` or you custom domain if you have one), and add a `Authorized redirect URIs` 
  with your domain and `/callback`, like `https://myapp.slingrs.io/callback` or `https://mycustomdomain.com/callback`.
  If you plan to use the app as a template, you should select 'Multi Application' as 'Client type' in order to use the
  platform main domain, like `https://slingrs.io` and `https://slingrs.io/callback`.
- Then click on `Create`.
- That will give you the `Client ID` and `Client Secret` values.  

### Client ID

As explained above, this value comes from the app created in the Google Developer Console.

### Client secret

As explained above, this value comes from the app created in the Google Developer Console.

### Client type

This field determines what kind of URIs will be used on the client configuration on Google.
Select 'Multi Application' when you want to use your application as a template in order to
use the platform main domain.

### Javascript origin

This URL has to be configured in the app created in the Google Developer Console as a valid
origin for OAuth in the field `Authorized JavaScript origins`.

### Registered URI

This URL has to be configured in the app created in the Google Developer Console in the field
`Authorized redirect URIs`.

## Quick start

You can upload a file like this:

```js
var fileId = app.endpoints.googleDrive.files.uploadFile(record.field('file').id(), 'test.pdf', 'application/pdf', googleDriveFolderId);
log('fileId: '+fileId);
```

You can download a file like this:

```js
var fileInfo = app.endpoints.googleDrive.files.downloadFile(googleDriveFileId);
log('file: '+JSON.stringify(fileInfo));
```

You can export a file like this:

```js
var fileInfo = app.endpoints.googleDrive.files.export(googleDriveFileId, {
    mimeType: 'application/pdf'
});
log('file: '+JSON.stringify(fileInfo));
```

## Javascript API

The Google Drive endpoint allows direct access to the API. This means you can make HTTP requests
to access the API documented [here](https://developers.google.com/drive/api/v3/reference).

Additionally, the endpoint provides shortcuts and helpers for the most common use cases.

### HTTP requests

You can make `GET`, `POST`, `PUT`, and `DELETE` request to the 
[Google Drive API](https://developers.google.com/drive/api/v3/reference) like this:

```js
var res = app.endpoints.googleDrive.get('/files');
```

Please take a look at the documentation of the [HTTP endpoint]({{site.baseurl}}/endpoints_http.html#javascript-api)
for more information.

### Shortcuts

These are the shortcuts available for the Google Drive API:

```
endpoint.changes.getStartPageToken = function(params) { ... }
endpoint.changes.list = function(params) { ... }
endpoint.changes.watch = function(params) { ... }
endpoint.channels.stop = function(body) { ... }
endpoint.comments.create = function(fileId, params, body) { ... }
endpoint.comments.delete = function(fileId, commentId) { ... }
endpoint.comments.get = function(fileId, commentId, params) { ... }
endpoint.comments.list = function(fileId, params) { ... }
endpoint.comments.update = function(fileId, commentId, params, body) { ... }
endpoint.files.copy = function(fileId, params, body) { ... }
endpoint.files.create = function(params, body) { ... }
endpoint.files.delete = function(fileId, params) { ... }
endpoint.files.downloadFile = function(fileId) { ... }
endpoint.files.emptyTrash = function() { ... }
endpoint.files.export = function(fileId, params) { ... }
endpoint.files.generateIds = function(params) { ... }
endpoint.files.get = function(fileId, params) { ... }
endpoint.files.list = function(params) { ... }
endpoint.files.update = function(fileId, params, body) { ... }
endpoint.files.uploadFile = function(slingrFileId, name, mimeType, folderId, originalMimeType) { ... }
endpoint.files.watch = function(fileId, params, body) { ... }
endpoint.permissions.create = function(fileId, params, body) { ... }
endpoint.permissions.delete = function(fileId, permissionId, params) { ... }
endpoint.permissions.get = function(fileId, permissionId, params) { ... }
endpoint.permissions.list = function(fileId, params) { ... }
endpoint.permissions.update = function(fileId, permissionId, params, body) { ... }
endpoint.replies.create = function(fileId, commentId, params, body) { ... }
endpoint.replies.delete = function(fileId, commentId, replyId, params) {  ... }
endpoint.replies.get = function(fileId, commentId, replyId, params) { ... }
endpoint.replies.list = function(fileId, commentId, params) { ... }
endpoint.replies.update = function(fileId, commentId, replyId, params, body) { ... }
endpoint.revisions.delete = function(fileId, revisionId, params) { ... }
endpoint.revisions.get = function(fileId, revisionId, params) { ... }
endpoint.revisions.list = function(fileId, params) { ... }
endpoint.revisions.update = function(fileId, revisionId, params, body) { ... }
endpoint.drives.create = function(params, body) { ... }
endpoint.drives.delete = function(driveId) { ... }
endpoint.drives.get = function(driveId, params) { ... }
endpoint.drives.hide = function(driveId) { ... }
endpoint.drives.list = function(params) { ... }
endpoint.drives.unhide = function(driveId) { ... }
endpoint.drives.update = function(driveId, params, body) { ... }
```

## Events

There are no events for this endpoint.

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.


