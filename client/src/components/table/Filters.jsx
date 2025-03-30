/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import { CIcon } from '@coreui/icons-react'
import { cilList, cilShieldAlt } from '@coreui/icons'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

import ChangeSloy from "./../../assets/images/change_sloy.png";

import { useUsersContext } from "../../chat-app-new/context/usersContext";

import {
  CCloseButton,
  CFormInput,
  CCol,
  CRow,
  CFormCheck,
  CFormSelect,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CButton,
} from '@coreui/react'

import 'react-datepicker/dist/react-datepicker.css'

const options = [
  { value: 'project', label: 'Проект' },
  { value: 'date', label: 'Дата' },
  { value: 'ID', label: 'ID' },
  { value: 'company', label: 'Компания' },
  { value: 'manager', label: 'Менеджер' },  
  { value: 'specialist', label: 'Специалист' },
  { value: 'status', label: 'Статус' },
  { value: 'city', label: 'Город' },
]

const projList = [
  { value: 'Проект №1', label: '08.08 | Проект №1' },
  { value: 'Проект №2', label: '07.08 | Проект №2' },
  { value: 'Проект №3', label: '18.07 | Проект №3' },
  { value: 'Проект №4', label: '25.06 | Проект №4' },
  { value: 'Проект №5', label: '23.06 | Проект №5' },
]
const managerList = [
  { value: 'Менеджер', label: 'Менеджер' },
  { value: 'Захаров М. Н.', label: 'Захаров М. Н.' },
  { value: 'Рогов А. Е.', label: 'Рогов А. Е.' },
  { value: 'Игнатов А. П.', label: 'Игнатов А. П.' },
  { value: 'Никитина А. И.', label: 'Никитина А. И.' },
]
const projectList = [
  { value: 'Проект', label: 'Проект' },
  { value: 'Проект', label: 'Проект' },
  { value: 'Проект', label: 'Проект' },
  { value: 'Проект', label: 'Проект' },
  { value: 'Проект', label: 'Проект' },
]
const idList = [
  { value: 'ID', label: 'ID' },
  { value: 'ID', label: 'ID' },
  { value: 'ID', label: 'ID' },
  { value: 'ID', label: 'ID' },
  { value: 'ID', label: 'ID' },
]
const statusList = [
  { value: 'Статус', label: 'Статус' },
  { value: 'Статус', label: 'Статус' },
  { value: 'Статус', label: 'Статус' },
  { value: 'Статус', label: 'Статус' },
  { value: 'Статус', label: 'Статус' },
]
const companyList = [
  { value: 'Компания', label: 'Компания' },
  { value: 'Компания 2', label: 'Компания 2' },
  { value: 'Компания 3', label: 'Компания 3' },
  { value: 'Компания 4', label: 'Компания 4' },
  { value: 'Компания 5', label: 'Компания 5' },
]

const cityList = [
  { value: 'Город', label: 'Город' },
  { value: 'Город 2', label: 'Город 2' },
  { value: 'Город 3', label: 'Город 3' },
  { value: 'Город 4', label: 'Город 4' },
  { value: 'Город 5', label: 'Город 5' },
]


const periodList = [
  { value: 'Сутки', label: 'Сутки' },
  { value: 'Неделя', label: 'Неделя' },
  { value: 'Месяц [Т]', label: 'Месяц [Т]' },
  { value: 'Месяц [П]', label: 'Месяц [П]' },
  { value: 'Год', label: 'Год' },
]

const manthList = [
  { value: 'Январь', label: 'Январь' },
  { value: 'Февраль', label: 'Февраль' },
  { value: 'Март', label: 'Март' },
  { value: 'Апрель', label: 'Апрель' },
  { value: 'Май', label: 'Май' },
  { value: 'Июнь', label: 'Июнь' },
  { value: 'Июль', label: 'Июль' },
  { value: 'Август', label: 'Август' },
  { value: 'Сентябрь', label: 'Сентябрь' },
  { value: 'Октябрь', label: 'Октябрь' },
  { value: 'Ноябрь', label: 'Ноябрь' },
  { value: 'Декабрь', label: 'Декабрь' },
]

const filters = {
  project: projList,
  manager: managerList,
  company: companyList,
  period: periodList,
}

export default function Filters({ columnFilters, setColumnFilters, setShowCalendar, setShowCalendar2, projects, setProjectsSort }) {
  const { MONTHS, date, setDate, day, setDay, month, setMonth, year, setYear, startDay, setStartDay, currentDays } = useUsersContext();
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [filterType, setFilterType] = useState(options[0])
  const [filter, setFilter] = useState(projList)
  const [filter2, setFilter2] = useState(idList)
  const [filter3, setFilter3] = useState(managerList)
  const [filter4, setFilter4] = useState(companyList)
  const [filter5, setFilter5] = useState(statusList)
  const [filter6, setFilter6] = useState(cityList)

  const [countPress, setCountPress] = useState(0);

  const [filterText, setFilterText] = useState('');

  //поиск
  useEffect(() => {
    console.log("projects: ", projects)
    const filteredData = projects.filter(proj=> (proj.crmID)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(filterText.replace(/[её]/g, '(е|ё)').toLowerCase()));
    setProjectsSort(filterText === '' ? projects : filteredData); 
  }, [filterText]);

  const handleChangeFilterType = (selectedOption) => {
    setFilterType(selectedOption)
    setFilter(filters[selectedOption.value])
  }

  useEffect(() => {}, [columnFilters])

  const handleFilterChange = (tt) => {
    // setColumnFilters((prev) =>
    //   prev.filter((f) => f.id !== filterType.value).concat({ id: filterType, value: tt }),
    // )
    setColumnFilters([{ id: filterType.value, value: tt.value }])
  }

  const clickChange = () => {
    setCountPress(countPress + 1)
    
    if (countPress + 1 >= 2) {
      setCountPress(0)
    }

    if (countPress + 1 === 1) {
      setShowCalendar(false)
      setShowCalendar2(true)
    } else if (countPress + 1 === 2) {
      setShowCalendar(true)
      setShowCalendar2(false)
    } 
    
  }

  const startFilter = (e) => {
    setFilterText(e.target.value)
  }

  return (
    <>
      <CRow lg={{ gutter: 0 }} className="mb-1 ">
        <CCol className="align-self-center" style={{maxWidth: '140px'}}>
          <div className="filter-line" style={{left: '12px', width: '10px'}}></div>
          {/* <div className="filter-line" style={{left: '805px', top: '60px', width: '50px'}}></div>
          <div className="uley-line" style={{left: '900px', top: '60px', width: '50px'}}></div> */}

          <ul className="markers" style={{paddingLeft: '14px', listStyle: 'none'}}>
            <li><span className='title-label'>Проекты: </span>{'100'}</li>
            <li><span className='title-label'>Часы: </span>{'1000'}</li>
            
          </ul>
        </CCol>
        <CCol className="align-self-center" style={{maxWidth: '155px', position: 'relative'}}>
          <div className="filter-line" style={{left: '8px', top: '11px', width: '10px'}}></div>
          <ul className="markers" style={{paddingLeft: '20px', listStyle: 'none'}}> 
            <li><span className='title-label'>В эфире: </span>{'10'}</li>
            <li><span className='title-label'>В обработке: </span>{'10'}</li>
          </ul>
        </CCol>
        
        <CCol className="align-self-center" style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: '12px', right: '10px'}} >
              <Select
                className="uley_react_select"
                options={options}
                onChange={handleChangeFilterType}
                defaultValue={filterType}
                classNamePrefix="custom-select_3"
                autoFocus="true"
              />
              <Select
                className="uley_react_select"
                onChange={handleFilterChange}
                options={filter}
                defaultValue={filter[0]}
                classNamePrefix="custom-select_2"
              />

              <CButton onClick={()=>clickChange()} className='uley_add_user uley_select_reset' style={{marginRight: '10px', padding: '18px', marginLeft: '0'}}>
                <span style={{position: 'absolute', top: '-4px', left: '5px'}}>
                  <img src={ChangeSloy} alt='' width={25} />
                </span>
              </CButton>

              <input onChange={(e)=>startFilter(e)} value={filterText} className="form-control" style={{background: 'transparent', width: '150px', marginRight: '10px'}} placeholder='Поиск'></input>
              
              <CCloseButton
                className="uley_select_reset"
                style={{ height: '28px', width: '28px',marginRight: '250px', marginLeft: '0' }}
                onClick={() => setFilterText('')}
              />
              
              {/* <CButton onClick={() => setDate(new Date(year, month - 1, day))} className='uley_add_user uley_select_reset' style={{marginRight: '10px', padding: '18px', marginLeft: '0'}}>
                <span style={{fontSize: '36px', color: '#2d2e38', position: 'absolute', top: '-14px', left: '11px'}}>
                -</span>
              </CButton>
            
              <Select
                className="uley_react_select"
                options={manthList}
                // defaultValue={manthList[0]}
                value={MONTHS[month]}
                classNamePrefix="custom-select_3"
              />

              <CButton onClick={() => setDate(new Date(year, month + 1, day))} className='uley_add_user uley_select_reset' style={{marginLeft: '0px', padding: '18px'}}>
                <span style={{fontSize: '36px', color: '#2d2e38', position: 'absolute', top: '-13px', left: '6px'}}>
                +</span>
              </CButton> */}
        </CCol>

      </CRow>
    </>
  )
}
