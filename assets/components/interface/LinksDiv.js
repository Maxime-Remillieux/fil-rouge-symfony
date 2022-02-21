import React from "react";
import { NavLink } from "react-router-dom"

import { useState } from "react";
import Dropdown from "../Dropdown";
import { getLinks } from "../../pages/PageData";

const LinksDiv = ({entity}) => {
    const links = getLinks(entity);

    return (
        <div className="linksDiv">
            <Dropdown title="Gestion">
                <ul>
                    { links.map(link=>(
                        <li className="navButton" key={link.path}>
                            <NavLink exact="true" to={link.path}>{link.text}</NavLink>
                        </li>
                    ))}
                </ul>
            </Dropdown>
        </div>
    );
};

export default LinksDiv;