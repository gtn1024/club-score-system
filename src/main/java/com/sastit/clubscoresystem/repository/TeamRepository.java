package com.sastit.clubscoresystem.repository;

import com.sastit.clubscoresystem.model.entity.Team;
import com.sastit.clubscoresystem.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface TeamRepository extends JpaRepository<Team, Long> {
  boolean existsByName(String name);

  Collection<Team> findAllByOwnerOrAdminsContains(User owner, User admin);
}
