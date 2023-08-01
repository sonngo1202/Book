import { useEffect, useState } from 'react';
import './billDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import NotProduct from './NotProduct';
import Linked from './Linked';
import ChangeNumber from '../Dialog/ChangeNumber';
import Confirm from '../Dialog/Confirm';
import NotFoundPage from './NotFoundPage';
import Mess from '../Dialog/Mess';

function BillDetail(props) {
    const navigate = useNavigate();
    const params = useParams();
    const idBill = params.id;
    const [bill, setBill] = useState({});
    const [itemBills, setItemBills] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [showDialog2, setShowDialog2] = useState(false);
    const [showMess, setShowMess] = useState(false);

    const isValidId = () => {
        let number = parseInt(idBill)
        return !isNaN(number);
    }

    const onCancel = () => {
        setShowDialog(true);
    }

    const onCloseDialog = () => {
        setShowDialog(false);
        setShowDialog2(false);
        setShowMess(false);
    }

    const onConfirm = () => {
        fetch(`http://localhost:8080/order/delete/${idBill}`, {
            method: "DELETE"
        })
            .then(() => {
                setShowDialog(false);
                if (props.user.position === "User") {
                    navigate(`/order`)
                } else navigate(`/admin/bills`)
            })
            .catch((err) => console.log(err))
    }

    const onConfirm2 = () => {
        fetch(`http://localhost:8080/bill/add`, {
            method: "POST",
            body: JSON.stringify(bill),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
            .then((resp) => resp.text())
            .then((data) => {
                if (data === "Fail Add Bill") {
                    setShowDialog2(false);
                    setShowMess(true);
                } else {
                    fetch(`http://localhost:8080/order/delete/${idBill}`, {
                        method: "DELETE"
                    })
                        .then(() => {
                            setShowDialog2(false);
                            navigate(`/admin/bills`)
                        })
                        .catch((err) => console.log(err))
                }
            })

    }

    const onBackBills = () => {
        navigate(`/admin/bills`)
    }

    const onAddBill = () => {
        setShowDialog2(true);
    }

    useEffect(() => {
        if (isValidId()) {
            if (props.user.position === "User") {
                fetch(`http://localhost:8080/order/info/${props.user.id}/${idBill}`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        setBill(data)
                    })
                    .catch((err) => console.log(err))
            } else {
                fetch(`http://localhost:8080/order/detail/${idBill}`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        setBill(data)
                    })
                    .catch((err) => console.log(err))
            }
        }
    }, [])

    useEffect(() => {
        setItemBills(bill.itemBills ? bill.itemBills : []);
    }, [bill])

    if (!isValidId()) {
        if (props.user.position === 'Admin') {
            return (
                <div className='root'>
                    <h1 className="text-center" style={{ marginTop: '60px' }}>Chi tiết đơn hàng</h1>
                    <p style={{ marginTop: '100px', fontSize: '20px' }}>Đơn hàng bạn muốn tìm không tồn tại!</p>
                    <button style={{
                        fontSize: '20px',
                        width: '15%',
                        height: '50px',
                        fontWeight: 'bold',
                        backgroundColor: 'red',
                        border: 'none',
                        color: '#ffffff',
                        borderRadius: '8px',
                    }} onClick={onBackBills}>Quay về quản lý Đơn hàng</button>
                </div>
            )
        }
        return (
            <NotFoundPage />
        )
    }

    if (bill.id === -1) {
        if (props.user.position === 'Admin') {
            return (
                <div className='root'>
                    <h1 className="text-center" style={{ marginTop: '60px' }}>Chi tiết đơn hàng</h1>
                    <p style={{ marginTop: '100px', fontSize: '20px' }}>Đơn hàng bạn muốn tìm không tồn tại!</p>
                    <button style={{
                        fontSize: '20px',
                        width: '15%',
                        height: '50px',
                        fontWeight: 'bold',
                        backgroundColor: 'red',
                        border: 'none',
                        color: '#ffffff',
                        borderRadius: '8px',
                    }} onClick={onBackBills}>Quay về quản lý Đơn hàng</button>
                </div>
            )
        }
        return (
            <div className='root'>
                <Linked linked={"CHI TIẾT ĐƠN HÀNG"} />
                <div className='bill-detail-err-top'></div>
                <NotProduct mess={"Đơn hàng này không tồn tại!"} />
                <div className='bill-detail-err-bottom'></div>
            </div>
        )
    }
    return (
        <div className='bill-detail-book'>
            {props.user.position === 'User' && <Linked linked={"CHI TIẾT ĐƠN HÀNG"} />}
            {props.user.position === 'Admin' && <h1 className='text-center' style={{ paddingTop: '30px' }}>Chi tiết đơn hàng</h1>}
            <div className='bill-detail-book-content'>
                {props.user.position === 'Admin' && <div className='bill-detail-book-content-user'>
                    <div className='bill-detail-book-content-user-info'>
                        <p>THÔNG TIN NGƯỜI NHẬN</p>
                        <div className='bill-detail-book-content-user-info-content'>
                            <h5>{bill.user?.name}</h5>
                            <p>Số điện thoại: {bill.phone}</p>
                        </div>
                    </div>
                    <div className='bill-detail-book-content-user-address'>
                        <p>ĐỊA CHỈ NHẬN HÀNG</p>
                        <div className='bill-detail-book-content-user-address-content'>
                            <p>{bill.address}</p>
                        </div>
                    </div>
                    <div className='bill-detail-book-content-user-payment'>
                        <p>HÌNH THỨC THANH TOÁN</p>
                        <div className='bill-detail-book-content-user-payment-content'>
                            <p>{bill.payment}</p>
                        </div>
                    </div>
                </div>}
                <div className='bill-detail-book-content-product'>
                    <table>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemBills.map((itemBill) => (
                                <tr key={itemBill.book.id}>
                                    <td>
                                        <img src={itemBill.book.image ? `http://localhost:8080/book/image/${itemBill.book.image}` : ""} />
                                        <div className='bill-detail-book-content-product-title-author'>
                                            <p>{itemBill.book.title}</p>
                                            <p>Tác giả: {itemBill.book.author}</p>
                                        </div>
                                    </td>
                                    <td>{ChangeNumber(itemBill.price)}<sup>đ</sup></td>
                                    <td>{itemBill.amount}</td>
                                    <td>{ChangeNumber(itemBill.price * itemBill.amount)}<sup>đ</sup></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='bill-detail-book-content-action'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Tạm tính</th>
                                <td>{ChangeNumber(bill.totalPrice)}<sup>đ</sup></td>
                            </tr>
                            <tr>
                                <th>Tổng tiền</th>
                                <td>{ChangeNumber(bill.totalPrice)}<sup>đ</sup></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='bill-detail-book-content-action-button'>
                        {props.user.position === 'Admin' && <button onClick={onAddBill}>Nhận đơn hàng</button>}
                        <button onClick={onCancel}>Hủy đơn hàng</button>
                    </div>
                </div>
            </div>
            {showDialog && <Confirm mess={"Bạn có chắc muốn hủy đơn hàng này?"} onConfirm={onConfirm} onCloseDialog={onCloseDialog} />}
            {showDialog2 && <Confirm mess={"Bạn sẽ nhận đơn hàng này?"} onConfirm={onConfirm2} onCloseDialog={onCloseDialog} />}
            {showMess && <Mess mess={"Sách đã hết! Hãy thêm số lượng sách để duyệt!"} onCloseMess={onCloseDialog} />}
        </div>
    )
}
export default BillDetail;