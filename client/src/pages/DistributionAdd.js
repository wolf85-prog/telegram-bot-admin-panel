import React, { Suspense, useState, useEffect } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
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
} from '@coreui/react'

import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";

//import { MultiSelect } from "react-multi-select-component";

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { $host } from './../http/index'
import { useNavigate } from 'react-router-dom';
import { newDistribution, getDistributions, editDistribution } from './../http/adminAPI';
import { newMessage, uploadFile } from './../http/chatAPI';
import sendSound from './../chat-app-new/assets/sounds/distribution_sound.mp3';


const DistributionAdd = () => {

  const token = process.env.REACT_APP_TELEGRAM_API_TOKEN
	const host = process.env.REACT_APP_HOST
  const hostPort = process.env.REACT_APP_API_URL
  const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID

  const { users: clients } = useUsersContext();
  const { addNewMessage, setDistributions } = useUsersContext();
  const [contacts, setContacts]= useState([]);

  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const [countChar, setCountChar] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showEditButtonAdd, setShowEditButtonAdd] = useState(false);
  const [sendToAdmin, setSendToAdmin] = useState(false);
  const [textButton, setTextButton] = useState('');
  const [file, setFile] = useState();
  const [value, setValue] = useState("");
  const [image, setImage]= useState("");

  const audio = new Audio(sendSound);

  const navigate = useNavigate();

  const backPage = () => {
       navigate('/distribution');
  } 


  const [selectedCities, setSelectedCities] = useState(null);
    // const cities = [
    //     { name: 'New York', code: 'NY' },
    //     { name: 'Rome', code: 'RM' },
    //     { name: 'London', code: 'LDN' },
    //     { name: 'Istanbul', code: 'IST' },
    //     { name: 'Paris', code: 'PRS' }
    // ];

  // const options = [
  //   { name: "Grapes 🍇", code: "grapes" },
  //   { name: "Mango 🥭", code: "mango" },
  //   { name: "Strawberry 🍓", code: "strawberry" },
  //   { name: "Watermelon 🍉", code: "watermelon" },
  //   { name: "Pear 🍐", code: "pear", disabled: true },
  //   { name: "Apple 🍎", code: "apple" },
  //   { name: "Tangerine 🍊", code: "tangerine" },
  //   { name: "Pineapple 🍍", code: "pineapple" },
  //   { name: "Peach 🍑", code: "peach" }
  // ];

  useEffect(() => {
    const arrClients = []
      
    clients.map((client) => {
      const newObj = {
        name: client.name, 
        code: client.chatId,
      }
      arrClients.push(newObj)
    })

    console.log("users: ", arrClients)
    
    setContacts(arrClients)      
  }, [clients]);


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

          setImage(response.data.path.split('.team')[1]);
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

  const onChangeTextButton = (e) => {
    setTextButton(e.target.value)
  }

  const onChangeCheck = (e) => {
    console.log(!sendToAdmin)
    setSendToAdmin(!sendToAdmin)
  }

  {/* Отправка рассылки */}
  const onSendText = async() => {
    //console.log(selected)
    
    let arrUsers = []
    let countSuccess = 0

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
    const distrNew = await newDistribution(message)
    
    selected.map(async (user, index) => {
      setTimeout(async()=> { 
        console.log("Пользователю ID: " + user.code + " сообщение " + text + " отправлено! Кнопка " + textButton + " отправлена!")

        //по-умолчанию пока сообщение не отправлено
        arrUsers.push({
          label: user.name,
          value: user.code,
          status: 500,
          mess: null,
        }) 

        let client = clients.find((client) => client.chatId === user.code);
        console.log("client: ", client)
        
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
          console.log(arrUsers, distrNew)
          const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user.code}&parse_mode=html&text=${text.replace(/\n/g, '%0A')}`
          console.log("url_send_msg: ", url_send_msg)
          sendToTelegram = await $host.get(url_send_msg);
          console.log('sendToTelegram: ', sendToTelegram)

          const { status } = sendToTelegram;              
          if (status === 200) {
            console.log("статус 200 текст", arrUsers, distrNew.id)
            //countSuccess = countSuccess + 1 
            
            //обновить статус доставки
            arrUsers[index-1].status = 200  
            arrUsers[index-1].mess = sendToTelegram.data?.result?.message_id 
            
            console.log("res: ", {receivers: JSON.stringify(arrUsers)}, distrNew.id)

            //обновить бд рассылку
            await editDistribution({receivers: JSON.stringify(arrUsers)}, distrNew.id)
          } 
                              
        }  

        const url_send_photo = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${user.code}&reply_markup=${keyboard}`
        console.log("url_send_photo: ", url_send_photo)
        
        let sendPhotoToTelegram
        if (file) {
          const form = new FormData();
          form.append("photo", file);

          sendPhotoToTelegram = await $host.post(url_send_photo, form);
          console.log('sendPhotoToTelegram: ', sendPhotoToTelegram)

          const { status } = sendPhotoToTelegram;

          if (status === 200 && text === '') {
            console.log("статус 200 фото")
            //countSuccess = countSuccess + 1  
                    
            //обновить статус доставки
            arrUsers[index-1].status = 200
            arrUsers[index-1].mess = sendPhotoToTelegram.data?.result?.message_id   

            //обновить бд рассылку
            await editDistribution({receivers: JSON.stringify(arrUsers)}, distrNew.id)
          }
        } 

        //отправить в админку
        if (sendToAdmin) {
          let message = {};
          if(!file) {
              message = {
                  senderId: chatAdminId, 
                  receiverId: user.code,
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
                  receiverId: user.code,
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
            addNewMessage(user.code, text, 'text', '', client.conversationId, sendToTelegram.data.result.message_id);
          } else {
            addNewMessage(user.code, host + image, 'image', textButton, client.conversationId, sendPhotoToTelegram.data.result.message_id);
          }
    
        }  

      }, 3000 * ++index) 
    })

    //обновить список рассылок
    // let response = await getDistributions();
    // console.log("distribution new add: ", response.length)
    // setDistributions(response)

    setSelected([])
    setSendToAdmin(false)
    setText('')
    setShowEditButtonAdd(false)
    setTextButton('')
    setVisible(true)
    setValue('')

    //navigate('/distribution');
  }

  const selectChange = (e)=> {
    console.log(selected)
    setSelected(e.value)
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
                          <CCard className="mb-4">
                            {/* <CCardHeader>Рассылки</CCardHeader> */}
                            <CCardBody>
                            <CAlert color="success" dismissible visible={visible} onClose={() => setVisible(false)}>
                              Сообщение успешно отправлено!
                            </CAlert>
                              <CForm>
                                <div className="mb-3" style={{color: '#f3f3f3'}}>
                                  <CFormLabel htmlFor="exampleFormControlInput1">Выберите получателей:</CFormLabel>
                                  {/* <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    style={{color: '#1e1919'}}
                                    overrideStrings={{
                                      "allItemsAreSelected": "Все поля выбраны",
                                      "clearSearch": "Очистить поиск",
                                      "clearSelected": "Очистить выбор",
                                      "noOptions": "Ничего не найдено",
                                      "search": "Поиск",
                                      "selectAll": "Выбрать всё",
                                      "selectAllFiltered": "Выбрать всё (Найденных)",
                                      "selectSomeItems": "Выбрать...",
                                      "create": "Создать",
                                    }}   
                                  /> */}

                                  <MultiSelect 
                                    id="exampleFormControlInput1"
                                    value={selected} 
                                    onChange={(e) => selectChange(e)} 
                                    options={contacts} 
                                    optionLabel="name" 
                                    maxSelectedLabels={3} 
                                    className="w-full md:w-20rem" 
                                    filter 
                                    virtualScrollerOptions={{ itemSize: 43 }}
                                    placeholder=""
                                  />

                                  {/* <MultiSelect 
                                    value={selected} 
                                    onChange={(e)=>selectChange(e)} 
                                    options={options} 
                                    style={{color: '#1e1919'}}
                                    filter 
                                    virtualScrollerOptions={{ itemSize: 43 }}
                                    maxSelectedLabels={3}
                                    placeholder="Select Items"
                                  /> */}
                                  {/* <MultiSelect
                                    id="exampleFormControlInput1"
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy={"Select"}
                                    isCreatable={true}
                                  /> */}
                                  <p style={{color: '#767676'}}>Получателей: <span>{selected?.length}</span></p>
                                </div>

                                <div className='mb-3' style={{color: '#f3f3f3'}}>
                                  <CFormCheck 
                                    id="flexCheckDefault" 
                                    label="Дублировать в админку"
                                    onChange={onChangeCheck}
                                    defaultChecked={sendToAdmin}
                                  />
                                </div>

                                <div className="mb-3">
                                  {/* <CFormLabel htmlFor="exampleFormControlTextarea1">Текст сообщения</CFormLabel> */}
                                  <CFormTextarea 
                                    id="exampleFormControlTextarea1" 
                                    rows={3} 
                                    placeholder='Введите текст сообщения'
                                    onChange={onChangeText}
                                    value={text}
                                    // helperText = {`${countChar}/500`}
                                  >           
                                  </CFormTextarea>
                                </div>
                              

                                {/* Добавление картинки */}
                                <div className="mb-6" style={{color: '#8f8888'}}>
                                  <CFormInput 
                                    type="file" 
                                    id="formFile" 
                                    label="Добавить картинку" 
                                    name="photo"
                                    onChange={(e) => onFileChange(e)}
                                    value={value}
                                  />
                                </div>

                                <div className="mb-3"></div>

                                <div className="mb-3 text-center">
                                  <p style={{color: '#fff', cursor: 'pointer'}} onClick={clickShowEditButton} > {showEditButtonAdd ? '- Убрать кнопку' : '+ Добавить кнопку'}</p>
                                </div>

                                {/* Добавление кнопки */}
                                <CForm className="row g-3" style={{color: '#8f8888', display: showEditButtonAdd ? "block" : "none" }}>
                                  <CCol md={6}>
                                    <CFormInput 
                                      type="text" 
                                      id="inputTextButton" 
                                      label="Название кнопки" 
                                      placeholder="Введите текст"
                                      onChange={onChangeTextButton}
                                      value={textButton}
                                    />
                                  </CCol>
                                </CForm>
                                <br/>
                                <div className="mb-3" style={{textAlign: 'right'}}>
                                  <CButton color="secondary" style={{marginRight: '15px'}} onClick={backPage}>Отмена</CButton>
                                  <CButton color="primary" onClick={onSendText}>Отправить рассылку</CButton>
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

export default DistributionAdd
