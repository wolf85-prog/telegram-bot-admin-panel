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
import { AccountContext } from './../../../chat-app-new/context/AccountProvider';
import { newMessage } from './../../../http/chatAPI';
import { $host } from './../../../http/index'
import { uploadFile } from '../../../http/chatAPI';

const Chat = () => {
	const { users, setUserAsUnread, addNewMessage } = useUsersContext();
	const { person } = useContext(AccountContext);

	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
    const token = process.env.REACT_APP_TELEGRAM_API_TOKEN

	const chatId = person.id;
	let user = users.filter((user) => user.chatId === chatId.toString())[0];

	const lastMsgRef = useRef(null);
	const [showAttach, setShowAttach] = useState(false);
	const [showEmojis, setShowEmojis] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [showSearchSidebar, setShowSearchSidebar] = useState(false);
	//const [newMessage, setNewMessage] = useState("");
	const [file, setFile] = useState();
	const [image, setImage]= useState("");
	const [value, setValue] = useState("");

	useEffect(() => {
		if (user) {
			scrollToLastMsg();
			setUserAsUnread(user.chatId);
		}
	}, []);

	useEffect(() => {
		user && scrollToLastMsg();
	}, [users]);

	useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

				console.log("file data: ", data)

               let response = await uploadFile(data);
               setImage(response.data);
            }
        }
        getImage();
    }, [file])

	const onFileChange = (e) => {
        console.log('file: ', e.target.files[0]);
        setFile(e.target.files[0]);
        setValue(e.target.files[0].lastModified); //.name
    }

	const openSidebar = (cb) => {
		// close any open sidebar first
		setShowProfileSidebar(false);
		setShowSearchSidebar(false);

		// call callback fn
		cb(true);
	};

	const scrollToLastMsg = () => {
		lastMsgRef.current?.scrollIntoView({transition: "smooth"});
	};

	const sendText = async () => {
		let message = {};
        if(!file) {
            message = {
                senderId: chatAdminId, 
                receiverId: user.chatId,
                conversationId: user.conversationId,
                type: "text",
                text: value,
                is_bot: false
            }
        } else {
            message = {
                senderId: chatAdminId, 
                receiverId: user.chatId,
                conversationId: user.conversationId,
                type: "file",
                text: image,
                is_bot: false
            }
        }
        console.log("message send button: ", message);

		await newMessage(message)

        //Передаем данные боту
        const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${person.id}&parse_mode=html&text=${value}`
        console.log(url_send_msg)
		const sendToTelegram = await $host.get(url_send_msg);

		//Выводим сообщение об успешной отправке
		if (sendToTelegram) {
			console.log('Спасибо! Ваша сообщение отправлено!');
		}           
		//А здесь сообщение об ошибке при отправке
		else {
			console.log('Что-то пошло не так. Попробуйте ещё раз.');
		}

		//сохранить в контексте
		addNewMessage(user.chatId, value);
	}

	const submitNewMessage = (e) => {
		
		sendText();

		setValue("");
		scrollToLastMsg();
		setFile("");
        setImage("");
	};

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
					<Convo lastMsgRef={lastMsgRef} messages={user.messages} />
				</div>
				<footer className="chat__footer">
					<button
						className="chat__scroll-btn"
						aria-label="scroll down"
						onClick={scrollToLastMsg}
					>
						<Icon id="downArrow" />
					</button>
					<EmojiTray
						showEmojis={showEmojis}
						value={value}
						setValue={setValue}
					/>
					<ChatInput
						showEmojis={showEmojis}
						setShowEmojis={setShowEmojis}
						showAttach={showAttach}
						setShowAttach={setShowAttach}
						onFileChange={onFileChange}
						value={value}
						setValue={setValue}
						submitNewMessage={submitNewMessage}
					/>
				</footer>
			</div>
			<ChatSidebar
				heading="Поиск сообщения"
				active={showSearchSidebar}
				closeSidebar={() => setShowSearchSidebar(false)}
			>
				<Search />
			</ChatSidebar>

			<ChatSidebar
				heading="Данные контакта"
				active={showProfileSidebar}
				closeSidebar={() => setShowProfileSidebar(false)}
			>
				{/* <Profile user={user} /> */}
			</ChatSidebar>
		</div>
	);
};

export default Chat;
