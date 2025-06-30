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
import { newMessage, uploadFile, getMessages, getConversation } from './../../../http/chatAPI';
import { $host } from './../../../http/index'
//import sendSound from './../../assets/sounds/sendmessage.mp3';
import { CSpinner} from '@coreui/react'
import { sendMessageToTelegram, sendPhotoToTelegram, sendDocumentToTelegram, sendVideoToTelegram, sendAudioToTelegram } from './../../../http/telegramAPI';


const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
const token = process.env.REACT_APP_TELEGRAM_API_TOKEN
const host = process.env.REACT_APP_HOST

const Chat = () => {
	const { users, setUsers, setUserAsUnread, addNewMessage, setShowGetMess } = useUsersContext();
	const { person } = useContext(AccountContext);
	const { setCountMessage } = useUsersContext();
	const [clearFile, setClearFile] = useState(false)

	const chatId = person.id;
	let user = users.filter((user) => user.chatId === chatId.toString())[0];

	const lastMsgRef = useRef(null);
	const [showAttach, setShowAttach] = useState(false);
	const [showEmojis, setShowEmojis] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [showSearchSidebar, setShowSearchSidebar] = useState(false);
	const [file, setFile] = useState();
	const [image, setImage]= useState("");
	const [mess, setMess] = useState("");

	const [messages, setMessages] = useState([]);
	const [loading, setLoading]= useState(false);

	const [user2, setUser2] = useState();
	

	//const audio = new Audio(sendSound);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		setLoading(true)

	// 		let conversationId = await getConversation(user.chatId)

	// 		let messages = await getMessages(conversationId)

	// 		console.log("messages: ", messages)
			

	// 		const arrayMessage = []
	// 		const allDate = []

	// 			messages.map(message => {
	// 					const d = new Date(message.createdAt);
	// 					const year = d.getFullYear();
	// 					const month = String(d.getMonth()+1).padStart(2, "0");
	// 					const day = String(d.getDate()).padStart(2, "0");
	// 					const chas = d.getHours();
	// 					const minut = String(d.getMinutes()).padStart(2, "0");

	// 					const newDateMessage = `${day}.${month}.${year}`

	// 					const newMessage = {
	// 						date: newDateMessage,
	// 						content: message.text,
	// 						image: message.type === 'image' ? true : false,
	// 						descript: message.buttons ? message.buttons : '',
	// 						sender: message.senderId,
	// 						time: chas + ' : ' + minut,
	// 						status: 'sent',
	// 						id:message.messageId,
	// 						reply:message.replyId,
	// 					}
	// 					arrayMessage.push(newMessage)
	// 					allDate.push(newDateMessage)
	// 			})

	// 			const dates = [...allDate].filter((el, ind) => ind === allDate.indexOf(el));

	// 			let obj = {};
	// 			for (let i = 0; i < dates.length; i++) {
	// 				const arrayDateMessage = []
	// 				for (let j = 0; j < arrayMessage.length; j++) {
	// 					if (arrayMessage[j].date === dates[i]) {
	// 						arrayDateMessage.push(arrayMessage[j])							
	// 					}
	// 				}	
	// 				obj[dates[i]] = arrayDateMessage;
	// 			}

	// 			setMessages(obj)

	// 			let userIndex = users.findIndex((user) => user.chatId === chatId.toString());
	// 			const usersCopy = [...users];
	// 			usersCopy[userIndex].messages = obj;
	// 			setUsers(usersCopy);

	// 			setUser2(usersCopy[userIndex])
	// 			console.log("user message: ", usersCopy[userIndex].messages)

	// 			setLoading(false)
	// 	}

	// 	fetchData()
	// },[person])

	useEffect(() => {
		if (user) {
			scrollToLastMsg();
			setUserAsUnread(user.chatId);
			setCountMessage(0)
			setShowGetMess(false)
		}
	}, []);

	useEffect(() => {
		user && scrollToLastMsg();
	}, [users]);

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
			   //console.log("response: ", response)

               setImage(response.data.path.split('.team')[1]);
			   //сообщение с ссылкой на файл
			   setMess(host + response.data.path.split('.team')[1])

			   setClearFile(true)
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
		let temp=mess.replace(/\n/g, '%0A'); //экранирование переноса строки
		temp = temp.replace(/#/g, '%23'); 		 //экранирование решетки
		temp = temp.replace(/&/g, '%26'); 		 //экранирование &
		temp = temp.replace(/\+/g, '%2b'); 		 //экранирование +
		temp = temp.replace(/>/g, '%3e'); 		 //экранирование >
		temp = temp.replace(/</g, '%3c'); 		 //экранирование <

		let sendToTelegram
		let sendPhotoToTelegram

		if(!file) {
			//const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${person.id}&parse_mode=html&text=${temp}`
			//sendToTelegram = await $host.get(url_send_msg);
			sendToTelegram = await sendMessageToTelegram({user: person.id, text: temp})
		} else {
			if (image.slice(-3) === 'gif' || image.slice(-3) === 'pdf' || image.slice(-3)==='zip') {
				// const url_send_doc = `https://api.telegram.org/bot${token}/sendDocument?chat_id=${person.id}&document=${host+image}`
				// sendPhotoToTelegram = await $host.get(url_send_doc);
				sendPhotoToTelegram = await sendDocumentToTelegram({user: person.id, document: host+image})
			} else {
				// const url_send_photo = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${person.id}&photo=${host+image}`
				// sendPhotoToTelegram = await $host.get(url_send_photo);
				sendPhotoToTelegram = await sendPhotoToTelegram({user: person.id, photo: host+image})
			}
		}
        

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
                isBot: null,
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
                isBot: null,
				messageId: sendPhotoToTelegram.data.result.message_id,
            }

			//сохранить в контексте
			addNewMessage(user.chatId, host + image, 'image', '', user.conversationId, sendPhotoToTelegram.data.result.message_id);
        }
        //console.log("message send button: ", message);

		//сохранение сообщения в базе данных
		await newMessage(message)	
	}

	const submitNewMessage = () => {
		//audio.play();
		sendText();

		setMess("");
		scrollToLastMsg();
		setFile("");
        setImage("");
	};

	const clickClearFile = () => {
		console.log("clear file...")
		setClearFile(false)
		
	}


	return (
		<div className="chat">
			<div className="chat__body">
				<div className="chat__bg"></div>

				<Header
					user={person}
					openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
					openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
					setClearFile={setClearFile}
					clearFile={clearFile}
					clickClearFile={clickClearFile}
				/>
				<div className="chat__content">
					{loading ?
						<CSpinner style={{margin: '50%'}}/>
						 :<Convo lastMsgRef={lastMsgRef} messages={user.messages} />
					}
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
