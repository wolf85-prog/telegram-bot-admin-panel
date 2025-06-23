import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/main.css";
import avatar from "./../../../chat-app-new/assets/images/logo_chat_admin.png";
import Icon from "./../../../chat-app-new/components/Icon";
import Contact from "./Contact";
import OptionsBtn from "./../../../chat-app-new/components/OptionsButton";
import { useUsersContext } from "./../../../chat-app-new/context/usersContext";
import { CSpinner} from '@coreui/react'

import Loader from './../../../components/LoaderMini/LoaderMini'

import { getWContacts, getWConversations, getWMessagesCount} from 'src/http/workerAPI'
import { getSpecialist, getSpecCount} from 'src/http/specAPI'

const Sidebar = () => {
	const { userWorkers, setUserWorkers, setWorkers, workersAll, setWorkersAll, specialist, conversations, setConversations } = useUsersContext();
    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID 
	const [contacts, setContacts]= useState([]);
	const [text, setText]= useState("");
	const [loading, setLoading]= useState(true);

	const CountWorkers = 50

	const navigate = useNavigate()


	//---------get Messages Workers----------------------------------------------------
	useEffect(() => {
		//---------get UserWorkers-----------------------------------------
		const fetchUserWorkerData = async () => {
					console.log("Старт загрузки сообщений специалистов...")
				
					//0 все специалисты
					//let all = await getWorkers()
					let all = await getSpecialist()
					//console.log("specialist all: ", all)
					const arrayWorkerAll = []
				
					all.map(async (user) => {
						const newWorker = {
						  id: user.id,
						  userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
						  username: '',//user.username,
						  phone: user.phone,
						  dateborn: user.age,
						  city: user.city, 
						  //newcity: user.newcity, 
						  companys: user.company,
						  //stag: user.stag,
						  worklist:  user.specialization,
						  chatId: user.chatId,
						  createDate: user.createdAt,
						  avatar: user.profile,
						  //from: user.from,
						  promoId: user.promoId,
						  blockW: user.blockW,
						  block18: user.block18,
						  krest: user.krest,
						  deleted: user.deleted,
						  comment: user.comment,
						  comteg: user.comteg,
						  projectAll: user.projectAll,
						  projectMonth: user.projectMonth,
						}
				
						arrayWorkerAll.push(newWorker)
					})
				
					setWorkersAll(arrayWorkerAll)
		
					//сохранить кэш
					//localStorage.setItem("specialist", JSON.stringify(arrayWorkerAll));
		
					//1 все специалисты 100
					//let response = await getWorkersCount(100, workers.length);
					let response = await getSpecCount(100, specialist.length);
					console.log("specialist 100: ", response)
				
					const arrayWorker = []
				
					response.reverse().map(async (user) => {
						const newWorker = {
							id: user.id,
							userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
							username: '',//user.username,
							phone: user.phone,
							dateborn: user.age,
							city: user.city, 
							//newcity: user.newcity, 
							companys: user.company,
							//stag: user.stag,
							worklist:  user.specialization,
							chatId: user.chatId,
							createDate: user.createdAt,
							avatar: user.profile,
							//from: user.from,
							promoId: user.promoId,
							blockW: user.blockW,
							block18: user.block18,
							krest: user.krest,
							deleted: user.deleted,
						}
				
						arrayWorker.push(newWorker)
					})
				
					setWorkers(arrayWorker)	
				
					//2 все пользователи бота
					let wuserbots = await getWContacts();
					console.log("wuserbots size: ", wuserbots.length)
					const arrayContact = []
		
					//3 все беседы (conversations)
					let convers = await getWConversations()
					console.log("Всего бесед: ", convers.length)
					setConversations(convers)
		
					//4 все сообщения бота
					let messagesAll = await getWMessagesCount(1000) //getWMessagesCount(1000) //getAllWMessages()
					//console.log("messagesAll: ", messagesAll.length)
		
					let count = 0
					convers.forEach(async (user, index) => {
						console.log("Загрузка сообщений в диалоги...")
				
						let worker = arrayWorkerAll.find((item)=> item.chatId === user.members[0])
						let userbot = wuserbots.find((item)=> item.chatId === worker?.chatId)	
							
						let conversationId = user.id //await getWConversation(user.members[0])
		
						let messages = []
						let messages2 = []
						
						//messages = messagesAll.filter(item => item.conversationId === conversationId.toString()) //await getWMessages(conversationId)
						//messagesAll.reverse()
		
						//выбрать из всех сообщений только пользователя в кол-ве 10 шт.
						for (let i = messagesAll.length-1; i >= 0; i--) {
							if (messagesAll[i].conversationId === conversationId.toString())
								messages.push(messagesAll[i])
							
							if (messages.length === 10)
							  break;
						}
		
						//console.log("messages: ", messages)
		
						//получить последнее сообщение (без сообщений из рассылки)
						if (messages.length > 0) {
							[...messages].reverse().map((message) => {
								if (message.isBot === false || message.isBot === null) {
									messages2.push(message)
								}	
							})
						}
		
						//console.log("last messages: ", user, messages2)
							
						const messageDates = Object.keys(messages2); //messages
		
						const recentMessageDate = messageDates[messageDates.length - 1];
						const message = messages2[recentMessageDate];
						
						const dateMessage = message ? messages2[recentMessageDate].createdAt : "2000-01-01T00:00:00";
						const lastMessage = message ? messages2[recentMessageDate].text : "";			
						
						const arrayMessage = []
						const allDate = []
						
						if (messages) {
							[...messages].reverse().map(message => {
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
						}	
						
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
						
						if (worker) {
							const newUser = {
								id: worker.id,
								username: userbot?.username ? userbot?.username : '', // user.username ? user.username : '',
								name: worker?.userfamily + " " + worker?.username, //notion[0]?.fio ? notion[0]?.fio : '',
								city: worker?.city, //notion[0]?.city ? notion[0]?.city : '',
								//newcity: worker?.newcity,
								phone: worker?.phone, //notion[0]?.phone ? notion[0]?.phone : '',
								age: worker?.dateborn, //notion[0]?.age ? notion[0]?.age : "",
								chatId: worker?.chatId,
								avatar: worker?.avatar, //avatars[0]?.image ? avatars[0]?.image : '', //user.avatar,
								conversationId: conversationId ? conversationId : 0,
								block: userbot?.block ? userbot?.block : '',
								blockW: worker?.blockW,
								unread: 0, 
								pinned: false,
								typing: false,
								message:  lastMessage,
								date: dateMessage,
								messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
							}
							//console.log(newUser)
							arrayContact.push(newUser)
						}		
						
						//console.log(arrayContact)
					
						//если элемент массива последний
						//if (index === convers.length-1) {
							const sortedClients = [...arrayContact].sort((a, b) => {       
								var dateA = new Date(a.date), dateB = new Date(b.date) 
								return dateB-dateA  //сортировка по убывающей дате  
							})
				
							setUserWorkers(sortedClients)
						//}				
					})	
		}
				
		//все сообщения специалистов
		fetchUserWorkerData();
				
	},[])

	useEffect(() => {
		
		//сортировка
		// const userSort = [...userWorkers].sort((a, b) => {       
		// 	var dateA = new Date(a.date), dateB = new Date(b.date) 
		// 	return dateB-dateA //сортировка по убывающей дате  
		// })
		
		const arr = []

		for (const item of userWorkers) {		
			arr.push(item)
			//if(arr.length > 0) {
				setLoading(false)			
			//}
			if (arr.length === CountWorkers)
			  break;
		}

		console.log("contacts: ", arr)

		setContacts(arr)
		
				
		
	},[userWorkers])

	
	useEffect(() => {
		const arr = []
		for (const item of userWorkers) {			
			arr.push(item)
			if (arr.length === CountWorkers)
			  break;
		}
		const filteredData = userWorkers.filter(user=> (user.name+user.chatId+user.phone)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
        
		setContacts(text === '' ? arr : filteredData);      
    }, [text]);


	const onSelected = (index) => {
		switch(index) {
			case 0: //данные о контакте
				console.log('Профиль')
				break
		  
			case 1: 
				console.log('1')
				break
			
			case 4: 
				navigate("/dashboard");
				break
		  
			default:
				console.log("В разработке")
				break
		  }
	};

	// const getNeedWorker = (contact) => {
	// 	workers.find((item)=> item.chatId === contact.chatId)}
	// };

	return (
		<aside className="sidebarB">
			{/* Header */}
			<header className="headerB">
				<div className="sidebar__avatar-wrapper">
					<img src={avatar} alt='U.L.E.Y' className="avatar-adm" />
				</div>
				<div>Специалисты</div>
				<div className="sidebar__actions">
					<OptionsBtn
						className="sidebar__action"
						ariaLabel="Menu"
						iconId="menu"
						iconClassName="sidebar__action-icon"
						onSelected={onSelected}
						options={[
							"Профиль",
							// "Архив",
							// "Избранные сообщения",
							// "Настройки",
							// "Вернуться в панель управления",
						]}
					/>
				</div>
			</header>
			
			{/* Search */}
			<div className="search-wrapper">
				<div className="search-icons">
					<Icon id="search" className="search-icon" />
					<button className="search__back-btn">
						<Icon id="back" />
					</button>
				</div>
				<input 
					className="search" 
					placeholder="Поиск специалиста" 
					onChange={(e)=>setText(e.target.value)}
				/>
			</div>
			
			{/* Conversations */}
			<div className="sidebar__contacts">
				{2>1 ? 
				<Loader /> :
				
				contacts.map((contact, ind) => (
					contact.chatId !== chatAdminId &&
                    <>   
						<Contact key={ind} contact={contact} worker={workersAll.filter((item)=> item.chatId === contact.chatId)} />
					</>
				))
				}
			</div>
		</aside>
	);
};

export default Sidebar;
