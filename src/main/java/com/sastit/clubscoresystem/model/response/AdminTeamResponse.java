package com.sastit.clubscoresystem.model.response;

import com.sastit.clubscoresystem.model.dto.TeamDto;

import java.util.Collection;

public record AdminTeamResponse(
  Long total,
  Collection<TeamDto> data
) {
}
