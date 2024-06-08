import React, {useState} from 'react';
// import cl from './Select.module.css'

import { 
    CTable, 
    CTableRow, 
    CTableHead,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CCol,
    CRow,
    CFormCheck,
  } from '@coreui/react'

const Plan = ({menuShow, setMenuShow, selected}) => {

    const d = new Date();
    const month = String(d.getMonth()+1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
    const date_str = `${day}.${month}`;
    
    d.setDate(d.getDate() + 1);
    const month2 = String(d.getMonth()+1).padStart(2, "0");
      const day2 = String(d.getDate()).padStart(2, "0");
    const date_str2 = `${day2}.${month2}`;
  
    const year = d.getFullYear();

    const [dates, setDates] = useState([
        {date: date_str, time: '06:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '07:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '08:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '09:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '10:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '11:00', proj: '', save: false, go: false,  uuid: ""},
    ])

    const [dates1, setDates1] = useState([
        {date: date_str, time: '12:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '13:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '14:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '15:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '16:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '17:00', proj: '', save: false, go: false,  uuid: ""},
    ])
    
    const [dates11, setDates11] = useState([
        {date: date_str, time: '18:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '19:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '20:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '21:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '22:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '23:00', proj: '', save: false, go: false,  uuid: ""},
    ])

    return (
        // <div 
        //     className={`${cl.select} ${menuShow && cl.selectClicked}`}
        //     onClick={()=> setMenuShow(!menuShow)}
        // >
        //     <span className={cl.select}>
        //         {selected}
        //     </span>
        //     <div className={`${cl.caret} ${menuShow && cl.caretRotate}`}></div>
        // </div>

        <CRow>
            <CCol xs>                                   
                <div style={{float: "left", display: 'flex'}}>
                                  <CTable align="middle" className="mb-0 border" hover responsive bordered style={{float: 'left'}}>   
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center" style={{width: '70px'}}>Дата</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                      <CTableRow v-for="item in tableItems">
                                        {/* <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol}px`}} >
                                          <div>{date_str}</div> 
                                        </CTableDataCell> */}
                                      </CTableRow>
                                    </CTableBody>
                                  </CTable>

                                  <CTable align="middle" className="mb-0 border" hover responsive bordered>
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Проект</CTableHeaderCell>   
                                        <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {dates.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            {/* <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                                <div onClick={()=>clickShowEditTime(`${item.time}`, index, 1)} >{item.time}</div>
                                            </div> */}
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                                <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          {/* <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value1[index]}
                                              onChange={()=>changeStatus(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold1[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell> */}
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                </div>                 
            </CCol>                  
{/* -----------------------------12:00----------------------------------------------------------------------------------- */}
            <CCol xs>                                   
                                <div style={{float: "left", display: 'flex'}}>
                                  <CTable align="middle" className="mb-0 border" hover responsive bordered style={{float: 'left'}}>   
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center" style={{width: '70px'}}>Дата</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                      <CTableRow v-for="item in tableItems">
                                        {/* <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol2}px`}} >
                                          <div>{date_str}</div> 
                                        </CTableDataCell> */}
                                      </CTableRow>
                                    </CTableBody>
                                  </CTable>

                                  <CTable align="middle" className="mb-0 border" hover responsive bordered>
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Проект</CTableHeaderCell>   
                                        <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {dates1.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            {/* <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div> */}
                                          </CTableDataCell>
                                          {/* <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value2[index]}
                                              onChange={()=>changeStatus(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold2[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell> */}
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>                    

{/* ----------------------------18:00------------------------------------------------------------------------------------ */}
            <CCol xs>
                <div style={{float: "left", display: 'flex'}}>
                                  <CTable align="middle" className="mb-0 border" hover responsive bordered style={{float: 'left'}}>   
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center" style={{width: '70px'}}>Дата</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                      <CTableRow v-for="item in tableItems">
                                        {/* <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol3}px`}} >
                                          <div>{date_str}</div> 
                                        </CTableDataCell> */}
                                      </CTableRow>
                                    </CTableBody>
                                  </CTable>

                                  <CTable align="middle" className="mb-0 border" hover responsive bordered>
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Проект</CTableHeaderCell>   
                                        <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {dates11.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            {/* <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div> */}
                                          </CTableDataCell>
                                          {/* <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value3[index]}
                                              onChange={()=>changeStatus(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold3[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell> */}
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                </div>                 
            </CCol>                        
        </CRow>
    );
};

export default Plan;