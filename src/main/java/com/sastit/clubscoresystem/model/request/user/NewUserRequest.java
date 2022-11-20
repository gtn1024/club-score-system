package com.sastit.clubscoresystem.model.request.user;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public record NewUserRequest(
  @NotNull String username,
  @NotNull @Size(min = 8, message = "密码长度至少为8位") String password,
  @NotNull String realName
) {
}
