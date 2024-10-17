import React from 'react';
import cl from './Select2.module.css'

const Select2 = ({menuShow, setMenuShow, selected}) => {

    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={()=> setMenuShow(!menuShow)}
        >
            <span>
                {selected}
            </span>
            {/* <div className={`${cl.caret} ${menuShow && cl.caretRotate}`}></div> */}
        </div>
    );
};

export default Select2;