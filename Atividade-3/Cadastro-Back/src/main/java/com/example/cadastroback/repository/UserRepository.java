package com.example.cadastroback.repository;

import com.example.cadastroback.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
