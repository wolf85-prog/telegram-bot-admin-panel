import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/main.css";
import avatar from "./../../../chat-app-new/assets/images/logo_chat_admin.png";
import Icon from "./../../../chat-app-new/components/Icon";
import Contact from "./Contact";
import OptionsBtn from "./../../../chat-app-new/components/OptionsButton";
import { useUsersContext } from "./../../../chat-app-new/context/usersContext";
import { CSpinner} from '@coreui/react'

const Sidebar = () => {
	const { userRenthub } = useUsersContext();
    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID 
	const [contacts, setContacts]= useState([]);
	const [text, setText]= useState("");
	const [loading, setLoading]= useState(true);

	const CountWorkers = 50

	const navigate = useNavigate()

	useEffect(() => {
		
		//сортировка
		// const userSort = [...userWorkers].sort((a, b) => {       
		// 	var dateA = new Date(a.date), dateB = new Date(b.date) 
		// 	return dateB-dateA //сортировка по убывающей дате  
		// })
		
		const arr = []

		for (const item of userRenthub) {		
			arr.push(item)
			if (arr.length === CountWorkers)
			  break;
		}

		//console.log("contacts: ", userWorkers)

		setContacts(arr)
		
		if(arr.length > 0) {
			setLoading(false)
		}		
		
	},[userRenthub])

	
	useEffect(() => {
		const arr = []
		for (const item of userRenthub) {			
			arr.push(item)
			if (arr.length === CountWorkers)
			  break;
		}
		const filteredData = userRenthub.filter(user=> (user.name+user.chatId+user.phone)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
        
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
					placeholder="Поиск специалиста" 
					onChange={(e)=>setText(e.target.value)}
				/>
			</div>
			
			{/* Conversations */}
			<div className="sidebar__contacts">
				{loading ? 
				<CSpinner style={{margin: '50%'}}/> :
				
				contacts.map((contact, ind) => (
					contact.chatId !== chatAdminId &&
                    <>   
						<Contact contact={contact} worker={userRenthub.filter((item)=> item.chatId === contact.chatId)} />
					</>
				))
				}
			</div>
		</aside>
	);
};

export default Sidebar;
