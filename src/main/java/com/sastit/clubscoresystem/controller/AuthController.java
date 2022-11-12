package com.sastit.clubscoresystem.controller;

import cn.dev33.satoken.stp.SaTokenInfo;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.model.request.auth.UserLoginRequest;
import com.sastit.clubscoresystem.service.UserService;
import com.sastit.clubscoresystem.shared.PasswordUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public SaResult login(@Valid @RequestBody UserLoginRequest userLoginRequest) {
        return userService
            .findByUsername(userLoginRequest.username())
            .map(u -> {
                if (PasswordUtil.checkPassword(u.getPassword(), userLoginRequest.username(), userLoginRequest.password())) {
                    StpUtil.login(u.getId());
                    SaTokenInfo tokenInfo = StpUtil.getTokenInfo();
                    return SaResult.data(tokenInfo);
                } else {
                    // TODO: use custom exception
                    throw new RuntimeException("密码错误");
                }
            })
            // TODO: 返回 404
            .orElseThrow(() -> {
                // TODO: use custom exception
                return new RuntimeException("user not found");
            });
    }

    @GetMapping("/current")
    public User getCurrentUser() {
        if (!StpUtil.isLogin()) {
            // TODO: use custom exception
            throw new RuntimeException("未登录");
        }
        System.out.println(StpUtil.getPermissionList());
        System.out.println(StpUtil.getRoleList());
        if (StpUtil.getTokenInfo().getLoginId() instanceof String sid) {
            Long id = Long.parseLong(sid);
            return userService
                .findById(id)
                // TODO: 返回404
                .orElseThrow(() -> {
                    // TODO: use custom exception
                    return new RuntimeException("User id does not exist!");
                });
        }
        // TODO: use custom exception
        throw new RuntimeException("内部错误");
    }
}
