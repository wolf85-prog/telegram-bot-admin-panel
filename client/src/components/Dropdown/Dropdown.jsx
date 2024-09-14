import React, {useState, useRef, useEffect} from 'react';
import Select from '../Select/Select'
import drp from './Dropdown.module.css'

const Dropdown = ({options}) => {
    const [menuShow, setMenuShow] = useState(false)
    const [selected, setSelected] = useState(options[0])

    //console.log(options)

    const selectOption = e => {
        setSelected(e.target.innerText)
        setMenuShow(!menuShow)
    }

    const dropdownList = options.map((option, i) =>
        <li key={i} onClick={selectOption}>{option.label}</li>
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
            <Select
                menuShow={menuShow}
                setMenuShow={setMenuShow}
                selected={selected}
            />
            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`}>
                {dropdownList}
            </ul>
        </div>
    );
};

export default Dropdown;