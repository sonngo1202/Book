package com.example.WebBook.Controller;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.example.WebBook.DAO.BookDAO;
import com.example.WebBook.DAO.CartDAO;
import com.example.WebBook.DAO.CommentDAO;
import com.example.WebBook.DAO.ItemBillDAO;
import com.example.WebBook.Model.Book;
import com.example.WebBook.Model.Category;


@RestController
@CrossOrigin
public class BookController {
	private BookDAO bookDAO = new BookDAO();
	private ItemBillDAO itemBillDAO = new ItemBillDAO();
	private CartDAO cartDAO = new CartDAO();
	private BillController billController = new BillController();
	private CommentDAO commentDAO = new CommentDAO();
	
	@GetMapping("/books")
	public List<Book> getBooks(){
		return bookDAO.getBooks();
	}
	
	@GetMapping("/book/{id}")
	public Book getBookByID(@PathVariable int id) {
		return bookDAO.getBookByID(id);
	}
	
	@GetMapping("/book/detail/{author}/{title}")
	public Book getBookByAuthorTitle(@PathVariable("title") String title, @PathVariable("author") String author) {
		return bookDAO.getBookByAuthorTitle(author, title);
	}
	
	@GetMapping("/books/{category_id}/{id}")
	public List<Book> getBooksByCateAndId(@PathVariable("category_id") int category_id, @PathVariable("id") int id){
		return bookDAO.getBooksByCateAndId(category_id, id);
	}
	
	@PostMapping("/book/save/{id}")
	public ResponseEntity<String> edit_addBook(@PathVariable int id, 
			@RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("des") String des,
            @RequestParam("day") String day,
            @RequestParam(value= "count", required = false) Integer count,
            @RequestParam(value= "image", required = false) MultipartFile image,
            @RequestParam("price") float price,
            @RequestParam("quantity") int quantity,
            @RequestParam("category") Integer category){
		
		//Chuyển day về dạng date
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date utilDate;
		java.sql.Date sqlDate;
		try {
	        utilDate = dateFormat.parse(day);
	        sqlDate = new java.sql.Date(utilDate.getTime());
	    } catch (ParseException e) {
	        e.printStackTrace();
	        return ResponseEntity.badRequest().body("Failed to parse date.");
	    }
		
		//Thêm
		if(id <= 0) {
			if(!bookDAO.checkBook(new Book(title, author))) {
			    //Lưu ảnh vào thư mục của server
				boolean isUpdateImage = image != null && !image.isEmpty();
				String newFileName="";
				String uploadDir = "C:/Users/ACER/Desktop/WebBook/image";
				if(isUpdateImage) {
					String fileName = StringUtils.cleanPath(image.getOriginalFilename());
					newFileName = UUID.randomUUID().toString() + "_" + fileName;
				    Path targetLocation = Paths.get(uploadDir, newFileName);
				    try {
				        Files.copy(image.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
				    } catch (IOException e) {
				        e.printStackTrace();
				        return ResponseEntity.badRequest().body("Failed image");
				    }
				}
				//Thêm sách
			    bookDAO.insertBook(new Book(id, title, author, des, sqlDate, count == null ? -1 : count, newFileName, price, quantity, 0, new Category(category, "")));
				return ResponseEntity.ok("Add Complete");
			}
			return ResponseEntity.ok("Fail");
		} 
		
		Book book_check = bookDAO.getBookByID(id);//Kiểm tra sự tồn tại của sách
		
		if(id > 0 && book_check!=null) {
			boolean isUpdateImage = image != null && !image.isEmpty();//Kiểm tra đầu vào có ảnh không
			String newFileName="";
			String uploadDir = "C:/Users/ACER/Desktop/WebBook/image";
			if(isUpdateImage) {
			    //Tạo tên ảnh để lưu
				String fileName = StringUtils.cleanPath(image.getOriginalFilename());
				newFileName = UUID.randomUUID().toString() + "_" + fileName;
			    Path targetLocation = Paths.get(uploadDir, newFileName);
			    try {
			    	//Lưu ảnh
			        Files.copy(image.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			        
			        //Cập nhật Book khi có ảnh
			        bookDAO.updateBook(new Book(id, title, author, des, sqlDate, count == null ? -1 : count, newFileName, price, quantity, 0, new Category(category, "")));
			        
					//Xóa ảnh khỏi thư mục của server
					String fileNamed = book_check.getImage();
					if(fileNamed != null) {
				        String filePath = uploadDir + File.separator + fileNamed;
				        File file = new File(filePath);
				        if(file.exists()) file.delete();	
				    }
			    } catch (IOException e) {
			        e.printStackTrace();
			        return ResponseEntity.badRequest().body("Failed image");
			    }
			}
			
			//Cập nhật Book khi không có ảnh
			else {
				bookDAO.updateNotImage(new Book(id, title, author, des, sqlDate, count == null ? -1 : count, newFileName, price, quantity, 0, new Category(category, "")));
			}
			return ResponseEntity.ok("Edit Complete");
		}
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/book/image/{imageName}")
	public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
	    String uploadDir = "C:/Users/ACER/Desktop/WebBook/image";
	    Path imagePath = Paths.get(uploadDir).resolve(imageName);
	    Resource imageResource;
	    try {
	        imageResource = new UrlResource(imagePath.toUri());
	        if (imageResource.exists() && imageResource.isReadable()) {
	            return ResponseEntity.ok()
	                    .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE)
	                    .body(imageResource);
	        }
	    } catch (MalformedURLException e) {
	        e.printStackTrace();
	    }
	    return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/book/delete/{id}")
	public ResponseEntity<String> deleteBook(@PathVariable int id){
		Book book = bookDAO.getBookByID(id);
		if(book == null) {
			return ResponseEntity.notFound().build();
		}
		if(itemBillDAO.checkItemByBook(id)) {
			return ResponseEntity.ok("Fail");
		}
		commentDAO.deleteCommentByBook(id);
		bookDAO.deleteBook(id);
		
		//Xóa ảnh khỏi thư mục của server
		String fileName = book.getImage();
		if(fileName != null) {
			String uploadDir = "C:/Users/ACER/Desktop/WebBook/image";
	        String filePath = uploadDir + File.separator + fileName;
	        File file = new File(filePath);
	        if(file.exists()) file.delete();	
	    }
		return ResponseEntity.ok("Delete Complete");
	}
	
	@DeleteMapping("/book-itembill/delete/{id}")
	public ResponseEntity<String> deleteBookAndItemBill(@PathVariable int id){
		Book book = bookDAO.getBookByID(id);
		if(book == null) {
			return ResponseEntity.notFound().build();
		}
		commentDAO.deleteCommentByBook(id);
		itemBillDAO.deleteItemByBook(id);
		bookDAO.deleteBook(id);
		
		//Xóa ảnh khỏi thư mục của server
		String fileName = book.getImage();
		if(fileName != null) {
			String uploadDir = "C:/Users/ACER/Desktop/WebBook/image";
	        String filePath = uploadDir + File.separator + fileName;
	        File file = new File(filePath);
	        if(file.exists()) file.delete();	
	    }
		itemBillDAO.deleteItemByBook(id);
		
		return ResponseEntity.ok("Delete Complete");
	}
}
