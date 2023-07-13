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
import { $host } from '../http/index';
import { useNavigate } from 'react-router-dom';
import { 
  newDistributionW, 
  getDistributionsW, 
  getWorkerId, 
  getProjects3, 
  getBlocks, 
  getDatabaseId,
  newPretendent 
} from '../http/adminAPI';
import { newMessage, uploadFile } from '../http/chatAPI';
import specData from './../data/specData';
import categories from './../data/categories';

import sendSound from './../chat-app-new/assets/sounds/distribution_sound.mp3';
import phone_image from './../assets/images/phone2.png';
import poster from './../assets/images/poster.jpg';
import noimage2 from './../assets/images/images.png';
import treug from './../assets/images/treugolnik.png';
import Loader from 'src/chat-app-new/components/Loader';

const DistributionAddW = () => {

  const token = process.env.REACT_APP_TELEGRAM_API_TOKEN_WORK
	const host = process.env.REACT_APP_API_URL
  const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID

  const { users: clients, workers } = useUsersContext();
  const { addNewMessage, setDistributionsWork } = useUsersContext();
  const [contacts, setContacts]= useState([]);
  const [projects, setProjects]= useState([]); 
  const [contacts2, setContacts2]= useState([]);
  const [projects2, setProjects2]= useState([]);

  const [arrCategory, setArrCategory] = useState([]);
  const [arrCategory2, setArrCategory2] = useState([]);
  const [arrCategory3, setArrCategory3] = useState([]);
  const [arrCategory4, setArrCategory4] = useState([]);
  const [arrCategory5, setArrCategory5] = useState([]);

  const [categoryAll, setCategoryAll] = useState([]);

  const [selected, setSelected] = useState([]);
  const [arrSelect, setArrSelect] = useState([]);
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

  const [loader, setLoader] = useState(false);
  const [valueProject, setValueProject] = useState(0)
  const [valueSelect, setValueSelect] = useState(0)
  const [valueSelect2, setValueSelect2] = useState(0)
  const [valueSelect3, setValueSelect3] = useState(0)
  const [valueSelect4, setValueSelect4] = useState(0)
  const [valueSelect5, setValueSelect5] = useState(0)
  const [valueSelect6, setValueSelect6] = useState(0)

  const [showCategories2, setShowCategories2] = useState(false);
  const [showCategories3, setShowCategories3] = useState(false);
  const [showCategories4, setShowCategories4] = useState(false);

  const [disabledBtn, setDisabledBtn] = useState(true);

  const [projectVar, setProjectVar] = useState('');
  const [proj, setProj] = useState('');

  const [count, setCount] = useState(0);
  
  const audio = new Audio(sendSound);

  const navigate = useNavigate();
  const backPage = () => {
       navigate('/distributionw');
  } 


  //загрузка новых проектов
  useEffect(() => {
    const fetchData = async () => {

      let projects = await getProjects3();
      console.log("projects planer: ", projects)

      setProjects(projects)
    }
      fetchData();
      
  },[])


   //проекты с названием
   useEffect(() => {
    const arrProjects = [{
      label: 'Выбрать...',
      value: '0',
    }]
    projects.map((project) => {
      if (project != null) {
        const d = new Date(project.datestart);
        const month = String(d.getMonth()+1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        const newObj = {
          label: `${day}.${month} | ${project.name}`, 
          value: project.id,
        }
        arrProjects.push(newObj)
      }    
    })
    setContacts(arrProjects)      
  }, [projects]);
  

  //проекты с номерами
  useEffect(() => {
    const arrProjects = [{
      label: 'Выбрать...',
      value: '0',
    }]
    projects.map((project) => {
      if (project != null) {
        const newObj = {
          label: project.crmID,
          value: project.id,
        }
        arrProjects.push(newObj)
      }
    })
    setContacts2(arrProjects)      
  }, [projects]);

//=======================================================

//треугольник Добавить категорию
const onAddCategory0 = (e) => {
  e.preventDefault();
  setCount(count + 1)
  console.log(count + 1)
  setValueSelect(e.target.value)
  if ((count + 1) === 1) {
    setShowCategories2(true)
  }

  if ((count + 1) === 2) {
    setShowCategories3(true)
  }

  if ((count + 1) === 3) {
    setShowCategories4(true)
  }
  
}

//Изменить категорию (1-й селект)
const onAddCategory = (e) => {
  e.preventDefault();
  setValueSelect(e.target.value)

  if (e.target.value === '0') {
    setSelected([])
    //setDisabledBtn(false)
  } else {
    const cat_name = categories[e.target.value].name
    setArrSelect([])
    arrCategory.pop()
    arrCategory.push(cat_name)
    console.log("arrCategory: ", arrCategory)
    setArrCategory(arrCategory)
    setCategoryAll([...arrCategory, ...arrCategory2])
    const result = [...arrCategory, ...arrCategory2]
    console.log(result)
    
    workers.map((worker)=> {
      JSON.parse(worker.worklist).map((work) => {
        result.map((cat)=> {
          if (work.cat === cat) {
            arrSelect.push(worker.chatId)
          } 
        })
      })
    })
    
    //выбрать уникальных специалистов
    //const arr = [...arrSelect].filter((el, ind) => ind === selected.indexOf(el));
    
    setSelected(arrSelect)

    console.log(arrSelect)
  }
  
}

//Изменить категорию (2-й селект)
const onAddCategory2 = (e) => {
  e.preventDefault();
  setValueSelect2(e.target.value)

  if (e.target.value === 0) {
    setSelected([])
  } else {
    const cat_name = categories[e.target.value].name

    setArrSelect([])
    arrCategory2.pop()
    arrCategory2.push(cat_name)
    console.log("arrCategory: ", arrCategory)
    setArrCategory2(arrCategory2)
    setCategoryAll([...arrCategory, ...arrCategory2])
    const result = [...arrCategory, ...arrCategory2]
    console.log(result)

    workers.map((worker)=> {
      JSON.parse(worker.worklist).map((work) => {
        result.map((cat)=> {
          if (work.cat === cat) {
            arrSelect.push(worker.chatId)
          } 
        })
      })
    })
    //выбрать уникальных специалистов
    //const arr = [...arrSelect].filter((el, ind) => ind === selected.indexOf(el));
    
    setSelected(arrSelect)

    console.log(arrSelect)
  }
}

//Изменить категорию (3-й селект)
const onAddCategory3 = (e) => {
  e.preventDefault();
  setValueSelect3(e.target.value)
}

//Изменить категорию (4-й селект)
const onAddCategory4 = (e) => {
  e.preventDefault();
  setValueSelect4(e.target.value)
}

//Изменить категорию (5-й селект)
const onAddCategory5 = (e) => {
  e.preventDefault();
  setValueSelect5(e.target.value)
}

//----------------------------------------

{/* Удаление категорий */}
const delCategory2 = () => {
  setShowCategories2(false)
  setValueSelect2(0)
  console.log("Удаление категории 2: ", arrCategory2)
  arrCategory2.pop()
  setCount(count - 1)
}

const delCategory3 = () => {
  setShowCategories3(false)
  setValueSelect3(0)
  console.log("Удаление категории 3: ", arrCategory3)
  arrCategory3.pop()
  setCount(count - 1)
}

const delCategory4 = () => {
  setShowCategories4(false)
  setValueSelect4(0)
  console.log("Удаление категории 4: ", arrCategory4)
  arrCategory4.pop()
  setCount(count - 1)
}



//выбор название проекта или номер проекта
const onChangeProjectName = () => {
  setShowNameProject(true)
  setSelected([])
  setValueSelect(0)
}

const onChangeProjectNumber = () => {
  setShowNameProject(false)
  setSelected([])
  setValueSelect(0)
}


let arr_count = []

//выбор проекта
const onChangeSelectProject = async(e) => {
  e.preventDefault();
  // if (e.target.value === '1') setProj('Проект 1')
  // if (e.target.value === '2') setProj('Проект 2')
  // if (e.target.value === '3') setProj('Проект 3')

  setValueProject(e.target.value)

  setProjectVar(e.target.value)

  if (e.target.value !== '0') {
    let count_title;
    setLoader(true)
    const blockId = await getBlocks(e.target.value); 

    if (blockId) {
      const databaseBlock = await getDatabaseId(blockId.data); 
      setLoader(false)
      const categories2 = [...databaseBlock.data]

      console.log("categories: ", categories2)

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
      
      if(arr_count[0]) {
        setValueSelect(arr_count[0].id)
      }

      if(arr_count[1]) {
        setValueSelect2(arr_count[1]?.id)
        setShowCategories2(true)
      }

      if(arr_count[2]) {
        setValueSelect2(arr_count[2]?.id)
        setShowCategories3(true)
      }

      if(arr_count[3]) {
        setValueSelect2(arr_count[3].id)
        setShowCategories4(true)
      }

      const cat_name = categories[valueSelect].name
      console.log("Категория: ", cat_name)
      workers.map((worker)=> {
        JSON.parse(worker.worklist).map((work) => {
          console.log(work.cat)
          if (work.cat === cat_name) {
            selected.push(worker.chatId)
          } 
        })
      })
      //выбрать уникальных специалистов
      const arr = [...selected].filter((el, ind) => ind === selected.indexOf(el));
      setSelected(arr)
      
    }
  } else {
    setValueSelect(0)
  }
  
}

const onChangeAddButton = () => {
  setShowEditButtonAdd (true)
}

const onChangeAddButton2 = () => {
  setShowEditButtonAdd (false)
}


//=======================================================

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
          console.log(host + response.data.path)
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

  const onChangeTextButton = (e) => {
    setTextButton(e.target.value)
  }

  //дублировать в админку
  const onChangeCheck = (e) => {
    setSendToAdmin(e.target.value)
  }

  //===================================================================


  {/* Отправка рассылки */}
  const onSendText = async() => {
    console.log(selected)

    audio.play();

    //новая рассылка
    const message = {
      //name: 'Рассылка', 
      text: text, 
      image: host + image, 
      button: textButton, 
      receivers: selected.toString(), 
      datestart: Date.now(), 
      delivered: 'true',        
    }
    console.log("message send button: ", message);

    //сохранение рассылки в базе данных
    await newDistributionW(message)

    
    selected.map(async (user, index) => {
      console.log("Пользователю ID: " + user + " сообщение " + text + " отправлено! Кнопка " + textButton + " отправлена!")

      let client = clients.filter((client) => client.chatId === user)[0];

      //получить id специалиста по его telegramId
      const worker = await getWorkerId(user)
      
      //новый претендент
      const pretendent = {
        projectId: projectVar, 
        workerId: worker.data, 
        receiverId: user,        
      }
      const pretendentId = await newPretendent(pretendent)
      
      //Передаем данные боту
      const keyboard = JSON.stringify({
        inline_keyboard: [
            [
                {"text": textButton, callback_data:'/report'},
            ],
        ]
      });

      const keyboard2 = JSON.stringify({
        inline_keyboard: [
            [
                {"text": 'Принять', callback_data:'/accept ' + pretendentId.id},
                {"text": 'Отклонить', callback_data:'/cancel'},
            ],
        ]
      });

      //отправить в телеграмм
      let sendToTelegram
      if (text !== '') {
        const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user}&parse_mode=html&text=${text.replace(/\n/g, '%0A')}`
        console.log("url_send_msg: ", url_send_msg)
        sendToTelegram = await $host.get(url_send_msg);
        console.log('sendToTelegram: ', sendToTelegram)
      }  

      const url_send_photo = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${user}&reply_markup=${showEditButtonAdd ? keyboard : keyboard2}`
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
      let response = await getDistributionsW();
      console.log("distribution new add: ", response.length)
			setDistributionsWork(response)

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
                          <CCard className="mb-4" style={{height: '600px'}}>
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

                                      {/* Список проектов по имени */}
                                      <CFormSelect 
                                        aria-label="Default select example"
                                        style={{display: showNameProject ? "block" : "none" }}
                                        onChange={onChangeSelectProject}
                                        options={contacts}
                                        value={valueProject}
                                      />

                                      {/* Список проектов по id */}
                                      <CFormSelect 
                                        aria-label="Default select example"
                                        style={{display: !showNameProject ? "block" : "none" }}
                                        onChange={onChangeSelectProject}
                                        options={contacts2}
                                        value={valueProject}
                                      />

                                      {/* <br/> */}
                                      

                                      {loader ? 
                                      <>
                                        <br/>
                                        <div style={{position: 'relative'}}>
                                          <div style={{position: 'absolute', top: '-10px', left: '45%'}}>
                                            <CSpinner/>
                                          </div>
                                        </div> 
                                      </>
                                      : <br/>
                                      }
                                      
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
                                        <CCol sm={12} style={{display: 'flex'}}>  
                                          <CFormSelect 
                                            aria-label="Default select example"
                                            onChange={onAddCategory2}
                                            value={valueSelect2}
                                            options={categories}
                                            style={{marginTop: '15px', display: showCategories2 ? "block" : "none"}}
                                          />
                                          <CIcon 
                                            icon={cilX} 
                                            size="xl" 
                                            style={{marginTop: '20px', marginLeft: '15px', marginRight: '12px', display: showCategories2 ? "block" : "none"}} 
                                            onClick={delCategory2}
                                          />
                                        </CCol>
                                      </CRow>

                                      <CRow>
                                        <CCol sm={12} style={{display: 'flex'}}>  
                                          <CFormSelect 
                                            aria-label="Default select example"
                                            onChange={onAddCategory3}
                                            value={valueSelect3}
                                            options={categories}
                                            style={{marginTop: '15px', display: showCategories3 ? "block" : "none"}}
                                          />
                                          <CIcon 
                                            icon={cilX} 
                                            size="xl" 
                                            style={{marginTop: '20px', marginLeft: '15px', marginRight: '12px', display: showCategories3 ? "block" : "none"}} 
                                            onClick={delCategory3}
                                          />
                                        </CCol>
                                      </CRow>

                                      <CRow>
                                        <CCol sm={12} style={{display: 'flex'}}>
                                          <CFormSelect 
                                            aria-label="Default select example"
                                            onChange={onAddCategory4}
                                            value={valueSelect4}
                                            options={categories}
                                            style={{marginTop: '15px', display: showCategories4 ? "block" : "none"}}
                                          />
                                          <CIcon 
                                            icon={cilX} 
                                            size="xl" 
                                            style={{marginTop: '20px', marginLeft: '15px', marginRight: '12px', display: showCategories4 ? "block" : "none"}} 
                                            onClick={delCategory4}
                                          />
                                        </CCol>
                                      </CRow>

                                      <CRow>
                                        <CCol sm={12} style={{textAlign: 'end', marginTop: '15px', paddingRight: '23px'}}> 
                                          <img 
                                            src={treug} 
                                            alt='' 
                                            width='20px' 
                                            onClick={onAddCategory0}
                                          />
                                        </CCol>
                                      </CRow>
                                      
                                      <p style={{color: '#767676', marginTop: '-20px'}}>Получателей: <span>{selected.length}</span></p>  
                                      
                                    </CCol>

                                    {/* <CCol sm={1}></CCol> */}

                                    {/* Правый блок */}
                                    <CCol sm={6} style={{paddingLeft: '30px', paddingRight: '30px'}}>
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
                                                accept="image/*,image/jpeg"
                                                // label="Добавить картинку" 
                                                name="photo"
                                                onChange={(e) => onFileChange(e)}
                                                value={value}
                                              />

                                              {/* <form>
                                                <label htmlFor="formFile" className="custom-file-upload">
                                                  Выберите файл
                                                </label> 
                                                <input 
                                                  type="file"
                                                  id="formFile" 
                                                  accept="image/*,image/jpeg" 
                                                  name="photo"
                                                  onChange={(e) => onFileChange(e)}
                                                  value={value}
                                                /> 
                                                <span className="input-file-text" type="text">{value}</span>
                                              </form> */}
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
                                      <div style={{color: '#8f8888', visibility: showEditButtonAdd ? "visible" : "hidden" }}>
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
                                          <img src={phone_image} width='280px' height='546px' alt='phone' />
                                          <div style={{position: 'absolute', top: '60px', left: '22px'}}>
                                            <img src={value ? value : noimage2} width='240px' alt='poster' style={{borderRadius: '7px'}}/>
                                          </div>
                                          <div style={{position: 'absolute', top: '225px', left: '22px', display: 'flex', width: '85%'}}>
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

                                <CRow>
                                  <CCol sm={9}>
                                    <div className="mb-3" style={{
                                      display: 'flex', 
                                      width: '100%', 
                                      justifyContent: 'space-between',
                                      marginTop: '30px'
                                    }}>
                                    {/* <div><Link to={'/distributionw_planer/'} state={{ project: proj}}><CButton color="secondary">Запланировать</CButton></Link></div> */}
                                      <div>{proj ? 
                                        <Link to={'/distributionw_planer'} state={{ project: proj}}><CButton color="secondary">Запланировать</CButton></Link>
                                        :<Link to={''} state={{ project: `${proj}`, }}><CButton color="success">Запланировать</CButton></Link>}
                                      </div>
                                      <div><CButton color="primary" disabled={selected.length == 0} onClick={onSendText}>Разослать сейчас</CButton></div>
                                    </div>
                                  </CCol>
                                  <CCol sm={3}></CCol>
                                </CRow>
                                

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