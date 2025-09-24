package com.example.cadastroback.controller;

import com.example.cadastroback.model.User;
import com.example.cadastroback.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> list() {
        return userRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User body) {
        if (body.getNome() == null || body.getNome().isBlank() || body.getEmail() == null || body.getEmail().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        User saved = userRepository.save(body);
        return ResponseEntity.created(URI.create("/api/users/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User body) {
        return userRepository.findById(id)
                .map(existing -> {
                    if (body.getNome() != null) existing.setNome(body.getNome());
                    if (body.getEmail() != null) existing.setEmail(body.getEmail());
                    User saved = userRepository.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(existing -> {
                    userRepository.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
