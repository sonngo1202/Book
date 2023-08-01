import { useEffect, useState } from 'react';
import './cart.css';
import NotProduct from './NotProduct';
import ChangeNumber from '../Dialog/ChangeNumber';
import { useNavigate } from 'react-router-dom';
import Linked from './Linked';

function Cart(props) {
    const [cart, setCart] = useState({});
    const [itemCarts, setItemCarts] = useState([]);
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const onPlus = (itemCart) => {
        if (itemCart.amount < itemCart.book.quantity) {
            const updatedItemCart = { ...itemCart, amount: itemCart.amount + 1 };
            updateItemCart(updatedItemCart);
        }
    }

    const onSub = (itemCart) => {
        if (itemCart.amount > 1) {
            const updatedItemCart = { ...itemCart, amount: itemCart.amount - 1 };
            updateItemCart(updatedItemCart);
        }
    }

    const updateItemCart = (updatedItemCart) => {
        fetch(`http://localhost:8080/cart/update`, {
            method: "POST",
            body: JSON.stringify(updatedItemCart),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
            .then(() => {
                fetch(`http://localhost:8080/cart/${props.user.id}`)
                    .then((res) => res.json())
                    .then((data) => setCart(data))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    const onDeleteItemCart = (itemCart) => {
        fetch(`http://localhost:8080/cart/delete`, {
            method: "DELETE",
            body: JSON.stringify(itemCart),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
            .then(() => {
                fetch(`http://localhost:8080/cart/${props.user.id}`)
                    .then((res) => res.json())
                    .then((data) => setCart(data))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    const onContinue = () => {
        navigate(`/trang-chủ`)
    }
    const onProduct = (author, title) => {
        navigate(`/book/${author}/${title}`);
    }

    const onPayment = () => {
        navigate(`/payment`)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/cart/${props.user.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setCart(data);
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        setItemCarts(cart.itemCarts ? cart.itemCarts : []);
    }, [cart])

    useEffect(() => {
        let totalAmount = 0, totalPrice = 0;
        if (itemCarts.length > 0) {
            itemCarts.forEach(itemCart => {
                totalAmount += itemCart.amount;
                totalPrice += (itemCart.book.price * itemCart.amount);
            });
            setTotalAmount(totalAmount);
            setTotalPrice(totalPrice);
        }
    }, [itemCarts]);

    if (itemCarts.length === 0) {
        return (
            <div className='root'>
                <Linked linked={"GIỎ HÀNG"} />
                <NotProduct mess={'Chưa có sản phẩm trong giỏ hàng của bạn.'} check={1} />
            </div>
        )
    }
    return (
        <div className='cart-content'>
            <Linked linked={"GIỎ HÀNG"} />
            <div className='book-cart'>
                <div className='book-cart-left'>
                    <div className='book-cart-left-top'>
                        <table>
                            <thead>
                                <tr>
                                    <th><p>SẢN PHẨM</p></th>
                                    <th><p>SỐ LƯỢNG</p></th>
                                    <th><p>THÀNH TIỀN</p></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemCarts.map((item) => (
                                    <tr key={item.book.id}>
                                        <td onClick={() => onProduct(item.book.author, item.book.title)}>
                                            <div className='img'>
                                                <img src={item.book.image ? `http://localhost:8080/book/image/${item.book.image}` : ""} />
                                            </div>
                                            <div className='content'>
                                                <p>{item.book.title}</p>
                                                <p>{ChangeNumber(item.book.price)}<sup>đ</sup></p>
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={() => onSub(item)}> - </button>
                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                disabled
                                                value={item.amount}
                                            />
                                            <button onClick={() => onPlus(item)}> + </button>
                                        </td>
                                        <td>{ChangeNumber(item.amount * item.book.price)}<sup>đ</sup></td>
                                        <td onClick={() => onDeleteItemCart(item)}><i className="fa fa-trash-o"></i></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='book-cart-bottom'>
                        <button onClick={onContinue}>← TIẾP TỤC MUA SẮM</button>
                    </div>
                </div>
                <div className='book-cart-right'>
                    <table>
                        <tbody>
                            <tr>
                                <th>TỔNG SỐ LƯỢNG</th>
                                <td>{totalAmount}</td>
                            </tr>
                            <tr>
                                <th>TẠM TÍNH</th>
                                <td>{ChangeNumber(totalPrice)}<sup>đ</sup></td>
                            </tr>
                            <tr>
                                <th>THÀNH TIỀN</th>
                                <td>{ChangeNumber(totalPrice)}<sup>đ</sup></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='book-cart-right-button'>
                        <button onClick={onPayment}>THANH TOÁN</button>
                    </div>
                </div>
            </div>
            <div className={itemCarts.length === 1 ? "cart-bottom-a" : "cart-bottom"}></div>
        </div>
    )


};
export default Cart;