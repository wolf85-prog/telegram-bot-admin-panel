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
	const { userWorkers, workers } = useUsersContext();
    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID 
	const [contacts, setContacts]= useState([]);
	const [text, setText]= useState("");
	const [loading, setLoading]= useState(true);

	const navigate = useNavigate()

	useEffect(() => {

		//сортировка
		const userSort = [...userWorkers].sort((a, b) => {       
			var dateA = new Date(a.date), dateB = new Date(b.date) 
			return dateB-dateA //сортировка по убывающей дате  
		})

		//console.log("sidebar userWorkers: ", userSort)
		setContacts(userSort)
		
		if(userWorkers.length > 0) {
			setLoading(false)
		}		
		
	},[userWorkers])

	
	useEffect(() => {
		const filteredData = userWorkers.filter(user=> (user.name+user.chatId)?.toLowerCase().includes(text.toLowerCase()));
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
				{loading ? 
				<CSpinner style={{margin: '50%'}}/> :
				
				contacts.map((contact) => (
					contact.chatId !== chatAdminId &&
                    <>   
						<Contact contact={contact} worker={workers.filter((item)=> item.chatId === contact.chatId)} />
					</>
				))
				}
			</div>
		</aside>
	);
};

export default Sidebar;
