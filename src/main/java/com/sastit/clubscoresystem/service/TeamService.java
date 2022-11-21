package com.sastit.clubscoresystem.service;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;

import java.util.Collection;

public interface TeamService {
  Team newTeam(Team team);

  boolean isTeamExistByName(String teamName);

  Collection<Team> getAllTeams(String name, User user, Integer pageSize, Integer currentPage);

  Collection<Team> getAllTeams(User owner, User manager, User student, Integer pageSize, Integer currentPage);

  Long countAllTeams(String name, User user, Integer pageSize, Integer currentPage);
}
