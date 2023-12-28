import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/main.css";
import avatar from "./../../assets/images/logo_chat_admin.png";
import Icon from "./../../components/Icon";
import Contact from "./Contact";
import OptionsBtn from "./../../components/OptionsButton";
import { useUsersContext } from "./../../context/usersContext";
import { CSpinner} from '@coreui/react'

import { getContacts, getConversation, getMessages, getLastMessages } from '../../../http/chatAPI'

const Sidebar = () => {
	const { users, setUsers, contacts, setContacts } = useUsersContext();
	//const { users, setUsers, contacts, setContacts} = useUsersContext();

    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID 

	//const [contacts, setContacts]= useState([]);
	const [text, setText]= useState("");
	const [loading, setLoading]= useState(false);
	const [users2, setUsers2] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)

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
	
					//localStorage.setItem('contacts', JSON.stringify(arrayContact));
					setLoading(false)

				}, 1000)
			};
	
			//все сообщения заказчиков
			fetchData();
	}, [])

	//подгрузка сообщений
  	useEffect(() => {
		//console.log("contacts page: ", users)

    	const arrayContact = []

    	users.map(async (user, index) => {
      		let conversationId = await getConversation(user.chatId)

			//получить последнее сообщение
			let message = await getLastMessages(conversationId)
		

			let newMessage = ''
			let dateMessage = "2000-01-01T00:00:00"

			if (message) {
				dateMessage = message ? message.createdAt : "2000-01-01T00:00:00";		

				const d = new Date(message?.createdAt);
				const year = d.getFullYear();
				const month = String(d.getMonth()+1).padStart(2, "0");
				const day = String(d.getDate()).padStart(2, "0");
				const chas = d.getHours();
				const minut = String(d.getMinutes()).padStart(2, "0");

				const newDateMessage = `${day}.${month}.${year}`

				newMessage = {
					date: newDateMessage,
					content: message?.text,
					image: message?.type === 'image' ? true : false,
					descript: message?.buttons ? message.buttons : '',
					sender: message?.senderId,
					time: chas + ' : ' + minut,
					status: 'sent',
					id:message?.messageId,
					reply:message?.replyId,
				}
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
				message:  newMessage , //lastMessage,
				date: dateMessage,
				//messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
			}
			arrayContact.push(newUser)

			setTimeout(() => {	
				console.log("arrayContact: ", arrayContact)	
				//localStorage.setItem('contacts', arrayContact);
				setUsers2(arrayContact)
			}, 10000)
		})
	}, [users])

	//сортировка
	useEffect(()=> {
		//КЭШ браузера
		//const retrievedData = localStorage.getItem("contacts");
		//const contactsStorage = JSON.parse(retrievedData ? retrievedData : '[]')

		//если есть кэш браузера
		// if (contactsStorage.length > 0) {
		// 	const sortedClients = [...contactsStorage].sort((a, b) => {       
		// 		var dateA = new Date(a.date), dateB = new Date(b.date) 
		// 		return dateB-dateA  //сортировка по убывающей дате  
		// 	})
				
		// 	setContacts(sortedClients)
		// } else {
			const sortedClients = [...users2].sort((a, b) => {       
				var dateA = new Date(a.date), dateB = new Date(b.date) 
				return dateB-dateA  //сортировка по убывающей дате  
			})
				
			setContacts(sortedClients)
		//}

	}, [users2])

	
	
	useEffect(() => {
		//КЭШ браузера
		//const retrievedData = localStorage.getItem("contacts");
		//const contactsStorage = JSON.parse(retrievedData)
		
		const filteredData = contacts.filter(user=> (user.name)?.toLowerCase().includes(text.toLowerCase()));
        setContacts(filteredData);      
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

	return (
		<aside className="sidebarB">
			{/* Header */}
			<header className="headerB">
				<div className="sidebar__avatar-wrapper">
					<img src={avatar} alt='U.L.E.Y' className="avatar-adm" />
				</div>
				<div>Менеджеры</div>
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
					placeholder="Поиск менеджера" 
					onChange={(e)=>setText(e.target.value)}
				/>
			</div>
			
			{/* Conversations */}
			<div className="sidebar__contacts">
				{loading ? 
				<CSpinner style={{margin: '50%'}}/> :
				contacts.map((contact) => (
					contact.chatId !== chatAdminId &&
                    <>   
						<Contact contact={contact} />
					</>
				))
				}
			</div>
		</aside>
	);
};

export default Sidebar;
