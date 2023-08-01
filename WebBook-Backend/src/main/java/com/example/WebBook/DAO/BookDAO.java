package com.example.WebBook.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.WebBook.Model.Book;
import com.example.WebBook.Model.Category;
import com.example.WebBook.Model.ItemBill;

public class BookDAO extends DAO{
	
	//Kiểm tra book có tồn tại không
	public boolean checkBook(Book book) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Select count(*) from book where lower(title) = ? and lower(author) = ?")){
			ps.setString(1, book.getTitle().toLowerCase());
	        ps.setString(2, book.getAuthor().toLowerCase());
	        ResultSet rs = ps.executeQuery();
	        if(rs.next() && rs.getInt(1) > 0) return true;
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	//Thêm Book 
	public void insertBook(Book book) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Insert into Book(title, author, des, day, image, price, quantity, count, Category_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?)")){
			int rs = 0;
			ps.setString(1, book.getTitle());
	        ps.setString(2, book.getAuthor());
	        ps.setString(3, book.getDes()==null?"":book.getDes());
	        ps.setDate(4, book.getDay());
	        ps.setString(5, book.getImage());
	        ps.setFloat(6, book.getPrice());
	        ps.setInt(7, book.getQuantity());
	        if (book.getCount() == -1) {
	            ps.setNull(8, java.sql.Types.INTEGER);
	        } else {
	            ps.setInt(8, book.getCount());
	        }
	        ps.setInt(9, book.getCategory().getId());
	        rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	//Lấy tất cả Book
	public List<Book> getBooks() {
		List<Book> books = new ArrayList<>();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Select book.*, category.name from book, category where book.Category_id=category.id")){
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Book book = new Book();
				book.setId(rs.getInt("id"));
				book.setTitle(rs.getString("title"));
				book.setAuthor(rs.getString("author"));
				book.setDes(rs.getString("des"));
				book.setImage(rs.getString("image"));
				book.setPrice(rs.getFloat("price"));
				book.setDay(rs.getDate("day"));
				book.setCount(rs.getInt("count"));
				book.setQuantity(rs.getInt("quantity"));
				book.setSold(rs.getInt("sold"));
				Category category = new Category();
				category.setId(rs.getInt("Category_id"));
				category.setName(rs.getString("name"));
				book.setCategory(category);
				books.add(book);
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return books;
	}
	
	//Lấy 1 book khi theo idBook
	public Book getBookByID(int idB) {
		Book book = new Book();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Select book.*, category.name from book, category where book.Category_id=category.id and book.id = ?")){
			ps.setInt(1, idB);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				book.setId(rs.getInt("id"));
				book.setTitle(rs.getString("title"));
				book.setAuthor(rs.getString("author"));
				book.setDes(rs.getString("des"));
				book.setImage(rs.getString("image"));
				book.setPrice(rs.getFloat("price"));
				book.setDay(rs.getDate("day"));
				book.setCount(rs.getInt("count"));
				book.setQuantity(rs.getInt("quantity"));
				book.setSold(rs.getInt("sold"));
				Category category = new Category();
				category.setId(rs.getInt("Category_id"));
				category.setName(rs.getString("name"));
				book.setCategory(category);
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return book;
	}
	
	//Cập nhật book có ảnh
	public void updateBook(Book book) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Update book set title = ?, author = ?, des = ?, day = ?, image = ?, price = ?, quantity = ?, count = ?, Category_id = ? where id = ?")){
			int rs = 0;
			ps.setString(1,book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getDes()==null?"":book.getDes());
			ps.setDate(4, book.getDay());
			ps.setString(5, book.getImage());
			ps.setFloat(6, book.getPrice());
			ps.setInt(7, book.getQuantity());
			if (book.getCount() == -1) {
	            ps.setNull(8, java.sql.Types.INTEGER);
	        } else {
	            ps.setInt(8, book.getCount());
	        }
	        ps.setInt(9, book.getCategory().getId());
			ps.setInt(10, book.getId());
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	//Cập nhật book không ảnh
	public void updateNotImage(Book book) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Update book set title = ?, author = ?, des = ?, day = ?, price = ?, quantity = ?, count = ?, Category_id = ? where id = ?")){
			int rs = 0;
			ps.setString(1,book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getDes()==null?"":book.getDes());
			ps.setDate(4, book.getDay());
			ps.setFloat(5, book.getPrice());
			ps.setInt(6, book.getQuantity());
			if (book.getCount() == -1) {
	            ps.setNull(7, java.sql.Types.INTEGER);
	        } else {
	            ps.setInt(7, book.getCount());
	        }
	        ps.setInt(8, book.getCategory().getId());
			ps.setInt(9, book.getId());
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	//Xóa book
	public void deleteBook(int idB) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Delete from book where id = ?")){
			int rs = 0;
			ps.setInt(1, idB);
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	//Lấy 1 book theo tác giả và tiêu đề
	public Book getBookByAuthorTitle(String author, String title) {
		Book book = new Book();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Select book.*, category.name from book, category where book.Category_id=category.id and book.author = ? and book.title=?")){
			ps.setString(1, author);
			ps.setString(2, title);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				book.setId(rs.getInt("id"));
				book.setTitle(rs.getString("title"));
				book.setAuthor(rs.getString("author"));
				book.setDes(rs.getString("des"));
				book.setImage(rs.getString("image"));
				book.setPrice(rs.getFloat("price"));
				book.setDay(rs.getDate("day"));
				book.setCount(rs.getInt("count"));
				book.setQuantity(rs.getInt("quantity"));
				book.setSold(rs.getInt("sold"));
				Category category = new Category();
				category.setId(rs.getInt("Category_id"));
				category.setName(rs.getString("name"));
				book.setCategory(category);
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return book;
	}
	
	//Lấy sách dựa vào id và thể loại
	public List<Book> getBooksByCateAndId(int category_id, int id) {
		List<Book> books = new ArrayList<>();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Select book.*, category.name from book, category where book.Category_id=category.id and book.id != ? and category.id = ? limit 4")){
			ps.setInt(1, id);
			ps.setInt(2, category_id);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Book book = new Book();
				book.setId(rs.getInt("id"));
				book.setTitle(rs.getString("title"));
				book.setAuthor(rs.getString("author"));
				book.setDes(rs.getString("des"));
				book.setImage(rs.getString("image"));
				book.setPrice(rs.getFloat("price"));
				book.setDay(rs.getDate("day"));
				book.setCount(rs.getInt("count"));
				book.setQuantity(rs.getInt("quantity"));
				book.setSold(rs.getInt("sold"));
				Category category = new Category();
				category.setId(rs.getInt("Category_id"));
				category.setName(rs.getString("name"));
				book.setCategory(category);
				books.add(book);
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return books;
	}
	
	public void updateBookByBill(ItemBill itemBill) {
		Book book = getBookByID(itemBill.getBook().getId());
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("update book set quantity = ?, sold = ? where id = ?")) {
			int rs = 0;
			ps.setInt(1, book.getQuantity()-itemBill.getAmount());
			ps.setInt(2, book.getSold()+itemBill.getAmount());
			ps.setInt(3, itemBill.getBook().getId());
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	public boolean checkQuantity(int idB) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select quantity from book where id = ?")) {
			ps.setInt(1, idB);
			ResultSet rs = ps.executeQuery();
			if(rs.next() && rs.getInt(1) > 0) return true;
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
}
