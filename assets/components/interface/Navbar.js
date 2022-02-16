import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink exact="true" to="/gestion/home">Statistiques</NavLink>
            <NavLink exact="true" to="/gestion/livres">Livres</NavLink>
            <NavLink exact="true" to="/gestion/users">Utilisateurs</NavLink>
            {/* <NavLink exact="true" to="/gestion/emprunts">Emprunts</NavLink> */}
            <NavLink exact="true" to="/gestion/commandes">Commandes</NavLink>
        </div>
    );
};

export default Navbar;