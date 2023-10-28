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

import { 
  getWorkerId, 
  getProjects3, 
  newPretendent 
} from './../http/adminAPI';
import { getAllPretendent, getWorkers, getWorkersNotion, getWorkerNotionId } from './../http/workerAPI'

const columns = [
  {
      name: 'Дата',
      selector: row => row.date, //"01.01 | 0:00",
      sortable: true,
      maxWidth: '50px',
      center: true,
  },
  {
      name: 'Проект',
      selector: row => row.project,
      sortable: true,
      maxWidth: '120px',
      center: true,
  },
  
  {
      name: 'ФИО',
      selector: row => row.worker, //row.family +" "+ row.name,
      sortable: true,
      maxWidth: '180px',
      center: true,
  },
  
  {
      name: 'Специальность',
      selector: row => row.worklist,
      sortable: true,
      maxWidth: '250px',
      center: true,
  },
  {
      name: 'U.L.E.Y',
      selector: row => row.rang,
      sortable: true,
      maxWidth: '50px',
      center: true,
  },
  {
      name: 'Комментарий',
      selector: row => row.comment,
      sortable: true,
      maxWidth: '180px',
      center: true,
  },
  {
      name: 'Телефон',
      selector: row => row.phone,
      sortable: true,
      maxWidth: '150px',
      center: true,
  },
];

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  rows: {
      style: {
          //minHeight: '72px', // override the row height
          textAlign: 'cenetr'
      },
  },
  headCells: {
      style: {
          fontSize: '16px',
          // paddingLeft: '8px', // override the cell padding for head cells
          // paddingRight: '8px',
          //textAlign: 'center',
      },
  },
  cells: {
      style: {
          // paddingLeft: '8px', // override the cell padding for data cells
          // paddingRight: '8px',
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
  //const { projects } = useUsersContext();
  const { setCountPretendent } = useUsersContext();

  const [projects, setProjects] = useState([]); 
  const [spec, setSpec] = useState([]); 
  const [pending, setPending] = useState(true);  

  //get pretendents
  useEffect(() => {
    const arrWorkers = []
    let specStr
    let specArr

    setCountPretendent(0)

    const fetchData = async () => {

      let pretendents = await getAllPretendent();
      console.log("pretendents: ", pretendents)

      let workers = await getWorkers()
      //console.log("workers: ", workers)

      let projects = await getProjects3();
      console.log("projects: ", projects)

      setProjects(projects) 

      pretendents.map(async (worker) => {

        let userObject = projects.find((proj) => proj.id === worker.projectId);  
        const projectName = userObject?.name

        let userObject2 = workers.find((item) => item.chatId === worker.receiverId);  
        const workerName = userObject2?.userfamily + " "+ userObject2?.username

        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;

        //worklist
        const workNotions = await getWorkerNotionId(worker.receiverId)
        console.log("workNotions: ", workNotions[0])

        specStr = ''
        specArr = []

        
        if (workNotions[0]) {
          workNotions[0].spec.map(item => specStr = specStr + item.name + ', ' )
        } else {
          specStr = ''
        }

        setTimeout(()=> {
          const newWorker = {
            date: newDate, //newDate,
            project: projectName,
            worker: workerName, 
            worklist: specStr,
            rang: workNotions[0]?.rank,
            comment: workNotions[0]?.comment,
            phone: workNotions[0]?.phone,

          }
          arrWorkers.push(newWorker)

          setSpec(arrWorkers) 

          setPending(false);
        }, 3000)
        
      })  
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
