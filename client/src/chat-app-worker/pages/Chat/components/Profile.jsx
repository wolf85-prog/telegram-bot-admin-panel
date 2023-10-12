import React, { useState, useContext, useEffect, useRef } from "react";
import media from "./../../../../chat-app-new/assets/images/placeholder.jpeg";
import Checkbox from "./../../../components/Checkbox";
import Icon from "./../../../components/Icon";
import { editContact, uploadFile, editContactAvatar } from './../../../../http/chatAPI';
import { getWorkerNotionId, getWorkerChildrenId} from './../../../../http/workerAPI';
import { useUsersContext } from "../../../../chat-app-new/context/usersContext";
import { AccountContext } from './../../../../chat-app-new/context/AccountProvider';
import defaultAvatar from "./../../../../chat-app-new/assets/images/no-avatar.png";
import CIcon from '@coreui/icons-react'
import {
  cilPen,
  cilMediaPlay
} from '@coreui/icons'
import { 
	CFormSelect,
  } from '@coreui/react'
import { getWorkerId } from "src/http/adminAPI";
import { newMessage } from "src/http/workerAPI";
import { $host } from './../../../../http/index';
import sendSound from './../../../../chat-app-new/assets/sounds/sendmessage.mp3';

const Profile = ({ user }) => {

	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
	const token = process.env.REACT_APP_TELEGRAM_API_TOKEN_WORK
	const host = process.env.REACT_APP_HOST

	const [username, setUsername] = useState("")
	const [worker, setWorker] = useState("")
	const [avatar, setAvatar] = useState("")
	const [form, setForm] = useState(false)
	const { addNewName, addNewAvatar } = useUsersContext();
	const { userWorkers } = useUsersContext();
	const { addNewMessage2 } = useUsersContext();
	const { setPersonW } = useContext(AccountContext);
	const [img, setImg] = useState(null)
	const [showEdit, setShowEdit] = useState(false)
	const input = React.useRef();

	const [phone, setPhone] = useState("")
	const [showButton, setShowButton] = useState(false)

	const audio = new Audio(sendSound);

	//select
    const [selectedElement, setSelectedElement] = useState("")

	const [heightImage, setHeightImage] = useState({})

	const divBlock = useRef(null);

	useEffect(() => {
		setImg(`${host}${user.avatar}`)

		//получить данные из ноушена по телеграм id
		const fetchData = async () => {
			const fio_notion = await getWorkerNotionId(user.chatId)
			console.log("worker: ", fio_notion[0])
			setWorker(fio_notion[0])

			const avatars = await getWorkerChildrenId(fio_notion[0].id)
			setAvatar(avatars[0]?.image)
		}

		fetchData();
	}, [user]);

	useEffect(() => {
		console.log(user)
		console.log(divBlock.current.getBoundingClientRect());

		setTimeout(()=>{
			setHeightImage(divBlock.current.getBoundingClientRect())
		}, 2000)
		
		
		if (user.phone.includes('-')) {
			setPhone(user.phone)
		} else {
			let str = user.phone
			setPhone(`+7 (${str.slice(1, 4)}) ${str.slice(4, 7)}-${str.slice(7, 9)}-${str.slice(9, 11)}`)
		}
		
	}, [user])

	const onSelectChange = (e) => {
		setSelectedElement(e.target.value);
		console.log(e.target.value)
	}

	const sendMyMessage = async() => {
		audio.play();

		let client = userWorkers.filter((client) => client.chatId === user.chatId)[0];

		console.log("client: ", client)

		//Передаем данные боту
		const keyboard = JSON.stringify({
			inline_keyboard: [
				[
					{"text": "Согласен предоставить персональные данные", web_app: {url: 'https://proj.uley.team:7001'}}, //callback_data:'/passport'},
				],
				[
					{"text": "Отказываюсь от предоставления данных и участия в проектах", callback_data:'/passport2'},
				],
				[
					{"text": "Пояснения", callback_data:'/passport3'},
				],
			]
		});

	
		//отправить в телеграмм
		let sendToTelegram
		let text = ''
		let show = false
		console.log("selectedElement: ", selectedElement)
		if (selectedElement === 'Стандартный ответ') {
			text = `${user.name}, я юный чат-бот и еще не всё умею. Любой вопрос поможет решить наш оператор: +7 (499) 500-14-11`
		}
		else if (selectedElement === 'Паспорт') {
			text = `Добрый день.
			На связи автоматическая система U.L.E.Y | Workhub.
			
			Для участия в предстоящем проекте необходимо предоставить паспортные данные.
			
			Продолжив, ты соглашаешся предоставить персональные данные исключительно для передачи их заказчику.`

			//setShowButton(true)
			show = true
		}
		else if (selectedElement === 'Кнопка с номером') {
			text = `+7 (499) 500-14-11 - Менеджер U.L.E.Y`
		}

		console.log("text: ", text)

		const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user.chatId}&parse_mode=html&text=${text.replace(/\n/g, '%0A')}&reply_markup=${show ? keyboard : ''}`
		console.log("url_send_msg: ", url_send_msg)
			
		sendToTelegram = await $host.get(url_send_msg);

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
			
		console.log("message send: ", message);
	
		//сохранение сообщения в базе данных
		await newMessage(message)
	
		//сохранить в контексте
		addNewMessage2(user.chatId, text, 'text', 'Согласен предоставить персональные данные', client.conversationId, sendToTelegram.data.result.message_id);
    }
	

	return (
		<div className="profile">
			<div className="profile__sectionW profile__sectionW--personal">
				<div className="profile__avatar-wrapper profile__avatar-worker" ref={divBlock}>
					{
						user?.avatar
							? <img src={user?.avatar} alt={user?.name} width='100%' height={heightImage.width} style={{objectFit: 'cover'}} />//<img src={`${host}${user.avatar}`} alt={user?.name} className="avatar-adm" />
							: <img src={defaultAvatar} alt={user?.name} width='100%' height={heightImage.width} style={{objectFit: 'cover'}} />
					}
				</div>
				<h2 className="profile__name" style={{textAlign: 'center'}}>{user.name}</h2>
			</div>

			<ul className="profile__sectionW profile__section--actions">	
				<li className="profile__actionW">
					<CFormSelect 
						style={{marginTop: '10px', marginBottom: '10px',  display: "block"}}
                        aria-label="Default select example"
                        options={[
								"Выберите цепочку", 
								"Стандартный ответ", 
								"Паспорт",
								"Кнопка с номером"
							]}  
						selectedElement={selectedElement}
                    	setSelectedElement={setSelectedElement}
                        onChange={onSelectChange}  
                    />
					<button className="profile__action-right" style={{padding: '6px'}} onClick={sendMyMessage}>
						{/* <Icon id="rightArrow" className="profile__heading-icon" />{" "} */}
						<CIcon icon={cilMediaPlay} style={{color: 'white'}}/>{" "}
					</button>
				</li>

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text profile__action-text--bottom">
							Телефон
						</span>
						<span className="profile__action-text profile__action-text--top profile__notion">
							{phone}
						</span>
					</p>
				</li>			

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text profile__action-text--bottom">
							Город
						</span>
						<span className="profile__action-text profile__action-text--top profile__notion">
							{user.city ? user.city : "-"}
						</span>	
					</p>
				</li>			

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text profile__action-text--bottom">
							Дата рождения
						</span>
						<span className="profile__action-text profile__action-text--top profile__notion">
							{user.age?.start ? 
							`${user.age?.start.split('-')[2]}.${user.age?.start.split('-')[1]}.${user.age?.start.split('-')[0]}`
							: "-"}
						</span>
					</p>
				</li>

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text profile__action-text--bottom">
							Telegram ID
						</span>
						
						<span className="profile__action-text profile__action-text--top profile__notion">
							{user.chatId}
							<div style={{fontSize: '16px', color: '#656565'}}>{user.username ? `@${user.username}` : user.username}</div>				
						</span>
					</p>
				</li>

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text profile__action-text--bottom">
							Специальность
						</span>
						<span className="profile__action-text profile__action-text--top">
							{/* {worker.spec?.map((item)=>item.name).join('')} */}
							<table className="table-noborder">{worker.spec?.map((worker, index) => <tr key={index}><td>{worker.name}</td></tr> )}</table>
						</span>	
					</p>
				</li>

				
			</ul>

			{/* <div className="profile__section profile__section--about">
				<div className="sb profile__heading-wrapper">
					<h2 className="profile__heading"> О компании и номер телефона </h2>
				</div>
				<ul>
					<li className="profile__about-item">
						Несколько слов о компании...
					</li>
					<li className="profile__about-item">+7 123-12-12</li>
				</ul>
			</div> */}


			<div className="profile__sectionW profile__section--danger">
				<Icon id="block" className="profile__danger-icon" />
				<p className="profile__danger-text profile__worker"> Заблокировать </p>
			</div>

			<div className="profile__sectionW profile__section--danger">
				<Icon id="delete" className="profile__danger-icon" />
				<p className="profile__danger-text profile__worker"> Удалить чат </p>
			</div>
		</div>
	);
};

export default Profile;
