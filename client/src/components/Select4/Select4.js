import React, {useState, useRef, useEffect} from 'react';
import cl from './Select4.module.css'
import Close from "../../assets/images/close.svg"

import { 
    CFormInput,
  } from '@coreui/react'

const Select4 = ({menuShow, setMenuShow, selected, el, setInputValue, setSelected, options}) => {
    const [element, setElement] = useState()
    const [showClose, setShowClose] = useState(false)
    
    useEffect(()=> {
        //console.log("options: ", options)
        const fio = options.find((item)=> item.id === parseInt(selected[el]))
        //console.log("fio: ", fio)
        setElement(fio?.label)
        //console.log("element4: ", selected)
    }, [selected])

    const changeFio =(e)=> {
        //console.log(selected[el])
        //setSelected(selected[el])
        setElement(e.target.value)
        console.log(e.target.value)
        setInputValue(e.target.value)
    }

    const clickClear = ()=> {
        setElement('')
    }

    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={()=> setMenuShow(!menuShow)}
        >
            <CFormInput 
                type="text" 
                placeholder=""
                value={element && element.length > 25 ? element.substr(0, 25) + '...' : element}
                onChange={(e)=>changeFio(e)}
                style={{height: '30px', fontSize: '16px', background: 'transparent', border: 'none', boxShadow: 'none', textAlign: 'center'}}
            />
            <div style={{position: 'relative'}}><img src={Close} onClick={clickClear} width={15} alt='' className={cl.close} style={{visibility: showClose ? 'visible' : 'hidden'}}></img></div>
        </div>
    );
};

export default Select4;