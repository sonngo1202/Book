import { useNavigate, useParams } from 'react-router-dom';
import './edit_addbook.css';
import React, { useEffect, useRef, useState } from "react";
import Confirm from '../Dialog/Confirm';
import NotFoundAdminPage from './NotFoundAdminPage';

function Edit_AddBook(props) {
    const inputRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const idB = params.id;
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    //-----Book------
    const [book, setBook] = useState({});
    const [image, setImage] = useState("");
    const [category, setCategory] = useState(1);
    // ----Kiểm tra lỗi-----
    const [errTitle, setErrTitle] = useState(false);
    const [errAuthor, setErrAuthor] = useState(false);
    const [errDay, setErrDay] = useState(false);
    const [errPrice, setErrPrice] = useState(false);
    const [errBook, setErrBook] = useState(false);

    const isValidId = () => {
        let number = parseInt(idB)
        return !isNaN(number);
    }


    useEffect(() => {
        if (isValidId()) {
            fetch(`http://localhost:8080/categories`)
                .then((resp) => resp.json())
                .then((data) => setCategories(data))
                .catch((err) => console.log(err))
            fetch(`http://localhost:8080/book/${idB}`)
                .then((resp) => resp.json())
                .then((data) => {
                    setBook(data);
                    setImage(data.image ? `http://localhost:8080/book/image/${data.image}` : "");
                    setCategory(data.category?.id);
                })
                .catch((err) => console.log(err))
        }
    }, [])


    // ----Upload----
    const onUpload = () => {
        inputRef.current.click();
    };

    // ----Hiện ảnh-----
    const onImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageData = e.target.result;
            setImage(imageData)
            setIsImageChanged(true);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onAction = () => {
        let isValid = true;

        if (!book.title) {
            setErrTitle(true);
            isValid = false;
        }

        if (!book.author) {
            setErrAuthor(true);
            isValid = false;
        }

        if (!book.day) {
            setErrDay(true);
            isValid = false;
        }

        if (!book.price) {
            setErrPrice(true);
            isValid = false;
        }

        if (isValid) {
            setShowDialog(true);
        }
    }

    const onCloseDialog = () => {
        setShowDialog(false)
    }

    const onConfirm = async () => {
        const formData = new FormData();
        formData.append("id", idB);
        formData.append("title", book.title);
        formData.append("author", book.author);
        formData.append("des", book.des);
        formData.append("day", book.day);
        formData.append("price", book.price);
        formData.append("count", book.count);
        formData.append("category", category);
        formData.append("quantity", book.quantity ? book.quantity : 0)
        console.log(category)
        if (isImageChanged) {
            formData.append("image", inputRef.current.files[0]);
        }
        try {
            const response = await fetch(`http://localhost:8080/book/save/${idB}`, {
                method: "POST",
                mode: "cors",
                body: formData,
            });
            const data = await response.text();
            console.log(data);
            setShowDialog(false);
            if (data === 'Fail') {
                setErrBook(true);
            } else {
                setErrBook(false);
                navigate(`/admin`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onEdit = () => {
        setCheckEdit(true);
    }

    const onBackBook = () =>{
        navigate(`/admin/books`)
    }

    if (!isValidId() || (idB > 0 && book.id === 0)) {
        return (
            <div className='root'>
                <h1 className="text-center" style={{ marginTop: '60px' }}>Sách</h1>
                <p style={{ marginTop: '100px', fontSize: '20px' }}>Sách bạn muốn tìm không tồn tại!</p>
                <button style={{
                    fontSize: '20px',
                    width: '15%',
                    height: '50px',
                    fontWeight: 'bold',
                    backgroundColor: 'red',
                    border: 'none',
                    color: '#ffffff',
                    borderRadius: '8px',
                }} onClick={onBackBook}>Quay về quản lý Sách</button>
            </div>
        )
    }
    return (
        <div className='root'>
            <div className='main'>
                <h1 className="text-center">Sách</h1>
                <div className='content'>
                    <div className='content-left'>
                        <div className='content-row'>
                            <div className='content-row-item'>
                                <label>Tiêu đề</label><span>*</span><br />
                                <input type='text' value={book.title || ''} disabled={idB < 0 ? false : !checkEdit} onChange={(e) => {
                                    setBook({ ...book, title: e.target.value })
                                    setErrTitle(false);
                                }} /><br />
                                {errTitle && <span>Tiêu đề không được trống</span>}
                            </div>
                            <div className='content-row-item'>
                                <label>Tác giả</label><span>*</span><br />
                                <input type='text' value={book.author || ''} disabled={idB < 0 ? false : !checkEdit} onChange={(e) => {
                                    setBook({ ...book, author: e.target.value })
                                    setErrAuthor(false);
                                }} /><br />
                                {errAuthor && <span>Tác giả không được trống</span>}
                            </div>
                        </div>
                        <div className='content-item'>
                            <label>Mô tả về sách</label><br />
                            <textarea rows="6" cols="53" value={book.des || ''} disabled={idB < 0 ? false : !checkEdit} onChange={(e) => setBook({ ...book, des: e.target.value })} />
                        </div>
                        <div className='content-row'>
                            <div className='content-row-item day'>
                                <label>Ngày phát hành</label><span>*</span><br />
                                <input type='date' value={book.day || ''} disabled={idB < 0 ? false : !checkEdit} onChange={(e) => {
                                    setBook({ ...book, day: e.target.value })
                                    setErrDay(false);
                                }} /><br />
                                {errDay && <span>Ngày phát hành không được trống</span>}
                            </div>
                            <div className='content-row-item'>
                                <label>Số trang</label><br />
                                <input type='number' value={book.count || ''} disabled={idB < 0 ? false : !checkEdit} onChange={(e) => setBook({ ...book, count: e.target.value })} />
                            </div>
                        </div>
                        <div className='content-row'>
                            <div className='content-row-item'>
                                <label>Thể loại</label><br />
                                <select value={category} disabled={idB < 0 ? false : !checkEdit} onChange={(e) => setCategory(parseInt(e.target.value))}>
                                    {categories.map((categoryItem) => (
                                        <option key={categoryItem.id} value={categoryItem.id}>{categoryItem.name}</option>
                                    ))}
                                </select><br />
                            </div>
                            <div className='content-row-item'>
                                <label>Giá tiền</label><span>*</span><br />
                                <input type='number' value={book.price || ''} disabled={idB < 0 ? false : !checkEdit} onChange={(e) => setBook({ ...book, price: e.target.value })} /><br />
                                {errPrice && <span>Giá tiền không được trống</span>}
                            </div>
                        </div>
                        <div className='content-item'>
                            <label>Số lượng</label><br />
                            <input type='number' value={book.quantity || ''} disabled={idB < 0 ? false : !checkEdit} onChange={(e) => setBook({ ...book, quantity: e.target.value })} /><br />
                        </div>
                    </div>
                    <div className='content-right'>
                        <button onClick={onUpload} disabled={idB < 0 ? false : !checkEdit}>Upload</button>
                        <input type='file' ref={inputRef} onChange={onImageChange} /><br />
                        <img src={image} />
                    </div>
                </div>
            </div>
            <footer>
                <div className='save'>
                    {errBook && <span>Sách đã tồn tại</span>}
                    {checkEdit ? <button onClick={onAction}>Save</button> : <button onClick={idB < 0 ? onAction : onEdit}>{idB < 0 ? 'Add' : 'Edit'}</button>}
                </div>
            </footer>
            {showDialog && <Confirm onCloseDialog={onCloseDialog} onConfirm={onConfirm} mess={idB < 0 ? "Xác thêm mới sách với những thông tin vừa nhập ?" : "Xác nhận sửa sách với những thông tin vừa nhập ?"} />}
        </div>
    )
};

export default Edit_AddBook;