import React, { Suspense, useState, useEffect } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Link } from 'react-router-dom'
import { 
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
  CAlert,
  CFormCheck,
  CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilX, cilCaretBottom, cilCarAlt, cilCaretLeft } from '@coreui/icons';

import { useUsersContext } from "../chat-app-new/context/usersContext";
import { $host } from '../http/index'
import { useNavigate } from 'react-router-dom';
import { newDistribution, getDistributions, getProjects, getProjects3, getBlocks, getDatabaseId } from '../http/adminAPI';
import { newMessage, uploadFile } from '../http/chatAPI';
import specData from './../data/specData';

import sendSound from './../chat-app-new/assets/sounds/distribution_sound.mp3';
import phone_image from './../assets/images/phone2.png';
import poster from './../assets/images/poster.jpg';
import Loader from 'src/chat-app-new/components/Loader'


const DistributionAddW = () => {

  const token = process.env.REACT_APP_TELEGRAM_API_TOKEN
	const host = process.env.REACT_APP_API_URL
  const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID

  const { users: clients } = useUsersContext();
  const { addNewMessage, setDistributions } = useUsersContext();
  const [contacts, setContacts]= useState([]);
  const [projects, setProjects]= useState([]); 
  const [contacts2, setContacts2]= useState([]);
  const [projects2, setProjects2]= useState([]);

  const [selected, setSelected] = useState([]);
  const [text, setText] = useState('');
  const [countChar, setCountChar] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showEditButtonAdd, setShowEditButtonAdd] = useState(false);
  const [showNameProject, setShowNameProject] = useState(true);
  const [sendToAdmin, setSendToAdmin] = useState(false);
  const [textButton, setTextButton] = useState('');
  const [file, setFile] = useState();
  const [value, setValue] = useState("");
  const [image, setImage]= useState("");

  const [valueSelect, setValueSelect] = useState(0)
  const [valueSelect2, setValueSelect2] = useState(0)
  const [valueSelect3, setValueSelect3] = useState(0)
  const [valueSelect4, setValueSelect4] = useState(0)
  const [valueSelect5, setValueSelect5] = useState(0)
  const [valueSelect6, setValueSelect6] = useState(0)

  const [showCategories2, setShowCategories2] = useState(false);
  const [showCategories3, setShowCategories3] = useState(false);
  const [showCategories4, setShowCategories4] = useState(false);

  const [proj, setProj] = useState('');

  const audio = new Audio(sendSound);

  const navigate = useNavigate();

  const backPage = () => {
       navigate('/distributionw');
  } 

  //let proj

  const categories = [
    'Выбрать...',
    {
      label: 'Звук',
      value: '1',
    },
    {
      label: 'Свет',
      value: '2',
    },
    {
      label: 'Видео',
      value: '3',
    },
    {
      label: 'Риггеры',
      value: '4',
    },
    {
      label: 'Помощники / Грузчики',
      value: '5',
    },
    {
      label: 'Граунд',
      value: '6',
    },
    {
      label: 'Водители',
      value: '7',
    },
    {
      label: 'Технический продакшн',
      value: '8',
    },
    {
      label: 'Фото',
      value: '9',
    },
    {
      label: 'Кейтеринг',
      value: '10',
    },
    {
      label: 'Артисты',
      value: '11',
    },
    {
      label: 'Игромания',
      value: '12',
    },  
  ]


  useEffect(() => {
    const fetchData = async () => {

      //console.log("projects planer size: ")

      let projects = await getProjects();
      console.log("projects planer: ", projects)

      //setProjects(projects)
    }
      fetchData();
      
  },[])


   //проекты
   useEffect(() => {
    const arrProjects = []

    projects.map((project) => {
      const d = new Date(project.datestart);
      const month = String(d.getMonth()+1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");

      const newObj = {
        label: `${day}.${month} | ${project.name}`, 
        value: project.id,
      }
      arrProjects.push(newObj)
    })
    setContacts(arrProjects)      
  }, [projects]);

  //проекты2
  useEffect(() => {
    const arrProjects = []

    projects.map((project) => {
      const newObj = {
        label: project.crmID,
        value: project.id,
      }
      arrProjects.push(newObj)
    })
    setContacts2(arrProjects)      
  }, [projects]);



  const onChangeText = (e) => {
    setText(e.target.value)
    setCountChar(e.target.value.length)
  }

  useEffect(() => {
    const getImage = async () => {
        if (file) {
          console.log("file:", file)
          const data = new FormData();
          data.append("name", file.name);
          data.append("photo", file);
          
          let response = await uploadFile(data);
          console.log("response: ", response.data.path)

          setImage(response.data.path);
          //сообщение с ссылкой на файл
          //console.log(host + response.data.path)
          //setValue(host + response.data.path)
        }
    }
    getImage();
  }, [file])

  {/* Добавление файла */}
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setValue(e.target.value)
  }


  {/* Показать Добавление текста кнопки */}
  const clickShowEditButton = (e) => {
    e.preventDefault();
    showEditButtonAdd ? setShowEditButtonAdd (false) : setShowEditButtonAdd (true)
  }

  const onAddCategory0 = (e) => {
    e.preventDefault();
    setValueSelect(e.target.value)
    setShowCategories2(true)
    selected.push(e.target.value)
  }

  const onAddCategory = (e) => {
    e.preventDefault();
    setValueSelect(e.target.value)
    //setShowCategories2(true)
    selected.push(e.target.value)
  }

  const onAddCategory2 = (e) => {
    e.preventDefault();
    setValueSelect2(e.target.value)
    //setShowCategories3(true)
    selected.push(e.target.value)
  }

  const onAddCategory3 = (e) => {
    e.preventDefault();
    setValueSelect3(e.target.value)
    //setShowCategories4(true)
    selected.push(e.target.value)
  }

  const onAddCategory4 = (e) => {
    e.preventDefault();
    setValueSelect4(e.target.value)
    selected.push(e.target.value)
  }

  const onAddCategory5 = (e) => {
    e.preventDefault();
    setValueSelect5(e.target.value)
    selected.push(e.target.value)
  }



  //название проекта или номер проекта
  const onChangeProjectName = () => {
    setShowNameProject(true)
  }

  const onChangeProjectNumber = () => {
    setShowNameProject(false)
    selected = []
  }


  let arr_count = []

  const onChangeSelectProject = async(e) => {
    e.preventDefault();
    // if (e.target.value === '1') setProj('Проект 1')
    // if (e.target.value === '2') setProj('Проект 2')
    // if (e.target.value === '3') setProj('Проект 3')

    let count_title;
    const blockId = await getBlocks(e.target.value); 

    //console.log("blockId: ", blockId.data)

    if (blockId) {
      const databaseBlock = await getDatabaseId(blockId.data); 

      const categories = [...databaseBlock.data]

      console.log("categories: ", categories)

      specData.map((category)=> {
          count_title = 0;

        if (databaseBlock.data) {   
          databaseBlock.data.map((db) => {
            if (category.name === db.title) {
              count_title++
            }
          })
          
          if (count_title !== 0) {
            const obj = {
              id: category.id,
              title: category.icon,
              count: count_title,
            }
            arr_count.push(obj)
          }
          
        }
      })  

      console.log("arr_count: ", arr_count)

      setValueSelect(arr_count[0].id)
      selected.push(arr_count[0].count)

      if(arr_count[1]) {
        setValueSelect2(arr_count[1]?.id)
        setShowCategories2(true)
        selected.push(arr_count[1]?.count)
      }

      if(arr_count[2]) {
        setValueSelect2(arr_count[2]?.id)
        setShowCategories3(true)
        selected.push(arr_count[2]?.count)
      }

      if(arr_count[3]) {
        setValueSelect2(arr_count[3].id)
        setShowCategories4(true)
        selected.push(arr_count[3].count)
      }
      
    }
  }

  const onChangeTextButton = (e) => {
    setTextButton(e.target.value)
  }

  //дублировать в админку
  const onChangeCheck = (e) => {
    setSendToAdmin(e.target.value)
  }

  const onChangeAddButton = () => {
   setShowEditButtonAdd (true)
  }

  const onChangeAddButton2 = () => {
    setShowEditButtonAdd (false)
  }


  {/* Удаление категорий */}
  const delCategory2 = () => {
    setValueSelect(0)
    setShowCategories2(false)
    selected.pop()
  }

  const delCategory3 = () => {
    setValueSelect2(0)
    setShowCategories3(false)
    selected.pop()
  }

  const delCategory4 = () => {
    setValueSelect3(0)
    setShowCategories4(false)
    selected.pop()
  }

  {/* Отправка рассылки */}
  const onSendText = async() => {
    console.log(selected)

    audio.play();

    //новая рассылка
    const message = {
      name: 'Рассылка', 
      text: text, 
      image: host + image, 
      button: textButton, 
      receivers: JSON.stringify(selected), 
      datestart: Date.now(), 
      delivered: 'true',        
    }
    console.log("message send button: ", message);

    //сохранение рассылки в базе данных
    await newDistribution(message)
    
    selected.map(async (user, index) => {
      console.log("Пользователю ID: " + user.value + " сообщение " + text + " отправлено! Кнопка " + textButton + " отправлена!")

      let client = clients.filter((client) => client.chatId === user.value.toString())[0];
      
      //Передаем данные боту
      const keyboard = JSON.stringify({
        inline_keyboard: [
            [
                {"text": textButton, callback_data:'/report'},
            ],
        ]
      });

      //отправить в телеграмм
      let sendToTelegram
      if (text !== '') {
        const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user.value}&parse_mode=html&text=${text.replace(/\n/g, '%0A')}`
        console.log("url_send_msg: ", url_send_msg)
        sendToTelegram = await $host.get(url_send_msg);
        console.log('sendToTelegram: ', sendToTelegram)
      }  

      const url_send_photo = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${user.value}&reply_markup=${keyboard}`
      console.log("url_send_photo: ", url_send_photo)
      
      let sendPhotoToTelegram
      if (file) {
        const form = new FormData();
        form.append("photo", file);

        sendPhotoToTelegram = await $host.post(url_send_photo, form);
        console.log('sendPhotoToTelegram: ', sendPhotoToTelegram)
      } 

      //отправить в админку
      if (sendToAdmin) {
        let message = {};
        if(!file) {
            message = {
                senderId: chatAdminId, 
                receiverId: user.value,
                conversationId: client.conversationId,
                type: "text",
                text: text,
                is_bot: true,
				        messageId: sendToTelegram.data.result.message_id,
                buttons: '',
            }
        } else {
            message = {
                senderId: chatAdminId, 
                receiverId: user.value,
                conversationId: client.conversationId,
                type: "image",
                text: host + image,
                is_bot: true,
				        messageId: sendPhotoToTelegram.data.result.message_id,
                buttons: textButton,
            }
        }
        console.log("message send: ", message);

        //сохранение сообщения в базе данных
		    await newMessage(message)

		    //сохранить в контексте
        if(!file) {
          addNewMessage(user.value, text, 'text', '', client.conversationId, sendToTelegram.data.result.message_id);
        } else {
          addNewMessage(user.value, host + image, 'image', textButton, client.conversationId, sendPhotoToTelegram.data.result.message_id);
        }
  
      }  

      //обновить список рассылок
      let response = await getDistributions();
      console.log("distribution new add: ", response.length)
			setDistributions(response)

    })

    setSelected([])
    setSendToAdmin(false)
    setText('')
    setShowEditButtonAdd(false)
    setTextButton('')
    setVisible(true)
    setValue('')

    navigate('/distributionw');
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
                    <h2>Новая рассылка</h2>

                    <CRow>
                        <CCol xs>
                          <CCard className="mb-4" style={{height: '670px'}}>
                            {/* <CCardHeader>Рассылки</CCardHeader> */}
                            <CCardBody>
                            <CAlert color="success" dismissible visible={visible} onClose={() => setVisible(false)}>
                              Сообщение успешно отправлено!
                            </CAlert>
                              <CForm>
                                <div style={{color: '#f3f3f3'}}>
                                  <CRow className="mb-3">
                                    <CCol sm={3} >  

                                      <p style={{color: '#f3f3f3'}}>Проект:</p>

                                      <CRow className="mb-3"> 
                                        <CCol sm={6}> 
                                          <CFormCheck 
                                            type="radio"
                                            id="flexRadioDefault2" 
                                            name="flexRadioDefault"
                                            label="Номер"
                                            checked={!showNameProject}
                                            onChange={onChangeProjectNumber}
                                          />
                                        </CCol>
                                        <CCol sm={6} style={{display: 'flex', justifyContent: 'flex-end'}}> 
                                          <CFormCheck 
                                            type="radio"
                                            id="flexRadioDefault1" 
                                            name="flexRadioDefault"
                                            label="Название"
                                            checked={showNameProject}
                                            onChange={onChangeProjectName}
                                          />
                                        </CCol>
                                      </CRow>

                                      <CFormSelect 
                                        aria-label="Default select example"
                                        style={{display: showNameProject ? "block" : "none" }}
                                        onChange={onChangeSelectProject}
                                        options={contacts}
                                      />

                                      <CFormSelect 
                                        aria-label="Default select example"
                                        style={{display: !showNameProject ? "block" : "none" }}
                                        onChange={onChangeSelectProject}
                                        options={contacts2}
                                      />

                                      <br/>
                                      
                                      <CRow>
                                        <CCol sm={12} > 
                                          <CFormLabel htmlFor="exampleFormControlInput1">Категория:</CFormLabel>
                                          <CFormSelect 
                                            aria-label="Default select example"
                                            onChange={onAddCategory}
                                            options={categories}
                                            value={valueSelect}
                                          /> 
                                        </CCol> 
                                      </CRow>
                                      
                                      <CRow>
                                        <CCol sm={10} >  
                                          <CFormSelect 
                                            aria-label="Default select example"
                                            onChange={onAddCategory2}
                                            value={valueSelect2}
                                            options={categories}
                                            style={{marginTop: '15px', display: showCategories2 ? "block" : "none"}}
                                          />
                                        </CCol>
                                        <CCol sm={2} >  
                                          <CIcon 
                                            icon={cilX} 
                                            size="xl" 
                                            style={{marginTop: '20px', display: showCategories2 ? "block" : "none"}} 
                                            onClick={delCategory2}
                                          />
                                        </CCol>
                                      </CRow>

                                      <CRow>
                                        <CCol sm={10} >  
                                          <CFormSelect 
                                            aria-label="Default select example"
                                            onChange={onAddCategory3}
                                            value={valueSelect3}
                                            options={categories}
                                            style={{marginTop: '15px', display: showCategories3 ? "block" : "none"}}
                                          />
                                        </CCol>
                                        <CCol sm={2} >  
                                          <CIcon 
                                            icon={cilX} 
                                            size="xl" 
                                            style={{marginTop: '20px', display: showCategories3 ? "block" : "none"}} 
                                            onClick={delCategory3}
                                          />
                                        </CCol>
                                      </CRow>

                                      <CRow>
                                        <CCol sm={10} >  
                                          <CFormSelect 
                                            aria-label="Default select example"
                                            onChange={onAddCategory4}
                                            value={valueSelect4}
                                            options={categories}
                                            style={{marginTop: '15px', display: showCategories4 ? "block" : "none"}}
                                          />
                                        </CCol>
                                        <CCol sm={2} >  
                                          <CIcon 
                                            icon={cilX} 
                                            size="xl" 
                                            style={{marginTop: '20px', display: showCategories4 ? "block" : "none"}} 
                                            onClick={delCategory4}
                                          />
                                        </CCol>
                                      </CRow>

                                      <CRow>
                                        <CCol sm={12} > 
                                          <CIcon 
                                                icon={cilCaretBottom}
                                                size="xl" 
                                                onClick={onAddCategory0}
                                                style={{marginTop: '15px', textAlign: 'center'}}
                                          />
                                        </CCol>
                                      </CRow>
                                      
                                      <p style={{color: '#767676', marginTop: '10px'}}>Получателей: <span>{selected.length}</span></p>  
                                      
                                    </CCol>

                                    {/* <CCol sm={1}></CCol> */}

                                    {/* Правый блок */}
                                    <CCol sm={5} style={{marginLeft: '30px', marginRight: '30px'}}>
                                        <CFormLabel htmlFor="exampleFormControlInput1">Текст рассылки:</CFormLabel>
                                        <CFormTextarea 
                                          id="exampleFormControlTextarea1" 
                                          rows={4} 
                                          placeholder='Введите текст сообщения'
                                          onChange={onChangeText}
                                          value={text}
                                          // helperText = {`${countChar}/500`}
                                        >           
                                        </CFormTextarea>

                                        <br/>

                                      <CRow className="mb-6">
                                          <CCol sm={3} > 
                                            <CFormSelect 
                                              aria-label="Default select example"
                                              style={{marginTop: '10px'}}
                                              options={[
                                                {
                                                  label: 'Постер',
                                                  value: '1',
                                                },
                                                {
                                                  label: 'Файл',
                                                  value: '2',
                                                },
                                                {
                                                  label: 'Аудио',
                                                  value: '3',
                                                },
                                                {
                                                  label: 'Видео',
                                                  value: '4',
                                                },
        
                                              ]}
                                            />
                                          </CCol>

                                          <CCol sm={9} > 
                                            {/* Добавление картинки */}
                                            <div style={{color: '#8f8888', marginTop: '10px'}}>
                                              <CFormInput 
                                                type="file" 
                                                id="formFile" 
                                                // label="Добавить картинку" 
                                                name="photo"
                                                onChange={(e) => onFileChange(e)}
                                                value={value}
                                              />
                                            </div>
                                          </CCol>

                                        </CRow>

                                        <div className="mb-3"></div>

                                        {/* Ряд кнопок */}
                                        <CRow className="mb-6">
                                          <CCol sm={6} > 
                                            <CFormCheck 
                                              type="radio"
                                              id="addButtonRadio" 
                                              name="groupRadioButton"
                                              label="Добавить кнопку"
                                              checked={showEditButtonAdd}
                                              onChange={onChangeAddButton}
                                            />
                                            {/* <div className="mb-3 text-left">
                                              <p style={{color: '#fff', cursor: 'pointer'}} onClick={clickShowEditButton} > {showEditButtonAdd ? '- Убрать кнопку' : '+ Добавить кнопку'}</p>
                                            </div> */}

                                          </CCol>

                                        <CCol sm={6} style={{display: 'flex', justifyContent: 'flex-end'}}> 
                                          <CFormCheck 
                                            type="radio"
                                            id="appleButtonRadio" 
                                            name="groupRadioButton"
                                            label="Принять / Отклонить"
                                            checked={!showEditButtonAdd}
                                            onChange={onChangeAddButton2}
                                            //defaultChecked
                                          />
                                        </CCol>
                                      </CRow>

                                      <br/>
                                      <div style={{color: '#8f8888', display: showEditButtonAdd ? "block" : "none" }}>
                                      <CRow className="mb-6" >
                                        
                                        {/* Раскрывающийся ряд */}
                                        {/* Добавление кнопки */}
                                        <CCol sm={6} > 
                                          {/* <CForm className="row g-3" style={{color: '#8f8888', display: showEditButtonAdd ? "block" : "none" }}>                                              */}
                                            <CFormInput 
                                              type="text" 
                                              id="inputTextButton" 
                                              label="Название кнопки" 
                                              placeholder="Введите текст"
                                              onChange={onChangeTextButton}
                                              value={textButton}
                                            />
                                          {/* </CForm> */}
                                        </CCol>
                                      </CRow>

                                        <CRow>
                                          <br/>
                                        </CRow>

                                        <CRow className="mb-6">
                                          <CCol sm={6} >         
                                            {/* Цепь */}
                                            <CFormCheck 
                                              type="radio"
                                              id="addTargetRadio" 
                                              name="groupRadioTarget"
                                              label="Цепь №"              
                                              // checked={showEditButtonAdd}
                                              // onChange={onChangeAddButton}
                                            />
                                            
                                            <CFormSelect 
                                              aria-label="Default select example"
                                              style={{marginTop: '10px'}}
                                              options={[]}
                                            />
                                          </CCol>

                                          <CCol sm={6} > 
                                            {/* Ссылка */}
                                            <CFormCheck 
                                              type="radio"
                                              id="addURLRadio" 
                                              name="groupRadioTarget"
                                              label="Ссылка"  
                                              // checked={showEditButtonAdd}
                                              // onChange={onChangeAddButton}
                                            />

                                            <CFormInput 
                                              type="text" 
                                              id="inputTextButton" 
                                              placeholder="https://"
                                              style={{marginTop: '10px'}}
                                              onChange={onChangeTextButton}
                                              value={textButton}
                                            />
                                          </CCol>
                                          
                                        </CRow>
                                      </div>
                                    </CCol>

                                    {/* <CCol sm={1}></CCol> */}

                                    {/* Телефон */}
                                    <CCol sm={3}>   
                                      <div style={{position: 'relative'}}>
                                        <div style={{position: 'absolute', top: '10px', left: 0}}>
                                          <img src={phone_image} width='280px' alt='phone' />
                                          <div style={{position: 'absolute', top: '60px', left: '22px'}}>
                                            <img src={poster} width='240px' alt='poster' style={{borderRadius: '7px'}}/>
                                          </div>
                                          <div style={{position: 'absolute', top: '210px', left: '22px', display: 'flex', width: '85%'}}>
                                            <div style={{
                                              backgroundColor: '#8a93a2', 
                                              borderRadius: '5px',
                                              textAlign: 'center',
                                              fontSize: '12px',
                                              padding: '5px',
                                              marginRight: '4px',
                                              width: '100%'}}>
                                                Принять
                                            </div>
                                            <div style={{
                                              backgroundColor: '#8a93a2', 
                                              borderRadius: '5px',
                                              textAlign: 'center',
                                              fontSize: '12px',
                                              padding: '5px',
                                              width: '100%'}}>
                                                Отклонить
                                            </div>
                                          </div>                                         
                                        </div>                                                                             
                                      </div>
                                      
                                    </CCol>
         
                                  </CRow>

                                </div>

                                <br/>

                                <div className="mb-3" style={{position: 'absolute', bottom: 0, display: 'flex', width: '97%', justifyContent: 'space-between'}}>
                                {/* <div><Link to={'/distributionw_planer/'} state={{ project: proj}}><CButton color="secondary">Запланировать</CButton></Link></div> */}
                                  <div>{proj ? 
                                    <Link to={'/distributionw_planer'} state={{ project: proj}}><CButton color="secondary">Запланировать</CButton></Link>
                                    :<Link to={''} state={{ project: `${proj}`, }}><CButton color="secondary">Запланировать</CButton></Link>}
                                  </div>
                                  <div><CButton color="primary"  onClick={onSendText}>Разослать сейчас</CButton>  </div>
                                </div>
                              </CForm>

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

export default DistributionAddW