import React, { useState } from 'react';
import { FaUndoAlt } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useContext } from 'react/cjs/react.development';
import { NavContext } from '../GestionTable';


const FindDiv = ({searchFields}) => {
    const navContext = useContext(NavContext);
    const {setKeyword} = navContext;
    const {setIsUpdating} = navContext;

    const[focus, setFocus] = useState(false)
    const resetSearch = () => {
        document.getElementById('findInput').value = "";
        setKeyword('');
    }

    const toggleFocus = ()=>{
        setFocus(!focus);
    }

    return (
        <div id="findDiv">
            <div className='fieldset'>
                <div>
                    <div className="flexRow"><label htmlFor="findInput"><BiSearchAlt size="28px" /></label><input onChange={e => setKeyword(e.target.value)} type="text" id="findInput" /><div className='resetButton' onClick={resetSearch}><FaUndoAlt size="20px" /></div></div><br />
                </div>
                <div className={"dropdownLinks" + (focus ? " active" : "")} onClick={toggleFocus}><h4>Filtres</h4>{focus? <IoIosArrowDown size="20px"/>:<IoIosArrowUp size="20px"/>}</div>
                <div className={"filters" + (focus ? " active" : "")}>
                    <div className="flexCol">
                        <b>Catégories</b><br />
                        <div id="checkbox">
                            <label><input type="checkbox" id="selectAll" defaultChecked />Tout</label>
                            {
                                Object.keys(searchFields).map((field) => (
                                    <label key={field}><input type="checkbox" onClick={()=>setIsUpdating(true)} className="categ" value={field} defaultChecked />{searchFields[field]}</label>
                                ))
                            }
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

                </div>

            </div>
        </div>
    );
};

export default FindDiv;