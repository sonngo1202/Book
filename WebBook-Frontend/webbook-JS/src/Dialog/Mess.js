import "./mess.css";

function Mess(props) {
    const onCloseMess = () => {
        props.onCloseMess();
    }

    return (
        <div className="mess">
            <div className="mess-content">
                <h3>{props.mess}</h3>
                {props.check && <img src={props.image}/>}
                <div className="mess-content-button">
                    <button onClick={onCloseMess}>OK</button>
                </div>
            </div>
        </div>
    );
};
export default Mess;