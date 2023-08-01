import { useNavigate } from "react-router-dom";
import Bills from "../Customer/Bills"
import './managerBill.css';
import { useState } from "react";
import Menu from "./Menu";

function ManagerBill(props) {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate("/admin")
    }

    const onShowMenu = () => {
        setShowMenu(true);
    }

    const onCloseMenu = () => {
        setShowMenu(false);
    }

    return (
        <div className="root">
            <div style={{ backgroundColor: 'rgb(233, 89, 12)' }} className="manager-bill-header">
                <img src="https://logos.textgiraffe.com/logos/logo-name/Sach-designstyle-kiddo-m.png" />
                <button onClick={onLogout}>Đăng xuất</button>
            </div>
            <div className="manager-bill-title">
                {!showMenu && <i className='fas fa-angle-right' onClick={onShowMenu}></i>}
                <h1 className={showMenu ? "manager-bill-title-left" : "manager-bill-title-center"}>Quản lý Đơn hàng</h1>
            </div>
            <Bills user={props.user} />
            {showMenu && <Menu user={props.user} onCloseMenu={onCloseMenu} />}
        </div>
    )
}
export default ManagerBill;