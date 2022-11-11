package com.sastit.clubscoresystem.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

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
}
