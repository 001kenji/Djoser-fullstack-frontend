import React from "react";
import Navbar from '../Components/navbar'


const Layout = (props) => {
    <div>
        <p>this is the layout tag</p>
        <Navbar />
        {props.children}
    </div>


};
export default Layout