import React, { Suspense, useEffect, useState, useContext } from 'react'
import { CContainer, CSpinner, CNav, CNavLink, CNavItem } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeaderChat } from '../components/index'

import "./../chat-app-new/App.css";
import "./../chat-app-new/assets/css/index.css";

// import Loader from "../chat-app-new/components/Loader";
import Home from "../chat-app-new/pages/Home";
import Sidebar from "../chat-app-worker/components/Sidebar";
import Chat from "../chat-app-worker/pages/Chat";
import { useUsersContext } from "./../chat-app-new/context/usersContext"

import { AccountContext } from "../chat-app-new/context/AccountProvider";

import { getWContacts, getWConversation, getWMessages, getWorkers } from './../http/workerAPI'
import { getWorkerNotionId, getWorkerChildrenId} from './../http/workerAPI';

const ChatsWorker = () => {

  const { personW } = useContext(AccountContext); 
  const { userWorkers, setUserWorkers} = useUsersContext();

  const [workers, setWorkers] = useState([]); //useState(contacts);
  //const [userWorkers, setUserWorkers] = useState([]); //useState(contacts);

	useEffect(() => {
		document.body.classList.add("dark-theme");
	});   

  useEffect(() => {
    //---------get Workers---------------------------------------------
    //---------get UserWorkers-----------------------------------------
        const fetchUserWorkerData = async () => {
    
          //1 все специалисты
          let response = await getWorkers();
          console.log("workers size: ", response)
    
          const arrayWorker = []
    
          response.map(async (user) => {
            const newWorker = {
              id: user.id,
              userfamily: user.userfamily,
              username: user.username,
              phone: user.phone,
              dateborn: user.dateborn,
              city: user.city, 
              companys: user.companys,
              stag: user.stag,
              worklist:  user.worklist,
              chatId: user.chatId,
              createDate: user.createdAt,
            }
    
            arrayWorker.push(newWorker)
          })
    
          setWorkers(arrayWorker)
    
    
          //2
          let response2 = await getWContacts();
          console.log("userWorkers size: ", response2)
      
          const arrayContact = []
      
          response2.map(async (user, index) => {
    
            let notion = await getWorkerNotionId(user.chatId)
            const avatars = await getWorkerChildrenId(notion[0]?.id)
            
            let conversationId = await getWConversation(user.chatId)
            let messages = await getWMessages(conversationId)
    
            console.log("messages: ", messages)
    
            //получить последнее сообщение
            const messageDates = Object.keys(messages);
            const recentMessageDate = messageDates[messageDates.length - 1];
            const message = messages[recentMessageDate];
    
            const dateMessage = message ? messages[recentMessageDate].createdAt : "2000-01-01T00:00:00";
            const lastMessage = message ? messages[recentMessageDate].text : "";			
      
            const arrayMessage = []
            const allDate = []
    
            messages.map(message => {
              const d = new Date(message.createdAt);
              const year = d.getFullYear();
              const month = String(d.getMonth()+1).padStart(2, "0");
              const day = String(d.getDate()).padStart(2, "0");
              const chas = d.getHours();
              const minut = String(d.getMinutes()).padStart(2, "0");
    
              const newDateMessage = `${day}.${month}.${year}`
    
              const newMessage = {
                date: newDateMessage,
                content: message.text,
                image: message.type === 'image' ? true : false,
                descript: message.buttons ? message.buttons : '',
                sender: message.senderId,
                time: chas + ' : ' + minut,
                status: 'sent',
                id:message.messageId,
                reply:message.replyId,
              }
              arrayMessage.push(newMessage)
              allDate.push(newDateMessage)
            })
    
            const dates = [...allDate].filter((el, ind) => ind === allDate.indexOf(el));
    
            let obj = {};
            for (let i = 0; i < dates.length; i++) {
              const arrayDateMessage = []
              for (let j = 0; j < arrayMessage.length; j++) {
                if (arrayMessage[j].date === dates[i]) {
                  arrayDateMessage.push(arrayMessage[j])							
                }
              }	
              obj[dates[i]] = arrayDateMessage;
            }
    
            const newUser = {
              id: user.id,
              username: user.username ? user.username : '',
              name: notion[0]?.fio ? notion[0]?.fio : '',
              city: notion[0]?.city ? notion[0]?.city : '',
              phone: notion[0]?.phone ? notion[0]?.phone : '',
              age: notion[0]?.age ? notion[0]?.age : "",
              chatId: user.chatId,
              avatar: avatars[0]?.image ? avatars[0]?.image : '', //user.avatar,
              conversationId: conversationId ? conversationId : 0,
              unread: 0, 
              pinned: false,
              typing: false,
              message:  lastMessage,
              date: dateMessage,
              messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
            }
            console.log(newUser)
            arrayContact.push(newUser)

            //если элемент массива последний
            if (index === response2.length-1) {
              const sortedClients = [...arrayContact].sort((a, b) => {       
                var dateA = new Date(a.date), dateB = new Date(b.date) 
                return dateB-dateA  //сортировка по убывающей дате  
              })
      
              setUserWorkers(sortedClients)
              //console.log("contacts: ", arrayContact)
            }
    
            //console.log("arrayContact: ", arrayContact)
          })
    
          //подгрузка контактов
          // setTimeout(() => {
          // 	const sortedClients = [...arrayContact].sort((a, b) => {       
          // 		var dateA = new Date(a.date), dateB = new Date(b.date) 
          // 		return dateB-dateA  //сортировка по убывающей дате  
          // 	})
    
          // 	setUserWorkers(sortedClients)
    
          // }, "20000")
    
          //console.log("context userWorkers: ", arrayContact)

          //setUserWorkers(arrayContact)
    
        }
    
        //все сообщения специалистов
        fetchUserWorkerData();
    
      },[])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeaderChat />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>                 
                  
                  <div className="app">
                    <p className="app__mobile-message"> Доступно только на компьютере 😊. </p> 
                    <div className="app-content">
                      <Sidebar />
                      {Object.keys(personW).length ? <Chat /> : <Home /> }
                    </div>
                  </div>

                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default ChatsWorker
