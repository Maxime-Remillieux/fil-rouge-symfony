import React, { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useContext } from 'react/cjs/react.development';
import Dropdown from '../Dropdown';
import { NavContext } from '../GestionTable';
import FindBar from './FindBar';
import { getSearchField } from '../../pages/PageData';


const FindDiv = ({ entity }) => {
    const navContext = useContext(NavContext);
    const { setKeyword } = navContext;
    const { setIsUpdating } = navContext;

    const searchFields = getSearchField(entity);

    return (
        <div id="findDiv">
            <FindBar setKeyword={setKeyword} />
            <Dropdown title="Filtres">
                <div className="filters">
                    <div className="flex-col">
                        <b>Catégories</b><br />
                        <div id="checkbox">
                            <label><input type="checkbox" id="selectAll" defaultChecked />Tout</label>
                            {
                                Object.keys(searchFields).map((field) => (
                                    <label key={field}><input type="checkbox" onClick={() => setIsUpdating(true)} className="categ" value={field} defaultChecked />{searchFields[field]}</label>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='selectFilters'>
                    <div>
                        <label htmlFor="tri">Trier par</label>
                        <select name="tri" id="tri">
                        </select>
                    </div>
                    <div>
                        <label htmlFor="affichDispo">Afficher</label>
                        <select name="affichDispo" id="affichDispo" defaultValue="0">
                            <option value="0">Tout</option>
                            <option value="1">Disponible</option>
                            <option value="2">Emprunté</option>
                            <option value="3">Supprimé</option>
                        </select>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
};

export default FindDiv;