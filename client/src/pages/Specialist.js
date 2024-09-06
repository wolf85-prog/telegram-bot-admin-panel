import React, { Suspense, useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader, AppRightbar } from '../components/index'
import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux'
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCollapse,
  CButton, 
  CTooltip,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'
import { useUsersContext } from "../chat-app-new/context/usersContext";

import { getWorkers } from './../http/specAPI'

import Close from "../assets/images/close.svg"

//Workers.js
const Specialist = () => {

  const dispatch = useDispatch()
  const rigthbarShow = useSelector((state) => state.rigthbarShow)

  const [loading, setLoading]= useState(true);
  const [text, setText]= useState("");
  const [spec, setSpec] = useState([]); 
  const [visibleXL, setVisibleXL] = useState(false)
  const [modalWorker, setModalWorker] = useState({})

  const [fio, setFio] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [speclist, setSpeclist] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [telegram, setTelegram] = useState('');
  const [skill, setSkill] = useState('');
  const [reyting, setReyting] = useState('');
  const [promo, setPromo] = useState('');
  const [rank, setRank] = useState('');
  const [merch, setMerch] = useState('');
  const [company, setCompany] = useState('');
  const [inn, setInn] = useState('');
  const [comteg, setComteg] = useState('');
  const [comteg2, setComteg2] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comment2, setComment2] = useState('');
  const [passport, setPassport] = useState('');
  const [dogovor, setDogovor] = useState('');
  const [samozanjatost, setSamozanjatost] = useState('');
  const [passportScan, setPassportScan] = useState('');

  //поиск
  // useEffect(() => {
	// 	const filteredData = pretendents.filter(user=> (user.project + user.workerFamily + user.workerName)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
  //   setSpec(text === '' ? pretendents : filteredData) 
  // }, [text]);


  //-----------------------------------------------------------------------------------------
  //			get specialist
  //-----------------------------------------------------------------------------------------
  useEffect(() => {
    const arrWorkers = []

    const fetchData = async () => {

      let workers = await getWorkers()
      console.log("specialist: ", workers)

      workers.map(async (worker, i) => {

        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;

        const newWorker = {
          fio: worker.fio,
          telegram: worker.chatId, 
          phone: worker.phone, 
          phone2: worker.phone2,
          spec: worker.specialization,
          city: worker.city, 
          skill: worker.skill,
          promo: worker.promoId, 
          rank: worker.rank, 
          merch: worker.merch,  
          company: worker.company, 
          comteg: worker.comteg, 
          comteg2: worker.comteg2, 
          comment: worker.comment, 
          comment2: worker.comment2, 
          age: worker.age, 
          reyting: worker.reyting, 
          inn: worker.inn, 
          passport: worker.passport, 
          profile: worker.profile, 
          dogovor: worker.dogovor ? '🟢' : '🔴', 
          samozanjatost: worker.samozanjatost ? '🟢' : '🔴', 
          passportScan: worker.passportScan, 
          email: worker.email, 
        }
        arrWorkers.push(newWorker)

        setSpec(arrWorkers) 
      })  

      setLoading(false)
    }

    fetchData();
    
  },[])

  const clickFio = (worker)=> {
    //console.log(worker)
    setVisibleXL(true)
    setModalWorker(worker)

    setFio(worker.fio)
    setCity(worker.city)
    setAge(worker.age)
    setSpeclist(worker.spec)
    setPhone(worker.phone)
    setPhone2(worker.phone2)
    setTelegram(worker.telegram)
    setSkill(worker.skill)

    setReyting(worker.reyting)
    setPromo(worker.promo)
    setRank(worker.rank)
    setMerch(worker.merch)
    setCompany(worker.company)
    setInn(worker.inn)
    setComteg(worker.comteg)
    setComteg2(worker.comteg2)
    setEmail(worker.email)
    setComment(worker.comment)
    setComment2(worker.comment)

    setPassport(worker.passport)
    setDogovor(worker.dogovor)
    setSamozanjatost(worker.samozanjatost)
    setPassportScan(worker.passportScan)

  }


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
                        <CFormInput placeholder="Поиск..." onChange={(e)=>setText(e.target.value)} aria-label="spec"/>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol style={{textAlign: 'center'}}>
                        <CCard className="mb-4"> 
                            <CCardBody>
                              {loading ? 
                                      
                                <CSpinner/> :

                                <CTable align="middle" className="mb-0 border" hover responsive bordered>
                                  <CTableHead className='table-light'>
                                    <CTableRow>
                                      <CTableHeaderCell className='widthSpace'>ФИО</CTableHeaderCell>  
                                      <CTableHeaderCell className='widthSpace'>Телеграм</CTableHeaderCell> 
                                      <CTableHeaderCell className='widthSpace'>Телефон</CTableHeaderCell> 
                                      <CTableHeaderCell className='widthSpace'>Специальность</CTableHeaderCell>  
                                      <CTableHeaderCell className='widthSpace'>Телефон №2</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Город</CTableHeaderCell>                         
                                      <CTableHeaderCell className='widthSpace'>Навык</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Промокод</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Проекты</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Мерч</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Прокатная компания</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Комтег</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Комтег №2</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Комментарии</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Комментарии №2</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Год рождения</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Рейтинг</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>ИНН</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Паспорт</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Профиль</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Д</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>С</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Паспорт [скан]</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Почта</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>                                  
                                  {spec.map((item, index) => (
                                      <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell onClick={()=>clickFio(item)} className="text-center widthSpace" style={{cursor: 'pointer'}}>
                                          {item.fio}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                          {item.telegram}
                                        </CTableDataCell>
                                         <CTableDataCell className="text-center widthSpace">
                                          {item.phone}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                         {item.spec}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.phone}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                          {item.city}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.skill}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.promo}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.rank}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.merch}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.company}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.comteg}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.comteg2}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.comment}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.comment2}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.age}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.reyting}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.inn}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.passport}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.profile}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.dogovor}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.samozanjatost}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.passportScan}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.email}
                                        </CTableDataCell>

                                      </CTableRow>
                                      ))
                                    }
                                </CTableBody>                   
                                </CTable>
                              }
                            </CCardBody>
                          </CCard>
                        </CCol>
                    </CRow>
                  </Suspense>
            </CContainer>

            <CModal
              size="lg"
              visible={visibleXL}
              onClose={() => setVisibleXL(false)}
              aria-labelledby="OptionalSizesExample1"
            >
              <CModalBody>
                  
                  <div>
                      <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                        <rect width="250px" height="250px" fill="#007aff"></rect> 
                      </svg>
                      <div style={{position: 'absolute', top: '5px', left: '275px', color: '#fff', fontSize: '33px', zIndex: '100'}}>
                        {/* <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '5px', left: '275px'}}> */}
                        <div className="text-field">
                          <input type="text" name="fio" id="fio" value={fio} onChange={(e) => setFio(e.target.value)} style={{backgroundColor: '#1d1f2b', border: '0', color: '#f3f3f3'}}></input>
                        </div>
                        {/* </span> */}
                      </div>
                      
                      <div style={{position: 'relative', height: '1080px'}}>
                        {/* <div style={{position: 'absolute', top: '30px', left: '260px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '510px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Город</p>
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Дата </p>   
                        </div>  */}
                        <div style={{position: 'absolute', top: '50px', left: '260px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '510px'}}>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} style={{width: '250px'}}/>
                          </div>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} style={{width: '250px'}}/>
                          </div>
                        </div>

                        <div style={{position: 'absolute', top: '95px', left: '260px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '510px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '510px'}}>Специальность</p>  
                        </div> 
                        <div style={{position: 'absolute', top: '115px', left: '260px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '510px'}}>     
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="speclist" id="speclist" value={speclist} onChange={(e) => setSpeclist(e.target.value)} style={{width: '510px'}}/>
                          </div>   
                        </div>

                        <div style={{position: 'absolute', top: '160px', left: '260px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '510px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Телефон</p>
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Телефон </p>   
                        </div> 
                        <div style={{position: 'absolute', top: '180px', left: '260px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '510px'}}>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/>
                          </div>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="phone2" id="phone2" value={phone2} onChange={(e) => setPhone2(e.target.value)} style={{width: '250px'}}/>
                          </div>
                        </div>

                        <div style={{position: 'absolute', top: '225px', left: '260px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '510px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Telegram</p>
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Навык</p>   
                        </div>                       
                        <div style={{position: 'absolute', top: '245px', left: '260px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '510px'}}>                        
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="telegram" id="telegram" value={telegram} onChange={(e) => setTelegram(e.target.value)} style={{width: '250px'}}/>
                          </div>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="skill" id="skill" value={skill} onChange={(e) => setSkill(e.target.value)} style={{width: '250px'}}/>
                          </div>  
                        </div>

                        <div style={{position: 'absolute', top: '290px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Рейтинг</p>
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Промокод</p>
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Проекты</p>   
                        </div>

                        <div style={{position: 'absolute', top: '310px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="reyting" id="reyting" value={reyting} onChange={(e) => setReyting(e.target.value)} style={{width: '250px'}}/>
                          </div> 
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="promo" id="promo" value={promo} onChange={(e) => setPromo(e.target.value)} style={{width: '250px'}}/>
                          </div>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '250px'}}/>
                          </div>    
                        </div>

                        <div style={{position: 'absolute', top: '355px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Мерч</p> 
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Прокатная компания</p>
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>ИНН</p>   
                        </div>
                        <div style={{position: 'absolute', top: '375px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="merch" id="merch" value={merch} onChange={(e) => setMerch(e.target.value)} style={{width: '250px'}}/>
                          </div> 
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="company" id="company" value={company} onChange={(e) => setCompany(e.target.value)} style={{width: '250px'}}/>
                          </div> 
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="inn" id="inn" value={inn} onChange={(e) => setInn(e.target.value)} style={{width: '250px'}}/>
                          </div>    
                        </div>

                        <div style={{position: 'absolute', top: '420px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Комтег</p>
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Комтег №2</p>
                          <p style={{fontSize: '12px', color: '#858282', width: '250px'}}>Email</p>   
                        </div>
                        <div style={{position: 'absolute', top: '440px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="comteg" id="comteg" value={comteg} onChange={(e) => setComteg(e.target.value)} style={{width: '250px'}}/>
                          </div> 
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="comteg2" id="comteg2" value={comteg2} onChange={(e) => setComteg2(e.target.value)} style={{width: '250px'}}/>
                          </div> 
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '250px'}}/>
                          </div>     
                        </div>

                        <div style={{position: 'absolute', top: '485px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '770px'}}>Комментарий</p>   
                        </div>
                        <div style={{position: 'absolute', top: '505px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} style={{width: '770px'}}/>
                          </div>     
                        </div>

                        <div style={{position: 'absolute', top: '550px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '770px'}}>Комментарий №2</p>   
                        </div>
                        <div style={{position: 'absolute', top: '570px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="comment2" id="comment2" value={comment2} onChange={(e) => setComment2(e.target.value)} style={{width: '770px'}}/>
                          </div>    
                        </div>

                        <div style={{position: 'absolute', top: '615px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '770px'}}>Паспорт</p>   
                        </div>
                        <div style={{position: 'absolute', top: '635px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>
                          <div className="text-field">
                            <textarea className="text-field__input" type="text" name="passport" id="passport" value={passport} onChange={(e) => setPassport(e.target.value)} style={{width: '770px', height: '350px', whiteSpace: 'pre-line'}}/>
                          </div> 
                        </div>


                        <div style={{position: 'absolute', top: '990px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>                          
                          <p style={{fontSize: '12px', color: '#858282', width: '50px'}}>Д</p>
                          <p style={{fontSize: '12px', color: '#858282', width: '50px'}}>С</p> 
                          <p style={{fontSize: '12px', color: '#858282', width: '650px'}}>Скан паспорта</p>   
                        </div>
                        <div style={{position: 'absolute', top: '1010px', left: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '770px'}}>
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="dogovor" id="dogovor" value={dogovor} onChange={(e) => setDogovor(e.target.value)} style={{width: '50px'}}/>
                          </div> 
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="samozanjatost" id="samozanjatost" value={samozanjatost} onChange={(e) => setSamozanjatost(e.target.value)} style={{width: '50px'}}/>
                          </div> 
                          <div className="text-field">
                            <input className="text-field__input" type="text" name="passportScan" id="passportScan" value={passportScan} onChange={(e) => setPassportScan(e.target.value)} style={{width: '650px', overflow: 'hidden', textOverflow: 'ellipsis'}}/>
                          </div> 
                        </div>

                      </div>

                      <img src={Close} onClick={()=>setVisibleXL(false)} style={{position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', width: '15px', height: '15px'}}/>
                  
                    </div>
              </CModalBody>
            </CModal>

        </div>
        <AppFooter />
      </div>
      {/* <AppRightbar /> */}
    </div>
  )
}

export default Specialist
