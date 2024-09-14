import React, {useState} from 'react';
import Select from '../Select/Select'
import drp from './Dropdown2.module.css'

const Dropdown2 = ({options, speclist, setSpeclist}) => {
    const [menuShow, setMenuShow] = useState(false)
    const [selected, setSelected] = useState(options[0])

    //console.log(spec)

    const selectOption = e => {
        speclist.push(e.target.innerText)
        setSpeclist(speclist)
        console.log("spec: ", speclist)
        setMenuShow(!menuShow)
    }

    const specList = speclist.map((item, i) =>
        <li key={i}>{item}</li>
    )

    const dropdownList = options.map((option, i) =>
        <li key={i} onClick={selectOption}>{option.label}</li>
    )

    return (
        <div className={drp.dropdown}>
            <ul onClick={()=>setMenuShow(true)} className={`${drp.speclist}`}>
                {specList}
            </ul>

            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`} style={{display: menuShow ? 'block' : 'none'}}>
                {dropdownList}
            </ul>
        </div>
    );
};

export default Dropdown2;