import React from 'react';
import cl from './Select2.module.css'

const Select2 = ({menuShow, setMenuShow, selected}) => {

    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={()=> setMenuShow(!menuShow)}
        >
            <span style={{color: `${selected.color}`}}>
                {selected.name && selected.name.length > 25 ? selected.name.substr(0, 25) + '...' : selected.name}
            </span>
            {/* <div className={`${cl.caret} ${menuShow && cl.caretRotate}`}></div> */}
        </div>
    );
};

export default Select2;