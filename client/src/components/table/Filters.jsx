/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import { CIcon } from '@coreui/icons-react'
import { cilList, cilShieldAlt } from '@coreui/icons'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

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
} from '@coreui/react'

import 'react-datepicker/dist/react-datepicker.css'

const options = [
  { value: 'company', label: 'Компания' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'project', label: 'Проект' },
]

const projList = [
  { value: 'Проект №1', label: '08.08 | Проект №1' },
  { value: 'Проект №2', label: '07.08 | Проект №2' },
  { value: 'Проект №3', label: '18.07 | Проект №3' },
  { value: 'Проект №4', label: '25.06 | Проект №4' },
  { value: 'Проект №5', label: '23.06 | Проект №5' },
]
const managerList = [
  { value: 'Захаров М. Н.', label: 'Захаров М. Н.' },
  { value: 'Рогов А. Е.', label: 'Рогов А. Е.' },
  { value: 'Игнатов А. П.', label: 'Игнатов А. П.' },
  { value: 'Никитина А. И.', label: 'Никитина А. И.' },
]
const companyList = [
  { value: 'Компания 1', label: 'Компания 1' },
  { value: 'Компания 2', label: 'Компания 2' },
  { value: 'Компания 3', label: 'Компания 3' },
  { value: 'Компания 4', label: 'Компания 4' },
  { value: 'Компания 5', label: 'Компания 5' },
]
const periodList = [
  { value: 'Сутки', label: 'Сутки' },
  { value: 'Неделя', label: 'Неделя' },
  { value: 'Месяц [Т]', label: 'Месяц [Т]' },
  { value: 'Месяц [П]', label: 'Месяц [П]' },
  { value: 'Год', label: 'Год' },
]

const filters = {
  project: projList,
  manager: managerList,
  company: companyList,
  period: periodList,
}

export default function Filters({ columnFilters, setColumnFilters }) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [filterType, setFilterType] = useState(options[0])
  const [filter, setFilter] = useState(companyList)

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

  return (
    <>
      <CRow lg={{ gutter: 0 }} className="mb-1 ">
        <CCol lg={6} style={{ display: 'flex' }} className="align-self-center">
          <Select
            className="uley_react_select"
            options={options}
            onChange={handleChangeFilterType}
            defaultValue={filterType}
            classNamePrefix="custom-select_1"
            autoFocus="true"
          />
          <Select
            className="uley_react_select"
            onChange={handleFilterChange}
            options={filter}
            defaultValue={filter[0]}
            classNamePrefix="custom-select_2"
          />
          <Select
            className="uley_react_select"
            options={periodList}
            defaultValue={periodList[0]}
            classNamePrefix="custom-select_3"
          />

          <CCloseButton
            className="uley_select_reset"
            style={{ height: '28px', width: '28px' }}
            onClick={() => setColumnFilters([])}
          />
        </CCol>

        <CCol className="align-self-center">
          <CRow lg={{ gutter: 1 }}>
            <CCol lg={5}>
              <DatePicker
                className="uley-datepicker-control text-center"
                style={{ height: '28px', width: '40px' }}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd.MM.yyyy"
              />
            </CCol>

            <CCol lg={5}>
              <DatePicker
                className="uley-datepicker-control text-center"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd.MM.yyyy"
              />
            </CCol>
          </CRow>
        </CCol>

        <CCol className="align-self-center">
          <CRow>
            <CCol className="align-self-center text-end">Генератор смет</CCol>
            <CCol
              style={{
                maxWidth: '10px',
                height: ' 30px',
                alignSelf: 'center',
              }}
              className="uley-smeta-generate-line"
            ></CCol>
            <CCol lg="auto">
              <CFormCheck id="flexCheckDefault" label="Компания" />
              <CFormCheck id="flexCheckDefault1" label="Специалист" />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      {/* <CRow lg={{ gutter: 1 }} className="mb-1 mt-1">
        <CCol lg={1}>
          <input className="form-control"></input>
        </CCol>
        <CCol lg={1}>
          <input className="form-control"></input>
        </CCol>
      </CRow> */}
    </>
  )
}
