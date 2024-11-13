import React, {useState, useRef, useEffect} from 'react';
import Select4 from '../Select4/Select4'
import drp from './Dropdown6.module.css'
import { 
  CFormInput,
} from '@coreui/react'

const Dropdown6 = ({options, selected, setSelected, index, element, placeholder, style}) => {
    const [menuShow, setMenuShow] = useState(false)
    // const [selected, setSelected] = useState(options[0])
    const [text, setText] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    const [arrSelect, setArrSelect] = useState({})

    //console.log(options)

    useEffect(()=> {
      //setSelected(selected ? selected : placeholder)
      const arr = options.slice(0, 15)
      setFilterOptions(options)
    }, [])

    useEffect(()=> {
      //console.log("selected6: ", selected)
      const arr = options.filter(item=> item.label?.toLowerCase().includes(selected[index]?.specId?.toLowerCase()))
      //setFilterOptions(selected?.name === '' ? options : arr)
    }, [selected])

    const selectOption = (e) => {
        let arr = JSON.parse(JSON.stringify(selected));
        const userObject = arr[index];
			  arr[index] = { ...userObject, [element]: e.target.innerText};

        setSelected(arr)
        //setSelected(e.target.innerText)
        setArrSelect(arr[index])

        setMenuShow(!menuShow)
    }

    const dropdownList = filterOptions.map((option, i) =>
        <li key={i} onClick={(e)=>selectOption(e)}>{option.label}</li>
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
            <Select4
                menuShow={menuShow}
                setMenuShow={setMenuShow}
                selected={selected ? selected[index] : ''}
                index={index}
                el={element}
                setSelected={setSelected}
                style={{border: 'none!important', color: ``}}
            />
            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`} style={style}>
                {dropdownList}
            </ul>
        </div>
    );
};

export default Dropdown6;