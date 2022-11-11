package com.sastit.clubscoresystem.model.request.auth;

public record UserLoginRequest(
    String username,
    String password
) {
}
