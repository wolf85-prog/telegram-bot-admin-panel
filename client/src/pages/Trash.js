import React, { Suspense } from 'react'
import { CContainer, CSpinner, CCard, CCardBody, CTable, CTableDataCell, CTableRow, CTableHeaderCell, CTableBody, CTableHead } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

const Trash = () => {
  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    <h2>Корзина</h2>
                    <CCard className="mb-4">
                      <CCardBody style={{padding: '12px'}}>
                        <CTable align="middle" className="mb-0 border" hover responsive style={{fontSize: '16px',overflow: 'hidden', width: '1471px', borderRadius: '5px' }}>
                          <CTableHead className="text-center" color="light">
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center" style={{width: '61px'}}>
                                      
                                    </CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{width: '160px'}}>Дата</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '150px'}}>Статус</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>ФИО</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}></CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Специальность</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '40px'}}>Проекты</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Комтег</CTableHeaderCell>                      
                                    <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Комментарий</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}>С</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}>Д</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>      
                                <CTableBody>                                  
                                  <CTableRow v-for="item in tableItems" style={{lineHeight: '14px'}}>
                                    <CTableDataCell className="text-center" style={{position: 'relative'}}>
                                                                           
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      01.01.2024 | 00:00
                                    </CTableDataCell>  
                                    <CTableDataCell className="text-center">
                                      
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                      Иванов Иван Иванович
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                      
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                      
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      001 | 010
                                    </CTableDataCell>  
                                    <CTableDataCell className="text-center">
                                      
                                    </CTableDataCell>    
                                    <CTableDataCell className="text-center">
                                      Тест
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      
                                    </CTableDataCell>           
                                  </CTableRow>
                                </CTableBody>                   
                              </CTable>    
                      </CCardBody>
                    </CCard>
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Trash
