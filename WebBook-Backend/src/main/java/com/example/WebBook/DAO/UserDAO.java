package com.example.WebBook.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.WebBook.Model.User;

public class UserDAO extends DAO{
	public User checkLogin(User u) {
		User user = new User();
		boolean check = true;
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select * from user where email = ? and password = ?");){
			ps.setString(1, u.getEmail());
			ps.setString(2, u.getPassword());
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				check = false;
				user.setId(rs.getInt("id"));
				user.setName(rs.getString("name"));
				user.setEmail(rs.getString("email"));
				user.setPassword(rs.getString("password"));
				user.setPosition(rs.getString("position"));
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		if(check) return null;
		return user;
	}
	
	public boolean checkLogup(User u) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select count(*) from user where email = ?");){
			ps.setString(1, u.getEmail());
			ResultSet rs = ps.executeQuery();
			if(rs.next()&& rs.getInt(1) > 0) {
				return true;
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public void addUser(User u) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("insert into User(name, email, password, position) values(?, ?, ?, ?)");){
			int rs = 0;
			ps.setString(1, u.getName());
			ps.setString(2, u.getEmail());
			ps.setString(3, u.getPassword());
			ps.setString(4, "User");
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}

}
