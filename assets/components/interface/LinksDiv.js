import React from "react";
import { NavLink } from "react-router-dom"

import { useState } from "react";
import Dropdown from "../Dropdown";

const LinksDiv = ({links}) => {


    return (
        <div className="linksDiv">
            <Dropdown title="Gestion">
                <ul>
                    { links.map(link=>(
                        <li key={link.path}>
                            <NavLink exact="true" to={link.path}>{link.text}</NavLink>
                        </li>
                    ))}
                </ul>
            </Dropdown>
            {/* <div className={"dropdownLinks" + (focus ? " active" : "")} onClick={toggleFocus}><h4>Gestion</h4>{focus? <IoIosArrowDown size="20px"/>:<IoIosArrowUp size="20px"/>}</div>
                <ul className={(focus ? "active" : "")}>
                { links.map(link=>(
                    <li key={link.path}>
                        <NavLink exact="true" to={link.path}>{link.text}</NavLink>
                    </li>
                ))}

                </ul> */}

        </div>
    );
};

export default LinksDiv;