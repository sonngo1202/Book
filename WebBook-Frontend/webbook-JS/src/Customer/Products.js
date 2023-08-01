import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import "./products.css";
import NotProduct from "./NotProduct";

function Products(props) {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [books, setBooks] = useState([]);


    const onProduct = (author, title) => {
        navigate(`/book/${author}/${title}`)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/books`)
            .then((resp) => resp.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        if (props.check === 0) {
            setBooks(data)
        }
        else if (props.check === 1) {
            setBooks(data.filter((book) =>
                book.category.name === props.title
            ))
        } else {
            setBooks(data.filter((book) =>
                book.title.toLowerCase().includes(props.text.toLowerCase())
            ))
        }

    }, [data, props.title, props?.text])

    return (
        <div className="root">
            <div className="list-product-title">
                <h2>{props.title}</h2>
            </div>
            {books.length > 0 ?
                <div className="list-product-content">
                    {books.map((book) => (
                        <div className="list-product-content-item" key={book.id} onClick={()=>onProduct(book.author, book.title)}>
                            <img src={`http://localhost:8080/book/image/${book.image}`} />
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                        </div>
                    ))}
                </div>:
                <NotProduct mess={'Không có sách nào được tìm thấy'}/>
            }
        </div>
    );
}

export default Products;
