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
import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { delDistribution, getDistributions } from 'src/http/adminAPI';
import MyModal from "../components/MyModal/MyModal";
import Close from "../assets/images/close.svg"

const Distribution = () => {
  const { users: zakazchiki } = useUsersContext();
  const [distributions, setDistributions]= useState([]);
  const [loading, setLoading]= useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [userReceivers, setUserReceivers]= useState([]);
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  //get Distribution
  useEffect(() => {
    const fetchData = async () => {
			let messages = await getDistributions();
      //console.log("distributions: ", messages)

      let strReceivers = ''
      let countSuccess = 0

      const arrDitributions = []
      messages.map((distrib, index) => {
        countSuccess = 0
        
        JSON.parse(distrib.receivers).map((receiver)=>{
          strReceivers = receiver.label + ' '
          if (receiver.status === 200) {
            countSuccess = countSuccess + 1
          }  
        })

        const d = new Date(distrib.createdAt);
				const year = d.getFullYear();
				const month = String(d.getMonth()+1).padStart(2, "0");
				const day = String(d.getDate()).padStart(2, "0");
				const chas = d.getHours();
				const minut = String(d.getMinutes()).padStart(2, "0");
				const newDateMessage = `${day}.${month}.${year} ${chas}:${minut}`

        const newDistribution = {
          id: distrib.id,
					name: distrib.name,
          text: distrib.text,
          image: distrib.image.split('5000/')[1] !=='' ? distrib.image: '',
          button: distrib.button,
          receivers: countSuccess, //strReceivers, //JSON.parse(distrib.receivers)[index-1].label,
          datestart: newDateMessage,
          status: distrib.delivered ? "отправлено" : "не отправлено",
          count: JSON.parse(distrib.receivers).length,
          users: JSON.parse(distrib.receivers)
				}
        //console.log(index)
        arrDitributions.push(newDistribution)
      })

      setDistributions(arrDitributions) 
      setLoading(false)
    }

    fetchData();
    
  },[])

  {/* Удаление рассылки */}
  const removeDescription = async(desk) => {
    setDistributions(distributions.filter(p => p.id !== desk.id))
    //удаление сообщения в базе данных
    await delDistribution(desk.id)
  }

  const showReceivers = (users) => {
    console.log("users: ", zakazchiki)
    console.log("users2: ", users)

    setVisibleModal(true)
    let count = 0
    let count2 = 0
    let arrReceiver = []

    users.map((item, index)=> {
      if (item.status === 200) {
        count++
      } else {
        count2++
      }
      const worker = zakazchiki.find((i)=> i.chatId === item.value)
      //console.log("worker: ", worker)
      const obj = {
        user: item.value,
        status: item.status,
        userfamily: worker?.name,
        username: '',
      }
      arrReceiver.push(obj)
    })
    setCount(count)
    setCount2(count2)
    setUserReceivers(arrReceiver)
    //setUsers(arrReceiver)
    //console.log(JSON.stringify(users))
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
                      <Link to={'/distribution_add'}><CButton color="primary" size="lg" >Новая рассылка</CButton></Link>
                      <br />
                      <br />
                      <CRow>
                        <CCol xs>
                          <CCard className="mb-4">
                            <CCardHeader>Рассылки</CCardHeader>
                            <CCardBody>

                              <br /> 

                            {loading ? 
                                  
                              <CSpinner/> :

                              <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className='table-dark'>
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center">Дата</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Картинка</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Кнопка</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Текст</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Получатели</CTableHeaderCell>   
                                    <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Управление</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {distributions.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>
                                      {/* <CTableDataCell>
                                        <div>{index+1}</div>
                                      </CTableDataCell> */}
                                      <CTableDataCell className="text-center">
                                        <div>{item.datestart}</div>
                                      </CTableDataCell>      
                                      <CTableDataCell className="text-center">
                                        {item.image.endsWith('.pdf') ?
                                        <iframe src={item.image} height="120px" width="200px" title="myFramePdf"/>
                                        : <div>{item.image ? <a href={item.image} target='_blank' rel="noreferrer"><img src={item.image} alt='' width={230} height={120} style={{objectFit: 'contain'}}></img></a> : ''}</div>
                                        }
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.button}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>{item.text}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center" onClick={()=>showReceivers(item.users)}>
                                        <div>{item.count} | {item.receivers}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.status}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
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

                          <MyModal alignment="center" visible={visibleModal} setVisible={setVisibleModal} onClose={() => setVisibleModal(false)}>
                                          {/* <CModalHeader>
                                            <CModalTitle>Получатели рассылки</CModalTitle>
                                          </CModalHeader> */}
                                          <div style={{paddingTop: '25px'}}>
                                            <CRow className="mb-3" >
                                              <CCol sm={9} >
                                                <h3>Получатели</h3>
                                              </CCol>
                                            </CRow>
                                          </div>
                                          
                                          <img onClick={()=>setVisibleModal(false)} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/>
                                          <CCardBody>

                                          {/* Рассылка: 800 | Доставлен: 600 | Не доставлено: 200  */}
                                          <p style={{display: 'flex', justifyContent: 'space-between'}}><span>Рассылка: {count+count2}</span> <span>Доставлено: {count}</span> <span> Не доставлено: {count2}</span></p>  

                                            <div className="scroll-table">
                                              <CTable align="middle" className="mb-0" responsive style={{color: '#ffffff'}}>
                                                <CTableHead className='table-dark'>
                                                  <CTableRow>
                                                    <CTableHeaderCell scope="col" style={{width: '45px'}}>№</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col"style={{width: '110px'}}>TelegramID</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{width: '170px'}}>ФИО</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{width: '100px'}}>Статус</CTableHeaderCell>
                                                  </CTableRow>
                                                </CTableHead>
                                              </CTable>	
                                              <div className="scroll-table-body" style={{height: '300px', overflowX: 'auto'}}>
                                                <CTable>
                                                  <CTableBody style={{height: '300px', overflowX: 'auto'}}>
                                                  {userReceivers.map((item, index) => (
                                                    <CTableRow key={index+1}>
                                                      <CTableHeaderCell style={{width: '45px'}} scope="row">{index < 9 ? '0'+(index+1) : index+1}</CTableHeaderCell>
                                                      <CTableDataCell style={{width: '110px'}}>{item.user}</CTableDataCell>
                                                      <CTableDataCell style={{width: '170px'}}>{item.userfamily} {item.username}</CTableDataCell>
                                                      <CTableDataCell className='text-center' style={{width: '100px', color: item.status === 200 ? '#7070e7' : 'red'}}>{item.status === 200 ? "Получено" : "Не получено"}</CTableDataCell>
                                                    </CTableRow> 
                                                  ))
                                                  }   
                                                  </CTableBody>
                                                </CTable>
                                              </div>	
                                            </div>

                                            {/* <p style={{display: 'flex', justifyContent: 'space-between'}}><span>Получено: {count}</span> <span>Не получено: {count2}</span></p>   */}
                                          </CCardBody> 
                                          
                          </MyModal> 
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

export default Distribution
