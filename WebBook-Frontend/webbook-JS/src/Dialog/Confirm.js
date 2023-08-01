import "./confirm.css";

function Confirm(props) {
    const onCloseDialog = () => {
        props.onCloseDialog();
    }

    const onConfirm = () => {
        props.onConfirm();
    }
    return (
        <div className="dialog">
            <div className="dialog-content">
                <h3>{props.mess}</h3>
                <div className="dialog-content-button">
                    <button onClick={onConfirm}>Xác nhận</button>
                    <button onClick={onCloseDialog}>Đóng</button>
                </div>
            </div>
        </div>
    );
};
export default Confirm;