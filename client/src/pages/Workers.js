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

import { getAllPretendent, getWorkers } from './../http/workerAPI'

const columns = [
  {
      name: 'Дата',
      selector: row => row.date, //"01.01 | 0:00",
      sortable: true,
      width: '12%',
  },
  {
      name: 'Проект',
      selector: row => row.project,
      sortable: true,
      width: '15%',
  },
  
  {
      name: 'ФИО',
      selector: row => row.worker, //row.family +" "+ row.name,
      sortable: true,
      width: '20%',
  },
  
  {
      name: 'Специальности',
      selector: row => "", //row.worklist,
      sortable: true,
      width: '25%',
  },
  {
      name: 'Ранг',
      selector: row => "", //row.stag,
      sortable: true,
  },
  {
      name: 'Комментарий',
      selector: row => "", //row.stag,
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
  const { projects } = useUsersContext();
  const { setNewPretendent } = useUsersContext();

  const [spec, setSpec] = useState([]); 
  const [pending, setPending] = useState(true);  

  //get pretendents
  useEffect(() => {
    const arrWorkers = []
    let specStr
    let specArr

    setNewPretendent(false)

    const fetchData = async () => {

      let pretendents = await getAllPretendent();
      console.log("pretendents: ", pretendents)

      //console.log("projects: ", projects)

      let workers = await getWorkers()

      //console.log("workers: ", workers)

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

        let userObject = projects.find((proj) => proj.projectId === worker.projectId);  
        const projectName = userObject?.name

        let userObject2 = workers.find((item) => item.chatId === worker.receiverId);  
        const workerName = userObject2?.userfamily + " "+ userObject2?.username

        const d = new Date(worker.createdAt).getTime() + 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;
        console.log(newDate)

        const newWorker = {
          date: newDate, //newDate,
          project: projectName,
          worker: workerName, 
          //worklist: specStr,
          //phone: worker.phone,

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
