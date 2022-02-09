import React from "react";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { useFetchApi } from "../../hooks/database/useFetch";
import { useNavigate } from "react-router-dom";
import useTimeout from "../../hooks/utility/useTimeout";
import { GestionContext } from "../../pages/Gestion";

const BookForm = ({onSubmit}) => {
    const { register, handleSubmit } = useForm();
    const [authorName, setAuthorName] = useState("");
    const [authorFirstName, setAuthorFirstName] = useState("");
    // const [authors, setAuthors] = useState([]);
    const context = useContext(GestionContext);
    const [createTimer, clearTimer] = useTimeout();
    const [data, fetchError, fetchApi] = useFetchApi('http://localhost:8000/api/author/');
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(fetchError === 'Expired JWT Token'){
    //         context.setError('expiredToken');
    //         context.logout();
    //         navigate('/login');
    //     }
    // }, [fetchError, navigate]);

    useEffect(()=>{
        clearTimer();
        if((authorName.length > 1 || authorFirstName.length > 1)){
            createTimer(()=>{
                const reqData={
                    name: authorName,
                    firstname: authorFirstName
                }
                fetchApi(reqData)
            }, 500);
        }
        return ()=> clearTimer();

    }, [authorName, authorFirstName, context])

    return (
        <div className="entityForm">
            <h3>Ajouter un nouveau livre</h3>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span>
                        <label htmlFor="title">Titre</label>
                        <input {...register('title')} type="text" id='title'/>
                    </span>
                    <span>
                        <label htmlFor='release_at'>Parution</label>
                        <input {...register('release_at')} id="release_at" type="date"/>
                    </span>
                </div>
                <div>
                    <span>
                        <label htmlFor="author-name">Nom auteur</label>
                        <input {...register('author.name')} onChange={e=>setAuthorName(e.target.value)} list="authorList" autoComplete='off' type="text" id="author-name"/>
                        <datalist id="authorList">
                            { data.map(author=>(
                                <option key={author.id} value={author.firstname + ' ' + author.name}/>
                            ))
                            }
                        </datalist>
                    </span>
                    <span>
                        <label htmlFor='author-firstname'>Prénom auteur</label>
                        <input {...register('author.firstname')} onChange={e=>setAuthorFirstName(e.target.value)} autoComplete='off' type="text" id="author-firstname"/>
                        <input type="hidden" {...register('author.id')} value="0"/>
                    </span>
                </div>
                <div>
                    <span>
                        <label htmlFor="publisher-name">Éditeur</label>
                        <input {...register('publisher.name')} type="text" id="publisher-name"/>
                        <input {...register('publisher.id')} type="hidden" value="0"/>
                    </span>
                    <span>
                        <label htmlFor="collection-name">Collection</label>
                        <input {...register('collection.name')} type="text" id="collection-name"/>
                        <input {...register('collection.id')} type="hidden" value="0" id="collection-id"/>
                    </span>
                </div>
                <div>
                    <span>
                        <label htmlFor="theme">Thèmes</label>
                        <input {...register('themes.theme0.name')} type="text"id='theme'/>
                        <input {...register('themes.theme0.id')}type="hidden" value="0" id="theme-id" className="input-field"/>
                    </span>
                    <span>
                        <label>Image</label>
                        <input id="img" name="img" type="file"/>
                    </span>
                </div>
                <span>
                    <label htmlFor="resume">Résumé</label>
                    <textarea {...register('resume')} id="resume" rows="5" cols="30"/>
                </span>
                <button type="submit" >Ajouter</button>
            </form>
        </div>

    );
};

export default BookForm;