package com.sastit.clubscoresystem.integration;

import com.sastit.clubscoresystem.exception.user.UserException;
import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.service.TeamService;
import com.sastit.clubscoresystem.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;

@Service
public class IntegrationService {
  private final TeamService teamService;
  private final UserService userService;

  public IntegrationService(TeamService teamService, UserService userService) {
    this.teamService = teamService;
    this.userService = userService;
  }

  public void removeUser(Long id) {
    User user = userService.findById(id).orElseThrow(() -> new UserException(400, "用户不存在"));
    Collection<Team> teams = teamService.findByOwner(user);
    teamService.deleteAll(teams);
    teamService
      .getAllTeams(null, user, null, Integer.MAX_VALUE, 1)
      .forEach(team -> {
        Set<User> admins = team.getAdmins();
        admins.remove(user);
        teamService.updateTeam(team);
      });
    teamService
      .getAllTeams(null, null, user, Integer.MAX_VALUE, 1)
      .forEach(team -> {
        Set<User> students = team.getStudents();
        students.remove(user);
        teamService.updateTeam(team);
      });
    userService.deleteUser(user.getId());
  }
}
