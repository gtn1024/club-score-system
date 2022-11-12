package com.sastit.clubscoresystem.model.request.auth;

import javax.validation.constraints.NotNull;

public record UserLoginRequest(
    @NotNull String username,
    @NotNull String password
) {
}
