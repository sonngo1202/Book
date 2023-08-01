package com.example.WebBook.Model;

import java.sql.Date;

public class Book {
	private int id;
	private String title;
	private String author;
	private String des;
	private Date day;
	private int count;
	private String image;
	private float price;
	private int quantity;
	private int sold;
	private Category category;
	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Book(int id, String title, String author, String des, Date day, int count, String image, float price,
		int quantity, int sold, Category category) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.des = des;
		this.day = day;
		this.count = count;
		this.image = image;
		this.price = price;
		this.quantity = quantity;
		this.sold = sold;
		this.category = category;
	}

	public Book(String title, String author) {
		super();
		this.title = title;
		this.author = author;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	public Date getDay() {
		return day;
	}
	public void setDay(Date day) {
		this.day = day;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	public int getSold() {
		return sold;
	}
	public void setSold(int sold) {
		this.sold = sold;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
}
