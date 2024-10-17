/* eslint-disable react/jsx-key */
import React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { useTableData } from './table/useTableData'
import TableHeader from './table/TableHeader'
import Filters from './table/Filters'

const StatusesList = () => {
  const { columns, data, setData, columnFilters, setColumnFilters, handleActive } = useTableData()

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

    // getPaginationRowModel: getPaginationRowModel(),

    enableRowSelection: true,
    getRowCanExpand: () => true,
  })

  return (
    <>
      <CRow className="mt-2">
        <CCol xs>
          <CCard className="mb-4">
            {/* <CCardHeader>Статусы проектов</CCardHeader> */}

            <CCardBody>
              <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
              <CTable
                style={{ overflow: 'hidden', width: '1262px', borderRadius: '5px' }}
                align="middle"
                className="mb-0 border"
                hover
                responsive
              >
                <CTableHead className="text-center" color="light">
                  {table.getHeaderGroups().map((headerGroup) => {
                    return (
                      <CTableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHeader
                              header={header}
                              //
                            />
                          )
                        })}
                      </CTableRow>
                    )
                  })}
                </CTableHead>
                <CTableBody>
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <CTableRow
                        style={{ position: 'relative' }}
                        onMouseEnter={handleActive}
                        onMouseLeave={handleActive}
                        className="text-center"
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <CTableDataCell
                              style={{
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                                padding: '0',
                                //   padding: '0.4rem 0.4rem',
                              }}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </CTableDataCell>
                          )
                        })}
                      </CTableRow>
                    )
                  })}
                </CTableBody>
                {/* <CTableFoot>
                  {table.getFooterGroups().map((footerGroup) => {
                    return (
                      <CTableRow>
                        {footerGroup.headers.map((footer) => {
                          return (
                            <CTableHeaderCell className="text-center">
                              {footer.isPlaceholder
                                ? null
                                : flexRender(footer.column.columnDef.footer, footer.getContext())}
                            </CTableHeaderCell>
                          )
                        })}
                      </CTableRow>
                    )
                  })}
                </CTableFoot> */}
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default StatusesList
