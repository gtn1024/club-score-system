package com.sastit.clubscoresystem.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "t_users")
@SQLDelete(sql = "UPDATE t_users SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
@Getter
@Setter
public class User extends BaseEntity {
  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String realName;

  @OneToMany
  private Set<Team> teams;

  @OneToMany
  private Set<Team> ownTeams = Set.of();

  private boolean superAdmin = false;

  private boolean admin = false;

  public static class Role {
    public static final String SUPER_ADMIN = "super_admin";
    public static final String ADMIN = "admin";
    public static final String USER = "user";

    private Role() {
    }
  }
}
