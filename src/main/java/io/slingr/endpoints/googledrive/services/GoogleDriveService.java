package io.slingr.endpoints.googledrive.services;

import com.google.api.client.http.HttpResponseException;
import com.google.api.client.json.GenericJson;
import com.google.api.client.util.DateTime;
import com.google.api.services.drive.GenericGoogleDriveService;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.googledrive.GoogleDriveEndpoint;
import io.slingr.endpoints.googledrive.services.entities.ApiException;
import io.slingr.endpoints.utils.Json;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 * <p>Service class that interacts with the Google Drive API
 *
 * <p>Created by lefunes on 16/06/15.
 * <p>Created by dgaviola on 27/07/20.
 */
public class GoogleDriveService {
    private static final Logger logger = Logger.getLogger(GoogleDriveService.class);

    public static final String EXPIRATION_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSZ";
    private static final DateFormat DATE_FORMAT = new SimpleDateFormat(EXPIRATION_TIME_FORMAT);

    private final String userId;
    private final GenericGoogleDriveService service;
    private final GoogleDriveEndpoint endpoint;

    public GoogleDriveService(String userId, String applicationName, String token, GoogleDriveEndpoint endpoint) {
        this.userId = userId;
        if (StringUtils.isBlank(token)) {
            throw new IllegalArgumentException("Invalid token");
        }
        if (StringUtils.isBlank(applicationName)) {
            applicationName = "Google Drive";
        }

        final GenericGoogleDriveService service;
        try {
            service = new GenericGoogleDriveService(applicationName, token);
        } catch (HttpResponseException e) {
            logger.info(String.format("Invalid response when try to build the Google Drive client [%s]", e.getContent() != null ? e.getContent() : e.getMessage()));
            throw ApiException.generate("Invalid response when try to build the Google Drive client", e);
        } catch (Exception e) {
            String cm = String.format("Error building the drive service [%s]", e.getMessage());
            logger.info(cm, e);
            throw ApiException.generate(cm, e);
        }
        this.service = service;
        this.endpoint = endpoint;
    }

    public Json getRequest(String url, String functionId) {
        try {
            final GenericJson json = service.generic().get(url).execute();
            final Json response = getJson(json);

            logger.info(String.format("Google response [%s]", response));
            return response;
        } catch (EndpointException e) {
            return e.toJson(true);
        } catch (HttpResponseException e) {
            return processHttpResponseException(functionId, e);
        } catch (Exception e) {
            return processException(e);
        }
    }

    public Json postRequest(String url, Json content, String functionId) {
        try {
            final GenericJson json = service.generic().post(url, content).execute();
            final Json response = getJson(json);

            logger.info(String.format("Google response [%s]", response));
            return response;
        } catch (EndpointException e) {
            return e.toJson(true);
        } catch (HttpResponseException e) {
            return processHttpResponseException(functionId, e);
        } catch (Exception e) {
            return processException(e);
        }
    }

    public Json putRequest(String url, Json content, String functionId) {
        try {
            final GenericJson json = service.generic().put(url, content).execute();
            final Json response = getJson(json);

            logger.info(String.format("Google response [%s]", response));
            return response;
        } catch (EndpointException e) {
            return e.toJson(true);
        } catch (HttpResponseException e) {
            return processHttpResponseException(functionId, e);
        } catch (Exception e) {
            return processException(e);
        }
    }

    public Json patchRequest(String url, Json content, String functionId) {
        try {
            final GenericJson json = service.generic().patch(url, content).execute();
            final Json response = getJson(json);

            logger.info(String.format("Google response [%s]", response));
            return response;
        } catch (EndpointException e) {
            return e.toJson(true);
        } catch (HttpResponseException e) {
            return processHttpResponseException(functionId, e);
        } catch (Exception e) {
            return processException(e);
        }
    }

    public Json deleteRequest(String url, String functionId) {
        try {
            final GenericJson json = service.generic().delete(url).execute();
            final Json response = getJson(json);

            logger.info(String.format("Google response [%s]", response));
            return response;
        } catch (EndpointException e) {
            return e.toJson(true);
        } catch (HttpResponseException e) {
            return processHttpResponseException(functionId, e);
        } catch (Exception e) {
            return processException(e);
        }
    }

    public Json getJson(GenericJson genericJson) {
        final Json response = Json.fromMap(genericJson);
        response.traverse(new Json.Visitor() {
            @Override
            public Object convertValue(String key, Object value, String path) {
                if(value instanceof DateTime){
                    return ((DateTime) value).toStringRfc3339();
                }
                return value;
            }
        });
        return response;
    }

    private static Json processException(Exception e) {
        return processException(logger, e);
    }

    private static Json processException(Exception e, String text) {
        return processException(logger, e, text);
    }

    public static Json processException(Logger logger, Exception e) {
        return processException(logger, e, "Exception when execute request");
    }

    public static Json processException(Logger logger, Exception e, String text) {
        final String message = String.format("%s [%s]", text, e.getMessage());
        logger.info(message, e);
        return ApiException.generate(message, e, true);
    }

    private Json processHttpResponseException(String functionId, HttpResponseException e) {
        return processHttpResponseException(endpoint, userId, functionId, e);
    }

    private Json processHttpResponseException(String functionId, HttpResponseException e, String text) {
        return processHttpResponseException(endpoint, userId, functionId, e, text);
    }

    public static Json processHttpResponseException(GoogleDriveEndpoint endpoint, String userId, String functionId, HttpResponseException e) {
        return processHttpResponseException(endpoint, userId, functionId, e, "Exception when execute request");
    }

    public static Json processHttpResponseException(GoogleDriveEndpoint endpoint, String userId, String functionId, HttpResponseException e, String text) {
        endpoint.checkDisconnection(userId, e, functionId);

        String message;
        try {
            Json json = Json.fromObject(e.getContent() != null ? e.getContent() : e.getMessage());
            message = String.format("%s [%s]", text, (json.contains("message") ? json.string("message") : json.toString()));
        } catch (Exception ex){
            message = String.format("%s [%s]", text, e.getContent() != null ? e.getContent() : e.getMessage());
        }
        logger.info(message, e);
        return ApiException.generate(message, e, true);
    }
}
