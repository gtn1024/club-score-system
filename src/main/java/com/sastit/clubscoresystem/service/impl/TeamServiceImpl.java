package com.sastit.clubscoresystem.service.impl;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.repository.TeamRepository;
import com.sastit.clubscoresystem.service.TeamService;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {
  private final TeamRepository teamRepository;

  public TeamServiceImpl(TeamRepository teamRepository) {
    this.teamRepository = teamRepository;
  }

  @Override
  public Team newTeam(Team team) {
    return teamRepository.save(team);
  }

  @Override
  public boolean isTeamExistByName(String teamName) {
    return teamRepository.existsByName(teamName);
  }
}
