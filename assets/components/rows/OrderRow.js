import React from 'react';

const OrderRow = (props) => {
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
        <li className={"row"} data-focus={ focus } onClick={ toggleFocus }>
            <div className="data-main">
                <ul>
                    <li><b>Nom usagé</b> {data.user.firstname + ' ' + data.user.name}</li>
                    <li><b>Date de création</b> {data.created_at}</li>
                    <li><b>Statut</b> {data.status}</li>
                </ul>
            </div>

            <div className={"data-sup"  + (focus ? " active" : "")}>
                <div>
                    <ul>
                        { data.loans.map(loan=>(
                            <li>
                                <ul>
                                    <li>ID: {loan.id}</li>
                                    <li>Code: {loan.book.code}</li>
                                    <li>Titre: {loan.book.title}</li>
                                </ul>
                            </li>
                        ))
                        }
                    </ul>
                    <ul className="links">
                        <li><a href="#">Modifer</a></li>
                        <li><a href="#">Réservation</a></li>
                    </ul>
                </div>
            </div>

        </li>
    );
};

export default OrderRow;