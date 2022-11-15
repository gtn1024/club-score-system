package com.sastit.clubscoresystem.model.response.auth;

import com.sastit.clubscoresystem.model.dto.UserDto;
import com.sastit.clubscoresystem.model.response.Result;

public record CurrentUserResult(
  UserDto user
) implements Result {
}
