import { useNavigate } from "react-router-dom";
import "./header.css";
import React, { useState, useEffect } from "react";
import Login from "../login_logup/Login";
import Mess from "../Dialog/Mess";

function Header(props) {
    const navigate = useNavigate();
    const [showCategories, setShowCategories] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [showMess, setShowMess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [text, setText] = useState("");

    const onOpen = () => {
        if (props.user) {
            setShowCategories(true);
        }
    }

    const onClose = () => {
        setShowCategories(false);
    }

    const onOpenAcc = () => {
        if (props.user) {
            setShowAccount(true);
        }
    }

    const onCloseAcc = () => {
        setShowAccount(false);
    }

    const onLogout = () => {
        navigate("/")
        localStorage.removeItem('user');
        window.location.reload();
    }

    const onChoseCategory = (name) => {
        setText("");
        navigate(`/books/${name}`)
    }

    const onSearch = () => {
        if (props.user) {
            if (!text) {
                setShowMess(true);
            }
            else {
                navigate(`/search/${text}`)
            }
        }
    }

    const onCart = () => {
        if(props.user){
            navigate(`/cart`)
        }
    }

    const onOrder = () => {
        if(props.user){
            navigate(`/order`)
        }
    }

    const onCloseMess = () => {
        setShowMess(false)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/categories`)
            .then((resp) => resp.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className="header">
                <div className="logo">
                    <a href="/trang-chủ"><img src="https://logos.textgiraffe.com/logos/logo-name/Sach-designstyle-kiddo-m.png" /></a>
                </div>
                <div className="menu" onMouseEnter={onOpen} onMouseLeave={onClose}>
                    <i className="fa fa-bars"></i>
                </div>
                <div className="search">
                    <input type="text" value={text} placeholder="Tìm kiếm Sách" disabled={!props.user} onChange={(e) => setText(e.target.value)} />
                    <button className="fas fa-search" onClick={onSearch}></button>
                </div>
                <div className="cart" onClick={onCart}>
                    <button>
                        <i className="fa fa-shopping-cart"></i><br />
                        <span>Giỏ Hàng</span>
                    </button>
                </div>
                <div className="bill" onClick={onOrder}>
                    <button>
                        <i className="fas fa-clipboard"></i><br />
                        <span>Đã Đặt Mua</span>
                    </button>
                </div>
                <div className="account" onMouseEnter={onOpenAcc} onMouseLeave={onCloseAcc}>
                    <button>
                        <i className="far fa-user"></i><br />
                        <span>Tài Khoản</span>
                    </button>
                </div>
            </div>
            {showCategories && <div className="category">
                <div className="category-content" onMouseEnter={onOpen} onMouseLeave={onClose}>
                    {categories.map((category) => (
                        <button key={category.id} onClick={() => onChoseCategory(category.name)}>{category.name}</button>
                    ))}
                </div>
            </div>}
            {showAccount && <div className="account-content" onMouseEnter={onOpenAcc} onMouseLeave={onCloseAcc}>
                <p>{props.user?.name}</p>
                <button onClick={onLogout}>Đăng xuất</button>
            </div>}
            {!props.user && <Login check={0} />}
            {showMess && <Mess onCloseMess={onCloseMess} mess={'Hãy nhập từ khóa để tìm kiếm!!!'} />}
        </>
    );
};
export default Header;