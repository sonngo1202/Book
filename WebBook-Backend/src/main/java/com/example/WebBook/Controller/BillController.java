package com.example.WebBook.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.WebBook.DAO.BillDAO;
import com.example.WebBook.DAO.BookDAO;
import com.example.WebBook.DAO.ItemBillDAO;
import com.example.WebBook.Model.Bill;
import com.example.WebBook.Model.ItemBill;

@RestController
@CrossOrigin
public class BillController {
	private BookDAO bookDAO = new BookDAO();
	private ItemBillDAO itemBillDAO = new ItemBillDAO();
	private BillDAO billDAO = new BillDAO();
	private List<Bill> bills = new ArrayList<>();
	
	@GetMapping("/order/check-book/{idB}")
	public ResponseEntity<String> checkOrderByBook(@PathVariable int idB){
		for(Bill bill:bills) {
			for(ItemBill item:bill.getItemBills()) {
				if(item.getBook().getId() == idB) return ResponseEntity.ok("No");
			}
		}
		return ResponseEntity.ok("Yes");
	}
	
	@GetMapping("/order/info")
	public List<Bill> getBills(){
		return bills;
	}
	
	@GetMapping("/order/info/{idU}")
	public List<Bill> getBillsByIdU(@PathVariable int idU){
		List<Bill> billsByU= new ArrayList<>();
		for(Bill bill: bills) {
			if(bill.getUser().getId() == idU) billsByU.add(bill);
		}
		return billsByU;
	}
	
	@GetMapping("/order/info/{idU}/{idBill}")
	public Bill getBillByUandId(@PathVariable("idU") int idU, @PathVariable("idBill") int idBill){
		for(Bill bill: bills) {
			if(bill.getUser().getId() == idU) {
			   if(bill.getId() == idBill) return bill;
			}
		}
		return new Bill(-1);
	}
	
	@GetMapping("/order/detail/{idBill}")
	public Bill getBillById(@PathVariable int idBill){
		for(Bill bill: bills) {
			if(bill.getId() == idBill) return bill;
		}
		return new Bill(-1);
	}
	
	
	@PostMapping("/order/add")
	public ResponseEntity<Bill> insertBill(@RequestBody Bill bill) {
		if(bills.size() == 0) bill.setId(1);
		else {
			bill.setId((bills.get(bills.size()-1).getId()+1)%100000000);
		}
		bills.add(bill);
		return ResponseEntity.ok(bill);
	}
	
	@DeleteMapping("/order/delete/{idB}")
	public ResponseEntity<String> deleteMenu(@PathVariable int idB) {
		for(Bill bill : bills) {
			if(bill.getId() == idB) {
				bills.removeIf(item -> item.getId() == idB);
				return ResponseEntity.ok("Delete Complete");
			}
		}
		return ResponseEntity.notFound().build();
	}
	
	public boolean checkQuantiyBook(Bill bill) {
		for(ItemBill itemBill : bill.getItemBills()) {
			if(!bookDAO.checkQuantity(itemBill.getBook().getId())) return false;
		}
		return true;
	}
	
	@PostMapping("/bill/add")
	public ResponseEntity<String> addBill(@RequestBody Bill bill){
		if(checkQuantiyBook(bill)) {
			billDAO.addBill(bill);
			int idBill = billDAO.getIdBill();
			for(ItemBill item : bill.getItemBills()) {
				itemBillDAO.insertItemBill(item, idBill);
				bookDAO.updateBookByBill(item);
			}
			return ResponseEntity.ok("Add Bill Complete");
		}
		return ResponseEntity.ok("Fail Add Bill");
	}
}
