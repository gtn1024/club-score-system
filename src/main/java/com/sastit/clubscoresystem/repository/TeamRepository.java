package com.sastit.clubscoresystem.repository;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface TeamRepository extends JpaRepository<Team, Long> {
  boolean existsByName(String name);

  Collection<Team> findAllByNameContainingAndOwnerOrAdminsContains(String name, User owner, User admin, PageRequest pageRequest);

  Collection<Team> findAllByNameContaining(String name, PageRequest pageRequest);

  Long countAllByNameContainingAndOwnerOrAdminsContains(String name, User owner, User admin, PageRequest pageRequest);

  Long countAllByNameContaining(String name, PageRequest pageRequest);
}
