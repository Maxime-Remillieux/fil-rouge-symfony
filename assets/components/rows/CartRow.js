import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BrowseContext } from '../../pages/Browse';
import { FaTrashAlt } from 'react-icons/fa';
import { GiMagnifyingGlass } from 'react-icons/gi';

const CartRow = ({book}) => {
    const context = useContext(BrowseContext);
    const {removeFromCart} = context;

    return (
        <div className='cartRow'>
            <img src={"http://localhost:8000/upload/books/" + book.img} alt="" />
            <ul>
                <li><b>Code: </b>{book.code}</li>
                <li><b>Titre: </b>{book.title}</li>
                <li><b>Auteur: </b>{book.author.firstname + ' ' + book.author.name}</li>
            </ul>
            <div className="navButton tooltip" onClick={()=>removeFromCart(book)}>
                <div className="link"><FaTrashAlt size="18px"/></div>
                <div className="tooltiptext">Supprimer du panier</div>
            </div>
            <div className="navButton tooltip">
                <NavLink to={"/parcourir/" + book.id}><GiMagnifyingGlass size="18px"/></NavLink>
                <div className="tooltiptext">Aller à la page du livre</div>
            </div>
        </div>
    );
};

export default CartRow;