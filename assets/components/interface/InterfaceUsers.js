import React from 'react';

const InterfaceUsers = () => {
    return (
        <div className="interface">
            <div id="form">
                <div className="fieldset">
                    <div className="addDiv">
                        <h4>Ajouter un nouvel utilisateur</h4>
                        <div className="formInputs">
                            <div><label htmlFor="nomUser">Nom</label><input name="nom" className="values" type="text" id="nomUser"/></div>
                            <div><label htmlFor="prenomUser">Prénom</label><input name="prenom" className="values" type="text" id="prenomUser"/></div>
                            <div><label htmlFor="adressUser">Adresse</label><input name="adresse" className="values" type="text" id="adressUser"/></div>
                            <div><label htmlFor="postCode">Code postal</label><input name="code_postal" className="values" type="text" id="postCode"/></div>
                            <div><label htmlFor="city">Ville</label><select name="ville" id="city" className="values"></select></div>
                            <div><label htmlFor="telUser">Téléphone</label><input name="tel" className="values" type="text" id="telUser"/></div>
                            <div><label htmlFor="mailUser">Email</label><input name="mail" className="values" type="text" id="mailUser"/></div>
                            <div>
                                <label htmlFor="catUser">Catégorie</label>
                                <select name="cat" id="catUser" className="values" >
                                    <option value="Étudiant">Étudiant</option>
                                    <option value="Professeur">Professeur</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <span id = "buttonSpan"><button id = "addButton">Ajouter</button></span>
                </div>
            </div>
            <div className="findDiv">
                <div className ='fieldset'>
                    <fieldset>
                        <label htmlFor="findInput">Rechercher</label><input type="text" id="findInput"/><br/>
                        <b>Catégories</b><br/>
                        <div id="checkbox">
                            <label><input type="checkbox" id = "selectAll" defaultChecked/>Tout</label>
                            <label><input type="checkbox" name = "categ" value="code_user" defaultChecked/>Identifiant</label>
                            <label><input type="checkbox" name = "categ" value="nom" defaultChecked/>Nom</label>
                            <label><input type="checkbox" name = "categ" value="prenom" defaultChecked/>Prénom</label>
                            <label><input type="checkbox" name = "categ" value="adresse" defaultChecked/>Adresse</label>
                            <label><input type="checkbox" name = "categ" value="tel" defaultChecked/>Téléphone</label>
                            <label><input type="checkbox" name = "categ" value="mail" defaultChecked/>Email</label>
                        </div>
                        <div>
                            <button id="findButton">Chercher</button>
                            <button id="resetButton">Réinitialiser</button><br/>
                        </div>
                    </fieldset>
                    
                    <label htmlFor="tri">Trier par</label>
                    <select name="tri" id="tri" defaultValue={0}>
                        <option value="0">Identifiant</option>
                        <option value="1">Nom</option>
                        <option value="2">Prénom</option>
                        <option value="5">Email</option>
                    </select>

                    <label htmlFor="affichDispo">Afficher</label>
                    <select name="affichDispo" id="affichDispo" defaultValue={0}>
                        <option value="0">Tous</option>
                        <option value="1">Emprunt en cours</option>
                        <option value="2">Pas d'emprunt</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default InterfaceUsers;
