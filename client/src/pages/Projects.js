import React, { Suspense, useState, useEffect } from 'react'
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

  const [height, setHeight] = useState(600)

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

  useEffect(()=> {
    console.log("height: ", height)
  }, [height])

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

                          <CCardBody style={{padding: '12px', height: `${height}px`}}>
                            {!showProject ? <Filters setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} columnFilters={columnFilters} setColumnFilters={setColumnFilters} /> : '' }
                            {
                              showCalendar ? 
                                <Calendar showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} setHeight={setHeight}/>
                                :
                                (showCalendar2 ?
                                  <Calendar2 showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} setHeight={setHeight}/>
                                  : 
                                  (showProject ? 
                                    <div style={{position: 'relative', height: '660px', display: 'flex', flexDirection: 'row', marginTop: '35px'}}>
                                              <div style={{position: 'absolute', top: '-40px', left: '0px'}}>
                                                <label className='title-label' style={{marginLeft: '18px'}}>ID</label>
                                                <div className="text-field">
                                                  <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '50px', marginRight: '25px'}}/>
                                                </div>
                                              </div>
                                              
                                              <div style={{position: 'absolute', top: '-25px', right: '4px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'flex-end', width: '-webkit-fill-available'}}>   
                                                <div style={{display: 'flex'}}>
                                                  <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={Tg}  style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={zamok}  style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={Disketa}  style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={Close} onClick={closeProfile} style={{ cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                                </div>
                                              </div>
                                    {/* 1 */}                               
                                          <div style={{display: 'flex', flexDirection: 'column', width: '230px', textAlign: 'center', marginTop: '18px', marginRight: '40px'}}>
                                            
                                              <label className='title-label'></label>
                                              <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '25px', width: '230px'}}>
                                                <div className="text-field">
                                                  <input disabled={true} className="text-field__input" type="text" value='01.01.2024' name="dateReg" id="dateReg" style={{width: '120px'}}/>
                                                </div>
                                                <div className="text-field">
                                                  <input disabled={true} className="text-field__input" type="text" value='00:00' name="dateReg2" id="dateReg2" style={{width: '90px',}}/>
                                                </div>
                                              </div>

                                              <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '25px', width: '230px'}}>
                                                <div className="text-field">
                                                  <input disabled={true} className="text-field__input" type="text" value='01.01.2024' name="dateReg3" id="dateReg3" style={{width: '120px'}}/>
                                                </div>
                                                <div className="text-field">
                                                  <input disabled={true} className="text-field__input" type="text" value='00:00' name="dateReg4" id="dateReg4" style={{width: '90px'}}/>
                                                </div>
                                              </div>

                                              <label className='title-label'>Статус</label>
                                              <div className="text-field">
                                                <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '40px'}}/>
                                              </div>

                                              
                                              <label className='title-label'>Специфика</label>
                                              <div className="text-field">
                                                <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '40px'}}/>
                                              </div>

                                              <label className='title-label'>Комментарии</label>
                                              <div className="text-field" style={{marginBottom: '0px'}}>
                                                <textarea 
                                                  className="text-field__input" 
                                                  type="text" 
                                                  name="comment" 
                                                  id="comment"
                                                  style={{resize: 'none', width: '230px', height: '123px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', marginRight: '40px'}}
                                                />
                                              </div> 
                                        </div>

                                        {/* 2 */}   
                                        <div style={{textAlign: 'center', marginTop: '20px', width: '320px', marginRight: '40px'}}>
                                          <label className='title-label'>Проект</label>
                                          <div className="text-field">
                                            <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/>
                                          </div>

                                          <label className='title-label'>Компания</label>
                                          <div className="text-field">
                                            <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/>
                                          </div>

                                          <label className='title-label'>Город</label>
                                          <div className="text-field">
                                            <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/>
                                          </div>

                                          <label className='title-label'>Локация</label>
                                          <div className="text-field">
                                            <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/>
                                          </div>

                                          <label className='title-label'>Адрес</label>
                                          <div className="text-field" style={{marginBottom: '0px'}}>
                                            <textarea 
                                              className="text-field__input" 
                                              type="text" 
                                              name="comment" 
                                              id="comment"
                                              style={{resize: 'none', width: '320px', height: '123px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}
                                            />
                                          </div> 
                                        </div>

                                        {/* 3 */}   
                                        <div style={{textAlign: 'center', marginTop: '20px', width: '320px', marginRight: '40px'}}>
                                          <label className='title-label'>Менеджер</label>
                                          <div className="text-field">
                                            <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/>
                                          </div>

                                          <label className='title-label'>Старший</label>
                                          <div className="text-field">
                                            <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/>
                                          </div>

                                          <label className='title-label'>Техническое Задание</label>
                                          <div className="text-field" style={{marginBottom: '0px'}}>
                                            <textarea 
                                              className="text-field__input" 
                                              type="text" 
                                              name="comment" 
                                              id="comment"
                                              style={{resize: 'none', width: '320px', height: '123px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', marginBottom: '20px'}}
                                            />
                                          </div> 

                                          <label className='title-label' style={{marginTop: '44px'}}>Техническое Задание</label>

                                          <div  style={{display: 'flex', flexDirection: 'row'}}>
                                            <div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* 4 */}   
                                        <div style={{textAlign: 'center', marginTop: '20px', width: '230px',marginRight: '10px'}}>
                                          <label className='title-label'>Телефон</label>
                                          <div className="text-field">
                                            <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '10px'}}/>
                                          </div>

                                          <label className='title-label'> </label>
                                          <div className="text-field">
                                            <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '10px'}}/>
                                          </div>

                                          <div style={{textAlign: 'left', display: 'flex', flexDirection: 'column'}}>
                                            <label className='title-label' style={{marginTop: '15px'}}>Предварительная смета</label>

                                            <label className='title-label' style={{marginTop: '25px'}}>Финальная смета</label>

                                            <label className='title-label' style={{marginTop: '25px'}}>Постер</label>
                                          </div>

                                          <div style={{marginTop: '98px', marginLeft: '-40px'}}>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                          </div>
                                        </div>

                                        {/* 5 */}   
                                        <div style={{textAlign: 'center', marginTop: '20px'}}>
                                          {/* <label className='title-label'> </label> */}
                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', padding: '5px', marginTop: '24px'}}>
                                            <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px'}}/>
                                          </div>

                                          {/* <label className='title-label'> </label> */}
                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', padding: '5px', marginTop: '44px'}}>
                                            <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px'}}/>
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', padding: '5px', marginTop: '40px', marginBottom: '0'}}>
                                            🟢
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', padding: '5px', marginBottom: '0'}}>
                                            🟢
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', padding: '5px', marginBottom: '0'}}>
                                            🟢
                                          </div>
                                        </div>
                                        

                                    </div>
                                  :'')
                                )
                              
                            }
                            {/* Сайдбар с комментариями */}
                            <div style={{
                                display: showSidebar ? 'block' : 'none',
                                position: 'absolute',
                                right: '0px',
                                top: '120px',
                                height: '580px',
                                background: '#10171a'
                              }}>

                              <div>
                                <img src={Close} onClick={()=>setShowSidebar(false)} style={{position: 'absolute', top: '15px', right: '15px'}}/>
                              </div>

                              <div style={{width: '20rem'}}>

                              </div>

                            </div>

                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                </Suspense>
            </CContainer>

            

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Projects
