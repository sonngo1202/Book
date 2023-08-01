import React, { useState, useEffect } from 'react';
import './managerbook.css';
import { useNavigate } from 'react-router-dom';
import Confirm from '../Dialog/Confirm';
import Login from '../login_logup/Login';
import ChangeNumber from '../Dialog/ChangeNumber';
import ChangeDay from '../Dialog/ChangeDay';
import Menu from './Menu';
import Mess from '../Dialog/Mess';

function ManagerBook(props) {
    const [data, setData] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [idB, setIdB] = useState();
    const [text, setText] = useState();
    const [showLogin, setShowLogin] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [messName, setMessName] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [showDialog2, setShowDialog2] = useState(false);
    const [showMess, setShowMess] = useState(false);

    const onAdd = () => {
        navigate(`/admin/book/-1`);
    }

    const onView = (id) => {
        navigate(`/admin/book/${id}`)
    }

    const onCloseDialog = () => {
        setShowDialog(false);
        setShowDialog2(false);
        setShowMess(false);
    }

    const onConfirm = () => {
        fetch(`http://localhost:8080/order/check-book/${idB}`)
            .then((resp) => resp.text())
            .then((data) => {
                if (data === "Yes") {
                    fetch(`http://localhost:8080/book/delete/${idB}`, {
                        method: 'DELETE'
                    })
                        .then((resp) => resp.text())
                        .then((data) => {
                            console.log(data)
                            if (data === "Fail") {
                                setShowDialog(false);
                                setShowDialog2(true);
                            } else {
                                setShowDialog(false);
                                fetch(`http://localhost:8080/cart/delete-book/${idB}`, {
                                    method: "DELETE"
                                })
                                    .catch((err) => console.log(err))

                                fetch(`http://localhost:8080/books`)
                                    .then((resp) => resp.json())
                                    .then((data) => setData(data))
                                    .catch((err) => console.log(err))
                            }
                        })
                        .catch((err) => console.log(err))
                } else {
                    setShowMess(true);
                    setShowDialog(false);
                }
            })
    }

    const onConfirm2 = () => {
        fetch(`http://localhost:8080/book-itembill/delete/${idB}`, {
            method: 'DELETE'
        })
            .then((resp) => resp.text())
            .then((data) => {
                setShowDialog2(false);

                fetch(`http://localhost:8080/cart/delete-book/${idB}`, {
                    method: "DELETE"
                })
                    .catch((err) => console.log(err))

                fetch(`http://localhost:8080/books`)
                    .then((resp) => resp.json())
                    .then((data) => setData(data))
                    .catch((err) => console.log(err))
                console.log(data)
            })
            .catch((err) => console.log(err))
    }

    const onDelete = (id, name) => {
        setShowDialog(true);
        setIdB(id)
        setMessName(name)
    }

    const onLogin = () => {
        setShowLogin(true);
    }

    const onClose = () => {
        setShowLogin(false);
    }

    const onLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
        navigate("/admin")
    }

    // Kiểm tra vị trí cuộn của trang
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 0);
    };

    // Xử lý sự kiện khi nút được ấn
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const onShowMenu = () => {
        setShowMenu(true);
    }

    const onCloseMenu = () => {
        setShowMenu(false);
    }

    useEffect(() => {
        fetch(`http://localhost:8080/books`)
            .then((resp) => resp.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        setBooks(data)
    }, [data])

    useEffect(() => {
        setBooks(data.filter((book) =>
            book.title.toLowerCase().includes(text.toLowerCase()) ||
            book.author.toLowerCase().includes(text.toLowerCase())
        ))
    }, [text])
    // Thêm lắng nghe sự kiện cuộn trang
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='root'>
            <header style={{ backgroundColor: 'rgb(233, 89, 12)' }}>
                <img src="https://logos.textgiraffe.com/logos/logo-name/Sach-designstyle-kiddo-m.png" />
                <input placeholder='tìm kiếm' type='text' onChange={(e) => {
                    setText(e.target.value)
                }} />
                {props.user ? <button onClick={onLogout}>Đăng xuất</button> : <button onClick={onLogin}>Đăng nhập</button>}
                <button className={`scroll-to-top-button ${isVisible ? 'visible' : 'invisible'}`} onClick={scrollToTop}>↑</button>
            </header>
            <main>
                <div className='manager-book-icon'>
                    {props.user && (props.user.position === "Admin" && (!showMenu && <i className='fas fa-angle-right' onClick={onShowMenu}></i>))}
                    <h1 className={showMenu ? "manager-book-icon-title" : "manager-book-icon-title-center"}>Quản lý Sách</h1>
                </div>
                {props.user && (props.user.position === "Admin" && <button className="btn btn-primary" onClick={onAdd}>
                    Add Book
                </button>)}
                <table className="table table-striped table-bordered">
                    <thead className='table-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Tác giả</th>
                            <th>Ngày phát hành</th>
                            <th>Giá tiền</th>
                            <th>Số trang</th>
                            <th>Số lượng</th>
                            <th>Đã bán</th>
                            <th>Thể loại</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{ChangeDay(book.day)}</td>
                                <td>{ChangeNumber(book.price)}<sup>đ</sup></td>
                                <td>{book.count}</td>
                                <td>{book.quantity}</td>
                                <td>{book.sold}</td>
                                <td>{book.category.name}</td>
                                <td>
                                    {props.user && (props.user.position === "Admin" && <button onClick={() => onView(book.id)}>View</button>)}
                                    {props.user && (props.user.position === "Admin" && <button onClick={() => onDelete(book.id, book.title)}>Delete</button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            {showDialog && <Confirm onCloseDialog={onCloseDialog} onConfirm={onConfirm} mess={'Xác nhận muốn xóa sách ' + messName + ' ?'} />}
            {showLogin && <Login onClose={onClose} check={1} />}
            {showMenu && <Menu user={props.user} onCloseMenu={onCloseMenu} />}
            {showMess && <Mess mess={"Sách này không thể xóa! Có hóa đơn chưa duyệt"} onCloseMess={onCloseDialog} />}
            {showDialog2 && <Confirm onCloseDialog={onCloseDialog} onConfirm={onConfirm2} mess={"Các hóa đơn của Sách sẽ xóa theo! Bạn chắc chắn xóa?"} />}
        </div>
    );
};
export default ManagerBook;