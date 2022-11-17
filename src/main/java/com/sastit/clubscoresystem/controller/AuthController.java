package com.sastit.clubscoresystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.stp.SaTokenInfo;
import cn.dev33.satoken.stp.StpUtil;
import com.sastit.clubscoresystem.exception.auth.LoginException;
import com.sastit.clubscoresystem.model.dto.UserDto;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.model.request.auth.UserLoginRequest;
import com.sastit.clubscoresystem.model.response.HttpResponse;
import com.sastit.clubscoresystem.service.UserService;
import com.sastit.clubscoresystem.shared.PasswordUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final UserService userService;

  public AuthController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/login")
  public ResponseEntity<HttpResponse<String>> login(@Valid @RequestBody UserLoginRequest userLoginRequest) {
    Optional<User> user = userService.findByUsername(userLoginRequest.username());
    if (user.isEmpty()) {
      throw new LoginException(401, "用户不存在");
    } else {
      User u = user.get();
      if (PasswordUtil.checkPassword(u.getPassword(), userLoginRequest.username(), userLoginRequest.password())) {
        StpUtil.login(u.getId());
        SaTokenInfo tokenInfo = StpUtil.getTokenInfo();
        return HttpResponse.success(200, "登录成功", tokenInfo.getTokenValue());
      } else {
        throw new LoginException(401, "密码错误");
      }
    }
  }

  @SaCheckLogin
  @GetMapping("/current")
  public ResponseEntity<HttpResponse<UserDto>> getCurrentUser() {
    if (StpUtil.getTokenInfo().getLoginId() instanceof String sid) {
      Long id = Long.parseLong(sid);
      return userService
        .findById(id)
        .map(u -> HttpResponse.success(200, "获取成功", UserDto.userToUserDto(u)))
        .orElseThrow(() -> new LoginException(401, "用户不存在"));
    }
    throw new RuntimeException("内部错误");
  }
}
