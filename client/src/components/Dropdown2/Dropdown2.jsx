import React, {useState} from 'react';
import Select from '../Select/Select'
import drp from './Dropdown2.module.css'

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

    return (
        <div className={drp.dropdown}>
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