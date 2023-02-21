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
	const [users, setContacts] = useState([])
	//const { setUsers } = useUsersContext();
	

	useEffect(() => {
		if (userPrefersDark) document.body.classList.add("dark-theme");
		stopLoad();
	});   

	const stopLoad = () => {
		setStartLoadProgress(true);
		setTimeout(() => setAppLoaded(true), 5000);

        //fetchData();
	};       

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
