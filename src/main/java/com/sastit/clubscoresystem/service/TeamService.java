package com.sastit.clubscoresystem.service;

import com.sastit.clubscoresystem.model.entity.Team;

public interface TeamService {
  Team newTeam(Team team);

  boolean isTeamExistByName(String teamName);
}
