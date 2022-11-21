package com.sastit.clubscoresystem.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.sastit.clubscoresystem.exception.auth.LoginException;
import com.sastit.clubscoresystem.model.dto.TeamDto;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.model.response.HttpResponse;
import com.sastit.clubscoresystem.service.TeamService;
import com.sastit.clubscoresystem.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/team")
public class TeamController {
  private final TeamService teamService;
  private final UserService userService;

  public TeamController(TeamService teamService, UserService userService) {
    this.teamService = teamService;
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<HttpResponse<List<TeamDto>>> getTeams(
    @RequestParam(required = false, defaultValue = "all") String scope
  ) {
    User user = null;
    if (!scope.equals("all")) {
      if (StpUtil.getTokenInfo().getLoginId() instanceof String sid) {
        Long id = Long.parseLong(sid);
        user = userService.findById(id).orElseThrow(() -> new LoginException(401, "用户不存在"));
      }
    }
    return switch (scope) {
      case "joined" -> HttpResponse.success(200, "获取成功",
        teamService.getAllTeams(null, null, user, Integer.MAX_VALUE, 1).stream().map(TeamDto::teamToTeamDto).toList()
      );
      case "created" -> HttpResponse.success(200, "获取成功",
        teamService.getAllTeams(user, null, null, Integer.MAX_VALUE, 1).stream().map(TeamDto::teamToTeamDto).toList()
      );
      case "managed" -> HttpResponse.success(200, "获取成功",
        teamService.getAllTeams(null, user, null, Integer.MAX_VALUE, 1).stream().map(TeamDto::teamToTeamDto).toList()
      );
      case "all" -> HttpResponse.success(
        200,
        "获取成功",
        teamService.getAllTeams(null, null, Integer.MAX_VALUE, 1).stream().map(TeamDto::teamToTeamDto).toList()
      );
      default -> HttpResponse.success(200, "获取成功", List.of());
    };
  }
}
