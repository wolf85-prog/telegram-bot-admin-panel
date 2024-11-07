import React, {useState, useRef, useEffect} from 'react';
import Select2 from '../Select2/Select2'
import drp from './Dropdown5.module.css'
import { 
  CFormInput,
} from '@coreui/react'

const Dropdown5 = ({options, selected, setSelected, index, placeholder, style}) => {
    const [menuShow, setMenuShow] = useState(false)

    useEffect(()=> {
      console.log("selected: ", selected, index)
      setSelected(selected ? {name: selected[index]?.name, color: selected[index]?.color} : {name: placeholder, color: '#f3f3f3'})
      // let arr = []
      // arr[index] = selected ? {name: selected[index]?.name, color: selected[index]?.color} : {name: placeholder, color: '#f3f3f3'}
      // console.log("arr: ", arr[index])
      // setSelected(arr)
    }, [])

    const selectOption = (e, color) => {
        console.log("selected: ", {name: e.target.innerText, color: color})
        // let arr = []
        // arr[index] = {name: e.target.innerText, color: color}
        setSelected({name: e.target.innerText, color: color})
        setMenuShow(!menuShow)
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

    return (
        <div className={drp.dropdown} ref={wrapperRef}>
            <Select2
                menuShow={menuShow}
                setMenuShow={setMenuShow}
                selected={selected ? selected : ''}
                style={{border: 'none!important', color: ``}}
            />
            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`} style={style}>
                {dropdownList}
            </ul>
        </div>
    );
};

export default Dropdown5;