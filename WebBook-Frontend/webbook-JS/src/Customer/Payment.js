import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './payment.css';
import Mess from '../Dialog/Mess';
import ChangeNumber from '../Dialog/ChangeNumber';
import Linked from './Linked';

function Payment(props) {
    const navigate = useNavigate();
    const [cart, setCart] = useState({});
    const [itemCarts, setItemCarts] = useState([]);
    const [itemBills, setItemBills] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([])
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [commune, setCommune] = useState('');
    const [street, setStreet] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [payment, setPayment] = useState("Chuyển khoản ngân hàng");

    const [errPhone, setErrPhone] = useState(false);
    const [errCity, setErrCity] = useState(false);
    const [errDistrict, setErrDistrict] = useState(false);
    const [errCommune, setErrCommune] = useState(false);
    const [errStreet, setErrStreet] = useState(false);

    const [showMess, setShowMess] = useState(false);

    const onOder = () => {
        let isValid = true;
        if (!phone) {
            isValid = false;
            setErrPhone(true);
        }
        if (!city) {
            isValid = false;
            setErrCity(true);
        }
        if (!district) {
            isValid = false;
            setErrDistrict(true);
        }
        if (!commune) {
            isValid = false;
            setErrCommune(true);
        }
        if (!street) {
            isValid = false;
            setErrStreet(true);
        }
        if (isValid) {
            const bill = {
                id: -1,
                paymentTime: currentTime,
                phone : phone,
                payment : payment,
                totalAmount: totalAmount,
                totalPrice: totalPrice,
                itemBills: itemBills,
                address: street + '-' + commune + '-' + district + '-' + city,
                user: props.user,
            }
            fetch(`http://localhost:8080/order/add`, {
                method: 'POST',
                mode: "cors",
                body: JSON.stringify(bill),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .then(() => {
                    fetch(`http://localhost:8080/cart/deleteAll/${props.user.id}`, {
                        method: 'POST',
                    })
                        .catch((err) => console.log(err))
                    setShowMess(true);
                })
                .catch((err) => console.log(err))
        }
    }

    const onCloseMess = () => {
        setShowMess(false);
        navigate(`/trang-chủ`);

    }

    useEffect(() => {
        fetch(`http://localhost:8080/cart/${props.user.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setCart(data);
                if (data.itemCarts.length === 0) navigate(`/cart`);
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        setItemCarts(cart.itemCarts ? cart.itemCarts : []);
    }, [cart])

    useEffect(() => {
        let totalPrice = 0, totalAmount = 0;
        if (itemCarts.length > 0) {
            itemCarts.forEach(itemCart => {
                totalPrice += (itemCart.book.price * itemCart.amount);
                totalAmount += itemCart.amount;
            });
            setTotalPrice(totalPrice);
            setTotalAmount(totalAmount);
        }
        const items = itemCarts.map((itemCart) => {
            const price = itemCart.book.price;
            return {
                ...itemCart, price: price
            }
        })
        setItemBills(items);
    }, [itemCarts]);

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const formattedTime = `${year}-${month}-${day}`;
            setCurrentTime(formattedTime);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        fetch(`https://provinces.open-api.vn/api/?depth=3`)
            .then((resp) => resp.json())
            .then((data) => setCities(data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        { cities.filter(add => add.name === city).map((ci) => setDistricts(ci.districts)) }
    }, [city])


    return (
        <div className='root'>
            <Linked linked={"THANH TOÁN"}/>
            <div className='payment-book'>
                <div className='payment-book-left'>
                    <div className='payment-book-left-title'>
                        <h5>THÔNG TIN THANH TOÁN</h5>
                    </div>
                    <div className='payment-book-left-content'>
                        <div className='payment-book-left-content-row'>
                            <div className='payment-book-left-content-item'>
                                <label>Họ tên</label><span>*</span><br />
                                <input type='text' value={props.user?.name} disabled onChange={(e) => console.log(e.target.value)} />
                            </div>
                            <div className='payment-book-left-content-item'>
                                <label>Số điện thoại</label><span>*</span><br />
                                <input type='text' pattern="[0-9]*" value={phone} onChange={(e) => {
                                    setPhone(e.target.value)
                                    setErrPhone(false)
                                }} />
                                {errPhone && <span>Vui lòng nhập Số điện thoại</span>}
                            </div>
                        </div>
                        <div className='payment-book-left-content-row'>
                            <div className='payment-book-left-content-item'>
                                <label>Tỉnh/TP</label><span>*</span><br />
                                <select onChange={(e) => {
                                    setCity(e.target.value)
                                    setErrCity(false);
                                }}>
                                    <option value="">Chọn Tỉnh/Thành Phố</option>
                                    {cities.map((ci) => (
                                        <option key={ci.name} value={ci.name}>{ci.name}</option>
                                    ))}
                                </select>
                                {errCity && <span>Vui lòng chọn Tỉnh/TP</span>}
                            </div>
                            <div className='payment-book-left-content-item'>
                                <label>Quận/Huyện</label><span>*</span><br />
                                <select onChange={(e) => {
                                    setDistrict(e.target.value)
                                    setErrDistrict(false)
                                }}>
                                    <option value="">Chọn Quận/Huyện</option>
                                    {cities.filter(citi => citi.name === city).map((ci) => (
                                        ci.districts.map((dis) => (
                                            <option key={dis.name} value={dis.name}>{dis.name}</option>
                                        ))
                                    ))}
                                </select>
                                {errDistrict && <span>Vui lòng chọn Quận/Huyện</span>}
                            </div>
                        </div>
                        <div className='payment-book-left-content-row'>
                            <div className='payment-book-left-content-item'>
                                <label>Phường/Xã</label><span>*</span><br />
                                <select onChange={(e) => {
                                    setCommune(e.target.value)
                                    setErrCommune(false);
                                }}>
                                    <option value="">Chọn Phường/Xã</option>
                                    {districts.filter(dis => dis.name === district).map((dis) => (
                                        dis.wards.map((comm) => (
                                            <option key={comm.name} value={comm.name}>{comm.name}</option>
                                        ))
                                    ))}
                                </select>
                                {errCommune && <span>Vui lòng chọn Phường/Xã</span>}
                            </div>
                            <div className='payment-book-left-content-item'>
                                <label>Địa chỉ</label><span>*</span><br />
                                <input type='text' value={street} onChange={(e) => {
                                    setStreet(e.target.value)
                                    setErrStreet(false)
                                }} />
                                {errStreet && <span>Vui lòng nhập Địa chỉ</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='payment-book-right'>
                    <div className='payment-book-right-title'>
                        <h5>ĐƠN HÀNG CỦA BẠN</h5>
                    </div>
                    <div className='payment-book-right-content'>
                        <div className='payment-book-right-content-info'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>SẢN PHẨM</th>
                                        <th>GIÁ TIỀN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemCarts.map((item) => (
                                        <tr key={item.book.id}>
                                            <td>
                                                <p>{item.book.title}</p>
                                                <p>x{item.amount}</p>
                                            </td>
                                            <td>{ChangeNumber(item.book.price)}<sup>đ</sup></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>Tạm Tính</td>
                                        <td>{ChangeNumber(totalPrice)}<sup>đ</sup></td>
                                    </tr>
                                    <tr>
                                        <td>Thành tiền</td>
                                        <td>{ChangeNumber(totalPrice)}<sup>đ</sup></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='payment-book-right-content-method'>
                            <div className='payment-book-right-content-method-item'>
                                <input type='radio' id="radio-1" name="method" value={"Chuyển khoản ngân hàng"} defaultChecked onChange={(e)=>setPayment(e.target.value)}/>
                                <span>Chuyển khoản ngân hàng</span>
                            </div>
                            <div className='payment-book-right-content-method-item'>
                                <input type='radio' id="radio-1" name="method" value={"Trả tiền mặt khi nhận hàng"} onChange={(e)=>setPayment(e.target.value)}/>
                                <span>Trả tiền mặt khi nhận hàng</span>
                            </div>
                        </div>
                        <div className='payment-book-right-content-button'>
                            <button onClick={onOder}>ĐẶT SÁCH</button>
                        </div>
                    </div>
                </div>
            </div>
            {showMess && <Mess mess={"Bạn đã đặt hàng thành công!\nCảm ơn bạn đã đặt hàng!"} onCloseMess={onCloseMess} />}
        </div>
    )
};
export default Payment;