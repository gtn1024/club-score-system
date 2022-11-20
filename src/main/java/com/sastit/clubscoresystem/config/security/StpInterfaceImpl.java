package com.sastit.clubscoresystem.config.security;

import cn.dev33.satoken.stp.StpInterface;
import com.sastit.clubscoresystem.exception.auth.LoginException;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.service.UserService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StpInterfaceImpl implements StpInterface {
  private final UserService userService;

  public StpInterfaceImpl(UserService userService) {
    this.userService = userService;
  }

  @Override
  public List<String> getPermissionList(Object loginId, String loginType) {
    return List.of();
  }

  @Override
  public List<String> getRoleList(Object loginId, String loginType) {
    if (loginId instanceof String sId) {
      long id = Long.parseLong(sId);
      return userService.findById(id).map(u -> {
        List<String> roles = new ArrayList<>();
        roles.add(User.Role.USER);
        if (u.getAdmin()) roles.add(User.Role.ADMIN);
        if (u.getSuperAdmin()) roles.add(User.Role.SUPER_ADMIN);
        return roles;
      }).orElseThrow(() -> new LoginException(401, "用户不存在"));
    }
    // TODO: use custom exception
    throw new RuntimeException("内部错误");
  }
}
