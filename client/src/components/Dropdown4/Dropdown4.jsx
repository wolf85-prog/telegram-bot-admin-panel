import React, {useState, useRef, useEffect} from 'react';
import Select3 from '../Select3/Select3'
import drp from './Dropdown4.module.css'

const Dropdown4 = ({options, selected, setSelected, placeholder, style}) => {
    const [menuShow, setMenuShow] = useState(false)
    // const [selected, setSelected] = useState(options[0])

    //console.log(options)

    useEffect(()=> {
      setSelected(selected ? {name: selected.name, color: selected.color} : {name: placeholder, color: '#f3f3f3'})
    },[])

    const selectOption = (e, color) => {
      setSelected({name: e.target.innerText, color: color})
      setMenuShow(!menuShow)
  }

    const dropdownList = options.map((option, i) =>
        <>
        <li key={i} onClick={(e)=>selectOption(e, option.color)} style={{color: `${option.color}`}}>{option.label}</li>
        {option.divide ? <hr /> : ''}
        </>
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
            <Select3
                menuShow={menuShow}
                setMenuShow={setMenuShow}
                selected={selected}
            />
            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`} style={style}>
                {dropdownList}
            </ul>
        </div>
    );
};

export default Dropdown4;