import { useNavigate } from 'react-router-dom';
import './menu.css';

function Menu(props){
    const navigate = useNavigate()

    const onManagerBook = () =>{
        props.onCloseMenu();
        navigate(`/admin/books`)
    }

    const onManagerBill = () =>{
        navigate(`/admin/bills`)
    }

    const onCloseMenu = () =>{
        props.onCloseMenu();
    }

    return(
        <div className='menu-manager'>
            <div className='menu-manager-content'>
                <div className='menu-manager-content-admin'>
                    <p>{props.user.name}</p>
                    <i className='fas fa-angle-left' onClick={onCloseMenu}></i>
                </div>
                <div className='menu-manager-content-action'>
                    <button onClick={onManagerBook}>Quản lý sách</button>
                    <button onClick={onManagerBill}>Quản lý đơn hàng</button>
                </div>
            </div>
        </div>
    )
}
export default Menu;

