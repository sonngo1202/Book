import { useParams } from "react-router-dom";
import Products from "./Products";
import Linked from "./Linked";

function Collection() {
    const params = useParams();
    const name = params.name;

    return (
        <div className="root">
            <Linked linked={name.toUpperCase()}/>
            <Products title={name} check={1} />
        </div>
    )
}
export default Collection;

