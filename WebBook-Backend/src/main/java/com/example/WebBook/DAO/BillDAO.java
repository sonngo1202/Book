package com.example.WebBook.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.WebBook.Model.Bill;

public class BillDAO extends DAO{
	
	public int getIdBill() {
		int id = 0;
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select id from bill order by id desc limit 1")) {
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				id = rs.getInt("id");
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return id;
	}
	
	
	public void addBill(Bill bill) {
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("Insert into bill(paymentTime, address, phone, payment, User_id) values(?,?,?,?,?)")) {
			int rs = 0;
			ps.setDate(1, bill.getPaymentTime());
			ps.setString(2, bill.getAddress());
			ps.setString(3, bill.getPhone());
			ps.setString(4, bill.getPayment());
			ps.setInt(5, bill.getUser().getId());
			rs = ps.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
}
