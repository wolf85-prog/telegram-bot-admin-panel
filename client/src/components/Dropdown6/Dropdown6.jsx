import React, {useState, useRef, useEffect} from 'react';
import Select4 from '../Select4/Select4'
import drp from './Dropdown6.module.css'
import Close from "../../assets/images/close.svg"
import { 
  CFormInput,
} from '@coreui/react'

const Dropdown6 = ({options, selected, setSelected, index, element, placeholder, style}) => {
    const [menuShow, setMenuShow] = useState(false)
    const [text, setText] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    const [clearShow, setClearShow] = useState(false)

    useEffect(()=> {
      //setSelected(selected ? selected : placeholder)
      const arr = options.slice(0, 15)
      setFilterOptions(options)
    }, [])

    useEffect(()=> {
      //console.log("selected6: ", selected)
      //const arr = options.filter(item=> item.label?.toLowerCase().includes(selected[index]?.specId?.toLowerCase()))
      //setFilterOptions(selected?.name === '' ? options : arr)
    }, [selected])

    useEffect(()=> {
      //console.log("selected6: ", text)
      const arr = options.filter(item=> item.label?.toLowerCase().includes(text?.toLowerCase()))
      setFilterOptions(text === '' ? options : arr)
      //console.log(arr)
    }, [text])

    const selectOption = (e) => {
        console.log(e.target.value)
        let arr = JSON.parse(JSON.stringify(selected));
        const userObject = arr[index];
			  arr[index] = { ...userObject, [element]: e.target.value};

        setSelected(arr)

        setMenuShow(!menuShow)
        setClearShow(false)
    }

    const dropdownList = filterOptions.map((option, i) =>
        <li key={i} value={option.id} onClick={(e)=>selectOption(e)}>{option.label}</li>
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
    setText('')
    //setElement('')

    let arr = JSON.parse(JSON.stringify(selected));
    const userObject = arr[index];
		arr[index] = { ...userObject, [element]: ''};

    console.log("arr: ", arr)
    setSelected(arr)
    //setText('')
  }

    return (
        <div className={drp.dropdown} ref={wrapperRef}>
            <Select4
                menuShow={menuShow}
                setMenuShow={setMenuShow}
                clearShow={clearShow} 
                setClearShow={setClearShow}
                selected={selected ? selected[index] : ''}
                index={index}
                el={element}
                setSelected={setSelected}
                inputValue={text}
                setInputValue={setText}
                options={options}
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

export default Dropdown6;