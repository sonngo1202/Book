package com.example.WebBook.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.WebBook.DAO.CommentDAO;
import com.example.WebBook.Model.Comment;

@RestController
@CrossOrigin
public class CommentController {
	private CommentDAO commentDAO = new CommentDAO();
	
	@GetMapping("/book/comment/{idB}")
	public List<Comment> getCommentByBook(@PathVariable int idB){
		return commentDAO.getCommentByBook(idB);
	}
	
	@PostMapping("/book/comment/add")
	public ResponseEntity<String> addComment(@RequestBody Comment comment){
		commentDAO.insertComment(comment);
		return ResponseEntity.ok("Complete");
	}
}
