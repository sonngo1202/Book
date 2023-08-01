package com.example.WebBook.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.WebBook.Model.ItemBill;

public class ItemBillDAO extends DAO{
	 
	public boolean checkItemByBook(int idB) {
		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select count(*) from itembill where Book_id = ?")){
			ps.setInt(1, idB);
			ResultSet rs = ps.executeQuery();
			if(rs.next() && rs.getInt(1) > 0) return true;
			
		}catch(SQLException e) {
			e.printStackTrace();
		}
	    return false;
	}
	
	public void deleteItemByBook(int idB) {
		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("delete from itembill where Book_id = ?")){
			int rs = 0;
			ps.setInt(1, idB);
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void insertItemBill(ItemBill itemBill, int idBill) {
		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("insert into itembill(amount, price, Book_id, Bill_id) values(?, ?, ?, ?)")){
			int rs = 0;
			ps.setInt(1, itemBill.getAmount());
			ps.setFloat(2, itemBill.getPrice());
			ps.setInt(3, itemBill.getBook().getId());
			ps.setInt(4, idBill);
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
}
