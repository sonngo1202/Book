import { useNavigate, useParams } from "react-router-dom";
import "./product.css";
import { useEffect, useState } from "react";
import Linked from "./Linked";
import NotFoundPage from "./NotFoundPage";
import ChangeNumber from "../Dialog/ChangeNumber";
import Mess from "../Dialog/Mess";

function Product(props) {
    const navigate = useNavigate();
    const params = useParams();
    const author = params.author;
    const title = params.title;
    const [book, setBook] = useState({});
    const [booksRelated, setBooksRelated] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [comments, setComments] = useState([]);
    const [rate, setRate] = useState(0);
    const [cmt, setCmt] = useState("");
    const [errCmt, setErrCmt] = useState(false);

    const [mess, setMess] = useState(false);
    const [mess1, setMess1] = useState(false);

    const onPlus = () => {
        if (quantity < book.quantity) {
            setQuantity(quantity + 1);
        }
    }

    const onSub = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const onChooseBook = (author, title) => {
        setQuantity(1);
        navigate(`/book/${author}/${title}`)
    }

    const onComment = () => {
        if (!cmt) {
            setErrCmt(true);
        } else {
            const comment = {
                id: -1,
                rate: rate,
                cmt: cmt,
                book: book,
                user: props.user
            }
            console.log(comment)
            fetch(`http://localhost:8080/book/comment/add`, {
                method: 'POST',
                mode: "cors",
                body: JSON.stringify(comment),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .then(() => window.location.reload())
                .catch((err) => console.log(err))
        }
    }

    const onAddCart = () => {
        if (book.quantity === 0) {
            setMess1(true);
        } else {
            const itemCart = {
                amount: quantity,
                userId: props.user.id,
                book: book
            }
            fetch(`http://localhost:8080/cart/add`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(itemCart),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .then(() => {
                    setMess(true);
                })
                .catch((err) => console.log(err))
        }
    }

    const onCloseMess = () => {
        setMess(false);
        setMess1(false);
    }

    useEffect(() => {
        fetch(`http://localhost:8080/book/detail/${author}/${title}`)
            .then((resp) => resp.json())
            .then((data) => {
                setBook(data)
                if (data.id !== 0) {
                    //Lấy sách liên quan
                    fetch(`http://localhost:8080/books/${data.category.id}/${data.id}`)
                        .then((resp) => resp.json())
                        .then((datas) => {
                            setBooksRelated(datas)
                        })
                        .catch((err) => console.log(err))
                    // Lấy cmt
                    fetch(`http://localhost:8080/book/comment/${data.id}`)
                        .then((resp) => resp.json())
                        .then((data) => {
                            setComments(data)
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err))
    }, [author, title])


    if (book.id === 0) {
        return (
            <NotFoundPage />
        );
    }
    return (
        <div className="root">
            <div className="detail-book">
                <div className="detail-book-content">
                    <div className="detail-book-left">
                        <div className="detail-book-left-top">
                            <div className="detail-book-left-img">
                                <img src={book.image ? `http://localhost:8080/book/image/${book.image}` : ""} />
                            </div>
                            <div className="detail-book-left-content">
                                <div className="detail-book-left-content-link">
                                    <Linked linked={book.category?.name.toUpperCase()} check={true} />
                                </div>
                                <div className="detail-book-left-content-info">
                                    <h3>{book.title}</h3>
                                    <p>Tác giả: {book.author}</p>
                                    <p>Số trang: {book.count}</p>
                                </div>
                                <div className="detail-book-left-content-price">
                                    <p>{ChangeNumber(book.price)}<sup>đ</sup></p>
                                </div>
                                <div className="detail-book-left-content-des">
                                    <p>{book.des}</p>
                                </div>
                                <div className="detail-book-left-content-action">
                                    <button onClick={onSub}> - </button>
                                    <input
                                        type="text"
                                        pattern="[0-9]*"
                                        disabled
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <button onClick={onPlus}> + </button>
                                    <button onClick={onAddCart}>THÊM VÀO GIỎ</button>
                                </div>
                            </div>
                        </div>
                        <div className="detail-book-left-bottom">
                            <div className="detail-book-left-count-comment">
                                <p>{"Đánh giá(" + comments.length + ")"}</p>
                            </div>
                            <div className="detail-book-left-comment-content">
                                <div className="detail-book-left-comment-content-title">
                                    <p>Đánh giá</p>
                                </div>
                                {comments.length > 0 && comments.map((comment) => (
                                    <div className="detail-book-left-comment-content-item" key={comment.id}>
                                        <h6>{comment.user.name}</h6>
                                        <div className="rating">
                                            <input type="radio" id={"star5_" + comment.id} name={"rating_" + comment.id} value="5" checked={comment.rate === 5} onChange={() => console.log(5)} />
                                            <label htmlFor={"star5_" + comment.id}></label>
                                            <input type="radio" id={"star4_" + comment.id} name={"rating_" + comment.id} value="4" checked={comment.rate === 4} onChange={() => console.log(4)} />
                                            <label htmlFor={"star4_" + comment.id}></label>
                                            <input type="radio" id={"star3_" + comment.id} name={"rating_" + comment.id} value="3" checked={comment.rate === 3} onChange={() => console.log(3)} />
                                            <label htmlFor={"star3_" + comment.id}></label>
                                            <input type="radio" id={"star2_" + comment.id} name={"rating_" + comment.id} value="2" checked={comment.rate === 2} onChange={() => console.log(2)} />
                                            <label htmlFor={"star2_" + comment.id}></label>
                                            <input type="radio" id={"star1_" + comment.id} name={"rating_" + comment.id} value="1" checked={comment.rate === 1} onChange={() => console.log(1)} />
                                            <label htmlFor={"star1_" + comment.id}></label>
                                        </div>
                                        <p>{comment.cmt}</p>
                                    </div>
                                ))}
                                {comments.length == 0 && <p>Chưa có đánh giá nào</p>}
                            </div>
                            <div className="detail-book-left-comment-input">
                                <h5>Hãy để lại đánh giá và nhận xét của bạn</h5>
                                <p>Đánh giá của bạn</p>
                                <div className="rating">
                                    <input type="radio" id="star5" name="rating" value="5" onChange={() => setRate(5)} />
                                    <label htmlFor="star5"></label>
                                    <input type="radio" id="star4" name="rating" value="4" onChange={() => setRate(4)} />
                                    <label htmlFor="star4"></label>
                                    <input type="radio" id="star3" name="rating" value="3" onChange={() => setRate(3)} />
                                    <label htmlFor="star3"></label>
                                    <input type="radio" id="star2" name="rating" value="2" onChange={() => setRate(2)} />
                                    <label htmlFor="star2"></label>
                                    <input type="radio" id="star1" name="rating" value="1" onChange={() => setRate(1)} />
                                    <label htmlFor="star1"></label>
                                </div><br />
                                <p>Nhận xét của bạn<span>*</span></p>
                                <textarea rows="6" cols="85" onChange={(e) => {
                                    setCmt(e.target.value)
                                    setErrCmt(false)
                                }} /><br />
                                {errCmt && <span>Vui lòng nhập nhận xét của bạn !</span>}<br />
                                <button onClick={onComment}>GỬI ĐI</button>
                            </div>
                        </div>
                    </div>
                    <div className="detail-book-right">
                        <div className="detail-book-right-title">
                            <h4>Sách liên quan</h4>
                        </div>
                        <div className="detail-book-right-content">
                            {booksRelated.map((bookRelated) => (
                                <div className="detail-book-right-content-item" key={bookRelated.id} onClick={() => onChooseBook(bookRelated.author, bookRelated.title)}>
                                    <div className="detail-book-right-content-item-img">
                                        <img src={bookRelated.image ? `http://localhost:8080/book/image/${bookRelated.image}` : ""} />
                                    </div>
                                    <div className="detail-book-right-content-item-info">
                                        <h6>{bookRelated.title}</h6>
                                        <p>{bookRelated.author}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {mess && <Mess mess={'Sách đã được thêm thành công vào giỏ hàng của bạn'} check={true} image={book.image ? `http://localhost:8080/book/image/${book.image}` : ""} onCloseMess={onCloseMess} />}
            {mess1 && <Mess mess={'Sách hiện giờ đã hết hàng! Xin lỗi hãy quay lại sau!'} onCloseMess={onCloseMess} />}
        </div>
    );
};
export default Product;