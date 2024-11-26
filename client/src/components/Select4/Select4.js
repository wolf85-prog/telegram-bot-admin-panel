import React, {useState, useRef, useEffect} from 'react';
import cl from './Select4.module.css'
import Close from "../../assets/images/close.svg"

import { 
    CFormInput,
  } from '@coreui/react'

const Select4 = ({menuShow, setMenuShow, clearShow, setClearShow, selected, el, setInputValue, setSelected, options}) => {
    const [element, setElement] = useState()
    const [showClose, setShowClose] = useState(false)
    
    useEffect(()=> {
        //console.log("selected: ", selected)
        const fio = options.find((item)=> item.id === parseInt(selected[el]))
        if (fio) {
           setElement(fio?.label) 
        } else {
            setElement('') 
        }

        setShowClose(true)
    }, [selected])

    const changeFio =(e)=> {
        //console.log(selected[el])
        //setSelected(selected[el])
        setElement(e.target.value)
        console.log(e.target.value)
        setInputValue(e.target.value)
    }

    const clickSelect = () => {
        setMenuShow(!menuShow)
        setClearShow(!clearShow)
    }


    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={clickSelect}
        >
            <CFormInput 
                type="text" 
                placeholder=""
                value={element && element.length > 25 ? element.substr(0, 25) + '...' : element}
                onChange={(e)=>changeFio(e)}
                style={{height: '30px', fontSize: '16px', background: 'transparent', border: 'none', boxShadow: 'none', textAlign: 'center'}}
            />
        </div>
    );
};

export default Select4;