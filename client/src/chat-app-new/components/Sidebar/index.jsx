import React, { useState, useEffect } from "react";
import "./styles/main.css";
import avatar from "./../../assets/images/profile-picture-girl-1.jpeg";
import Icon from "./../../components/Icon";
import Contact from "./Contact";
import OptionsBtn from "./../../components/OptionsButton";
import { useUsersContext } from "./../../context/usersContext";

//import { AccountContext } from '../../../context/AccountProvider';
import { getUsers } from './../../../http/chatAPI'

const Sidebar = () => {
	//const { users: contacts } = useUsersContext();
	const { users } = useUsersContext();
	//const { account, socket, setActiveUsers }= useContext(AccountContext);
	//console.log("person: ", contacts);

	const [contacts, setContacts] = useState([]);
	const[text, setText]= useState("");

    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
    const token = process.env.REACT_APP_TELEGRAM_API_TOKEN

    useEffect(() => {
        const fetchData = async () => {

            let response = await getUsers();
            const filteredData = response.filter(user=> (user.firstname + user.lastname).toLowerCase().includes(text.toLowerCase()));
            setContacts(filteredData);
        }
        fetchData();
    }, [text]);

	return (
		<aside className="sidebarB">
			{/* Header */}
			<header className="header">
				<div className="sidebar__avatar-wrapper">
					<img src={avatar} alt="Karen Okonkwo" className="avatar" />
				</div>
				<div className="sidebar__actions">
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
							"New group",
							"Create a room",
							"Profile",
							"Archived",
							"Starred",
							"Settings",
							"Log out",
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
