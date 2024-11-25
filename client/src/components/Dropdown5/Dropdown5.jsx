import React, {useState, useRef, useEffect} from 'react';
import Select2 from '../Select2/Select2'
import drp from './Dropdown5.module.css'
import Close from "../../assets/images/close.svg"
import { 
  CFormInput,
} from '@coreui/react'

const Dropdown5 = ({options, selected, setSelected, index, element, placeholder, setWorker, style}) => {
    const [menuShow, setMenuShow] = useState(false)
    const [arrSelect, setArrSelect] = useState({})
    const [clearShow, setClearShow] = useState(false)

    useEffect(()=> {
      console.log("selected2: ", selected, index)
    }, [selected])

    const selectOption = (e, color) => {
        console.log("selected: ", {name: e.target.innerText, color: color})
        
        let arr = JSON.parse(JSON.stringify(selected));
        const userObject = arr[index];
			  arr[index] = { ...userObject, [element]: JSON.stringify({name: e.target.innerText, color: color})};

        setWorker(arr)
        
        console.log("arr: ", arr)
        setSelected(arr)

        setMenuShow(!menuShow)
        setClearShow(false)
    }

    const dropdownList = options.map((option, i) =>
        <li key={i} onClick={(e)=>selectOption(e, option.color)} style={{color: `${option.color}`}}>{option.label}</li>
    )

    const wrapperRef = useRef(null);

  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          //alert("You clicked outside of me!");
          setClearShow(false)

          setMenuShow(false)
          event.stopPropagation();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [wrapperRef ]);

  const clickClear = ()=> {
    setClearShow(false)
    setMenuShow(false)
    //setElement('')

    let arr = JSON.parse(JSON.stringify(selected));
    const userObject = arr[index];
		arr[index] = { ...userObject, [element]: JSON.stringify({name: '', color: ''})};
        
    //console.log("arr: ", arr)
    setSelected(arr)
  }

    return (
        <div className={drp.dropdown} ref={wrapperRef}>
            <Select2
                menuShow={menuShow}
                setMenuShow={setMenuShow}
                clearShow={clearShow} 
                setClearShow={setClearShow}
                selected={selected ? selected[index] : ''}
                index={index}
                el={element}
                style={{border: 'none!important', color: ``}}
            />
            <div style={{position: 'relative'}}>
                <img src={Close} onClick={clickClear} width={15} alt='' className={drp.close} style={{visibility: clearShow ? 'visible' : 'hidden'}}></img>
            </div>
            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`} style={style}>
                {dropdownList}
            </ul>
        </div>
    );
};

export default Dropdown5;