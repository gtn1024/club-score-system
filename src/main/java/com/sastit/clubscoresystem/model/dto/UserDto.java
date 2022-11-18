package com.sastit.clubscoresystem.model.dto;

import com.sastit.clubscoresystem.model.entity.User;

import java.util.Collection;
import java.util.Set;

public record UserDto(
  Long id,
  String username,
  String realName,
  Boolean superAdmin,
  Boolean admin
) {
  public static UserDto userToUserDto(User user) {
    return new UserDto(
      user.getId(),
      user.getUsername(),
      user.getRealName(),
      user.getSuperAdmin(),
      user.getAdmin()
    );
  }

  public static Collection<UserDto> usersToUserDtos(Set<User> admins) {
    return admins.stream().map(UserDto::userToUserDto).toList();
  }
}
