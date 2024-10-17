/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { CFormCheck } from '@coreui/react'
import { useMemo, useState } from 'react'
//import { format } from '../../../utils'

import estimates from '../../data/data'

export const useTableData = () => {
  const [data, setData] = useState(estimates)
  const [columnFilters, setColumnFilters] = useState()
  const [active, setActive] = useState(false)
  const columnHelper = createColumnHelper()

  function handleActive() {
    console.log(active)
    setActive(!active)
  }

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'selection',
        size: 30,
        header: ({ table }) => (
          <CFormCheck
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <CFormCheck checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
        ),
        footer: ({ table }) =>
          table.getFilteredRowModel().rows.reduce((acc, val) => {
            acc += 1
            return acc
          }, 0),
      }),
      columnHelper.accessor('date', {
        id: 'date',
        header: 'Дата',
        size: 95,
      }),
      columnHelper.accessor('vid', {
        id: 'vid',
        header: 'Вид работ',
        size: 300,
        minSize: 150,
        cell: (value) => (
          <Link to={'/business/estimates/estimate'} className="nav-link">
            {value.getValue()}
          </Link>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('manager', {
        id: 'fio',
        header: 'ФИО',
        size: 300,
        minSize: 150,
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),

      columnHelper.accessor('specialnost', {
        id: 'specialnost',
        header: 'Специальность',
        size: 300,
        minSize: 150,
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),

      columnHelper.accessor('hours', {
        id: 'stavka',
        header: 'Ставка',
        size: 57,
        footer: ({ table }) =>
          table.getFilteredRowModel().rows.reduce((acc, val) => {
            acc += Number(val.getValue('hours'))
            return acc
          }, 0),
      }),
      columnHelper.accessor('comteg', {
        id: 'comteg',
        header: 'Комтег',
        size: 100,
        cell: '',

      }),
      columnHelper.accessor('comment', {
        id: 'comment',
        header: 'Комментарий',
        size: 50,
        // cell: StatusCell,
        cell: (value) => {
          const { icon } = value.getValue() || {}

          return icon
        },
      }),
    ],
    [],
  )

  return { columns, data, setData, columnFilters, setColumnFilters, handleActive }
}
