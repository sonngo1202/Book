import { useNavigate } from "react-router-dom";
import "./login.css";
import React, { useState } from 'react'
import Confirm from "../Dialog/Confirm";

function Login(props) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errName, setErrName] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errPassword, setErrPassword] = useState(false);
    const [errConfirm, setErrConfirm] = useState(false);
    const [checkConfirm, setCheckConfirm] = useState(false);
    const [checkLogin, setCheckLogin] = useState(false);
    const [checkLogup, setCheckLogup] = useState(false);
    const [checkPosition, setCheckPosition] = useState(false);

    const [showLogup, setShowLogup] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const onClose = () => {
        if (props.check === 1) props.onClose();
    }

    const onLogin = () => {
        let isValid = true;
        if (!email) {
            isValid = false;
            setErrEmail(true);
        }
        if (!password) {
            isValid = false;
            setErrPassword(true);
        }
        if (isValid) {
            const user = {
                id: 0,
                name: '',
                email: email,
                password: password
            }
            fetch(`http://localhost:8080/checkLogin`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json; charset=ISO-8859-1",
                },
            })
                .then((resp) => {
                    if (!resp.ok) {
                        if (props.check > 0) {
                            setCheckPosition(true);
                        } else {
                            setCheckLogin(true);
                        }
                        throw Error(resp.statusText);
                    }
                    return resp.json()
                })
                .then((data) => {
                    if (props.check > 0) {
                        if (data.position === 'User') {
                            setCheckPosition(true);
                        }
                        else {
                            localStorage.setItem('user', JSON.stringify(data));
                            navigate(`/admin`)
                            onClose()
                        }
                    }
                    else {
                        localStorage.setItem('user', JSON.stringify(data));
                        navigate('/trang-chủ')
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    const onOpen = () => {
        setEmail("");
        setPassword("");
        setShowLogup(true);
        setErrEmail(false);
        setErrPassword(false);
        setCheckLogin(false);
    }

    const onLogup = () => {
        let isValid = true;
        if (!name) {
            isValid = false;
            setErrName(true);
        }
        if (!email) {
            isValid = false;
            setErrEmail(true);
        }
        if (!password) {
            isValid = false;
            setErrPassword(true);
        }
        if (!confirm) {
            isValid = false;
            setErrConfirm(true);
        }
        if (password !== confirm) {
            isValid = false;
            if(confirm){
                setCheckConfirm(true);
            }
        }
        if (isValid) {
            setShowDialog(true);
        }
    }

    const onBack = () => {
        setEmail("");
        setPassword("");
        setShowLogup(false)
        setErrEmail(false);
        setErrPassword(false);
        setErrName(false);
        setErrConfirm(false)
        setCheckConfirm(false);
        setCheckLogup(false);
    }

    const onCloseDialog = () => {
        setShowDialog(false);
    }

    const onConfirm = () => {
        const user = {
            id: 0,
            name: name,
            email: email,
            password: password
        }
        fetch(`http://localhost:8080/logup`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    setCheckLogup(true)
                    throw Error(resp.statusText);
                }
                return resp.json()
            })
            .then((data) => {
                localStorage.setItem('user', JSON.stringify(data));
                navigate(`/trang-chủ`)
            })
            .catch((err) => console.log(err))
        onCloseDialog()
    }
    return (
        <>
            <div className="login">
                <div className="login-content">
                    {props.check === 1 && <div className="login-content-cancel">
                        <button onClick={onClose}><p>X</p></button>
                    </div>}
                    <h2>{showLogup ? 'Đăng ký' : 'Đăng nhập'}</h2>
                    {showLogup && <div className="login-content-item">
                        <label>Name</label><span>*</span><br />
                        <input type="text" onChange={(e) => {
                            setName(e.target.value);
                            setErrName(false);
                        }} /><br />
                        {errName && <span>Name không được trống</span>}
                    </div>}
                    <div className="login-content-item">
                        <label>Email</label><span>*</span><br />
                        <input type="text" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                            setErrEmail(false);
                        }} /><br />
                        {errEmail && <span>Email không được trống</span>}
                    </div>
                    <div className="login-content-item">
                        <label>Password</label><span>*</span><br />
                        <input type="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                            setErrPassword(false);
                        }} /><br />
                        {errPassword && <span>Password không được trống</span>}
                        {checkLogin && <span>Thông tin Email hoặc Password không chính xác</span>}
                        {checkPosition && <span>Thông tin Email hoặc Password không chính xác.<br />Lưu ý: Đăng nhập tài khoản admin</span>}
                    </div>
                    {showLogup && <div className="login-content-item">
                        <label>Confirm Password</label><span>*</span><br />
                        <input type="password" onChange={(e) => {
                            setConfirm(e.target.value);
                            setErrConfirm(false);
                            setCheckConfirm(false);
                        }} /><br />
                        {errConfirm && <span>Confirm Password không được trống.</span>}
                        {checkConfirm && <span>Password nhập lại không đúng</span>}
                        {checkLogup && <span>Email đã tồn tại</span>}
                    </div>}
                    <div className="login-content-button">
                        <button onClick={showLogup ? onLogup : onLogin}>{showLogup ? 'Register' : 'Login'}</button>
                        {props.check == 0 && <p>or</p>}
                        {props.check == 0 && <button onClick={showLogup ? onBack : onOpen}>{showLogup ? 'Back Login' : 'Register'}</button>}
                    </div>
                </div>
            </div>
            {showDialog && <Confirm mess={`Xác nhận tạo tài khoản với những thông tin vừa nhập ?`} onCloseDialog={onCloseDialog} onConfirm={onConfirm} />}
        </>
    );
};
export default Login;