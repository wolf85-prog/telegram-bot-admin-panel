import React, {useState, useRef, useEffect} from 'react';
import drp from './Dropdown2.module.css'
import Close from "../../assets/images/close.svg"

const Dropdown2 = ({options, tags, setTags}) => {
    const [menuShow, setMenuShow] = useState(false)
    const [selected, setSelected] = useState(options[0])
    const [showClose, setShowClose] = useState(false)

    //console.log(spec)

    const selectOption = e => {
        
        const res = tags.find(item => item === e.target.innerText)
        if (!res) {
            tags.push(e.target.innerText)
            setTags(tags) 
        } else {
            console.log('Специальность уже существует!')
        }
        
        //console.log("spec: ", tags)
        setMenuShow(!menuShow)
    }

    function removeTag(index, e){
        e.stopPropagation();
        setTags(tags.filter((el, i) => i !== index))
    }


    const specList = tags.map((item, i) =>
        <li key={i} onMouseOver={()=>setShowClose(true)} onMouseOut={()=>setShowClose(false)}>
            {item} <img src={Close} onClick={(e) => removeTag(i, e)} width={15} alt='' className={drp.close} style={{visibility: showClose ? 'visible' : 'hidden'}}></img>
        </li>
    )

    const dropdownList = options.map((option, i) =>
        <li key={i} onClick={selectOption}>{option.name}</li>
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
            <ul onClick={()=>setMenuShow(!menuShow)} className={`${drp.speclist}`}>
                {specList}
            </ul>

            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`} style={{display: menuShow ? 'block' : 'none'}}>
                {dropdownList}
            </ul>
        </div>
    );
};

export default Dropdown2;