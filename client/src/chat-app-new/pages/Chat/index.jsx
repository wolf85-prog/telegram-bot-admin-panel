import React, { useEffect, useRef, useState } from "react";
import "./styles/main.css";
import EmojiTray from "./components/EmojiTray";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar";
import Icon from "./../../components/Icon";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Convo from "./components/Convo";
import { useUsersContext } from "./../../context/usersContext";

import { useContext } from 'react';
import { AccountContext } from './../../../chat-app/context/AccountProvider';
import { getConversation } from './../../../http/chatAPI';

const Chat = ({ match, history }) => {
	// const { users, setUserAsUnread, addNewMessage } = useUsersContext();
	const { person, account } = useContext(AccountContext);

	// const userId = match.params.id;
	// let user = users.filter((user) => user.id === Number(userId))[0];

	const lastMsgRef = useRef(null);
	const [showAttach, setShowAttach] = useState(false);
	const [showEmojis, setShowEmojis] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [showSearchSidebar, setShowSearchSidebar] = useState(false);
	const [newMessage, setNewMessage] = useState("");

	// useEffect(() => {
	// 	if (!user) history.push("/");
	// 	else {
	// 		scrollToLastMsg();
	// 		setUserAsUnread(user.id);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	person && scrollToLastMsg();
	// }, [users]);
	

	// useEffect(() => {
    //     const getMessageDetails = async () => {
    //         let data = await getMessages(conversation.id);
    //         console.log("messages: ", data);
    //         setMessages(data);
    //     }
    //     conversation.id && getMessageDetails();

    // }, [person.id, conversation.id, newMessageFlag])

    // useEffect(()=>{
    //     lastMsgRef.current?.scrollIntoView({transition: "smooth"})
    // },[messages])

    // useEffect(()=>{
    //     incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
    //         setMessages(prev => [...prev, incomingMessage])
    // }, [incomingMessage, conversation])

	const openSidebar = (cb) => {
		// close any open sidebar first
		setShowProfileSidebar(false);
		setShowSearchSidebar(false);

		// call callback fn
		cb(true);
	};

	const scrollToLastMsg = () => {
		lastMsgRef.current.scrollIntoView();
	};

	// const submitNewMessage = () => {
	// 	addNewMessage(user.id, newMessage);
	// 	setNewMessage("");
	// 	scrollToLastMsg();
	// };

	return (
		<div className="chat">
			<div className="chat__body">
				<div className="chat__bg"></div>

				<Header
					user={person}
					openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
					openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
				/>
				<div className="chat__content">
					<Convo lastMsgRef={lastMsgRef} messages={person.messages} />
				</div>
				<footer className="chat__footer">
					<button
						className="chat__scroll-btn"
						aria-label="scroll down"
						// onClick={scrollToLastMsg}
					>
						<Icon id="downArrow" />
					</button>
					<EmojiTray
						// showEmojis={showEmojis}
						// newMessage={newMessage}
						// setNewMessage={setNewMessage}
					/>
					<ChatInput
						// showEmojis={showEmojis}
						// setShowEmojis={setShowEmojis}
						// showAttach={showAttach}
						// setShowAttach={setShowAttach}
						// newMessage={newMessage}
						// setNewMessage={setNewMessage}
						// submitNewMessage={submitNewMessage}
					/>
				</footer>
			</div>
			{/* <ChatSidebar
				heading="Search Messages"
				active={showSearchSidebar}
				closeSidebar={() => setShowSearchSidebar(false)}
			>
				<Search />
			</ChatSidebar>

			<ChatSidebar
				heading="Contact Info"
				active={showProfileSidebar}
				closeSidebar={() => setShowProfileSidebar(false)}
			>
				<Profile user={user} />
			</ChatSidebar> */}
		</div>
	);
};

export default Chat;
