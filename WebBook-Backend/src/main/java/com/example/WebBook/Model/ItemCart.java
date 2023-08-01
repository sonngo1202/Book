package com.example.WebBook.Model;

public class ItemCart {
	private int amount;
	private int userId;
	private Book book;
	public ItemCart() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ItemCart(int amount, int userId, Book book) {
		super();
		this.amount = amount;
		this.userId = userId;
		this.book = book;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Book getBook() {
		return book;
	}
	public void setBook(Book book) {
		this.book = book;
	}
	
}
