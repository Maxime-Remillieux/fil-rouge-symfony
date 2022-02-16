import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookDetails from './BookDetails';
import BrowseBooks from './BrowseBooks';
import Cart from './Cart';

const useCart = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        let initialState = [];
        if (savedCart) {
            initialState = savedCart
        }
        return initialState;
    })

    useEffect(() => {
        // localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    const addToCart = (book) => {
        setCart(c => [
            ...c,
            book
        ])
    }

    const removeFromCart = (book) => {
        setCart(c=>{
            const update = [...c];
            for (let i = 0; i < update.length; i++) {
                if(update[i].id === book.id){
                    update.splice(i, 1);
                    return update;
                }
            }
            return update;
        });
    }

    const clearCart = ()=>{
        setCart([]);
        localStorage.removeItem('cart');
    }

    const isInCart = (book)=>{
        for (let i = 0; i < cart.length; i++) {
            if(cart[i].id === book.id){
                return true;
            }
        }
        return false;
    }

    return [cart, addToCart, removeFromCart, clearCart, isInCart]
}

export const BrowseContext = createContext();

const Browse = ({ themes, connectedUser }) => {
    const [cart, addToCart, removeFromCart, clearCart, isInCart] = useCart();

    const [context, setContext] = useState({
        connectedUser: connectedUser,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        clearCart: clearCart,
        isInCart: isInCart,
        cart: cart,
    });

    useEffect(()=>{
        setContext(c=>({
            ...c,
            isInCart: isInCart,
            cart: cart,
        }))
    }, [cart])

    return (
        <BrowserRouter>
            <BrowseContext.Provider value={context}>
            <Routes>
                <Route path="/parcourir" exact element={<BrowseBooks themes={themes} />} />
                <Route path="/parcourir/:id" exact element={<BookDetails />} />
                <Route path="/parcourir/panier" exact element={<Cart />} />
            </Routes>
            </BrowseContext.Provider>
        </BrowserRouter>
    );
};

export default Browse;