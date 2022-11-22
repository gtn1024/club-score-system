package com.sastit.clubscoresystem.service.impl;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.repository.TeamRepository;
import com.sastit.clubscoresystem.service.TeamService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

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
  public Team updateTeam(Team team) {
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
  public Collection<Team> getAllTeams(User owner, User manager, User student, Integer pageSize, Integer currentPage) {
    if (owner != null) {
      return teamRepository.findAllByOwnerIs(owner, PageRequest.of(currentPage - 1, pageSize));
    }
    if (manager != null) {
      return teamRepository.findAllByAdminsContaining(manager, PageRequest.of(currentPage - 1, pageSize));
    }
    if (student != null) {
      return teamRepository.findAllByStudentsContaining(student, PageRequest.of(currentPage - 1, pageSize));
    }
    return Collections.emptyList();
  }

  @Override
  public Long countAllTeams(String name, User user, Integer pageSize, Integer currentPage) {
    if (user == null) {
      return teamRepository.countAllByNameContaining(name, PageRequest.of(currentPage - 1, pageSize));
    }
    return teamRepository
      .countAllByNameContainingAndOwnerOrAdminsContains(name, user, user, PageRequest.of(currentPage - 1, pageSize));
  }

  @Override
  public void deleteTeam(Team team) {
    teamRepository.delete(team);
  }

  @Override
  public Collection<Team> findByOwner(User user) {
    return teamRepository.findAllByOwnerIs(user, null);
  }

  @Override
  public void deleteAll(Collection<Team> teams) {
    teamRepository.deleteAll(teams);
  }
}
