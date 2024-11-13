import React, {useState, useRef, useEffect} from 'react';
import cl from './Select2.module.css'
import { 
    CFormInput,
  } from '@coreui/react'

const Select2 = ({menuShow, setMenuShow, selected, el}) => {
    const [element, setElement] = useState()
    
    useEffect(()=> {
        setElement(selected?.[el] !== undefined && selected?.[el] !== '' ? JSON.parse(selected?.[el]) : '')
        //console.log("element: ", selected?.vidWork !== undefined && selected?.vidWork !== '' ? JSON.parse(selected?.vidWork) : '')
    }, [selected])

    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={()=> setMenuShow(!menuShow)}
        >
            <span style={{color: `${element?.color}`}}>
                {element?.name && element?.name.length > 25 ? element?.name.substr(0, 25) + '...' : element?.name}
            </span>

        </div>
    );
};

export default Select2;