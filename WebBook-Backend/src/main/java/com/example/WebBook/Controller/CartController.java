package com.example.WebBook.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.WebBook.DAO.CartDAO;
import com.example.WebBook.Model.ItemCart;
import com.example.WebBook.Model.Cart;

@RestController
@CrossOrigin
public class CartController {
	private CartDAO cartDAO = new CartDAO();
	
	@PostMapping("/cart/add")
	public ResponseEntity<String> addCartU(@RequestBody ItemCart itemCart){
		cartDAO.addCart(itemCart);
		return ResponseEntity.ok("Add Cart Complete");
	}
	
	@GetMapping("/cart/{idU}")
	public Cart getCartsByU(@PathVariable int idU){
		return cartDAO.getCartByU(idU);
	}
	
	@PostMapping("/cart/update")
	public ResponseEntity<String> updateCart(@RequestBody ItemCart itemCart){
		cartDAO.updateCart(itemCart);
		return ResponseEntity.ok("Update Cart Complete");
	}
	
	@DeleteMapping("/cart/delete")
	public ResponseEntity<String> deleteItemCart(@RequestBody ItemCart itemCart){
		cartDAO.deleteItemCart(itemCart);
		return ResponseEntity.ok("Delete ItemCart Complete");
	}
	
	@PostMapping("/cart/deleteAll/{idU}")
	public ResponseEntity<String> deleteCart(@PathVariable int idU){
		cartDAO.deleteCart(idU);
		return ResponseEntity.ok("Reset complete");
	}
	@DeleteMapping("/cart/delete-book/{idB}")
	public ResponseEntity<String> deleteCartByBook(@PathVariable int idB){
		cartDAO.deleteCartByBook(idB);
		return ResponseEntity.ok("DeleteComplete");
	}
}
