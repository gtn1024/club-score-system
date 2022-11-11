package com.sastit.clubscoresystem.controller;

import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.model.request.user.NewUserRequest;
import com.sastit.clubscoresystem.service.UserService;
import com.sastit.clubscoresystem.shared.PasswordUtil;
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
    public User newUser(@Valid @RequestBody NewUserRequest request) {
        User user = new User();
        user.setUsername(request.username());
        user.setPassword(PasswordUtil.hashPassword(request.username(), request.password()));
        return userService.newUser(user);
    }
}