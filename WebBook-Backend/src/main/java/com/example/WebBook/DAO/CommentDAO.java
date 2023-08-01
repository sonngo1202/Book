package com.example.WebBook.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.WebBook.Model.Comment;
import com.example.WebBook.Model.User;

public class CommentDAO extends DAO{
	public List<Comment> getCommentByBook(int idB){
		List<Comment> comments = new ArrayList<>();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select comment.id, comment.rate, comment.cmt, comment.User_id, user.name from comment, user where comment.Book_id = ? and user.id = comment.User_id")){
			ps.setInt(1, idB);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Comment comment = new Comment();
				comment.setId(rs.getInt("id"));
				comment.setRate(rs.getInt("rate"));
				comment.setCmt(rs.getString("cmt"));
				User user = new User();
				user.setId(rs.getInt("User_id"));
				user.setName(rs.getString("name"));
				comment.setUser(user);
				comments.add(comment);
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return comments;
	}
	
	public void deleteCommentByBook(int idB) {
		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("delete from comment where Book_id = ?")){
			int rs = 0;
			ps.setInt(1, idB);
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void insertComment(Comment comment) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("insert into comment(rate, cmt, Book_id, User_id) values(?, ?, ?, ?)")) {
			int rs = 0;
			ps.setInt(1, comment.getRate());
			ps.setString(2, comment.getCmt());
			ps.setInt(3, comment.getBook().getId());
			ps.setInt(4, comment.getUser().getId());
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
}
