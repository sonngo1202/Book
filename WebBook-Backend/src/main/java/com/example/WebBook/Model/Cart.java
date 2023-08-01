package com.example.WebBook.Model;

import java.util.List;



public class Cart {
	private int userId;
	private List<ItemCart> itemCarts;
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Cart(int userId, List<ItemCart> itemCarts) {
		super();
		this.userId = userId;
		this.itemCarts = itemCarts;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public List<ItemCart> getItemCarts() {
		return itemCarts;
	}
	public void setItemCarts(List<ItemCart> itemCarts) {
		this.itemCarts = itemCarts;
	}
	
	public void addItem(ItemCart itemCart) {
		itemCarts.add(itemCart);
	}
	public void updateItem(ItemCart itemCart) {
		for(ItemCart item : itemCarts) {
			if(item.getBook().getId() == itemCart.getBook().getId()) {
				item.setAmount(itemCart.getAmount());
				break;
			}
		}
	}
	public void removeItem(int idB) {
		itemCarts.removeIf(item -> item.getBook().getId()==idB);
	}
	public ItemCart checkBook(ItemCart itemCart) {
		for(ItemCart item : itemCarts) {
			if(item.getBook().getId() == itemCart.getBook().getId()) {
				itemCart.setAmount(item.getAmount()+itemCart.getAmount());
				return itemCart;
			}
		}
		return null;
	}
}
