import React, {useState, useRef, useEffect} from 'react';
import cl from './Select2.module.css'
import { 
    CFormInput,
  } from '@coreui/react'

const Select2 = ({menuShow, setMenuShow, selected, index, el, value}) => {
    const [element, setElement] = useState()
    
    useEffect(()=> {
        setElement(selected[el] ? JSON.parse(selected[el]) : '')
        console.log("element: ", selected[el] ? JSON.parse(selected[el]) : '')
    }, [selected])

    useEffect(()=> {
        setElement(value)
    }, [value])

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