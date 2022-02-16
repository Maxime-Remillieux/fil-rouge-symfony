import React from 'react';
import { FaUndoAlt } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';

const FindBar = ({setKeyword}) => {
    const resetSearch = () => {
        document.getElementById('findInput').value = "";
        setKeyword('');
    }
    return (
            <div className="findBar"><label htmlFor="findInput"><BiSearchAlt size="28px" /></label><input onChange={e => setKeyword(e.target.value)} type="text" id="findInput" /><div className='resetButton' onClick={resetSearch}><FaUndoAlt size="24px" /></div></div>
    );
};

export default FindBar;