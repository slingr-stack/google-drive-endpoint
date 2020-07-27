package io.slingr.endpoints.googledrive.services;

import com.google.api.services.drive.DriveScopes;
import com.google.api.services.oauth2.Oauth2Scopes;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

/**
 * Created by lefunes on 16/06/15.
 */
public enum ServiceType {
    OAUTH_2(Oauth2Scopes.USERINFO_PROFILE),
    DRIVE(DriveScopes.all()),
    ;

    private final List<String> scopes;

    ServiceType(String... scopes) {
        this(Arrays.asList(scopes));
    }

    ServiceType(Set<String> scopes) {
        this(new ArrayList<>(scopes));
    }

    ServiceType(List<String> scopes) {
        this.scopes = scopes;
    }

    public List<String> getScopes() {
        return scopes;
    }
}
