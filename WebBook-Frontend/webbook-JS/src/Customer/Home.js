import React from "react";
import Slider from "./Slider";
import Products from "./Products";

function Home() {

    return (
        <div className="root">
            <Slider />
            <Products title={'Tất cả sản phẩm'} check={0}/>
        </div>
    );
}

export default Home;
