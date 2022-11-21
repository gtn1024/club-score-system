package com.sastit.clubscoresystem.repository;

import com.sastit.clubscoresystem.model.entity.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  boolean existsByUsername(String username);

  Optional<User> findByUsername(String username);

  Collection<User> findAllByUsernameContaining(String username, PageRequest pageRequest);
  Long countAllByUsernameContaining(String username, PageRequest pageRequest);
}
