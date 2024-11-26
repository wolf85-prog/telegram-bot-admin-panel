import React, { Suspense, useState, useEffect } from 'react'
import { CContainer, CSpinner, CCard, CCardBody, CTable, CTableDataCell, CTableRow, CTableHeaderCell, CTableBody, CTableHead } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import { useUsersContext } from "../chat-app-new/context/usersContext";

import statusData from 'src/data/statusData';
import cities from 'src/data/cities';
import specifikaData from 'src/data/specifikaData';
import vids from 'src/data/vids';
import comtegs from 'src/data/comtegs';
import specOnlyData2 from 'src/data/specOnlyData2';

import { getProjectsDel, getProjectId, editProject } from '../http/projectAPI'
import Filters from 'src/components/table/Filters2'

const Trash = () => {
  const { companysAll, managersAll, workersAll } = useUsersContext();

  const [projects, setProjects] = useState([])
  const [showProject, setShowProject] = useState(false)

  const [id, setId] = useState('');

  const [playPoster, setPlayPoster] = useState(false)

  const [height, setHeight] = useState(600)

  useEffect(()=> {
    //1
    const fetchData = async() => {
      const projs = await getProjectsDel()
      console.log("projsDel: ", projs)

      // const sortProj = [...projs].sort((a, b) => {  
      //   if (a.dateStart < b.dateStart)
      //     return -1;
      //   if (a.dateStart > b.dateStart)
      //       return 1;
      //   return 0;
      // })

      setProjects(projs)
    }

    fetchData()
    
}, [])


const recoveryProject = async() => {
  const data = {
    deleted: null
  }
  //сохранить изменения в базе
  const resSave = await editProject(data, id)

  setProjects([...projects].filter(item=>item.id !== id))

  setShowProject(false)
}


  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Корзина</h2> */}
                    <CCard className="mb-4">
                      <p style={{position: 'absolute', top: '-18px', right: '15px', fontSize: '14px', color: '#f3f3f3'}}>
                        Всего: {projects.length}
                      </p>
                      <CCardBody style={{padding: '12px'}}>
                        {!showProject ? <Filters /> : '' }
                        {!showProject ? 
                        <CTable align="middle" className="mb-0 border" hover responsive style={{fontSize: '16px',overflow: 'hidden', width: '1300px', borderRadius: '5px' }}>
                          <CTableHead className="text-center" color="light">
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center" style={{width: '30px'}}>№</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '30px'}}>Дата</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{width: '30px'}}>ID</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{width: '250px'}}>Проект</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}>Город</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Специфика</CTableHeaderCell>                      
                                    <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Комментарий</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>      
                                <CTableBody> 
                                { projects.map((item, index)=> (
                                    <CTableRow key={item.id} v-for="item in tableItems" style={{lineHeight: '14px'}}>
                                      <CTableDataCell className="text-center" style={{position: 'relative'}}>
                                        {index+1}                        
                                      </CTableDataCell> 
                                      <CTableDataCell className="text-center" style={{position: 'relative', width: '100px'}}>
                                        {new Date(item.dateStart)?.toLocaleString().split(',')[0]}                        
                                      </CTableDataCell> 
                                      <CTableDataCell className="text-center">
                                        {item.id} 
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center" style={{cursor: 'pointer'}}>
                                        {item.name && item.name.length > 25 ? item.name.substr(0, 25) + '...' : item.name}   
                                      </CTableDataCell>     
                                      <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                       {item.city}
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center widthSpace">
                                        {item.specifika}
                                      </CTableDataCell>   
                                      <CTableDataCell className="text-center">
                                        {item.comment && item.comment.length > 25 ? item.comment.substr(0, 25) + '...' : item.comment}
                                      </CTableDataCell>            
                                    </CTableRow>
                                  ))
                                } 
                                </CTableBody>                   
                        </CTable> 
                        : ''
                        }  
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
