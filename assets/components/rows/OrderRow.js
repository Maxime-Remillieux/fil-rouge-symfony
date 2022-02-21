import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { MdEditNote } from 'react-icons/md';
import { NavContext } from '../GestionTable';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';


const OrderRow = (props) => {
    const { data } = props;
    const [focus, setFocus] = useState(false);
    const context = useContext(NavContext);
    const { setIsUpdating } = context;

    const toggleFocus = () => {
        let rows = document.querySelectorAll('.row');
        rows.forEach(row => {
            if (row.dataset.focus === "true") {
                row.click();
            }
        });
        setFocus(!focus);
    }

    const handleOrderProcess = async () => {
        const response = await axios.get('http://localhost:8000/api/order/out/' + data.id);
        alert(response.data.message);
        setIsUpdating(true);
    }
    const handleOrderReturn = async () => {
        const response = await axios.get('http://localhost:8000/api/order/return/' + data.id);
        alert(response.data.message);
        setIsUpdating(true);
    }

    return (
        <li className={"row"} data-focus={ focus } onClick={ toggleFocus }>
            <div className="data-main">
                <ul>
                    <li><b>#</b> {data.id}</li>
                    <li><b>Nom usagé</b> {data.user.firstname + ' ' + data.user.name}</li>
                    <li><b>Date de création</b> {data.created_at}</li>
                    <li><b>Statut</b> {data.status}</li>
                </ul>
            </div>

            <div className={"data-sup"  + (focus ? " active" : "")}>
                <div>
                    <div>
                        <ul>
                            <li><b>ID emprunt</b></li>
                            <li><b>Code</b></li>
                            <li><b>Titre</b></li>
                            <li><b>Auteur</b></li>
                            <li></li>
                        </ul>
                        { data.loans.map(loan=>(
                            <div key={loan.id}>
                                <ul className='flex-row'>
                                    <li>{loan.id}</li>
                                    <li>{loan.book.code}</li>
                                    <li>{loan.book.title}</li>
                                    <li>{loan.book.author.firstname + ' ' + loan.book.author.name}</li>
                                    <li className='tooltip'><div className="navButton"><a href={"http://localhost:8000/parcourir/" + loan.book.id}><GiMagnifyingGlass/></a></div><div className='tooltiptext'>Aller à la page du livre</div></li>
                                </ul>
                            </div>
                        ))
                        }
                    </div>
                    <ul className="links">
                        <li className='navButton'><a href="#">Modifer<MdEditNote size="20px"/></a></li>
                        { data.status === 'reserved' &&
                            <li className='navButton'><a href="#">Annuler<ImCross /></a></li>
                        }
                        { data.status === 'reserved' &&
                            <li className='navButton' onClick={handleOrderProcess}><div className='link'>Commande traitée</div></li>
                        }
                        { data.status === 'out' &&
                            <li className='navButton' onClick={handleOrderReturn}><div className='link'>Retour commande</div></li>
                        }
                    </ul>
                </div>
            </div>

        </li>
    );
};

export default OrderRow;