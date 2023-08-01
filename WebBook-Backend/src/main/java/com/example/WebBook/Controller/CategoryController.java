package com.example.WebBook.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.WebBook.DAO.CategoryDAO;
import com.example.WebBook.Model.Category;

@RestController
@CrossOrigin
public class CategoryController {
	private CategoryDAO categoryDAO = new CategoryDAO();
	
	@GetMapping("/categories")
	public List<Category> getCategories(){
		return categoryDAO.getCategorys();
	}
}
