 package com.example.WebBook.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.WebBook.DAO.UserDAO;
import com.example.WebBook.Model.User;

@RestController
@CrossOrigin
public class UserController {
	private UserDAO uDAO = new UserDAO();
	
	@PostMapping("/checkLogin")
	public ResponseEntity<User> checkLogin(@RequestBody User u) {
		User user = uDAO.checkLogin(u);
		if(user!=null) return ResponseEntity.ok(user);
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping("/logup")
	public ResponseEntity<User> getLogup(@RequestBody User u){
		if(!uDAO.checkLogup(u)) {
			uDAO.addUser(u);
			return ResponseEntity.ok(uDAO.checkLogin(u));
		}
		return ResponseEntity.notFound().build();
	}
}
