package com.example.WebBook.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.WebBook.Model.Category;

public class CategoryDAO extends DAO{
	
	public CategoryDAO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public List<Category> getCategorys() {
		List<Category> categories = new ArrayList<>();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Select * from category")){
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Category category = new Category();
				category.setId(rs.getInt("id"));
				category.setName(rs.getString("name"));
				categories.add(category);
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return categories;
	}
}
