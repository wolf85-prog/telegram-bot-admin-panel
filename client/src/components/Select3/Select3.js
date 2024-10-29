import React from 'react';
import cl from './Select3.module.css'

const Select3 = ({menuShow, setMenuShow, selected}) => {

    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={()=> setMenuShow(!menuShow)}
            style={{borderColor: `${selected.color}`}}
        >
            <span style={{color: `${selected.color}`}}>
                {selected.name}
            </span>
            {/* <div className={`${cl.caret} ${menuShow && cl.caretRotate}`}></div> */}
        </div>
    );
};

export default Select3;