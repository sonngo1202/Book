import { useParams } from "react-router-dom";
import Products from "./Products";
import Linked from "./Linked";

function Search(){
    const params = useParams();
    const text = params.text;
    
    return (
        <div className="root">
            <Linked linked={'KẾT QUẢ TÌM KIẾM "'+text+'"'}/>
             <Products title={'Tìm Kiếm "'+text+'"'} check={2} text={text}/>
        </div>
    )
}
export default Search;
    
