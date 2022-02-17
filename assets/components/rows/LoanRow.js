import React from "react";
import { useState } from "react";

const LoanRow = (props) => {
    const { data } = props;
    const [focus, setFocus] = useState(false);

    const toggleFocus = () => {
        let rows = document.querySelectorAll('.row');
        rows.forEach(row => {
            if(row.dataset.focus === "true"){
                row.click();
            }
        });
        setFocus(!focus);
    }

    return (
        <li className={"row"} data-focus={ focus } onClick={ toggleFocus }>
            <div className="data-main">
                <ul>
                    <li><b>Nom usagé</b> {data.user.firstname + ' ' + data.user.name}</li>
                    <li><b>Titre</b> {data.book.title}</li>
                    <li><b>Statut</b> {data.status}</li>
                    <li><b>ID Commande</b> {data.orderId}</li>
                </ul>
            </div>

            <div className={"data-sup"  + (focus? " active" : "")}>
                <div>
                    <ul>
                        <li><b>ID</b> {data.id}</li>
                        <li><b>Code usagé</b> {data.user.code}</li>
                        <li><b>Code livre</b> {data.book.code}</li>
                    </ul>
                    <ul className="links">
                        <li className='navButton'><a href="#">Modifer</a></li>
                        <li className='navButton'><a href="#">Réservation</a></li>
                    </ul>
                </div>
            </div>

        </li>
    );
}

export default LoanRow;