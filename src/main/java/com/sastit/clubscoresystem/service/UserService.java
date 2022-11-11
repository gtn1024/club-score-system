package com.sastit.clubscoresystem.service;

import com.sastit.clubscoresystem.model.entity.User;

import java.util.Optional;

public interface UserService {
    User newUser(User user);

    boolean isUsernameExist(String username);

    Optional<User> findByUsername(String username);
}
