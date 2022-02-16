import React, { useContext, useEffect, useState } from 'react';
import BookBox from '../components/BookBox';
import FindBar from '../components/interface/FindBar';
import { useFetchCriteria } from '../hooks/database/useFetch';
import ReactLoading from "react-loading";
import { BrowseContext } from './Browse';
import { NavLink } from 'react-router-dom';

function compareDate(a, b) {
    if (a['added_at'] < b['added_at']) {
        return -1;
    }
    if (a['added_at'] > b['added_at']) {
        return 1;
    }
    return 0;
}

const BrowseBooks = ({ themes }) => {
    // const [newBooks, setNewBooks] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, data, fetchError, setRequestData] = useFetchCriteria('http://localhost:8000/api/book/');
    const context = useContext(BrowseContext);
    const {clearCart, cart} = context;

    // useEffect(() => {
    //     console.log(data);
    //     let newB = data.sort(compareDate);
    //     newB.length = 4;
    //     setNewBooks(newB);
    // }, [data])

    useEffect(() => {
        let reqData = {}
        if (keyword) {
            reqData = {
                'b.title': keyword,
                'a.name': keyword,
                'a.firstname': keyword,
                'p.name': keyword,
                'c.name': keyword
            }
        }

        setRequestData(reqData);
    }, [keyword])

    return (
        <div className='browseBooks'>
            <div className="interface">
                <FindBar setKeyword={setKeyword} />
                <div className='flex-row'>
                    <label>Thèmes</label>
                    <select name="themes" id="themes">
                        <option value="0">Tous</option>
                        {themes.map(theme => (
                            <option key={theme.id}>{theme.name}</option>
                        ))}
                    </select>
                </div>
                <div className='navButton'>
                    <NavLink to='/parcourir/panier'>{cart.length > 0 ? 'Afficher votre panier' : "Panier vide"} {cart.length > 0 && <div className='tag'>{cart.length}</div>} </NavLink>
                </div>
            </div>
            {loading &&
                <div className="loading">
                    <ReactLoading type="bars" color='#516079' />
                </div>
            }
            {!loading &&
                <div id="browseMain" className='content'>
                    <h2>Parcourir les livres</h2>
                    <ul id="booksDiv" >
                        {!loading &&
                            data.map(book => (
                                <BookBox key={book.id} book={book} />
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    )
}
export default BrowseBooks;