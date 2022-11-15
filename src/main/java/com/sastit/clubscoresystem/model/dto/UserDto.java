package com.sastit.clubscoresystem.model.dto;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;

import java.util.Set;

public record UserDto(
  Long id,
  String username,
  String realName,
  Set<Team> teams,
  Boolean superAdmin,
  Boolean admin
) {
  public static UserDto userToUserDto(User user) {
    return new UserDto(
      user.getId(),
      user.getUsername(),
      user.getRealName(),
      user.getTeams(),
      user.getSuperAdmin(),
      user.getAdmin()
    );
  }
}
