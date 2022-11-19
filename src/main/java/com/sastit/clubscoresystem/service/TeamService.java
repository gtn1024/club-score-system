package com.sastit.clubscoresystem.service;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;

import java.util.Collection;

public interface TeamService {
  Team newTeam(Team team);

  boolean isTeamExistByName(String teamName);

  Collection<Team> getAllTeams();

  Collection<Team> getAllTeams(User user);
}
