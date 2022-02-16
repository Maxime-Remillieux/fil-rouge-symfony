import React, { useContext, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useFetchGet } from '../hooks/database/useFetch';
import ReactLoading from "react-loading";
import { FaCartArrowDown } from 'react-icons/fa';
import { BrowseContext } from './Browse';
import { BsCartPlusFill, BsFillCartXFill } from 'react-icons/bs';



const BookDetails = () => {
    const { id } = useParams();
    const [book, loading, fetchError] = useFetchGet('http://localhost:8000/api/book/show/' + id);
    const context = useContext(BrowseContext);
    const { addToCart, removeFromCart, isInCart } = context;

    const handleCartButtonClick = () => {
        if (isInCart(book)) {
            removeFromCart(book);
        } else {
            addToCart(book);
        }
    }

    return (
        <div className='bookDetails'>
            {loading &&
                <div className="loading">
                    <ReactLoading type="bars" color='#516079' />
                </div>
            }
            {!loading &&
                <>
                    <div className="navButton">
                        <NavLink exact="true" to="/parcourir">Retour à la liste</NavLink>
                        {/* <a href="http://localhost:8000/parcourir">Retour à la liste</a> */}
                    </div>
                    <img src={"http://localhost:8000/upload/books/" + book.img} alt="image" />
                    <div className='flex-col'>
                        <div className="details">
                            <div className='detailRow'>
                                <b>Titre: </b><span>{book.title}</span>
                            </div>
                            <div className='detailRow'>
                                <b>Auteur: </b><span>{book.author.firstname + ' ' + book.author.name}</span>
                            </div>
                            <div className='detailRow'>
                                <b>Éditeur: </b><span>{book.publisher.name}</span>
                            </div>
                            <div className='detailRow'>
                                <b>Collection: </b><span>{book.collection.name}</span>
                            </div>
                            <div className='detailRow'>
                                <b>Thèmes: </b><span>{book.themes.map(theme => theme.name).join(', ')}</span>
                            </div>
                            <div className='detailRow'>
                                <b>Résumé: </b><span>{book.resume}</span>
                            </div>
                        </div>
                        <div className="buttons">
                            <div className='navButton' onClick={handleCartButtonClick}>
                                <div className="link" >{isInCart(book) ? 'Retirer du panier' : 'Ajouter au panier'} {isInCart(book) ? <BsFillCartXFill size='18px' /> : <BsCartPlusFill size='18px' />}</div>
                            </div>
                        </div>
                    </div>

                </>
            }

        </div>
    );
};

export default BookDetails;