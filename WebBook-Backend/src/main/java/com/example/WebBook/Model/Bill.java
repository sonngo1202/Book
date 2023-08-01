package com.example.WebBook.Model;

import java.sql.Date;
import java.util.List;

public class Bill {
	private int id;
	private Date paymentTime;
	private String address;
	private String phone;
	private String payment;
	private int totalAmount;
	private float totalPrice;
	private List<ItemBill> itemBills;
	private User user;
	public Bill() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Bill(int id) {
		super();
		this.id = id;
	}

	
	public Bill(int id, Date paymentTime, String address, String phone, String payment, int totalAmount,
			float totalPrice, List<ItemBill> itemBills, User user) {
		super();
		this.id = id;
		this.paymentTime = paymentTime;
		this.address = address;
		this.phone = phone;
		this.payment = payment;
		this.totalAmount = totalAmount;
		this.totalPrice = totalPrice;
		this.itemBills = itemBills;
		this.user = user;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getPaymentTime() {
		return paymentTime;
	}
	public void setPaymentTime(Date paymentTime) {
		this.paymentTime = paymentTime;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(int totalAmount) {
		this.totalAmount = totalAmount;
	}
	public float getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}
	public List<ItemBill> getItemBills() {
		return itemBills;
	}
	public void setItemBills(List<ItemBill> itemBills) {
		this.itemBills = itemBills;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}
}
