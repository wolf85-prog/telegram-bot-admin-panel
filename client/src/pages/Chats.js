import React, { useEffect, useState, useContext } from "react";
import "./../chat-app-new/App.css";
import "./../chat-app-new/index.css";
import "./../chat-app-new/assets/css/index.css";
import Loader from "../chat-app-new/components/Loader";
import Home from "../chat-app-new/pages/Home";
import Sidebar from "../chat-app-new/components/Sidebar";
import Chat from "../chat-app-new/pages/Chat";
import { getContacts, getConversation, getMessages } from '../http/chatAPI'

import { AccountContext } from "../chat-app-new/context/AccountProvider";
import { useUsersContext } from "../chat-app-new/context/usersContext";

const userPrefersDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;

const Chats = () => {
    const [appLoaded, setAppLoaded] = useState(false);
	const [startLoadProgress, setStartLoadProgress] = useState(false);

    const { person } = useContext(AccountContext); 
	const { setUsers } = useUsersContext();
	

	useEffect(() => {
		if (userPrefersDark) document.body.classList.add("dark-theme");
		stopLoad();
	});   

	const stopLoad = () => {
		setStartLoadProgress(true);
		setTimeout(() => setAppLoaded(true), 5000);

		//загрузить всех пользователей (контакты)
        fetchData();
	};       
 
	const fetchData = async () => {
		let response = await getContacts();

		const arrayContact = []

		response.map(async (user) => {
			
			let conversationId = await getConversation(user.chatId)
			let messages = await getMessages(conversationId)

			const arrayMessage = []

			messages.map(message => {
				let time_mess = message.createdAt.split('T')
				const newMessage = {
					content: message.text,
					sender: message.senderId,
					time: time_mess[1],
					status: 'sent',
				}
				arrayMessage.push(newMessage)
			})

			let first_name = user.firstname != null ? user.firstname : ''
			let last_name = user.lastname != null ? user.lastname : ''
			const newUser = {
				id: user.id,
				name: first_name + ' ' + last_name,
				chatId: user.chatId,
				conversationId: conversationId,
				unread: 0, 
				pinned: false,
				typing: false,
				messages: {"01/01/2023": arrayMessage}
			}
			arrayContact.push(newUser)
		})

		setUsers(arrayContact)
		console.log("contacts: ", arrayContact)
	}

	if (!appLoaded) return <Loader done={startLoadProgress} />;

	return (
		<div className="app">
			<p className="app__mobile-message"> Доступно только на компьютере 😊. </p>
			<div className="app-content">
				<Sidebar />
                {Object.keys(person).length ? <Chat /> : <Home /> }
			</div>
		</div>
	);
}

export default Chats
