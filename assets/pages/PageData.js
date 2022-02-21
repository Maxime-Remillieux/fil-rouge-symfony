import React from "react";
import FindDiv from "../components/interface/FindDiv";
import LinksDiv from "../components/interface/LinksDiv";

export const getSearchField = (entity) => {
    const booksSearchFields = {
        "b.code": "Code",
        "b.title": "Titre",
        "a.name": "Auteur",
        "p.name": "Éditeur",
        "c.name": "Collection",
        "b.release_at": "Date",
        "t.name": "Thème"
    };
    const userSearchFields = {
        "code": "Code",
        "name": "Nom",
        "firstname": "Prénom",
        "email": "Email",
    };
    const loanSearchFields = {
        "b.code": "ID livre",
        "b.title": "Titre",
        "user.code": "ID usagé",
        "user.name": "Nom usagé",
        "status": "Statut",
    };
    const orderSearchFields = {
        "o.id": "ID commande",
        "b.title": "Titre",
        "u.code": "ID usagé",
        "u.name": "Nom usagé",
        "o.status": "Statut",
    };

    switch (entity) {
        case 'book':
            return booksSearchFields;
        case 'user':
            return userSearchFields;
        case 'loan':
            return loanSearchFields;
        case 'order':
            return orderSearchFields;
        default:
            return null;
    }
}

export const getLinks = (entity) => {
    const bookLinks = [
        { text: 'Nouveau livre', path: '/gestion/livre/new' },
        { text: 'Nouvel auteur', path: '/gestion/auteur/new' },
        { text: 'Nouvel éditeur', path: '/gestion/editeur/new' },
        { text: 'Nouvelle collection', path: '/gestion/collection/new' },
        { text: 'Nouveau thème', path: '/gestion/theme/new' },
    ];
    const loanLinks = [
        { text: 'Nouvel emprunt', path: '/gestion/emprunt/new' },
        { text: 'Nouveau livre', path: '/gestion/livre/new' },
        { text: 'Nouvel utilisateur', path: '/gestion/user/new' },
    ];
    const orderLinks = [
        { text: 'Nouvelle commande', path: '/gestion/commande/new' },
        { text: 'Nouveau livre', path: '/gestion/livre/new' },
        { text: 'Nouvel utilisateur', path: '/gestion/user/new' },
    ];
    const userLinks = [
        { text: 'Nouvel utilisateur', path: '/gestion/user/new' },
        { text: 'Nouveau livre', path: '/gestion/livre/new' },
        { text: 'Nouvel emprunt', path: '/gestion/emprunt/new' }
    ];

    const defaultLinks =[
        { text: 'Nouveau livre', path: '/gestion/livre/new' },
        { text: 'Nouvel auteur', path: '/gestion/auteur/new' },
        { text: 'Nouvel éditeur', path: '/gestion/editeur/new' },
        { text: 'Nouvelle collection', path: '/gestion/collection/new' },
        { text: 'Nouveau thème', path: '/gestion/theme/new' },
        { text: 'Nouvelle commande', path: '/gestion/commande/new' },
        { text: 'Nouveau livre', path: '/gestion/livre/new' },
        { text: 'Nouvel utilisateur', path: '/gestion/user/new' },
    ] 

    switch (entity) {
        case 'book':
        case 'author':
        case 'publisher':
        case 'collection':
        case 'theme':
            return bookLinks;
        case 'user':
            return userLinks;
        case 'loan':
            return loanLinks;
        case 'order':
            return orderLinks;
        default:
            return defaultLinks;
    }
}

export const GestionInterface = ({ entity }) => {
    return (
        <div className="interface">
            <FindDiv searchFields={getSearchField(entity)} />
            <LinksDiv links={getLinks(entity)} />
        </div>
    )
}
export const NewInterface = ({ entity }) => {
    return (
        <div className="interface">
            <LinksDiv links={getLinks(entity)} />
        </div>
    )
}