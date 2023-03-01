import React, { useState, useEffect } from "react";
import "./styles/main.css";
import avatar from "./../../assets/images/logo_chat_admin.png";
import Icon from "./../../components/Icon";
import Contact from "./Contact";
import OptionsBtn from "./../../components/OptionsButton";
import { useUsersContext } from "./../../context/usersContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
	const { users: clients } = useUsersContext();
    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID 
	const [contacts, setContacts]= useState([]);
	const [text, setText]= useState("");


	useEffect(() => {
		setContacts(clients)
	},[clients])
	
	useEffect(() => {
		//const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name))

		// const sortedClients = [...clients].sort((a, b) => {
                
		// 	var dateA = new Date(a.date), dateB = new Date(b.date)
							
		// 	//     dateA-dateB  //сортировка по возрастающей дате     
		// 	return dateB-dateA  //сортировка по убывающей дате  
		// })
 
        //const filteredData = sortedClients.filter(user=> (user.name).toLowerCase().includes(text.toLowerCase()));

		const filteredData = clients.filter(user=> (user.name).toLowerCase().includes(text.toLowerCase()));
        setContacts(filteredData);
        
    }, [text]);

	return (
		<aside className="sidebarB">
			{/* Header */}
			<header className="headerB">
				<div className="sidebar__avatar-wrapper">
					<img src={avatar} alt="Karen Okonkwo" className="avatar-adm" />
				</div>
				<div className="sidebar__actions">
					<Link
						className="chat__action"
						aria-label="laptop"
						to={`/dashboard`}
						onClick=""
					>
						<Icon
							id="laptop"
							className="chat__action-icon chat__action-icon--search"
						/>
					</Link>
					<button className="sidebar__action" aria-label="Status">
						<Icon
							id="status"
							className="sidebar__action-icon sidebar__action-icon--status"
						/>
					</button>
					<button className="sidebar__action" aria-label="New chat">
						<Icon id="chat" className="sidebar__action-icon" />
					</button>
					<OptionsBtn
						className="sidebar__action"
						ariaLabel="Menu"
						iconId="menu"
						iconClassName="sidebar__action-icon"
						options={[
							"Профиль",
							"Архив",
							"Избранные сообщения",
							"Настройки",
							"Вернуться в панель управления",
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
					placeholder="Поиск заказчика" 
					onChange={(e)=>setText(e.target.value)}
				/>
			</div>
			
			{/* Conversations */}
			<div className="sidebar__contacts">
				{contacts.map((contact, index) => (
					contact.chatId !== chatAdminId &&
                    <>   
						<Contact key={index} contact={contact} />
					</>
				))}
			</div>
		</aside>
	);
};

export default Sidebar;
