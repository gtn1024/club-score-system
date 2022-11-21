package com.sastit.clubscoresystem.controller.admin;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.stp.StpUtil;
import com.sastit.clubscoresystem.exception.auth.LoginException;
import com.sastit.clubscoresystem.model.dto.TeamDto;
import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.model.request.team.NewTeamRequest;
import com.sastit.clubscoresystem.model.response.AdminTeamResponse;
import com.sastit.clubscoresystem.model.response.HttpResponse;
import com.sastit.clubscoresystem.service.TeamService;
import com.sastit.clubscoresystem.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/admin/team")
public class AdminTeamController {
  private final TeamService teamService;
  private final UserService userService;

  public AdminTeamController(TeamService teamService, UserService userService) {
    this.teamService = teamService;
    this.userService = userService;
  }

  @PostMapping
  @SaCheckRole(value = {User.Role.SUPER_ADMIN, User.Role.ADMIN}, mode = SaMode.OR)
  public ResponseEntity<HttpResponse<TeamDto>> createTeam(@Valid @RequestBody NewTeamRequest request) {
    User user = null;
    if (StpUtil.getTokenInfo().getLoginId() instanceof String sid) {
      Long id = Long.parseLong(sid);
      user = userService.findById(id).orElseThrow(() -> new LoginException(401, "用户不存在"));
    }
    if (teamService.isTeamExistByName(request.name())) {
      // TODO: use custom exception
      throw new RuntimeException("团队已存在");
    }
    Team team = new Team();
    team.setName(request.name());
    team.setOwner(user);
    team = teamService.newTeam(team);
    if (user != null) {
      user.getOwnTeams().add(team);
      userService.updateUser(user);
    }
    return HttpResponse.success(200, "创建成功", TeamDto.teamToTeamDto(team));
  }

  @GetMapping
  @SaCheckRole(value = {User.Role.SUPER_ADMIN, User.Role.ADMIN}, mode = SaMode.OR)
  public ResponseEntity<HttpResponse<AdminTeamResponse>> getTeams(
    @RequestParam(required = false, defaultValue = "") String name,
    @RequestParam(required = false, defaultValue = "false") boolean mine,
    @RequestParam(required = false, defaultValue = "20") Integer pageSize,
    @RequestParam(required = false, defaultValue = "1") Integer currentPage
  ) {
    List<String> roles = StpUtil.getRoleList();
    User user = null;
    if (mine || !roles.contains(User.Role.SUPER_ADMIN)) {
      if (StpUtil.getTokenInfo().getLoginId() instanceof String sid) {
        Long id = Long.parseLong(sid);
        user = userService.findById(id).orElseThrow(() -> new LoginException(401, "用户不存在"));
      }
    }
    return HttpResponse.success(200, "获取成功",
      new AdminTeamResponse(
        teamService.countAllTeams(name, user, pageSize, currentPage),
        teamService.getAllTeams(name, user, pageSize, currentPage).stream().map(TeamDto::teamToTeamDto).toList()
      )
    );
  }
}
