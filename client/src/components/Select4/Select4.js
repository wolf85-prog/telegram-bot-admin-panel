import React from 'react';
import cl from './Select4.module.css'
import { 
    CFormInput,
  } from '@coreui/react'

const Select4 = ({menuShow, setMenuShow, selected, setSelected}) => {

    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={()=> setMenuShow(!menuShow)}
        >
            <CFormInput 
                type="text" 
                placeholder=""
                value={selected && selected.length > 25 ? selected.substr(0, 25) + '...' : selected}
                onChange={(e)=>setSelected(e.target.value)}
                style={{height: '30px', fontSize: '16px', background: 'transparent', border: 'none', boxShadow: 'none', textAlign: 'center'}}
            />
        </div>
    );
};

export default Select4;