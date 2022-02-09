import React from "react";
import { useState } from "react";

const UserRow = (props) => {
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
                    <li><b>Code</b> {data.code}</li>
                    <li><b>Nom</b> {data.firstname + ' ' + data.name}</li>
                    <li><b>Email</b> {data.mail}</li>
                    <li><b>Role</b> {data.role[0]}</li>
                </ul>
            </div>

            <div className={"data-sup"  + (focus? " active" : "")}>
                <div>
                    <ul>
                        <li><b>Téléphone</b> {data.phone}</li>
                        <li><b>Compte créé le</b> {data.registered_at}</li>
                        <li><b>Adresse</b> {data.adress} <br />{data.post_code} {data.city}</li>
                    </ul>
                    <ul className="links">
                        <li><a href="#">Modifer</a></li>
                        <li><a href="#">Réservation</a></li>
                    </ul>
                </div>
            </div>

        </li>
    );
}

export default UserRow;