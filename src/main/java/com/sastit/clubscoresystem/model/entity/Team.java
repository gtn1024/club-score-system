package com.sastit.clubscoresystem.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "t_teams")
@SQLDelete(sql = "UPDATE t_teams SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
@Getter
@Setter
public class Team extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String name;
    @OneToOne
    private User owner;
    @OneToMany
    private Set<User> admins;
    @OneToMany
    private Set<User> students;
}
