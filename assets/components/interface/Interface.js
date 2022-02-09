import React from "react";
import FindDiv from "./FindDiv";
import LinksDiv from "./LinksDiv";

const Interface = ({data}) => {
    return (
        <div className="interface">
            {/* <FindDiv setKeyword={setKeyword} updateRequestData={updateRequestData} searchFields={data.searchFields}   /> */}
            <LinksDiv links={data.links}/>
        </div>
    );
};

export default Interface;