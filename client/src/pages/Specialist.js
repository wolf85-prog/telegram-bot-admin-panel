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

import { getSpecialist, getSpecCount } from './../http/specAPI'

import Close from "../assets/images/close.svg"
import zamok from "../assets/images/замок.png"
import zamok2 from "../assets/images/замок2.png"
import addAvatar from "../assets/images/add_avatar.png"
import Krestik from './../assets/images/krestik.png';
import block18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.png";
import Tg from "./../assets/images/tg.png";
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Disketa from "./../assets/images/disketa.png";
import arrowDown from 'src/assets/images/arrowDown.svg'

import TagsInput from "./../components/TagsInput/TagsInput"

//Workers.js
const Specialist = () => {

  const { specialist, setSpecialist } = useUsersContext();

  const [specialistAll, setSpecialistAll] = useState([]);

  const dispatch = useDispatch()
  const rigthbarShow = useSelector((state) => state.rigthbarShow)

  const [loading, setLoading]= useState(true);
  const [text, setText]= useState("");
  const [spec, setSpec] = useState([]); 
  const [visibleXL, setVisibleXL] = useState(false)
  const [modalWorker, setModalWorker] = useState({})
  const [lock, setLock] = useState(true)
  const [showProfile, setShowProfile] = useState(false)

  const [fio, setFio] = useState('');
  const [city, setCity] = useState([]);
  const [age, setAge] = useState('');
  const [speclist, setSpeclist] = useState([]);
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
      const res = await getSpecialist()
      //console.log("specialistAll: ", res.length)
      setSpecialistAll(res)

      let workers = await getSpecCount(20, specialist.length)
      //console.log("specialist: ", workers)

      workers.map(async (worker, i) => {

        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;

        let str_spec = ''
        worker.specialization && JSON.parse(worker.specialization).map((item, index)=> {
          str_spec = str_spec + item.spec + (index+1 !== JSON.parse(worker.specialization).length ? ', ' : '')
        })

        let str_skill = ''
        worker.skill && JSON.parse(worker.skill).map((item, index)=> {
          str_skill = str_skill + item.name + (index+1 !== JSON.parse(worker.skill).length ? ', ' : '')
        })

        let str_merch = ''
        worker.skill && JSON.parse(worker.merch).map((item, index)=> {
          str_merch = str_merch + item.name + (index+1 !== JSON.parse(worker.merch).length ? ', ' : '')
        })

        let str_komteg = ''
        worker.comteg && JSON.parse(worker.comteg).map((item, index)=> {
          str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(worker.comteg).length ? ', ' : '')
        })

        let str_komteg2 = ''
        worker.comteg2 && JSON.parse(worker.comteg2).map((item, index)=> {
          str_komteg2 = str_komteg2 + item.name + (index+1 !== JSON.parse(worker.comteg2).length ? ', ' : '')
        })

        let str_company = ''
        worker.company && JSON.parse(worker.company).map((item, index)=> {
          str_company = str_company + item.name + (index+1 !== JSON.parse(worker.company).length ? ', ' : '')
        })

        const newWorker = {
          fio: worker.fio,
          telegram: worker.chatId, 
          phone: worker.phone, 
          phone2: worker.phone2,
          spec: str_spec,
          city: worker.city, 
          skill: str_skill,
          promo: worker.promoId === '0' ? '' : worker.promoId, 
          rank: worker.rank, 
          merch: str_merch,  
          company: str_company, 
          comteg: str_komteg, 
          comteg2: str_komteg2, 
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

        //setSpec(arrWorkers) 
        //console.log("arrWorkers: ", arrWorkers)
        setSpecialist(arrWorkers)
      })  

      setLoading(false)
      
    }

    fetchData();
    
  },[])

  const clickFio = (worker)=> {
    //console.log(worker)
    //setVisibleXL(true)
    setShowProfile(true)
    setModalWorker(worker)

    setFio(worker.fio)
    setCity(worker.city.split(','))
    setAge(worker.age)
    setSpeclist(worker.spec)

    setPhone(worker.phone)
    setPhone2(worker.phone2)
    setTelegram(worker.telegram)
    // setSkill(worker.skill.split(','))

    // setReyting(worker.reyting)
    // setPromo(worker.promo)
    // setRank(worker.rank)
    // setMerch(worker.merch.split(','))
    // setCompany(worker.company.split(','))
    // setInn(worker.inn)
    // setComteg(worker.comteg.split(','))
    // setComteg2(worker.comteg2.split(','))
    // setEmail(worker.email)
    // setComment(worker.comment)
    // setComment2(worker.comment)

    // setPassport(worker.passport)
    // setDogovor(worker.dogovor)
    // setSamozanjatost(worker.samozanjatost)
    // setPassportScan(worker.passportScan)

  }

  const copyText = (text)=> {
    window.prompt("", text);
  }

  const clickNext = async() => {
    //1 все специалисты
		let response = await getSpecCount(20, specialist.length);
    console.log("workers size: ", specialist.length)

    const arrayWorker = []
		
			response.reverse().map(async (worker) => {
        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;

        let str_spec = ''
        worker.specialization && JSON.parse(worker.specialization).map((item, index)=> {
          str_spec = str_spec + item.spec + (index+1 !== JSON.parse(worker.specialization).length ? ', ' : '')
        })

        let str_skill = ''
        worker.skill && JSON.parse(worker.skill).map((item, index)=> {
          str_skill = str_skill + item.name + (index+1 !== JSON.parse(worker.skill).length ? ', ' : '')
        })

        let str_merch = ''
        worker.skill && JSON.parse(worker.merch).map((item, index)=> {
          str_merch = str_merch + item.name + (index+1 !== JSON.parse(worker.merch).length ? ', ' : '')
        })

        let str_komteg = ''
        worker.comteg && JSON.parse(worker.comteg).map((item, index)=> {
          str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(worker.comteg).length ? ', ' : '')
        })

        let str_komteg2 = ''
        worker.comteg2 && JSON.parse(worker.comteg2).map((item, index)=> {
          str_komteg2 = str_komteg2 + item.name + (index+1 !== JSON.parse(worker.comteg2).length ? ', ' : '')
        })

        let str_company = ''
        worker.company && JSON.parse(worker.company).map((item, index)=> {
          str_company = str_company + item.name + (index+1 !== JSON.parse(worker.company).length ? ', ' : '')
        })

				const newWorker = {
          fio: worker.fio,
          telegram: worker.chatId, 
          phone: worker.phone, 
          phone2: worker.phone2,
          spec: str_spec,
          city: worker.city, 
          skill: str_skill,
          promo: worker.promoId === '0' ? '' : worker.promoId, 
          rank: worker.rank, 
          merch: str_merch,  
          company: str_company, 
          comteg: str_komteg, 
          comteg2: str_komteg, 
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
		
				arrayWorker.push(newWorker)
			})    

      console.log("Всего сейчас: ", arrayWorker.length)
			
      setSpecialist(arrayWorker)	
      console.log("Ещё: ", arrayWorker.length)
  }

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Специалисты</h2> */}
                    
                    <CRow className="mb-3">
                      <CCol sm={3} >
                        <CFormInput placeholder="Поиск..." onChange={(e)=>setText(e.target.value)} aria-label="spec"/>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol style={{textAlign: 'center'}}>
                        <CCard className="mb-4"> 
                            <p style={{position: 'absolute', top: '-3px', left: '15px', fontSize: '14px', color: '#f3f3f3'}}>
                              Всего: {specialistAll.length}
                            </p>
                            <CCardBody>
                              {!showProfile ?
                              
                              (loading ? 
                                      
                                <CSpinner/> :
                                <div className='scrooll-table'>
                                  <CTable align="middle" className="mb-0 border my-table" hover bordered>
                                    <CTableHead className='table-light'>
                                      <CTableRow>
                                        <CTableHeaderCell className='my-th widthSpace'>№</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace'>ФИО</CTableHeaderCell>  
                                        <CTableHeaderCell className='my-th widthSpace'>Телеграм</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace'>Телефон</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace'>Специальность</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace'>Город</CTableHeaderCell>   
                                        <CTableHeaderCell className='my-th widthSpace'>Год рождения</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Проекты</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Телефон №2</CTableHeaderCell>                         
                                        <CTableHeaderCell className='my-th widthSpace'>Навык</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Промокод</CTableHeaderCell>                                       
                                        <CTableHeaderCell className='my-th widthSpace'>Мерч</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Прокатная компания</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комтег</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комтег №2</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комментарии</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комментарии №2</CTableHeaderCell>                                        
                                        <CTableHeaderCell className='my-th widthSpace'>Рейтинг</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>ИНН</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Паспорт</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Профиль</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Д</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>С</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Паспорт [скан]</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Почта</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>                                  
                                    {specialist.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index+1}>
                                          <CTableDataCell className="text-center widthSpace">
                                            {index+1}
                                          </CTableDataCell>
                                          <CTableDataCell onClick={()=>clickFio(item)} className="widthSpace" style={{cursor: 'pointer', textAlign: 'left'}}>
                                            {item.fio}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.telegram}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.phone}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.spec}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.city === 'null' ? '' : item.city}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.age}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.rank}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.phone2}
                                          </CTableDataCell> 
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.skill}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.promo}
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
                                </div>
                                
                                
                              )
                              :
                              <div style={{position: 'relative', height: '790px', display: 'flex', flexDirection: 'row'}}>
                                <div style={{display: 'flex', flexDirection: 'column', width: '250px'}}>
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>

                                  <div className="file-upload" style={{marginBottom: '15px'}}>
                                    <img src={addAvatar} alt="upload" style={{position: 'absolute', top: '100px', left: '100px', cursor: 'pointer', width: '50px', height: '50px'}}/>
                                    <input type="file" style={{position: 'absolute', top: '130px', left: '10px', opacity: '0', zIndex: '100', width: '230px'}}/>
                                  </div>

                                  <div style={{width: '250px', display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                                    <div className="star-block">
                                      <img className='star-icon' src={StarActive} alt='' /> 
                                      <img className='star-icon' src={StarActive} alt='' />
                                      <img className='star-icon' src={StarActive} alt='' />
                                      <img className='star-icon' src={Star} alt='' />
                                      <img className='star-icon' src={Star} alt='' />
                                    </div>
                                  </div>
                                  
                                  <label>В системе</label>
                                  <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="inn" id="inn" value='01.01.2024' onChange={(e) => setInn(e.target.value)} style={{width: '250px'}}/>
                                    </div>
                                  </div> 

                                  <div style={{display: 'flex'}}>
                                    <div>
                                      <label>Самозанятость</label>
                                      <div style={{display: 'flex'}}>
                                        <input className="text-field__input" type="text" name="inn" id="inn" value='01.01.2024' onChange={(e) => setInn(e.target.value)} style={{width: '100%', paddingLeft: '5px', fontSize: '12px'}}/>
                                        <div className="text-field" style={{marginLeft:'-10px', backgroundColor: '#131c21'}}>
                                          <input className="text-field__input" type="text" name="dogovor" id="dogovor" value={dogovor} onChange={(e) => setDogovor(e.target.value)} style={{width: '40px', padding: '0', fontSize: '20px'}}/>
                                        </div>
                                      </div> 
                                    </div>
                                    <div style={{width: '15px'}}></div>
                                    <div>
                                      <label>Договор</label>
                                      <div style={{display: 'flex'}}>
                                        <input className="text-field__input" type="text" name="inn" id="inn" value='01.01.2024' onChange={(e) => setInn(e.target.value)} style={{width: '100%', paddingLeft: '5px', fontSize: '12px'}}/>
                                        <div className="text-field" style={{marginLeft:'-10px', backgroundColor: '#131c21'}}>
                                          <input className="text-field__input" type="text" name="samozanjatost" id="samozanjatost" value={samozanjatost} onChange={(e) => setSamozanjatost(e.target.value)} style={{width: '40px', padding: '0', fontSize: '20px'}}/>
                                        </div> 
                                      </div>
                                    </div>
                                    
                                    
                                  </div>

                                   
                                  <div style={{position:'relative'}}>
                                    <label>Паспорт</label>
                                    <div className="text-field">
                                      <textarea className="text-field__input" type="text" name="passport" id="passport" value={passport} onChange={(e) => setPassport(e.target.value)} style={{width: '250px', height: '275px', whiteSpace: 'pre-line', textAlign: 'left', borderRadius:'.375rem'}}/>
                                    </div> 
                                    <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(passport)}} alt="" style={{position: 'absolute', top: '40px', left: '205px', cursor: 'pointer', width: '25px', height: '25px'}}/>
                                  </div>
                                  
                                </div>
                                  
                                  
                                  <img src={Krestik} width={25} alt='' style={{position: 'absolute', top: '19px', left: '255px'}}/>
                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '285px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                                    <div className="text-field">
                                      <input type="text" name="fio" id="fio" value={fio} onChange={(e) => setFio(e.target.value)} style={{backgroundColor: 'transparent', border: '0', color: '#f3f3f3'}}></input>
                                    </div>
                                    <div>
                                      <img src={Trubka} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Tg} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={lock ? zamok : zamok2} onClick={()=>setLock(!lock)} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Close} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                    </div>
                                  </div>
{/* 2 */}
                                <div style={{marginLeft: '40px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  {/* Город */}
                                  <div className="text-field">
                                    <TagsInput className="text-field__input" style={{width: '510px'}} tags={city} setTags={setCity}/>
                                    {/* <input className="text-field__input" type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} style={{width: '320px'}}/> */}
                                  </div>

                                  <label>Специальность</label>
                                  <div style={{border: '1px solid #464849', borderRadius: '.375rem', padding: '5px', textAlign: 'left', marginBottom: '15px', minHeight: '100px'}}>
                                    <ul>
                                      {speclist.map((item, index) => 
                                        <li key={index+1}>{item}</li>
                                      )}     
                                    </ul>
                                  </div>

                                  <label>Компания</label>
                                  <div style={{border: '1px solid #464849', borderRadius: '.375rem', padding: '5px', textAlign: 'left', minHeight: '100px', marginBottom: '15px'}}>
                                    <ul>
                                      {company.map((item, index) => 
                                        <li key={index+1}>{item}</li>
                                      )}     
                                    </ul>
                                  </div>

                                  <label>Комтеги</label>
                                  <div style={{border: '1px solid #464849', borderRadius: '.375rem', padding: '5px', textAlign: 'left', minHeight: '100px', marginBottom: '15px'}}>
                                    <ul>
                                      {comteg.map((item, index) => 
                                        <li key={index+1}>{item}</li>
                                      )}
                                    </ul> 
                                  </div>

                                  <label>Комментарии</label>
                                  <div className="text-field">
                                    <textarea className="text-field__input" type="text" name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} style={{width: '320px', height: '190px', whiteSpace: 'pre-line', borderRadius: '.375rem'}}/>
                                  </div> 
                                  
                                </div>
{/* 3 */}
                                <div style={{marginLeft: '40px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  <div style={{display: 'flex'}}>
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="age" id="age" value='25' onChange={(e) => setAge(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} style={{width: '80px', marginRight: '8px'}}/>
                                    </div>
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px', color: 'red'}}/>
                                    </div>
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', color: 'red'}}/>
                                    </div>
                                  </div>
                                  <label>Навык</label>
                                  <div style={{border: '1px solid #464849', borderRadius: '.375rem', padding: '5px', textAlign: 'left', width: '320px', minHeight: '100px', marginBottom: '15px'}}>
                                    <ul>
                                      {skill.map((item, index) => 
                                        <li key={index+1}>{item}</li>
                                      )}     
                                    </ul>
                                  </div>

                                  <label>Мерч</label>
                                  <div style={{border: '1px solid #464849', borderRadius: '.375rem', padding: '5px', textAlign: 'left', width: '320px', minHeight: '100px', marginBottom: '15px'}}>
                                    <ul>
                                      {merch.map((item, index) => 
                                        <li key={index+1}>{item}</li>
                                      )}     
                                    </ul>
                                  </div>

                                  <label>Комтеги 2.0</label>
                                  <div style={{border: '1px solid #464849', borderRadius: '.375rem', padding: '5px', textAlign: 'left', minHeight: '100px', width: '320px', marginBottom: '15px'}}>
                                    <ul>
                                      {comteg2.map((item, index) => 
                                        <li key={index+1}>{item}</li>
                                      )}
                                    </ul> 
                                  </div>

                                  <label>Комментарии 2.0</label>
                                  <div className="text-field">
                                    <textarea className="text-field__input" type="text" name="comment2" id="comment2" value={comment2} onChange={(e) => setComment2(e.target.value)} style={{width: '320px', height: '190px', whiteSpace: 'pre-line', borderRadius: '.375rem'}}/>
                                  </div> 
                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '250px'}}>

                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/>
                                  </div> 

                                  <label>Telegram</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="telegram" id="telegram" value={telegram} onChange={(e) => setTelegram(e.target.value)} style={{width: '250px'}}/>
                                  </div>

                                  <label> </label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value='@U.L.E.Y_T.E.A.M' onChange={(e) => setEmail(e.target.value)} style={{width: '250px'}}/>
                                  </div> 

                                  <label>ИНН</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="inn" id="inn" value={inn} onChange={(e) => setInn(e.target.value)} style={{width: '250px'}}/>
                                  </div> 

                                  <label></label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '250px'}}/>
                                  </div> 

                                  <label>Промокод</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="promo" id="promo" value={promo} onChange={(e) => setPromo(e.target.value)} style={{width: '250px'}}/>
                                  </div>

                                  <label></label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="passportScan" id="passportScan" value={passportScan} onChange={(e) => setPassportScan(e.target.value)} style={{width: '250px', overflow: 'hidden', textOverflow: 'ellipsis'}}/>
                                  </div> 
                                </div>

                              </div>
                              }
                            </CCardBody>

                              <div style={{display: 'flex', justifyContent: 'center' }}>
                                <img src={arrowDown} alt='' onClick={()=>clickNext()} style={{width: '50px', marginBottom: '15px', cursor: 'pointer'}}></img>
                              </div> 
                          </CCard>
                        </CCol>
                    </CRow>
                  </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
      {/* <AppRightbar /> */}
    </div>
  )
}

export default Specialist
