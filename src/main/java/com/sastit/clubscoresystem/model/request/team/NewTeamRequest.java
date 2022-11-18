package com.sastit.clubscoresystem.model.request.team;

import javax.validation.constraints.NotNull;

public record NewTeamRequest(
  @NotNull String name
) {
}
