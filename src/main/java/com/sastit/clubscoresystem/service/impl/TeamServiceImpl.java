package com.sastit.clubscoresystem.service.impl;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.repository.TeamRepository;
import com.sastit.clubscoresystem.service.TeamService;
import org.springframework.data.domain.PageRequest;
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
  public Collection<Team> getAllTeams(String name, User user, Integer pageSize, Integer currentPage) {
    if (user == null) {
      return teamRepository.findAllByNameContaining(name, PageRequest.of(currentPage - 1, pageSize));
    }
    return teamRepository
      .findAllByNameContainingAndOwnerOrAdminsContains(name, user, user, PageRequest.of(currentPage - 1, pageSize));
  }

  @Override
  public Long countAllTeams(String name, User user, Integer pageSize, Integer currentPage) {
    if (user == null) {
      return teamRepository.countAllByNameContaining(name, PageRequest.of(currentPage - 1, pageSize));
    }
    return teamRepository
      .countAllByNameContainingAndOwnerOrAdminsContains(name, user, user, PageRequest.of(currentPage - 1, pageSize));
  }
}
