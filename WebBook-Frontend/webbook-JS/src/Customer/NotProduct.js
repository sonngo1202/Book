import { useNavigate } from "react-router-dom";
import "./notProduct.css";

function NotProduct(props){
    const navigate = useNavigate();
   
    const onBuy = () =>{
        if(props.check === 1){
            navigate(`/trang-chủ`);
        }else{
            navigate(`/cart`);
        }
    }

    return(
        <div className={props.check ? "not-cart":"not-product"}>
            <p>{props.mess}</p>
            {props.check && <button onClick={onBuy}>{props.check === 1 ? "MUA SẮM NGAY":"THANH TOÁN NGAY"}</button>}
        </div>
    )
}
export default NotProduct;