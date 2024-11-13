import React, {useState, useRef, useEffect} from 'react';
import cl from './Select4.module.css'
import { 
    CFormInput,
  } from '@coreui/react'

const Select4 = ({menuShow, setMenuShow, selected, el, setSelected}) => {
    const [element, setElement] = useState()
    
    useEffect(()=> {
        setElement(selected[el])
        console.log("element: ", selected[el])
    }, [selected])

    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={()=> setMenuShow(!menuShow)}
        >
            <CFormInput 
                type="text" 
                placeholder=""
                value={element && element.length > 25 ? element.substr(0, 25) + '...' : element}
                onChange={(e)=>setSelected(e.target.value)}
                style={{height: '30px', fontSize: '16px', background: 'transparent', border: 'none', boxShadow: 'none', textAlign: 'center'}}
            />
        </div>
    );
};

export default Select4;