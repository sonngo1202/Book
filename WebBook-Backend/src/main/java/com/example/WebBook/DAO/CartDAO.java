package com.example.WebBook.DAO;

import java.util.ArrayList;
import java.util.List;

import com.example.WebBook.Model.Cart;
import com.example.WebBook.Model.ItemCart;

public class CartDAO {
	private List<Cart> carts = new ArrayList<>();
	
	
	
	public CartDAO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Cart getCartByU(int idU) {
		for(Cart cart: carts) {
			if(cart.getUserId() == idU) return cart;
		}
		List<ItemCart> itemCarts = new ArrayList<>();
		Cart cart = new Cart(idU, itemCarts);
		carts.add(cart);
		return cart;
	}
		
	public void addCart(ItemCart itemCart) {
		 Cart cart = getCartByU(itemCart.getUserId());
		 for(Cart c : carts) {
			 if(c.getUserId() == cart.getUserId()) {
				 ItemCart item = c.checkBook(itemCart);
				 if(item == null) {
					 c.addItem(itemCart);
				 }else {
					 c.updateItem(item);
				 }
			 }
		 }
	}
	
	public void deleteItemCart(ItemCart itemCart) {
		for(Cart c : carts) {
			 if(c.getUserId() == itemCart.getUserId()) {
				 c.removeItem(itemCart.getBook().getId());
				 break;
			 }
		 }
	}
	
	public void updateCart(ItemCart itemCart) {
		for(Cart c : carts) {
			 if(c.getUserId() == itemCart.getUserId()) {
				 c.updateItem(itemCart);
				 break;
			 }
		 }
	}
	
	public void deleteCart(int idU) {
		for(Cart c : carts) {
			if(c.getUserId() == idU) {
				List<ItemCart> itemCarts = new ArrayList<>();
				c.setItemCarts(itemCarts);
			}
		}
	}
	
	public void deleteCartByBook(int idB) {
		for(Cart c : carts) {
		    c.removeItem(idB);
		}
	}
}
