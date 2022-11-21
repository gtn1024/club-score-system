package com.sastit.clubscoresystem.model.dto;

import com.sastit.clubscoresystem.model.entity.Team;

import java.util.Collection;

public record TeamDto(
  Long id,
  String name,
  UserDto owner,
  Collection<UserDto> admins
) {
  public static TeamDto teamToTeamDto(Team team) {
    return new TeamDto(
      team.getId(),
      team.getName(),
      UserDto.userToUserDto(team.getOwner()),
      UserDto.usersToUserDtos(team.getAdmins())
    );
  }
}
