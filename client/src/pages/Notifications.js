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
import { getCompanys, getManagers } from './../http/adminAPI.js'



const columns = [
  {
      name: 'Дата/время',
      selector: row => row.date,
  },
  {
      name: 'Название проекта',
      selector: row => row.title,
  },
  {
      name: 'Заказчик',
      selector: row => row.receiverId,
  },
  {
      name: 'Менеджер',
      selector: row => row.managerId,
  },
  {
      name: 'Адрес',
      selector: row => row.address,
  },
  {
      name: 'Контакты',
      selector: row => row.contacts,
  },
];

const Notifications = () => {

  const { projects: notifications } = useUsersContext();
  const { setNewProject } = useUsersContext();
  const [projects, setProjects] = useState([]); 

  //const [projects, setProjects]= useState([]);
  const [pending, setPending] = useState(true);

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

  //get Projects
  useEffect(() => {
    setNewProject(false)

    const arrProjects = []

    const fetchData = async () => {

      let companys = await getCompanys()

      let managers = await getManagers()

      notifications.map(async (project) => {

        const compan = [...companys];
        let userIndex = companys.findIndex((company) => company.id === project.companyId);  
        const userObject = compan[userIndex];
        const companyName = userObject.propertys["Название компании"].title[0].plain_text

        const manager = [...managers];
        let userIndex2 = manager.findIndex((man) => man.id === project.managerId);  
        const userObject2 = manager[userIndex2];
        const managerName = userObject2.fio
        const managerPhone = userObject2.phone

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
    
  },[notifications])

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
                        <CFormInput placeholder="Поиск..." aria-label="City"/>
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
