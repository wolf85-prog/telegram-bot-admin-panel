import React, { useEffect, useRef, useState, useContext } from "react";
import "./styles/main.css";
import EmojiTray from "./components/EmojiTray";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar";
import Icon from "./../../components/Icon";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Convo from "./components/Convo";
import { useUsersContext } from "./../../../chat-app-new/context/usersContext";
import { AccountContext } from './../../../chat-app-new/context/AccountProvider';
import { newMessage, uploadFile } from "src/http/workerAPI";
import { $host } from './../../../http/index'
import sendSound from './../../../chat-app-new/assets/sounds/sendmessage.mp3';

const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
const token_work = process.env.REACT_APP_TELEGRAM_API_TOKEN_WORK
const host = process.env.REACT_APP_API_URL

const Chat = () => {
	const { userWorkers, setUserAsUnread, addNewMessage } = useUsersContext();
	const { person } = useContext(AccountContext);
	const { setCountMessage } = useUsersContext();

	const chatId = person.id;
	let user = userWorkers.filter((user) => user.chatId === chatId.toString())[0];

	const lastMsgRef = useRef(null);
	const [showAttach, setShowAttach] = useState(false);
	const [showEmojis, setShowEmojis] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [showSearchSidebar, setShowSearchSidebar] = useState(false);
	const [file, setFile] = useState();
	const [image, setImage]= useState("");
	const [mess, setMess] = useState("");

	const audio = new Audio(sendSound);

	useEffect(() => {
		if (user) {
			scrollToLastMsg();
			setUserAsUnread(user.chatId);
			setCountMessage(0)
		}
	}, []);

	useEffect(() => {
		user && scrollToLastMsg();
	}, [userWorkers]);

	//прокрутка
	const scrollToLastMsg = () => {
		lastMsgRef.current?.scrollIntoView({transition: "smooth"});
	};

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
			   setMess(host + response.data.path)
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

	//функция отправки сообщения
	const sendText = async () => {
		//Передаем данные боту
        const url_send_msg = `https://api.telegram.org/bot${token_work}/sendMessage?chat_id=${person.id}&parse_mode=html&text=${mess.replace(/\n/g, '%0A')}`
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
                text: mess,
                is_bot: false,
				messageId: sendToTelegram.data.result.message_id,
            }

			//сохранить в контексте
			addNewMessage(user.chatId, mess, 'text', '', user.conversationId, sendToTelegram.data.result.message_id);
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

	const submitNewMessage = () => {
		audio.play();
		sendText();

		setMess("");
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
							mess={mess}
							setMess={setMess}
						/>
						<ChatInput
							showEmojis={showEmojis}
							setShowEmojis={setShowEmojis}
							showAttach={showAttach}
							setShowAttach={setShowAttach}
							onFileChange={onFileChange}
							mess={mess}
							setMess={setMess}
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