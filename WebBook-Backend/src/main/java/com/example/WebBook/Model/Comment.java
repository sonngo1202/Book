package com.example.WebBook.Model;

public class Comment {
	private int id;
	private int rate;
	private String cmt;
	private Book book;
	private User user;
	public Comment() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Comment(int id, int rate, String cmt, Book book, User user) {
		super();
		this.id = id;
		this.rate = rate;
		this.cmt = cmt;
		this.book = book;
		this.user = user;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRate() {
		return rate;
	}
	public void setRate(int rate) {
		this.rate = rate;
	}
	public String getCmt() {
		return cmt;
	}
	public void setCmt(String cmt) {
		this.cmt = cmt;
	}
	public Book getBook() {
		return book;
	}
	public void setBook(Book book) {
		this.book = book;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	
}
