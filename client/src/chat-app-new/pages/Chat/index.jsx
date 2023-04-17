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
import { newMessage, uploadFile } from './../../../http/chatAPI';
import { $host } from './../../../http/index'

const Chat = () => {
	const { users, setUserAsUnread, addNewMessage } = useUsersContext();
	const { person } = useContext(AccountContext);

	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
    const token = process.env.REACT_APP_TELEGRAM_API_TOKEN
	const host = process.env.REACT_APP_API_URL

	const chatId = person.id;
	let user = users.filter((user) => user.chatId === chatId.toString())[0];

	const lastMsgRef = useRef(null);
	const [showAttach, setShowAttach] = useState(false);
	const [showEmojis, setShowEmojis] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [showSearchSidebar, setShowSearchSidebar] = useState(false);
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
                data.append("photo", file);

               let response = await uploadFile(data);
			   console.log("response: ", response)

               setImage(response.data.path);
			   //сообщение с ссылкой на файл
			   setValue(host + response.data.path)
            }
        }
        getImage();
    }, [file])

	const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

	const openSidebar = (cb) => {
		// close any open sidebar first
		setShowProfileSidebar(false);
		setShowSearchSidebar(false);

		// call callback fn
		cb(true);
	};

	//прокрутка
	const scrollToLastMsg = () => {
		lastMsgRef.current?.scrollIntoView({transition: "smooth"});
	};

	//функция отправки сообщения
	const sendText = async () => {
		//Передаем данные боту
        const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${person.id}&parse_mode=html&text=${value.replace(/\n/g, '%0A')}`
		const sendToTelegram = await $host.get(url_send_msg);

		//Выводим сообщение об успешной отправке
		if (sendToTelegram) {
			console.log('Спасибо! Ваша сообщение отправлено! ', sendToTelegram.data.result.message_id);
		}           
		//А здесь сообщение об ошибке при отправке
		else {
			console.log('Что-то пошло не так. Попробуйте ещё раз.');
		}

		let message = {};
        if(!file) {
            message = {
                senderId: chatAdminId, 
                receiverId: user.chatId,
                conversationId: user.conversationId,
                type: "text",
                text: value,
                is_bot: false,
				messageId: sendToTelegram.data.result.message_id,
            }

			//сохранить в контексте
			addNewMessage(user.chatId, value, 'text', '', user.conversationId, sendToTelegram.data.result.message_id);
        } else {
            message = {
                senderId: chatAdminId, 
                receiverId: user.chatId,
                conversationId: user.conversationId,
                type: "image",
                text: host + image,
                is_bot: false,
				messageId: sendToTelegram.data.result.message_id,
            }

			//сохранить в контексте
			addNewMessage(user.chatId, host + image, 'image', '', user.conversationId, sendToTelegram.data.result.message_id);
        }
        console.log("message send button: ", message);

		//сохранение сообщения в базе данных
		await newMessage(message)

		
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
					<div className="chat__footer-wrapper">
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
					</div>		
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
				<Profile user={user} />
			</ChatSidebar>
		</div>
	);
};

export default Chat;
