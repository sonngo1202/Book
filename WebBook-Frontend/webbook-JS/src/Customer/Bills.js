import { useEffect, useState } from 'react';
import './bills.css';
import ChangeId from '../Dialog/ChangeId';
import ChangeDay from '../Dialog/ChangeDay';
import Linked from './Linked';
import ChangeNumber from '../Dialog/ChangeNumber';
import NotProduct from './NotProduct';
import { useNavigate } from 'react-router-dom';

function Bills(props) {
    const [bills, setBills] = useState([]);
    const navigate = useNavigate();

    const onDetail = (id) => {
        if (props.user.position === "User") {
            navigate(`/order/${id}`)
        } else {
            navigate(`/admin/bill/${id}`)
        }
    }

    useEffect(() => {
        if (props.user.position === 'User') {
            fetch(`http://localhost:8080/order/info/${props.user.id}`)
                .then((resp) => resp.json())
                .then((data) => setBills(data))
                .catch((err) => console.log(err))
        } else {
            fetch(`http://localhost:8080/order/info`)
                .then((resp) => resp.json())
                .then((data) => setBills(data))
                .catch((err) => console.log(err))
        }
    }, [])

    if (bills.length === 0) {
        if (props.user.position === "Admin") {
            return (
                <div className='root'>
                    <NotProduct mess={'Không có đơn hàng nào chờ xác nhận.'} user={props.user} />
                </div>
            )
        }
        return (
            <div className='root'>
                <Linked linked={"ĐƠN HÀNG CỦA BẠN"} />
                <NotProduct mess={'Không có đơn hàng nào chờ xác nhận.'} check={2} />
            </div>
        )
    }

    return (
        <div className='bill-book'>
            {props.user.position === "User" && <Linked linked={"ĐƠN HÀNG CỦA BẠN"} />}
            <div className='bill-book-content'>
                <table>
                    <thead>
                        <tr>
                            <th>MÃ ĐƠN HÀNG</th>
                            <th>NGÀY ĐẶT MUA</th>
                            <th>ĐỊA CHỈ</th>
                            <th>SỐ LƯỢNG</th>
                            <th>THÀNH TIỀN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <tr key={bill.id}>
                                <td>{ChangeId(bill.id)}</td>
                                <td>{ChangeDay(bill.paymentTime)}</td>
                                <td>{bill.address}</td>
                                <td>{bill.totalAmount}</td>
                                <td>{ChangeNumber(bill.totalPrice)}<sup>đ</sup></td>
                                <td><button onClick={() => onDetail(bill.id)}>Xem chi tiết</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Bills;