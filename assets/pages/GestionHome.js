import React from "react";
import Interface from "../components/interface/Interface";
import LinksDiv from "../components/interface/LinksDiv";
import Navbar from "../components/interface/Navbar";
import { useFetchGet } from "../hooks/database/useFetch";
import { getLinks } from "./PageData";

const GestionHome = () => {
    // const [stats, setStats] = useState({});
    const [stats, loading, fetchError] = useFetchGet('http://localhost:8000/api/stats')

    return (
        <div className="gestion gestion_home">
            <div className="interface">
                <LinksDiv entity={'home'}/>
            </div>
            <div>
                <Navbar />
                <h1>Statistiques</h1>
                <div className="stats">
                    {!loading &&
                        <ul className="statsList">
                            <li><h3>Utilisateurs: </h3>
                                <ul>
                                    <li><b>Total: </b> {stats.users.total}</li>
                                    <li><b>Élèves: </b> {stats.users.students}</li>
                                    <li><b>Profs: </b> {stats.users.profs}</li>
                                    <li><b>Admins: </b> {stats.users.admins}</li>
                                </ul>
                            </li>
                            <li><h3>Livres: </h3>
                                <ul>
                                    <li><b>Total: </b> {stats.books.total}</li>
                                    <li><b>Réservés: </b> {stats.books.reserved}</li>
                                    <li><b>En cours d'emprunt: </b> {stats.books.out}</li>
                                    <li><b>Disponibles: </b> {stats.books.available}</li>
                                    <li><b>Total emprunts: </b> {stats.loans.total}</li>
                                    <li><b>Emprunts terminés: </b> {stats.loans.ended}</li>
                                </ul>
                            </li>
                            <li><h3>Commandes: </h3>
                                <ul>
                                    <li><b>Total: </b> {stats.orders.total}</li>
                                    <li><b>Réservées: </b> {stats.orders.reserved}</li>
                                    <li><b>En cours: </b> {stats.orders.out}</li>
                                    <li><b>Terminées: </b> {stats.orders.ended}</li>
                                    <li><b>Annulées: </b> {stats.orders.cancelled}</li>
                                </ul>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    );
};

export default GestionHome;