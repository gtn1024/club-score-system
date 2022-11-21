package com.sastit.clubscoresystem.model.dto;

import com.sastit.clubscoresystem.model.entity.Team;

import java.util.Collection;

public record TeamDto(
  Long id,
  String name,
  String picture,
  UserDto owner,
  Collection<UserDto> admins,
  long memberCount
) {
  public static TeamDto teamToTeamDto(Team team) {
    return new TeamDto(
      team.getId(),
      team.getName(),
      team.getPicture(),
      UserDto.userToUserDto(team.getOwner()),
      UserDto.usersToUserDtos(team.getAdmins()),
      team.getStudents().size()
    );
  }
}
