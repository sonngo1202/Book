import BillDetail from "../Customer/BillDetail";

function ManagerBillDetail(props) {
    return (
        <div className="root">
            <BillDetail user={props.user} />
        </div>
    )
}
export default ManagerBillDetail;