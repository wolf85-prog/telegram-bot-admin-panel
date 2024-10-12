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

const Projects = () => {
  const { columns, data, setData, columnFilters, setColumnFilters } = useTableData()

  const [yearAndMonth, setYearAndMonth] = useState([2024, 10]);

  const [showTable, setShowTable] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

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
                            <Filters setShowTable={setShowTable} showTable={showTable} columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                            {
                              showTable ? 
                              // <CTable align="middle" className="mb-0 border" hover responsive style={{borderRadius: '6px'}}>
                              //   <CTableHead className="text-center" color="light">
                              //     {table.getHeaderGroups().map((headerGroup) => {
                              //       return (
                              //         <CTableRow key={headerGroup.id}>
                              //           {headerGroup.headers.map((header, index) => {
                              //             return (
                              //               <TableHeader
                              //                 header={header}
                              //                 key={index}
                              //                 //
                              //               />
                              //             )
                              //           })}
                              //         </CTableRow>
                              //       )
                              //     })}
                              //   </CTableHead>
                              //   <CTableBody>
                              //     {table.getRowModel().rows.map((row, index) => {
                              //       return (
                              //         <CTableRow className="text-center" key={index}>
                              //           {row.getVisibleCells().map((cell, index) => {
                              //             return (
                              //               <CTableDataCell key={index}> 
                              //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              //               </CTableDataCell>
                              //             )
                              //           })}
                              //         </CTableRow>
                              //       )
                              //     })}
                              //   </CTableBody>
                              //   <CTableFoot>
                              //     {table.getFooterGroups().map((footerGroup, index) => {
                              //       return (
                              //         <CTableRow key={index}>
                              //           {footerGroup.headers.map((footer, index) => {
                              //             return (
                              //               <CTableHeaderCell className="text-center" key={index}>
                              //                 {footer.isPlaceholder
                              //                   ? null
                              //                   : flexRender(footer.column.columnDef.footer, footer.getContext())}
                              //               </CTableHeaderCell>
                              //             )
                              //           })}
                              //         </CTableRow>
                              //       )
                              //     })}
                              //   </CTableFoot>
                              // </CTable>
                              <Calendar2 showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                              :
                              <Calendar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
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
