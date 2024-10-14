import React, { Suspense, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CButton, 
  CFormInput,
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,

} from '@coreui/react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useTableData } from 'src/components/table/useTableData'
import TableHeader from 'src/components/table/TableHeader'
import Filters from 'src/components/table/Filters'
// import Calendar from 'src/components/Calendar/Calendar_old'
import Calendar from "src/components/Calendar/Calendar";
import Calendar2 from "src/components/Calendar3/Calendar2";

import Close from "../assets/images/clear.svg"
import zamok from "../assets/images/замок.png"
import zamok2 from "../assets/images/замок2.png"
import addAvatar from "../assets/images/add_avatar.png"
import Krestik from './../assets/images/krestik.png';
import imgBlock18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.png";
import Tg from "./../assets/images/tg.png";
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Disketa from "./../assets/images/disketa.png";
import arrowDown from 'src/assets/images/arrowDown.svg'

const Projects = () => {
  const { columns, data, setData, columnFilters, setColumnFilters } = useTableData()

  const [yearAndMonth, setYearAndMonth] = useState([2024, 10]);

  const [showSidebar, setShowSidebar] = useState(false)
  const [showCalendar, setShowCalendar] = useState(true)
  const [showCalendar2, setShowCalendar2] = useState(false)
  const [showProject, setShowProject] = useState(false)

  const table = useReactTable({
    defaultColumn: {
      size: 200, //starting column size
      minSize: 40, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    data,
    columns,
    state: {
      columnFilters,
    },
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row,
          ),
        ),
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    // filterFns: {
    //   fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    // },

    getPaginationRowModel: getPaginationRowModel(),

    enableRowSelection: true,
    getRowCanExpand: () => true,
  })

  const closeProfile = () => {
    setShowProject(false)
    setShowCalendar(true)
  }

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Проекты</h2> */}
                    <CRow className="mt-2">
                      <CCol xs>
                        <CCard className="mb-4">
                          {/* <CCardHeader>Сметы</CCardHeader> */}

                          <CCardBody style={{padding: '12px'}}>
                            {!showProject ? <Filters setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} columnFilters={columnFilters} setColumnFilters={setColumnFilters} /> : '' }
                            {
                              showCalendar ? 
                                <Calendar showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2}/>
                                :
                                (showCalendar2 ?
                                  <Calendar2 showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2}/>
                                  : 
                                  (showProject ? 
                                    <div style={{position: 'relative', height: '660px', display: 'flex', flexDirection: 'row', marginTop: '35px'}}>
                                    {/* 1 */}                               
                                          <div style={{display: 'flex', flexDirection: 'column', width: '250px'}}>
                                            
                                            <label className='title-label'>ID</label>
                                              <div className="text-field">
                                                <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '100px'}}/>
                                              </div>
                                              <div className="text-field">
                                                <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '100px'}}/>
                                              </div>
                                              <div className="text-field">
                                                <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '100px'}}/>
                                              </div>
                                    
                                                                      {/* ФИО */}
                                                                      <div style={{position: 'absolute', top: '-25px', right: '25px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'flex-end', width: '-webkit-fill-available'}}>   
                                                                        <div style={{display: 'flex'}}>
                                                                          <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                                          <img src={Tg}  style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                                          <img src={zamok}  style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                                                          <img src={Disketa}  style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                                          <img src={Close} onClick={closeProfile} style={{ cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                                                        </div>
                                                                      </div>
                                    
                                                                      {/* 2 */}
                                                                    
                                    
                                        </div>

                                        <div>
                                          <label className='title-label'>Проект</label>
                                              <div className="text-field">
                                                <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '250px', marginRight: '25px'}}/>
                                              </div>

                                        </div>

                                        <div>
                                          <label className='title-label'>Менеджер</label>
                                              <div className="text-field">
                                                <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '250px', marginRight: '25px'}}/>
                                              </div>

                                        </div>

                                        <div>
                                          <label className='title-label'>Телефон</label>
                                              <div className="text-field">
                                                <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '250px', marginRight: '25px'}}/>
                                              </div>

                                        </div>

                                    </div>
                                  :'')
                                )
                              
                            }

                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                </Suspense>
            </CContainer>

            <div style={{
                display: showSidebar ? 'block' : 'none',
                position: 'fixed',
                right: '0px',
                top: '0px',
                height: '100vh',
                background: '#10171a'
              }}>

              <div>
                <img src={Close} onClick={()=>setShowSidebar(false)} style={{position: 'absolute', top: '130px', right: '15px'}}/>
              </div>

              <div style={{width: '20rem'}}>

              </div>

            </div>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Projects
