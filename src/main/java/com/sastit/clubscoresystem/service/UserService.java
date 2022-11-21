package com.sastit.clubscoresystem.service;

import com.sastit.clubscoresystem.model.entity.User;

import java.util.Collection;
import java.util.Optional;

public interface UserService {
  Optional<User> findById(Long id);

  User newUser(User user);

  User updateUser(User user);

  boolean isUsernameExist(String username);

  Optional<User> findByUsername(String username);

  Long count();

  Long countAllUsers(String username, Integer pageSize, Integer currentPage);

  Collection<User> getAllUsers(String username, Integer pageSize, Integer currentPage);
}
