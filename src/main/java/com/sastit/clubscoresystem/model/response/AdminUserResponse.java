package com.sastit.clubscoresystem.model.response;

import com.sastit.clubscoresystem.model.dto.UserDto;

import java.util.Collection;

public record AdminUserResponse(
  Long total,
  Collection<UserDto> data
) {
}
