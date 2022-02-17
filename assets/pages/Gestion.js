import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import GestionHome from "./GestionHome";
import { useContext } from "react";
// import { AppContext } from "../../App";
import GestionTable from "../components/GestionTable";
import BookRow from "../components/rows/BookRow";
import UserRow from "../components/rows/UserRow";
import LoanRow from "../components/rows/LoanRow";
import New from "../components/New";
import UserForm from "../components/forms/UserForm";
import BookForm from "../components/forms/BookForm";
import AuthorForm from "../components/forms/AuthorForm";
import CollecForm from "../components/forms/CollecForm";
import PublisherForm from "../components/forms/PublisherForm";
import ThemeForm from "../components/forms/ThemeForm";
import LoanForm from "../components/forms/LoanForm";
import OrderRow from "../components/rows/OrderRow";

export const GestionContext = createContext();

const Gestion = () => {
    const [error, setError] = useState('');

    const [context, setContext] = useState({
        setError: setError
    });

    useEffect(()=> {
        setContext(c => ({
            ...c,
            error: error
        }))
    }, [error])

    return (
        <BrowserRouter>
            <GestionContext.Provider value ={context}>
                <Routes>
                    <Route path="/gestion/home" element={<GestionHome />} />
                    <Route path="/gestion/livres" element={<GestionTable key="books" row={BookRow} entity={'book'}/>} />
                    <Route path="/gestion/users" element={<GestionTable key="users" row={UserRow} entity={'user'}/>} />
                    <Route path="/gestion/emprunts" element={<GestionTable key="loans" row={LoanRow} entity={'loan'}/>} />
                    <Route path="/gestion/commandes" element={<GestionTable key="orders" row={OrderRow} entity={'order'}/>} />
                    <Route path="/gestion/livre/new" element={<New key="newBook" entity={'book'} pathName={'livre'} form={BookForm}/>} />
                    <Route path="/gestion/user/new" element={<New key="newUser" entity={'user'} pathName={'user'} form={UserForm} />} />
                    <Route path="/gestion/auteur/new" element={<New key="newAuthor" entity={'author'} pathName={'livre'} form={AuthorForm} />} />
                    <Route path="/gestion/collection/new" element={<New key="newCollec" entity={'collection'} pathName={'livre'} form={CollecForm} />} />
                    <Route path="/gestion/editeur/new" element={<New key="newPublisher" entity={'publisher'} pathName={'livre'} form={PublisherForm} />} />
                    <Route path="/gestion/theme/new" element={<New key="newTheme" entity={'theme'} pathName={'livre'} form={ThemeForm} />} />
                    <Route path="/gestion/emprunt/new" element={<New key="newLoan" entity={'loan'} pathName={'emprunt'} form={LoanForm} />} />
                </Routes>
            </GestionContext.Provider>
        </BrowserRouter>
    )
};

export default Gestion;