package com.sastit.clubscoresystem.service.impl;

import com.sastit.clubscoresystem.repository.TeamRepository;
import com.sastit.clubscoresystem.service.TeamService;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {
  private final TeamRepository teamRepository;

  public TeamServiceImpl(TeamRepository teamRepository) {
    this.teamRepository = teamRepository;
  }
}
