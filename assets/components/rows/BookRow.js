import React from "react";
import { useState } from "react";

const BookRow = (props) => {
    const { data } = props;
    const [focus, setFocus] = useState(false);

    const toggleFocus = () => {
        let rows = document.querySelectorAll('.row');
        rows.forEach(row => {
            if (row.dataset.focus === "true") {
                row.click();
            }
        });
        setFocus(!focus);
    }

    return (
        <li className={"row"} data-focus={ focus } onClick={toggleFocus}>
            <div className="data-main">
                <ul>
                    <li><b>Code</b> {data.code}</li>
                    <li><b>Titre</b> {data.title}</li>
                    <li><b>Auteur</b> {data.author.firstname + ' ' + data.author.name}</li>
                    <li><b>Éditeur</b> {data.publisher.name}</li>
                </ul>
            </div>

            <div className={"data-sup" + (focus ? ' active' : '')}>
                {/* <div> */}
                    <img src={"http://localhost:8000/upload/books/" + data.img} alt="img" />
                {/* </div> */}
                <div className="data-sup-text">
                    <ul>
                        <li><b>Collection</b> {data.collection.name}</li>
                        <li><b>Paru le</b> {data.release_at}</li>
                        <li><b>Ajouté le</b> {data.added_at}</li>
                        <li><b>Thèmes</b>{
                            data.themes.map(theme=>theme.name).join(', ')
                        }</li>
                    </ul>
                    <ul className="links">
                        <li className='navButton'><a href={"/gestion/book/edit/" + data.id}>Modifer</a></li>
                        {/* <li><a href="#">Retirer</a></li> */}
                        <li className='navButton'><a href="#">Réservation</a></li>
                    </ul>
                </div>
            </div>
        </li>
    );
}

export default BookRow;