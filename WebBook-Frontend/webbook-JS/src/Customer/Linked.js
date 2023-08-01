import './linked.css';

function Linked(props) {

    return (
        <div className={props.check ? 'link2' : 'link1'}>
            <a href="/trang-chủ">TRANG CHỦ</a>
            <span>/</span>
            <a>{props.linked}</a>
        </div>
    );
}
export default Linked;