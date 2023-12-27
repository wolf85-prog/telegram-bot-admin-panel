import React, { Suspense, useEffect, useState, useContext } from 'react'
import { CContainer, CSpinner, CNav, CNavLink, CNavItem } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeaderChat } from '../components/index'

import "./../chat-app-new/App.css";
import "./../chat-app-new/assets/css/index.css";

// import Loader from "../chat-app-new/components/Loader";
import Home from "../chat-app-new/pages/Home";
import Sidebar from "../chat-app-new/components/Sidebar";
import Chat from "../chat-app-new/pages/Chat";
import { useUsersContext } from "./../chat-app-new/context/usersContext"
import { getContacts, getConversation, getMessages } from '../http/chatAPI'

import { AccountContext } from "../chat-app-new/context/AccountProvider";

const Chats2 = () => {

  const { person } = useContext(AccountContext); 

  const { users, setUsers, contacts, setContacts} = useUsersContext();

  const [users2, setUsers2] = useState([])

	useEffect(() => {
		document.body.classList.add("dark-theme");
	});   


  useEffect(() => {
    const fetchData = async () => {
			let contacts = await getContacts();
			console.log("contacts size: ", contacts.length)
	
			const arrayContact = []
	
			contacts.map(async (user, index) => {
				
				

				let first_name = user.firstname != null ? user.firstname : ''
				let last_name = user.lastname != null ? user.lastname : ''

				let chatName = user.username ? user.username : first_name + ' ' + last_name

				const newUser = {
					id: user.id,
					name: chatName,
					chatId: user.chatId,
					avatar: user.avatar,
					//conversationId: conversationId,
					unread: 0, 
					pinned: false,
					typing: false,
					//message:  lastMessage,
					//date: dateMessage,
					//messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
				}
				arrayContact.push(newUser)
			})

			//подгрузка контактов
			setTimeout(() => {
				// const sortedClients = [...arrayContact].sort((a, b) => {       
				// 	var dateA = new Date(a.date), dateB = new Date(b.date) 
				// 	return dateB-dateA  //сортировка по убывающей дате  
				// })

				setUsers(arrayContact)
        setContacts(arrayContact)

				localStorage.setItem('contacts', JSON.stringify(arrayContact));
			}, 2000)

		}

    //все сообщения заказчиков
		fetchData();
  })


  //подгрузка сообщений
  useEffect(() => {
		console.log("contacts page: ", users)

    const arrayContact = []

    users.map(async (user, index) => {
      let conversationId = await getConversation(user.chatId)
        //console.log(conversationId)

			let messages = await getMessages(conversationId)
			//console.log("count message: ", messages.length)

			//получить последнее сообщение
			const messageDates = Object.keys(messages);
			const recentMessageDate = messageDates[messageDates.length - 1];
			const message = messages[recentMessageDate];

			const dateMessage = message ? messages[recentMessageDate].createdAt : "2000-01-01T00:00:00";
			const lastMessage = message ? messages[recentMessageDate].text : "";			
	
			const arrayMessage = []
			const allDate = []

			// messages.map(message => {
			// 		const d = new Date(message.createdAt);
			// 		const year = d.getFullYear();
			// 		const month = String(d.getMonth()+1).padStart(2, "0");
			// 		const day = String(d.getDate()).padStart(2, "0");
			// 		const chas = d.getHours();
			// 		const minut = String(d.getMinutes()).padStart(2, "0");

			// 		const newDateMessage = `${day}.${month}.${year}`

			// 		const newMessage = {
			// 			date: newDateMessage,
			// 			content: message.text,
			// 			image: message.type === 'image' ? true : false,
			// 			descript: message.buttons ? message.buttons : '',
			// 			sender: message.senderId,
			// 			time: chas + ' : ' + minut,
			// 			status: 'sent',
			// 			id:message.messageId,
			// 			reply:message.replyId,
			// 		}
			// 		arrayMessage.push(newMessage)
			// 		allDate.push(newDateMessage)
			// })

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
					name: user.name,
					chatId: user.chatId,
					avatar: user.avatar,
					conversationId: conversationId,
					unread: 0, 
					pinned: false,
					typing: false,
					message:  lastMessage,
					date: dateMessage,
					//messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
				}
				arrayContact.push(newUser)

        setTimeout(() => {
            
          setUsers2(arrayContact)
  
        }, 5000)
    })

	}, [])

  //сортировка
  useEffect(()=> {
    const sortedClients = [...users2].sort((a, b) => {       
			var dateA = new Date(a.date), dateB = new Date(b.date) 
			return dateB-dateA  //сортировка по убывающей дате  
		})
    console.log("YES!!!!!!", sortedClients)
		setContacts(sortedClients)
  }, [users2])

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
                      {Object.keys(person).length ? <Chat /> : <Home /> }
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

export default Chats2
