package com.example.WebBook.Model;

public class ItemBill {
	private int amount;
	private int price;
	private Book book;
	public ItemBill() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ItemBill(int amount, int price, Book book) {
		super();
		this.amount = amount;
		this.price = price;
		this.book = book;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public Book getBook() {
		return book;
	}
	public void setBook(Book book) {
		this.book = book;
	}
	
}
