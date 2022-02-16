import React, { useContext, useEffect, useState } from 'react';
import { BsInfoSquareFill, BsCartPlusFill, BsFillCartXFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { BrowseContext } from '../pages/Browse';


const BookBox = ({ book }) => {
    const [moreInfos, setMoreInfos] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const context = useContext(BrowseContext);
    const { addToCart } = context;
    const { removeFromCart } = context;
    const { isInCart } = context;
    const handleTransitionEnd = () => {
        setShowMore(moreInfos);
    }

    const handleClick = () => {
        if (moreInfos) {
            setMoreInfos(false);
        } else {
            setShowMore(true);
            setMoreInfos(true);
        }
    }

    const handleCartButtonClick = ()=>{
        if(isInCart(book)){
            removeFromCart(book);
        }else{
            addToCart(book);
        }
    }

    return (
        <li className='bookBox'>
            <img className={moreInfos ? 'inactive' : ''} src={"http://localhost:8000/upload/books/" + book.img} alt="img" />
            <div className='bookData'>
                {/* {moreInfos ? book.resume : book.resume.substring(0, 110)} {(book.resume.length > 110 && !moreInfos) ? '...' : ''} */}
                <div>
                    <ul>
                        <li><b>Titre</b> {book.title}</li>
                        <li><b>Auteur</b> {book.author.firstname + ' ' + book.author.name}</li>
                        <li><b>Éditeur</b> {book.publisher.name}</li>
                        <li><b>Thèmes</b> {book.themes.map(theme => theme.name).join(', ')}</li>
                        <li><b>Resume</b><p onTransitionEnd={handleTransitionEnd} className={moreInfos ? 'active' : ''}> {showMore ? book.resume : book.resume.substring(0, 110)} {(book.resume.length > 110 && !showMore) ? '...' : ''}</p></li>
                    </ul>
                    {book.resume.length > 100 &&
                        <div className='moreInfos' onClick={handleClick}>{moreInfos ? "Voir moins" : "Voir plus"}</div>
                    }
                </div>

                <div className="flex-row">
                    <div className='navButton' onClick={handleCartButtonClick}>
                    <div className="link" >{isInCart(book) ? 'Retirer du panier' : 'Ajouter au panier' } {isInCart(book) ? <BsFillCartXFill size='18px' /> : <BsCartPlusFill size='18px' />}</div>

                    </div>
                    <div className='navButton'>
                        <NavLink exact="true" to={"/parcourir/" + book.id}>Détails<BsInfoSquareFill size='18px' /></NavLink>
                    </div>
                </div>
            </div>

        </li>
    );
};

export default BookBox;