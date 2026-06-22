package com.example.student;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class UserService {
	private UserRepo userRepo;

	public UserService(UserRepo userRepo) {
		super();
		this.userRepo = userRepo;
	}

	public void save(User user) {
		userRepo.save(user);
	}

	public boolean loginUser(String username, String password) {
		Optional<User> userOpt = userRepo.findByUsername(username);

		if (userOpt.isPresent()) {
			User user = userOpt.get();
			return user.getPassword().equals(password);
		}
		return false; // User not found or password mismatched
	}

}
