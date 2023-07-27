import React, { Suspense, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  CContainer, 
  CSpinner, 
  CButton, 
  CTable, 
  CTableRow, 
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import deleteIcon from 'src/assets/images/delete.png'
import editIcon from 'src/assets/images/pencil.png'
import { useUsersContext } from "../chat-app-new/context/usersContext";
import { delDistributionW } from 'src/http/adminAPI';

const DistributionW = () => {
  const { distributionsWork: messages } = useUsersContext();
  const [distributionsWork, setDistributionsWork]= useState([]);
  const [loading, setLoading]= useState(true);
  const [proj, setProj] = useState('');

  //get Distribution
  useEffect(() => {
    const fetchData = async () => {
			//let response = await getDistributions();
      console.log("distributionsW: ", messages)

      let strReceivers = ''

      const arrDitributions = []
      messages.map((distrib, index) => {
        // JSON.parse(distrib.receivers).map((receiver)=>{
        //   strReceivers = receiver.label + ' '
        // })

        const d = new Date(distrib.createdAt);
				const year = d.getFullYear();
				const month = String(d.getMonth()+1).padStart(2, "0");
				const day = String(d.getDate()).padStart(2, "0");
				const chas = d.getHours();
				const minut = String(d.getMinutes()).padStart(2, "0");
				const newDateMessage = `${day}.${month}.${year} ${chas}:${minut}`

        let space = /,/gi;
        //var newStr = str.replace(space, '<br>');

        const newDistribution = {
          id: distrib.id,
          text: distrib.text,
          image: distrib.image.split('5000/')[1] !=='' ? distrib.image : '',
          project: distrib.project,
          projectId: distrib.projectId ? distrib.projectId : '',
          receivers: distrib.receivers.replace(space, '<br/>'), //strReceivers,//JSON.parse(distrib.receivers)[index-1].label,
          datestart: newDateMessage,
          status: distrib.delivered ? "отправлено" : "запланировано",
				}
        //console.log(index)
        arrDitributions.push(newDistribution)
      })

      console.log("arrDitributions: ", arrDitributions)

      setDistributionsWork(arrDitributions) 
      setLoading(false)
    }

    fetchData();
    
  },[messages])

  {/* Удаление рассылки */}
  const removeDescription = async(desk) => {
    setDistributionsWork(distributionsWork.filter(p => p.id !== desk.id))
    //удаление сообщения в базе данных
    await delDistributionW(desk.id)
  }


  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                  <>
                    <h2>Рассылки</h2>
                      <Link to={'/distributionw_add'}><CButton color="primary" size="lg" >Новая рассылка</CButton></Link>
                      <br />
                      <br />
                      <CRow>
                        <CCol xs>
                          <CCard className="mb-4">
                            <CCardHeader>Рассылки для специалистов</CCardHeader>
                            <CCardBody>

                              <br /> 

                            {loading ? 
                                  
                              <CSpinner/> :

                              <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className='table-dark'>
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center">Дата</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Название проекта</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Картинка</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Категории</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center">Кол-во</CTableHeaderCell>    
                                    <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Управление</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {distributionsWork.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index} style={{height: '130px'}}>
                                      {/* <CTableDataCell>
                                        <div>{index+1}</div>
                                      </CTableDataCell> */}
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>{item.datestart}</div>
                                      </CTableDataCell>  
                                      <CTableDataCell className="text-center">
                                        <div>{item.project}</div>
                                      </CTableDataCell>    
                                      <CTableDataCell className="text-center">
                                        {item.image.endsWith('.pdf') ?
                                        <iframe src={item.image} height="120px" width="200px" title="myFramePdf"/>
                                        : <div>{item.image ? <a href={item.image} target='_blank' rel="noreferrer"><img src={item.image} alt='' width={230} height={120} style={{objectFit: 'contain'}}></img></a> : ''}</div>
                                        }
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div dangerouslySetInnerHTML={{__html: item.receivers}} />
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>100</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.status}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        {/* <Link to={'/distributionw_planer'} state={{ project: proj}}>
                                          <CButton color="light" style={{marginRight: '10px'}}>
                                            <img src={editIcon} alt='' width='10px' />
                                          </CButton>
                                        </Link> */}

                                        {item.projectId ? 
                                          <Link to={'/distributionw_add'} state={{ project: item.projectId}}><CButton color="light" style={{marginRight: '10px'}}><img src={editIcon} alt='' width='10px' /></CButton></Link>
                                          :<Link to={''} state={{ project: `${proj}`, }}><CButton color="light" style={{marginRight: '10px'}}><img src={editIcon} alt='' width='10px' /></CButton></Link>}
                                        
                                        <CButton color="light" onClick={() => removeDescription(item)}>
                                          <img src={deleteIcon} alt='' width='10px' />
                                        </CButton>
                                      </CTableDataCell>
                                    </CTableRow>
                                  ))}
                                </CTableBody>
                              </CTable>
                            }                              
                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                  </>
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DistributionW
