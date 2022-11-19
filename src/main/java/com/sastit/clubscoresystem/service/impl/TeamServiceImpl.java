package com.sastit.clubscoresystem.service.impl;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.repository.TeamRepository;
import com.sastit.clubscoresystem.service.TeamService;
import org.springframework.stereotype.Service;

import java.util.Collection;

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

  @Override
  public Collection<Team> getAllTeams(String name, Integer pageSize) {
    if (name.isEmpty()) {
      // TODO: 筛选
    }
    return teamRepository.findAll();
  }

  @Override
  public Collection<Team> getAllTeams(String name, User user, Integer pageSize) {
    if (name.isEmpty()) {
      // TODO: 筛选
    }
    return teamRepository.findAllByOwnerOrAdminsContains(user, user);
  }
}
