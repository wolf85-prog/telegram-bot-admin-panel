import React, { Suspense, useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import DataTable, { createTheme } from 'react-data-table-component';
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CFormInput,
} from '@coreui/react'
import { useUsersContext } from "../chat-app-new/context/usersContext";

import { getAllPretendent } from './../http/workerAPI'

const columns = [
  {
      name: 'Дата',
      selector: row => "01.01 | 0:00",
      sortable: true,
  },
  {
      name: 'Проект',
      selector: row => "Название проекта",
      sortable: true,
      width: '15%',
  },
  
  {
      name: 'ФИО',
      selector: row => row.family +" "+ row.name,
      sortable: true,
      width: '20%',
  },
  
  {
      name: 'Специальности',
      selector: row => row.worklist,
      sortable: true,
      width: '25%',
  },
  {
      name: 'Ранг',
      selector: row => row.stag,
      sortable: true,
  },
  {
      name: 'Комментарий',
      selector: row => row.stag,
      sortable: true,
  },
  {
      name: 'Телефон',
      selector: row => row.phone,
      sortable: true,
      width: '10%',
  },
];

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  rows: {
      style: {
          //minHeight: '72px', // override the row height
      },
  },
  headCells: {
      style: {
          fontSize: '16px',
          //paddingLeft: '8px', // override the cell padding for head cells
          //paddingRight: '8px',
      },
  },
  cells: {
      style: {
          //paddingLeft: '8px', // override the cell padding for data cells
          //paddingRight: '8px',
      },
  },
};

createTheme('solarized', {
  text: {
    primary: '#fff',
    secondary: '#2aa198',
  },
  background: {
    default: '#131c21',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#ffffff13',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');


//Workers.js
const Workers = () => {

  //const { pretendents } = useUsersContext();

  const [spec, setSpec] = useState([]); 
  const [pending, setPending] = useState(true);  

  //get pretendents
  useEffect(() => {
    const arrWorkers = []
    let specStr
    let specArr

    const fetchData = async () => {

      let pretendents = await getAllPretendent();
      console.log("pretendents: ", pretendents)

      pretendents.map(async (worker) => {
        specStr = ''
        specArr = []

        if (worker.worklist) {
          specArr = JSON.parse(worker.worklist)
        }
        
        if (specArr) {
          specArr.map(item => specStr = specStr + item.spec + ', ' )
        } else {
          specStr = ''
        }
        

        const newWorker = {
          family: worker.userfamily,
          name: worker.username,
          phone: worker.phone,
          dateborn: worker.dateborn,
          city: worker.city,
          companys: worker.companys,
          stag: worker.stag,
          worklist: specStr,
          chatId: worker.chatId,
				}
        arrWorkers.push(newWorker)
      })

      setSpec(arrWorkers) 

      setPending(false);
    }

    fetchData();
    
  },[])

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    <h2>Претенденты</h2>
                    
                    <CRow className="mb-3">
                      <CCol sm={3} >
                        <CFormInput placeholder="Поиск..." aria-label="City"/>
                      </CCol>
                    </CRow>

                    <DataTable
                      columns={columns}
                      data={spec}
                      fixedHeader
                      pagination
                      theme="solarized"
                      progressPending={pending}
			                progressComponent={<CSpinner />}
                      customStyles={customStyles}
                    />
                  </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Workers
