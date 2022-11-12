package com.sastit.clubscoresystem.repository;

import com.sastit.clubscoresystem.model.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
