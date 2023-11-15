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
import axios from 'axios';
import ChatSidebarProfile from "./components/ChatSidebarProfile";

const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
const token_work = process.env.REACT_APP_TELEGRAM_API_TOKEN_WORK
const host = process.env.REACT_APP_HOST
const baseURL = process.env.REACT_APP_API_URL
const webAppAnketa = process.env.REACT_APP_WEBAPP_ANKETA

const Chat = () => {
	const { userWorkers, setUserAsUnread, addNewMessage2 } = useUsersContext();
	const { personW } = useContext(AccountContext);
	const { setCountMessage } = useUsersContext();

	const chatId = personW.id;
	let user = userWorkers.filter((user) => user.chatId === chatId.toString())[0];

	const lastMsgRef = useRef(null);
	const [showAttach, setShowAttach] = useState(false);
	const [showEmojis, setShowEmojis] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [showSearchSidebar, setShowSearchSidebar] = useState(false);
	const [file, setFile] = useState();
	const [image, setImage]= useState("");
	const [mess, setMess] = useState("");

	const [showCloseButton, setShowCloseButton] = useState(false)

	//select
    const [selectedElement, setSelectedElement] = useState("")
	const [scenari, setScenari] = useState("")

	// для хранения ответа от бекенда
	const [data, getFile] = useState({ name: "", path: "" });
	const [progress, setProgess] = useState(0); // progessbar
  	const el = useRef(); // для доступа к инпуту

	const audio = new Audio(sendSound);

	const refreshPage = ()=>{
		window.location.reload(true);
	 }

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

	useEffect(() => {
		console.log(selectedElement)
		setSelectedElement(selectedElement);
		setScenari(selectedElement)


		let show = false
		let text = ''
		
		//Стандартный ответ
		if (selectedElement === '0') {
			text = `${user.name.split(' ')[1]}, я юный чат-бот и еще не всё умею. Любой вопрос поможет решить наш оператор: +7 (499) 500-14-11`
			setMess(text)
		}
		//Паспорт
		else if (selectedElement === '1') {
			text = ""
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

	const onFileChange = (e) => {	
		setProgess(0)
		const file = e.target.files[0]; // доступ к файлу
		console.log(file);
		setFile(file); // сохранение файла
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
		if (selectedElement) {
			//отправка сценария
			console.log("отправка сценария: ", selectedElement)

			sendMyMessage()
		} else {
			//отправка сообщения

			//Передаем данные боту
			let temp=mess.replace(/\n/g, '%0A'); //экранирование переноса строки
			temp = temp.replace(/#/g, '%23'); 		 //экранирование решетки
			temp = temp.replace(/&/g, '%26'); 		 //экранирование &
			temp = temp.replace(/\+/g, '%2b'); 		 //экранирование +
			temp = temp.replace(/>/g, '%3e'); 		 //экранирование >
			temp = temp.replace(/</g, '%3c'); 		 //экранирование <
			const url_send_msg = `https://api.telegram.org/bot${token_work}/sendMessage?chat_id=${personW.id}&parse_mode=html&text=${temp}`
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
				addNewMessage2(user.chatId, mess, 'text', '', user.conversationId, sendToTelegram.data.result.message_id);
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
				addNewMessage2(user.chatId, host + image, 'image', '', user.conversationId, sendToTelegram.data.result.message_id);
			}
			console.log("message send button: ", message);

			//сохранение сообщения в базе данных
			await newMessage(message)	
		}
	}

	const submitNewMessage = () => {
		audio.play();
		sendText();

		setMess("");
		scrollToLastMsg();
		setFile("");
        setImage("");
	};


	//отправка сценария
	const sendMyMessage = async() => {
		audio.play();

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
		let show = false
		let text = ''
		
		//Стандартный ответ
		if (selectedElement === '0') {
			text = `${user.name.split(' ')[1]}, я юный чат-бот и еще не всё умею. Любой вопрос поможет решить наш оператор: +7 (499) 500-14-11`
		}
		//Паспорт
		else if (selectedElement === '1') {
			//text = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${user}&photo=${}&reply_markup=${showEditButtonAdd ? keyboard : keyboard2}`

			//setShowButton(true)
			show = true
		}
		//Кнопка с номером
		else if (selectedElement === '2') {
			text = `+7 (499) 500-14-11 - Менеджер U.L.E.Y`
		}
		//Запас
		else if (selectedElement === '3') {
			text = `${user.name.split(' ')[1]}, мы готовы поставить Вас в запас на этот проект. Запас оплачивается.
			Сумму можно будет уточнить у менеджера. С большой вероятностью Вы будете на нём задействованы, 
			но для начала придется проснуться вместе с основным составом и быть готовым выйти на работу. Готовы?`
		}
		//Офис U.L.E.Y
		else if (selectedElement === '4') {
			text = `Офис | U.L.E.Y

			Адрес: г. Москва, ул. Дербеневская набережная, д. 7, стр. 2
					
			Карта: https://goo.gl/maps/uFrAfV5NmE2rUXsT8`
		}
		//Оплата / смета
		else if (selectedElement === '5') {
			text = `Для согласования и получения оплаты: 
			https://t.me/ULEY_Office_Bot`
		}
		//Заявка отклонена
		else if (selectedElement === '6') {
			text = `Добрый день, ${user.name.split(' ')[1]}. Спасибо, что откликнулись на эту заявку. 
			В настоящий момент основной состав уже сформирован.
			До встречи на новых проектах!`
		}
		//Заявка одобрена
		else if (selectedElement === '7') {
			text = `Добрый день, ${user.name.split(' ')[1]}. Спасибо, что откликнулись на заявку. 
			Для согласования тех. задачи на проект позвоните по номеру:
			+7 (499) 500-14-11`
		}
		//Запрос ключевых данных
		else if (selectedElement === '8') {
			text = `Добрый день, ${user.name.split(' ')[1]}. Вы впервые откликнулись на заявку от компании U.L.E.Y
			Чтобы мы смогли предложить Вам работу на этом проекте пришлите, пожалуйста, немного информации о себе:
					
			✅ ФИО
					
			✅ Контакты для связи
					
			✅ Год рождения
					
			✅ Специальность`
		}

		if (show) {
			//send photo
			let anketa = 'https://proj.uley.team/upload/2023-11-10T15:12:36.770Z.png' //poster anketa
			const url_send_photo = `https://api.telegram.org/bot${token_work}/sendPhoto?chat_id=${user.chatId}&photo=${anketa}&reply_markup=${show ? keyboard : ''}`
			console.log(url_send_photo)	
			sendToTelegram = await $host.get(url_send_photo);
		} else {
			//send message
			const url_send_msg = `https://api.telegram.org/bot${token_work}/sendMessage?chat_id=${user.chatId}&parse_mode=html&text=${text.replace(/\n/g, '%0A')}&reply_markup=${show ? keyboard : ''}`
			console.log(url_send_msg)	
			sendToTelegram = await $host.get(url_send_msg);
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
			buttons: show ? 'Согласен предоставить персональные данные' : '',
		}
			
		// console.log("message send: ", message);
	
		//сохранение сообщения в базе данных
		await newMessage(message)
	
		//сохранить в контексте
		addNewMessage2(user.chatId, text, 'text', 'Согласен предоставить персональные данные', client.conversationId, sendToTelegram.data.result.message_id);
    }


	return (
		<div className="chat">
			<div className="chat__body">
				<div className="chat__bg"></div>

				<Header
					user={personW}
					openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
					openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
					closeSidebar={() => closeSidebar(setShowProfileSidebar)}
					showCloseButton={showCloseButton}
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
							setSelectedElement={setSelectedElement}
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
