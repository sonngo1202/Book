import "./footer.css"

function Footer() {
    return (
        <div className="footer">
            <div className="footer-left-content">
                <h5>Thông tin liên hệ</h5>
                <p>Vui lòng liên hệ với chúng tôi qua các thông tin cơ bản sau:<br /><br />

                    - Địa chỉ: Học viện Công nghệ Bưu chính Viễn thông.<br />
                    - Điện thoại: 0987.654.321 - 0912.345.678<br />
                    - Email: ptit.com.vn@gmail.com<br />
                    - Website: ptit.com.vn</p>
            </div>
            <div className="footer-right-content">
                <p>Chi nhánh: Trần Phú Tp.Hà Nội<br/>
                    Hotline: 0912.345.678<br/>
                    Email: ptit.com.vn@gmail.com</p>
            </div>
        </div>
    )
}
export default Footer;