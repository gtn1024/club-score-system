package com.sastit.clubscoresystem.service;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;

import java.util.Collection;

public interface TeamService {
  Team newTeam(Team team);

  boolean isTeamExistByName(String teamName);

  Collection<Team> getAllTeams(String name, Integer pageSize);

  Collection<Team> getAllTeams(String name, User user, Integer pageSize);
}
