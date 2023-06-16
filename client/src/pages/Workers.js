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



const columns = [
  {
      name: 'Фамилия',
      selector: row => row.family,
      sortable: true,
  },
  {
      name: 'Имя',
      selector: row => row.name,
      sortable: true,
  },
  {
      name: 'Телефон',
      selector: row => row.phone,
      sortable: true,
  },
  {
      name: 'Дата рождения',
      selector: row => row.dateborn,
      sortable: true,
  },
  {
      name: 'Город',
      selector: row => row.city,
  },
  {
      name: 'Компании',
      selector: row => row.companys,
      sortable: true,
      width: '20%',
  },
  {
      name: 'Опыт работы',
      selector: row => row.stag,
      sortable: true,
  },
  {
      name: 'Специальности',
      selector: row => row.worklist,
      sortable: true,
      width: '20%',
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


const Workers = () => {

  const { workers } = useUsersContext();

  const [spec, setSpec] = useState([]); 
  const [pending, setPending] = useState(true);  

  //get Projects
  useEffect(() => {
    const arrWorkers = []
    let specStr
    let specArr

    const fetchData = async () => {
      console.log("workers: ", workers)

      workers.map(async (worker) => {
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
    
  },[workers])

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    <h2>Специалисты</h2>
                    
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
