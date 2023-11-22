import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/main.css";
import avatar from "./../../assets/images/logo_chat_admin.png";
import Icon from "./../../components/Icon";
import Contact from "./Contact";
import OptionsBtn from "./../../components/OptionsButton";
import { useUsersContext } from "./../../context/usersContext";
import { CSpinner} from '@coreui/react'

const Sidebar = () => {
	const { users: clients } = useUsersContext();
    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID 
	const [contacts, setContacts]= useState([]);
	const [text, setText]= useState("");
	const [loading, setLoading]= useState(true);

	const navigate = useNavigate()

	useEffect(() => {
		//сортировка
		const userSort = [...clients].sort((a, b) => {       
			var dateA = new Date(a.date), dateB = new Date(b.date) 
			return dateB-dateA  //сортировка по убывающей дате  
		})
		setContacts(userSort)

		//console.log("clients: ", clients)

		if(clients.length > 0) {
			setLoading(false)
		}
	},[clients])
	
	useEffect(() => {
		const filteredData = clients.filter(user=> (user.name)?.toLowerCase().includes(text.toLowerCase()));
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
