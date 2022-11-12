package com.sastit.clubscoresystem.model.request.user;

import javax.validation.constraints.NotNull;

public record NewUserRequest(
  @NotNull String username,
  @NotNull String password,
  @NotNull String realName
) {
}
