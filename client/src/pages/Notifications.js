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
import { useUsersContext } from "./../chat-app-new/context/usersContext";

import { newCountProjects } from './../http/adminAPI'

const columns = [
  {
      name: 'Дата/время',
      selector: row => row.date,
      sortable: true,
  },
  {
      name: 'Название проекта',
      selector: row => row.title,
      sortable: true,
  },
  {
      name: 'Заказчик',
      selector: row => row.receiverId,
      sortable: true,
  },
  {
      name: 'Менеджер',
      selector: row => row.managerId,
      sortable: true,
  },
  {
      name: 'Адрес',
      selector: row => row.address,
  },
  {
      name: 'Контакты',
      selector: row => row.contacts,
      sortable: true,
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

const Notifications = () => {

  const { projects: notifications } = useUsersContext();
  const { managers: zakazchiki } = useUsersContext();
  const { companys: comps } = useUsersContext();
  const { setNewProject, setCountProjects } = useUsersContext();

  const [projects, setProjects] = useState([]); 
  const [pending, setPending] = useState(true); 

  const [text, setText]= useState("");

  //поиск
  useEffect(() => {
		const filteredData = [...projects].filter(item=> (item.title + item.id + item.chatId)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
    //setSortWorkers(text === '' ? workersAll : filteredData); 
    setProjects(text === '' ? projects : filteredData) 
    //setWorkers(text === '' ? workers : filteredData);  
  }, [text]);

  //get Projects
  useEffect(() => {
    const arrProjects = []

    setCountProjects(0)

    const fetchData = async () => {
      // console.log("companys: ", comps)
      // console.log("managers: ", zakazchiki)
      // console.log("notifications: ", notifications)

      notifications.map(async (project) => {

        const manager = [...zakazchiki];
        let userIndex2 = zakazchiki?.findIndex((man) => man.id === project.managerId);  
        const userObject2 = manager[userIndex2];
        const managerName = userObject2?.fio ? userObject2.fio : ''
        const managerPhone = userObject2?.phone ? userObject2?.phone : ''
        
        let userObject = comps?.find((company) => company.id === project.companyId);  
        const companyName = userObject ? userObject?.title : ''

        const d = new Date(project.createdAt);
				const year = d.getFullYear();
				const month = String(d.getMonth()+1).padStart(2, "0");
				const day = String(d.getDate()).padStart(2, "0");
				const chas = d.getHours();
				const minut = String(d.getMinutes()).padStart(2, "0");
				const newDateMessage = `${day}.${month}.${year} ${chas}:${minut}`

        const newProject = {
          date: newDateMessage,
          title: project.name,
          receiverId: companyName,
          managerId: managerName,
          address: project.geo,
          contacts: managerPhone,
				}
        arrProjects.push(newProject)
      })

      setProjects(arrProjects) 

      setPending(false);
    }

    fetchData();
    
  }, [notifications])

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    <h2>Уведомления</h2>
                    
                    <CRow className="mb-3">
                      <CCol sm={3} >
                        <CFormInput placeholder="Поиск..." aria-label="City" onChange={(e)=>setText(e.target.value)}/>
                      </CCol>
                    </CRow>

                    <DataTable
                      columns={columns}
                      data={projects}
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

export default Notifications
