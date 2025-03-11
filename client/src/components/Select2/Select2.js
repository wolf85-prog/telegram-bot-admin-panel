import React, {useState, useRef, useEffect} from 'react';
import cl from './Select2.module.css'
import Close from "../../assets/images/close.svg"

import { 
    CFormInput,
  } from '@coreui/react'

const Select2 = ({menuShow, setMenuShow, clearShow, setClearShow, selected, el}) => {
    const [element, setElement] = useState()
    const [showClose, setShowClose] = useState(false)
    
    useEffect(()=> {
        setElement(selected?.[el] !== undefined && selected?.[el] !== '' ? JSON.parse(selected?.[el]) : '')
        setShowClose(true)
        //console.log("element: ", selected?.vidWork !== undefined && selected?.vidWork !== '' ? JSON.parse(selected?.vidWork) : '')
    }, [selected])

    const clickSelect = () => {
        setMenuShow(!menuShow)
        setClearShow(!clearShow)
    }

    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={clickSelect}
        >
            <span style={{color: `${element?.name === 'Отмена' || 
                element?.name === 'Фальшстарт' ||
                element?.name === 'Передумал' ? 'red' : element?.color}`}}>
                {element?.name && element?.name.length > 25 ? element?.name.substr(0, 25) + '...' : element?.name}
            </span>
            

        </div>
    );
};

export default Select2;