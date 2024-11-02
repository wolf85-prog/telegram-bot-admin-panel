/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import { CIcon } from '@coreui/icons-react'
import { cilList, cilShieldAlt } from '@coreui/icons'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import InputMask from 'react-input-mask'
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
  { value: 'srm', label: 'ID' },
  // { value: 'date', label: 'Дата' },
  // { value: 'specialist', label: 'Специалист' },
  // { value: 'statuses', label: 'Статусы' },
]

const projList = [
  { value: 'Проект №1', label: '08.08 | Проект №1' },
  { value: 'Проект №2', label: '07.08 | Проект №2' },
  { value: 'Проект №3', label: '18.07 | Проект №3' },
  { value: 'Проект №4', label: '25.06 | Проект №4' },
  { value: 'Проект №5', label: '12.09 | Проект №5' },
  { value: 'Проект №6', label: '11.09 | Проект №6' },
]

const dateList = [
  { value: '13.09.2024', label: '08.08 | Проект №1' },
  { value: '14.09.2024', label: '07.08 | Проект №2' },
  { value: '15.09.2024', label: '18.07 | Проект №3' },
  { value: '16.09.2024', label: '25.06 | Проект №4' },
  { value: '17.09.2024', label: '23.06 | Проект №5' },
  { value: '17.09.2024', label: '23.06 | Проект №5' },
]
const srmList = [
  { value: '3204', label: '3204' },
  { value: '3205', label: '3205' },
  { value: '3206', label: '3206' },
  { value: '3207', label: '3207' },
  { value: '3208', label: '3208' },
  { value: '3209', label: '3209' },
  { value: '3210', label: '3210' },
  { value: '3211', label: '3211' },
]
const statusList = [
  { value: 'Start', label: 'Начал работу' },
  { value: 'End', label: 'Закончил работу' },
  { value: 'Drive', label: 'В пути' },
  { value: 'Spot', label: 'На месте' },
  { value: 'Yes', label: 'Подтвердил' },
]
const companyList = [
  { value: 'Компания 1', label: 'Компания 1' },
  { value: 'Компания 2', label: 'Компания 2' },
  { value: 'Компания 3', label: 'Компания 3' },
  { value: 'Компания 4', label: 'Компания 4' },
  { value: 'Компания 5', label: 'Компания 5' },
]
const specialistList = [
  { value: 'Захаров М. Н.', label: 'Захаров М. Н.' },
  { value: 'Иванов М. Н.', label: 'Иванов М. Н.' },
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
  srm: srmList,
  // statuses: statusList,
  // specialist: specialistList,
  period: periodList,
}

export default function Filters({ columnFilters, setColumnFilters }) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [periodDate1, setPeriodDate1] = useState('')
  const [periodDate2, setPeriodDate2] = useState('')

  const [filterType, setFilterType] = useState(options[0])
  const [filter, setFilter] = useState(projList)

  const changeDate1 = (e) => {
    setPeriodDate1(e.target.value)
  }

  const changeDate2 = (e) => {
    setPeriodDate2(e.target.value)
  }

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
            options={specialistList}
            defaultValue={specialistList[0]}
            classNamePrefix="custom-select_2"
          />

          <CCloseButton
            className="uley_select_reset"
            style={{ height: '28px', width: '28px' }}
            onClick={() => setColumnFilters([])}
          />
        </CCol>

        {/* <CCol className="align-self-center">
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
        </CCol> */}
        <CCol className="align-self-center">
          <CRow lg={{ gutter: 1 }}>
            <CCol lg={5}>
              <InputMask mask="99.99.9999" value={periodDate1} onChange={changeDate1}>
                {(inputProps) => (
                  <CFormInput
                    {...inputProps}
                    placeholder="01.01.2024"
                    disableUnderline
                    aria-label="sm input example"
                    className="uley_select_reset"
                    style={{
                      marginLeft: '10px',
                      backgroundColor: 'transparent',
                      cursor: 'default',
                      width: '115px',
                    }}
                  />
                )}
              </InputMask>
            </CCol>

            <CCol lg={5}>
              <InputMask mask="99.99.9999" value={periodDate2} onChange={changeDate2}>
                {(inputProps) => (
                  <CFormInput
                    {...inputProps}
                    placeholder="31.12.2024"
                    disableUnderline
                    aria-label="sm input example"
                    className="uley_select_reset"
                    style={{
                      marginLeft: '10px',
                      backgroundColor: 'transparent',
                      cursor: 'default',
                      width: '115px',
                    }}
                  />
                )}
              </InputMask>
            </CCol>
          </CRow>
        </CCol>


        <CCol className="align-self-center" style={{visibility: 'hidden'}}>
          <CRow>
            <CCol className="align-self-center text-end">Статус</CCol>
            <CCol
              style={{
                maxWidth: '10px',
                height: ' 30px',
                alignSelf: 'center',
              }}
              className="uley-smeta-generate-line"
            ></CCol>
            <CCol lg="auto">
              <CFormCheck id="flexCheckDefault" label="В пути" />
              <CFormCheck id="flexCheckDefault1" label="На месте" />
            </CCol>

            <CCol
              style={{
                maxWidth: '10px',
                height: ' 30px',
                alignSelf: 'center',
              }}
              className="uley-smeta-generate-line"
            ></CCol>
            <CCol lg="auto">
              <CFormCheck id="flexCheckDefault" label="Старт" />
              <CFormCheck id="flexCheckDefault1" label="Финал" />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}
