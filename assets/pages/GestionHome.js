import React from "react";
import Interface from "../components/interface/Interface";
import Navbar from "../components/interface/Navbar";

const GestionHome = () => {
    const data={
        // data:{
            links: [],
            searchFields: {}
        // }
    }
    return (
        <div className="gestion">
            <Interface data={data} setKeyword={false}/>
            <div>
                <Navbar />
                <h1>GestionHome</h1>
            </div>
        </div>
    );
};

export default GestionHome;