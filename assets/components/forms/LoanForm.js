import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useFetchApi } from "../../hooks/database/useFetch";
import useTimeout from "../../hooks/utility/useTimeout";
import { useEffect } from "react/cjs/react.development";

const LoanForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();
    const [bookData, bookFetchError, bookFetchApi] = useFetchApi('http://localhost:8000/api/book/');
    const [userData, userFetchError, userFetchApi] = useFetchApi('http://localhost:8000/api/user/');
    const [bookKeyword, setBookKeyword] = useState('');
    const [userKeyword, setUserKeyword] = useState('');
    const [createTimer, clearTimer] = useTimeout();

    useEffect(() => {

    }, [bookFetchError, userFetchError])

    useEffect(() => {
        clearTimer();
        if (bookKeyword.length > 1) {
            createTimer(() => {
                console.log('fetch books');
                bookFetchApi({
                    "b.title": bookKeyword,
                    "a.firstname": bookKeyword,
                    "a.name": bookKeyword,
                    "b.code": bookKeyword,
                    "p.name": bookKeyword,
                    "c.name": bookKeyword
                })
            }, 500);
        }
        return () => { clearTimer() }
    }, [bookKeyword])

    useEffect(() => {
        clearTimer();
        if (userKeyword.length > 1) {
            createTimer(() => {
                console.log('fetch users');
                userFetchApi({
                    name: userKeyword,
                    firstname: userKeyword,
                    code: userKeyword,
                    email: userKeyword
                })
            }, 500);
        }

        return () => { clearTimer() }
    }, [userKeyword])

    return (
        <div className="entityForm">
            <h3>Nouvelle réservation</h3>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span>
                        <label htmlFor="user">Utilisateur</label>
                        <input onChange={e => setUserKeyword(e.target.value)} type="text" id='user' />

                    </span>
                    <select required defaultValue={""} name="user" {...register('user')}>
                        <option value="" disabled>Selectionnez un utilisateur</option>
                        {userData.length > 0 &&
                            userData.map(user => (
                                <option key={user.id}>{user.code + ' / ' + user.firstname + " " + user.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <span>
                        <label htmlFor='bookInput'>Livre</label>
                        <input onChange={e => setBookKeyword(e.target.value)} id="bookInput" type="text" />
                        <select required defaultValue={""} name="book" {...register('book')}>
                            <option value="" disabled>Selectionnez un livre</option>
                            {bookData.length > 0 &&
                                bookData.map(book => (
                                    <option key={book.id} value={book.id}>{book.code + ' / ' + book.title + " / " + book.author.firstname + " " + book.author.name}</option>
                                ))
                            }
                        </select>
                    </span>
                </div>

                <button type="submit" >Ajouter</button>
            </form>
        </div>
    );
};

export default LoanForm;