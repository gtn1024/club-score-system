package com.sastit.clubscoresystem.controller.admin;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.stp.StpUtil;
import com.sastit.clubscoresystem.exception.user.UserException;
import com.sastit.clubscoresystem.model.dto.UserDto;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.model.response.AdminUserResponse;
import com.sastit.clubscoresystem.model.response.HttpResponse;
import com.sastit.clubscoresystem.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/user")
public class AdminUserController {
  private final UserService userService;

  public AdminUserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  @SaCheckRole(value = {User.Role.SUPER_ADMIN, User.Role.ADMIN}, mode = SaMode.OR)
  public ResponseEntity<HttpResponse<AdminUserResponse>> getUsers(
    @RequestParam(required = false, defaultValue = "") String username,
    @RequestParam(required = false, defaultValue = "20") Integer pageSize,
    @RequestParam(required = false, defaultValue = "1") Integer currentPage
  ) {
    return HttpResponse.success(200, "获取成功",
      new AdminUserResponse(
        userService.countAllUsers(username, pageSize, currentPage),
        userService.getAllUsers(username, pageSize, currentPage).stream().map(UserDto::userToUserDto).toList()
      )
    );
  }

  @DeleteMapping("/{id}")
  @SaCheckRole(value = {User.Role.SUPER_ADMIN, User.Role.ADMIN}, mode = SaMode.OR)
  public ResponseEntity<HttpResponse<Void>> deleteUser(@PathVariable Long id) {
    if (StpUtil.getTokenInfo().getLoginId() instanceof String sid) {
      Long uid = Long.parseLong(sid);
      if (uid.equals(id)) throw new UserException(400, "你删了自己还怎么登录？");
    }
    userService.deleteUser(id);
    return HttpResponse.success(200, "删除成功", null);
  }
}
