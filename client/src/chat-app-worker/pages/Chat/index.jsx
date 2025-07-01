import React, { useEffect, useRef, useState, useContext } from "react";
import "./styles/main.css";
import EmojiPicker from 'emoji-picker-react';

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
import { newCountWMessage, getCountMessage } from "src/http/adminAPI";
import { sendMessageToTelegram, sendPhotoToTelegram, sendDocumentFormToTelegram } from "src/http/telegramAPI";
import { $host } from './../../../http/index'
import sendSound from './../../../chat-app-new/assets/sounds/sendmessage.mp3';
import axios from 'axios';
import ChatSidebarProfile from "./components/ChatSidebarProfile";

import { 
	CButton,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter
  } from '@coreui/react'

const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
const token_work = process.env.REACT_APP_TELEGRAM_API_TOKEN_WORK
const host = process.env.REACT_APP_HOST
const baseURL = process.env.REACT_APP_API_URL
const webAppAnketa = process.env.REACT_APP_WEBAPP_ANKETA

const Chat = () => {
	const { userWorkers, setUserAsUnread, addNewMessage2, workersAll, conversations} = useUsersContext();
	const { personW } = useContext(AccountContext);
	const { setCountMessage } = useUsersContext();

	const chatId = personW.id;
	let user = userWorkers.filter((user) => user.chatId === chatId.toString())[0];
	let convs = conversations.find((conv) => conv.members[0] === chatId.toString());

	let data2

	const lastMsgRef = useRef(null);
	const [showAttach, setShowAttach] = useState(false);
	const [showEmojis, setShowEmojis] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [showSearchSidebar, setShowSearchSidebar] = useState(false);
	const [file, setFile] = useState();
	const [image, setImage]= useState("");
	const [mess, setMess] = useState("");
	const [fileType, setFileType] = useState("");
	const [showPicker, setShowPicker] = useState(false)
	const [chosenEmoji, setChosenEmoji] = useState('');

	const [clearFile, setClearFile] = useState(false)
	const [showCloseButton, setShowCloseButton] = useState(false)
	const [showErrorFile, setShowErrorFile] = useState(false);

	//select
    const [selectedElement, setSelectedElement] = useState("")
	const [scenari, setScenari] = useState("")

	// для хранения ответа от бекенда
	const [data, getFile] = useState({ name: "", path: "" });
	const [progress, setProgess] = useState(0); // progessbar
  	const el = useRef(); // для доступа к инпуту

	const audio = new Audio(sendSound);

	const [poster, setPoster] = useState("")

	const refreshPage = ()=>{
		window.location.reload(true);
	}


	useEffect(() => {
		//console.log("personW: ", personW.id)
		if (user) {
			scrollToLastMsg();
			setUserAsUnread(user.chatId);
			setCountMessage(0)
			//обнулить кол-во сообщений
			//const kol_mess = getCountMessage()
			//newCountWMessage(kol_mess - 1)
		}
	}, []);

	useEffect(() => {
		user && scrollToLastMsg();
	}, [userWorkers]);

	useEffect(() => {
		console.log("selectedElement: ", selectedElement)
		setSelectedElement(selectedElement);
		setScenari(selectedElement)

		let text = ''
		
		//Стандартный ответ
		if (selectedElement === '0') {
			text = `${user.name.split(' ')[1]}, я юный чат-бот и еще не всё умею. Любой вопрос поможет решить наш оператор: +7 (499) 500-14-11`
			setMess(text)
		}
		//Паспорт
		else if (selectedElement === '1') {
			text = "Отправка запроса паспорта..."
			setMess(text)
		}
		//Кнопка с номером
		else if (selectedElement === '2') {
			text = `+7 (499) 500-14-11 - Менеджер U.L.E.Y`
			setMess(text)
		}
		//Запас
		else if (selectedElement === '3') {
			text = `${user.name.split(' ')[1]}, мы готовы поставить Вас в запас на этот проект. Запас оплачивается.
			Сумму можно будет уточнить у менеджера. С большой вероятностью Вы будете на нём задействованы, 
			но для начала придется проснуться вместе с основным составом и быть готовым выйти на работу. Готовы?`
			
			setMess(text)
		}
		//Офис U.L.E.Y
		else if (selectedElement === '4') {
			text = `Офис | U.L.E.Y

			Адрес: г. Москва, ул. Дербеневская набережная, д. 7, стр. 2
					
			Карта: https://goo.gl/maps/uFrAfV5NmE2rUXsT8`

			setMess(text)
		}
		//Оплата / смета
		else if (selectedElement === '5') {
			text = `Для согласования и получения оплаты: 
			https://t.me/ULEY_Office_Bot`

			setMess(text)
		}
		//Заявка отклонена
		else if (selectedElement === '6') {
			text = `Добрый день, ${user.name.split(' ')[1]}. Спасибо, что откликнулись на эту заявку. 
			В настоящий момент основной состав уже сформирован.
			До встречи на новых проектах!`

			setMess(text)
		}
		//Заявка одобрена
		else if (selectedElement === '7') {
			text = `Добрый день, ${user.name.split(' ')[1]}. Спасибо, что откликнулись на заявку. 
			Для согласования тех. задачи на проект позвоните по номеру:
			+7 (499) 500-14-11`

			setMess(text)
		}
		//Запрос ключевых данных
		else if (selectedElement === '8') {
			text = `Добрый день, ${user.name.split(' ')[1]}. Вы впервые откликнулись на заявку от компании U.L.E.Y
			Чтобы мы смогли предложить Вам работу на этом проекте пришлите, пожалуйста, немного информации о себе:
					
			✅ ФИО
					
			✅ Контакты для связи
					
			✅ Год рождения
					
			✅ Специальность`

			setMess(text)
		}

		//Правила
		else if (selectedElement === '9') {
			text = 'Отправка сценария "Первый проект"...'

			setMess(text)
		}

		//Постер
		else if (selectedElement === '10') {
			setPoster('https://proj.uley.team/upload/2024-05-21T06:26:45.939Z.jpg')

			text = 'https://proj.uley.team/upload/2024-05-21T06:26:45.939Z.jpg'

			setMess(text)
		}

	}, [selectedElement]);

	//прокрутка
	const scrollToLastMsg = () => {
		lastMsgRef.current?.scrollIntoView({transition: "smooth"});
	};

	useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name); // добавление имени файла
                data.append("photo", file); // добавление файла

               let response = await uploadFile(data);
			   console.log("response: ", response)

			//    axios.post(baseURL + 'api/file/upload', data, {
			// 		onUploadProgress: (ProgressEvent) => {
			// 			let progress = Math.round(
			// 			ProgressEvent.loaded / ProgressEvent.total * 100
			// 			) + '%';
			// 			setProgess(progress);
			// 		}
			// 	}).then(res => {
			// 	console.log(res);
			// 	getFile({
			// 		name: res.data.name,
			// 		path: baseURL + res.data.path
			// 	})
			// 	}).catch(err => console.log(err))

               setImage(response.data.path.split('.team')[1]);
			   //сообщение с ссылкой на файл
			   setMess(host + response.data.path.split('.team')[1])
            }
        }
        getImage();
    }, [file])

	const onFileChange = (e, key) => {	
		setProgess(0)
		const file = e.target.files[0]; // доступ к файлу
		console.log("key: ", key);
		setFileType(key)
		console.log(file);
		setFile(file); // сохранение файла
		setShowAttach(false)
    }

	const openSidebar = (cb) => {
		// close any open sidebar first
		setShowProfileSidebar(false);
		setShowSearchSidebar(false);

		setShowCloseButton(true)

		// call callback fn
		cb(true);
	};

	const closeSidebar = (cb) => {
		// close any open sidebar first
		setShowProfileSidebar(false);

		setShowCloseButton(false)

		// call callback fn
		cb(false);
	};

	//функция отправки сообщения
	const sendText = async () => {
		console.log("selectedElement: ", selectedElement)
		if (selectedElement === '1') { //выбран паспорт
			//отправка сценария
			console.log("отправка сценария: ", selectedElement)
			sendMyMessage()

		} else if (selectedElement === '9') { //выбран Правила
				//отправка сценария
				console.log("отправка сценария: ", selectedElement)
				sendMyMessage2()

		} else if (selectedElement === '10') { //выбран Постер
			console.log("отправка сценария: ", selectedElement)
			sendMyMessagePoster()
	
		} else {
			//отправка сообщения

			//Передаем данные боту
			let temp=mess.replace(/\n/g, '%0A'); //экранирование переноса строки
			temp = temp.replace(/#/g, '%23'); 		 //экранирование решетки
			temp = temp.replace(/&/g, '%26'); 		 //экранирование &
			temp = temp.replace(/\+/g, '%2b'); 		 //экранирование +
			temp = temp.replace(/>/g, '%3e'); 		 //экранирование >
			temp = temp.replace(/</g, '%3c'); 		 //экранирование <
			
			let sendToTelegram

			if(!file) {
				const url_send_msg = `https://api.telegram.org/bot${token_work}/sendMessage?chat_id=${personW.id}&parse_mode=html&text=${temp}`	
				sendToTelegram = await $host.get(url_send_msg);
				//sendToTelegram = await sendMessageToTelegram({user: personW.id, text: temp})
			} else {
				if (fileType === 'doc') { //(image.slice(-3) === 'gif' || image.slice(-3)==='zip') {
						//const url_send_doc = `https://api.telegram.org/bot${token_work}/sendDocument?chat_id=${personW.id}&document=${host+image}`
						//console.log("url_send_doc: ", url_send_doc)
						
						const form = new FormData();
						form.append("chat_id", personW.id); // добавление имени файла
						form.append("document", file); // добавление файла
						//const form = new FormData();
						//sendToTelegram = await $host.post(`https://api.telegram.org/bot${token_work}/sendDocument`, form, {headers: { 'Content-Type': 'multipart/form-data' },})
						sendToTelegram = await sendDocumentFormToTelegram({form: form, headers: { 'Content-Type': 'multipart/form-data' } })

					//}		
				} else if (fileType === 'image') {
					// if (image.slice(-3) !== 'png' || image.slice(-3)!=='jpg' || image.slice(-3)!=='peg' || image.slice(-3) !== 'PNG' || image.slice(-3)!=='JPG' || image.slice(-3)!=='PEG') {
					// 	setShowErrorFile(true)
					// } else {
						const url_send_photo = `https://api.telegram.org/bot${token_work}/sendPhoto?chat_id=${personW.id}&photo=${host+image}`
						//console.log("url_send_photo: ", url_send_photo)
						sendToTelegram = await $host.get(url_send_photo);
						//sendToTelegram = await sendPhotoToTelegram({user: personW.id, image: host+image})
					//}		
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
					conversationId: convs.id,
					type: "text",
					text: mess,
					isBot: null,
					messageId: sendToTelegram.data.result.message_id,
				}

				//сохранение сообщения в базе данных
				await newMessage(message)	

				//сохранить в контексте
				addNewMessage2(user.chatId, mess, 'text', '', convs.id, sendToTelegram.data.result.message_id, null);
			} else {
				message = {
					senderId: chatAdminId, 
					receiverId: user.chatId,
					conversationId: convs.id,
					type: "image",
					text: host + image,
					isBot: null,
					messageId: sendToTelegram.data.result.message_id,
				}

				//сохранение сообщения в базе данных
				await newMessage(message)	

				//сохранить в контексте
				addNewMessage2(user.chatId, host + image, 'image', '', convs.id, sendToTelegram.data.result.message_id, null);
			}
			console.log("message send: ", message);

			
		}
	}

	const submitNewMessage = () => {
		audio.play();
		sendText();

		setMess("");
		scrollToLastMsg();
		setFile("");
        setImage("");
		setSelectedElement('')
	};


	//отправка сценария
	const sendMyMessage = async() => {
		console.log("send passport")
		//audio.play();

		let client = userWorkers.filter((client) => client.chatId === user.chatId)[0];

		const keyboard = JSON.stringify({
			inline_keyboard: [
				[
					{"text": "Заполнить анкету", web_app: {url: webAppAnketa}},
				],
			]
		});

		//отправить в телеграмм
		let sendToTelegram
		let text = ''
		
		//Паспорт
		if (selectedElement === '1') {
			//send photo
			let anketa = 'https://proj.uley.team/upload/9af754db-d1bb-4cd8-8453-aeba0c65c07a.jfif' //poster anketa
			//const url_send_photo = `https://api.telegram.org/bot${token_work}/sendPhoto?chat_id=${user.chatId}&photo=${anketa}&reply_markup=${keyboard}`
			//sendToTelegram = await $host.get(url_send_photo);
			sendToTelegram = await sendPhotoToTelegram({user: user.chatId, photo: anketa, keyboard: keyboard})
		} 
		

		//отправить в админку
		let message = {};
			
		message = {
			senderId: chatAdminId, 
			receiverId: user.chatId,
			conversationId: client.conversationId,
			type: "text",
			text: text,
			messageId: sendToTelegram.data.result.message_id,
			buttons: 'Согласен предоставить персональные данные',
		}
			
		// console.log("message send: ", message);
	
		//сохранение сообщения в базе данных
		await newMessage(message)
	
		//сохранить в контексте
		addNewMessage2(user.chatId, text, 'text', 'Согласен предоставить персональные данные', client.conversationId, sendToTelegram.data.result.message_id);
    }

	//отправка сценария Правила
	const sendMyMessage2 = async() => {
		console.log("send rule")
		//audio.play();

		let client = userWorkers.filter((client) => client.chatId === user.chatId)[0];

		const keyboard = JSON.stringify({
			inline_keyboard: [
				[
					{"text": "Прочитал правила", callback_data:'/accept_rule'},
				],
			]
		});

		//отправить в телеграмм
		let sendToTelegram
		let sendPhotoToTelegram

		const text = `🔵 <b>Правила первого проекта</b>

ВНИМАТЕЛЬНО прочитайте перед выходом на работу!

✅ <b>Общие правила:</b>
• Не опаздывать | Не флудить
• Не покидать чат проекта без согласования
• После подтверждения участия выход на проект обязателен
• Форс-мажор — необходимо найти себе замену
• Не нашли замену — едете на проект лично
• Невыход — система вносит в чёрный список
• Расходы на такси в ночное время компания берет на себя
• Всегда с собой:
— Паспорт
— Зарядное устройство / Power Bank
— Мерч [одежда с логотипом компании | получаете в офисе после нескольких отработаных проектов]
• Рассчитывать время прибытия на площадку заранее
• Вести себя культурно и выполнять задания заказчика
• До выхода на проект зарегистрироваться, ответив на вопросы:
https://t.me/ULEY_Office_Bot

✅ <b>День проекта:</b>
• Выйти на связь в чат проекта за 2 часа до начала
• Кнопка «Подтвердить» — нажатие подтверждает, что вы на связи [обязательно]
• Кнопка «В пути» — нажать в момент выхода из дома
• Кнопка «На месте» — после прибытия на адрес
• Встретиться с коллегами в указанном месте
• Позвонить заказчику

✅ <b>На проекте:</b>
• Кнопка «Начал работу» — нажать после начала работы | подтвердить кнопкой «Да»
• Кнопка «Закончил работу» — нажать по завершению работ | подтвердить кнопкой «Да»
• Все вопросы в чат проекта, или по номеру: +7(499)500-14-11
• Внимание! Обязательно фиксировать статусы — влияет на своевременную оплату
• Оплата в течение 1-3 рабочих дней`

		//Передаем данные боту
		let temp=text.replace(/\n/g, '%0A'); //экранирование переноса строки
		temp = temp.replace(/#/g, '%23'); 		 //экранирование решетки
		temp = temp.replace(/&/g, '%26'); 		 //экранирование &
		temp = temp.replace(/\+/g, '%2b'); 		 //экранирование +
		temp = temp.replace(/>/g, '%3e'); 		 //экранирование >
		temp = temp.replace(/</g, '%3c'); 		 //экранирование <
		
		//Правила
		//const url_send_text = `https://api.telegram.org/bot${token_work}/sendMessage?chat_id=${user.chatId}&parse_mode=html&text=${temp}`	
		//sendToTelegram = await $host.get(url_send_text);
		sendToTelegram = await sendMessageToTelegram({user: user.chatId, text: temp})

		//отправить в админку
		let message = {};
			
		message = {
			senderId: chatAdminId, 
			receiverId: user.chatId,
			conversationId: client.conversationId,
			type: "text",
			text: 'Сценарий "Первый проект"',
			isBot: null,
			messageId: sendToTelegram.data.result.message_id,
			buttons: '',
		}
			
	
		//сохранение сообщения в базе данных
		await newMessage(message)
	
		//сохранить в контексте
		addNewMessage2(user.chatId, 'Сценарий "Первый проект"', 'text', '', client.conversationId, sendToTelegram.data.result.message_id);
    
	}

	//отправка сценария Постер
	const sendMyMessagePoster = async() => {
		console.log("send poster")
		//audio.play();

		let client = userWorkers.filter((client) => client.chatId === user.chatId)[0];

		const keyboard = JSON.stringify({
			inline_keyboard: [
				[
					{"text": "Принято / Понято", callback_data:'/poster_accept'},
				],
			]
		});

		let sendToTelegram
		
		//Постер
		//const url_send_photo = `https://api.telegram.org/bot${token_work}/sendPhoto?chat_id=${user.chatId}&photo=${poster}&reply_markup=${keyboard}`
		//sendToTelegram = await $host.get(url_send_photo);
		sendToTelegram = await sendPhotoToTelegram({user: user.chatId, image: poster, keyboard: keyboard})
		

		//отправить в админку
		let message = {};
			
		message = {
			senderId: chatAdminId, 
			receiverId: user.chatId,
			conversationId: client.conversationId,
			type: "image",
			text: poster,
			isBot: null,
			messageId: sendToTelegram.data.result.message_id,
			buttons: '',
		}
			
	
		//сохранение сообщения в базе данных
		await newMessage(message)
	
		//сохранить в контексте
		addNewMessage2(user.chatId, poster, 'image', '', client.conversationId, sendToTelegram.data.result.message_id);
    
	}

	const clickClearFile = () => {
		console.log("clear file...")
		setClearFile(false)
		
	}

	const onEmojiClick = (emojiObject, event) => {
		console.log(emojiObject)
		setMess(prevInp =>prevInp + emojiObject.emoji);

	};

	return (
		<div className="chat">
			<div className="chat__body">
				<div className="chat__bg"></div>

				<Header
					user={personW}
					worker={workersAll.filter((item)=> item.chatId === user.chatId)}
					openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
					openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
					closeSidebar={() => closeSidebar(setShowProfileSidebar)}
					showCloseButton={showCloseButton}
					setClearFile={setClearFile}
					clearFile={clearFile}
					clickClearFile={clickClearFile}
				/>
				<div className="chat__content">
					<Convo lastMsgRef={lastMsgRef} messages={user.messages} convId={user.conversationId} />
					<CModal alignment="center" visible={showErrorFile} onClose={() => setShowErrorFile(false)}>
                        <CModalHeader>
                        	<CModalTitle>Предупреждение</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                        	...
                        </CModalBody>
                        <CModalFooter>
                        	<CButton color="primary" onClick={() => setShowErrorFile(false)}>ОК</CButton>
                        </CModalFooter>
                    </CModal>
					
				</div>
				<div style={{position: 'absolute', bottom: '70px', zIndex: '100'}}>
					<EmojiPicker 
						open={showPicker} 
						theme='dark'
						height={400} 
						width={400} 
						onEmojiClick={onEmojiClick}
					/>
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
						{/* <EmojiTray
							showEmojis={showEmojis}
							mess={mess}
							setMess={setMess}
						/> */}
						{/* <EmojiPicker 
							open={showPicker} 
							theme='dark'
							height={500} 
							width={400} 
							onEmojiClick={onEmojiClick}
						/> */}
						<ChatInput
							showEmojis={showEmojis}
							setShowEmojis={setShowEmojis}
							setShowPicker={setShowPicker}
							showAttach={showAttach}
							setShowAttach={setShowAttach}
							onFileChange={onFileChange}
							mess={mess}
							setMess={setMess}
							submitNewMessage={submitNewMessage}
							setSelectedElement={setSelectedElement}
							chosenEmoji={chosenEmoji}
						/>

						{/* <div className="progessBar" style={{ width: progress, height: '1rem', width: '0%',  backgroundColor: 'rgb(68, 212, 231)', color: 'white',  padding: '2px' }}>
							{progress}
						</div> */}
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

			<ChatSidebarProfile
				// heading="Данные контакта"
				active={showProfileSidebar}
			>
				<Profile user={user} />
			</ChatSidebarProfile>

		</div>
	);
};

export default Chat;
