import { Link } from "react-router-dom";
import "./notFoundPage.css";

function NotFoundPage() {

    return (
        <div className="not-found-page-content">
            <img src="https://tse2.mm.bing.net/th?id=OIP.riqyEoKsrvLhlJNk0rXy-QAAAA&pid=Api&P=0&h=180" />
            <h1>Trang này không được tìm thấy</h1>
            <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            <Link to="/trang-chủ" className="not-found-link">
                Quay lại trang chủ
            </Link>
        </div>
    )
};
export default NotFoundPage;