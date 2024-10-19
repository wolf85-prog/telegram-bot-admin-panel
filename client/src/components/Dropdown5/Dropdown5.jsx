import React, {useState, useRef, useEffect} from 'react';
import Select2 from '../Select2/Select2'
import drp from './Dropdown5.module.css'
import { 
  CFormInput,
} from '@coreui/react'

const Dropdown5 = ({options, selected, setSelected, placeholder, style}) => {
    const [menuShow, setMenuShow] = useState(false)
    // const [selected, setSelected] = useState(options[0])
    const [text, setText] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);

    //console.log(options)

    useEffect(()=> {
      setSelected(selected ? {name: selected.name, color: selected.color} : {name: placeholder, color: '#f3f3f3'})
    }, [])

    useEffect(()=> {
      //setSelected(selected ? {name: selected.name, color: selected.color} : {name: placeholder, color: '#f3f3f3'})
      const arr = [...options].filter(item=> item.label?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()))
      setFilterOptions(text === '' ? options : arr)
    }, [text])

    const selectOption = (e, color) => {
        setSelected({name: e.target.innerText, color: color})
        setMenuShow(!menuShow)
    }

    const dropdownList = filterOptions.map((option, i) =>
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
                selected={selected}
                style={{border: 'none!important', color: ``}}
            />
            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`} style={style}>
              <CFormInput 
                type="email" 
                id="exampleFormControlInput1" 
                placeholder="name@example.com"
                value={text}
                onChange={(e)=>setText(e.target.value)}
              />
                {dropdownList}
            </ul>
        </div>
    );
};

export default Dropdown5;