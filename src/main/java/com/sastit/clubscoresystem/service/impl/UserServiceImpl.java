package com.sastit.clubscoresystem.service.impl;

import com.sastit.clubscoresystem.model.entity.User;
import com.sastit.clubscoresystem.repository.UserRepository;
import com.sastit.clubscoresystem.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User newUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean isUsernameExist(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Long count() {
        return userRepository.count();
    }
}
