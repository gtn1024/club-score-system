package com.sastit.clubscoresystem.controller;

import com.sastit.clubscoresystem.model.dto.UserDto;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.model.request.user.NewUserRequest;
import com.sastit.clubscoresystem.model.response.HttpResponse;
import com.sastit.clubscoresystem.service.UserService;
import com.sastit.clubscoresystem.shared.PasswordUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<HttpResponse<UserDto>> newUser(@Valid @RequestBody NewUserRequest request) {
    if (userService.isUsernameExist(request.username())) {
      // TODO: use custom exception
      throw new RuntimeException("Username already exist");
    }
    User user = new User();
    user.setUsername(request.username());
    user.setPassword(PasswordUtil.hashPassword(request.username(), request.password()));
    user.setRealName(request.realName());
    if (userService.count() == 0) user.setSuperAdmin(true);
    user = userService.newUser(user);
    return HttpResponse.success(200, "创建成功", UserDto.userToUserDto(user));
  }
}
