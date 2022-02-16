import React from 'react';
import { createContext, useEffect, useState } from 'react';
import useFetch from "../hooks/database/useFetch";
import Navbar from "./interface/Navbar";
import { GestionInterface } from '../pages/PageData';
import ReactLoading from "react-loading";
// import { flattenObject, quickSortTab } from '../utils/Utils';

export const NavContext = createContext({});

const getUrl = (entity)=>{
    return 'http://localhost:8000/api/' + entity + '/';
}

const GestionTable = ({ row: Row, entity}) => {
    const [loading, data, fetchError, setKeyword, setIsUpdating] = useFetch(getUrl(entity));
    // const [orderedData, setOrderedData] = useState([]);
    // const navigate = useNavigate();

    const [navContext] = useState({
        setKeyword: setKeyword,
        setIsUpdating: setIsUpdating
    });

    // useEffect(() =>{
    //     setOrderedData(quickSortTab(data, 'code'));
    // }, [data])

    return (
        <div className="gestion">
            <NavContext.Provider value={navContext} >
            <GestionInterface entity={entity}/>
            {/* <Interface content={interfaceContent}/> */}
            </NavContext.Provider>
            <div className="gestionContent">
                <Navbar />
                {loading &&<div className="loading"><ReactLoading type="bars" color='#516079'/></div>}
                {!loading &&
                    <ul className="list">
                        {data.map(element => (
                            <Row data={element} key={element.id} />
                        ))}
                    </ul>
                }
            </div>
        </div>
    );
};

export default GestionTable;