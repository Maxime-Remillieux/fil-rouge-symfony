import axios from 'axios';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CartRow from '../components/rows/CartRow';
import { BrowseContext } from './Browse';

const Cart = () => {
    const context = useContext(BrowseContext);
    const { cart, clearCart, connectedUser } = context;

    const sendReservation = async () => {
        let data = {};
        data.books = cart;
        data.user = connectedUser;
        const response = await axios.post("http://localhost:8000/api/order/new", data);
        alert(response.data.message);

        if(response.data.status === "OK"){
            clearCart();
        }else{
            console.log(response.data.debugMessage);
        }
    }

    return (
        <div className='cart'>
            <h1>Votre panier</h1>
            {cart.length <= 0 &&
                <div>
                    <h3>Votre panier est vide</h3>
                    <div className="navButton">
                        <NavLink to="/parcourir">Parcourir les livres</NavLink>
                    </div>
                </div>
            }
            {cart.map(item => (
                <CartRow key={item.id} book={item} />
            ))}
            {cart.length > 0 &&
                <div className="flex-row">
                    <div className="navButton" onClick={clearCart}>
                        <div className="link">Vider le panier</div>
                    </div>
                    <div className="navButton" onClick={sendReservation}>
                        <div className="link">Envoyer la réservation</div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Cart;