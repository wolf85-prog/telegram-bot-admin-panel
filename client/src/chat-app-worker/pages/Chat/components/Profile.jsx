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
import scenarios from './../../../../data/scenarios'

const Profile = ({ user, closeSidebar }) => {

	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
	const token = process.env.REACT_APP_TELEGRAM_API_TOKEN_WORK
	const host = process.env.REACT_APP_HOST
	const webAppPassport = process.env.REACT_APP_WEBAPP_PASSPORT
	const webAppAnketa = process.env.REACT_APP_WEBAPP_ANKETA

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
	const [scenari, setScenari] = useState("")

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
		setScenari(e.target.value)
		console.log(e.target.value)
	}


	const sendMyMessage = async() => {
		audio.play();

		let client = userWorkers.filter((client) => client.chatId === user.chatId)[0];

		//console.log("client: ", client)

		//Передаем данные боту
		// const keyboard = JSON.stringify({
		// 	inline_keyboard: [
		// 		[
		// 			{"text": "Согласен предоставить персональные данные", web_app: {url: webAppPassport}}, //callback_data:'/passport'},
		// 		],
		// 		[
		// 			{"text": "Отказываюсь от предоставления данных и участия в проектах", callback_data:'/passport2'},
		// 		],
		// 		[
		// 			{"text": "Пояснения", callback_data:'/passport3'},
		// 		],
		// 	]
		// });

		const keyboard = JSON.stringify({
			inline_keyboard: [
				[
					{"text": "Заполнить анкету", web_app: {url: webAppAnketa}},
				],
			]
		});



		// scenarios.map(async(item, index)=> {
		// 	if (selectedElement === item.value) {
		// 		const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user.chatId}&parse_mode=html&text=${item.text.replace(/\n/g, '%0A')}&reply_markup=${show ? keyboard : ''}`
		// 		console.log(url_send_msg)
		// 		sendToTelegram = await $host.get(url_send_msg);
		// 	}
		// })

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
			const url_send_photo = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${user.chatId}&photo=${anketa}&reply_markup=${show ? keyboard : ''}`
			console.log(url_send_photo)	
			sendToTelegram = await $host.get(url_send_photo);
		} else {
			//send message
			const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user.chatId}&parse_mode=html&text=${text.replace(/\n/g, '%0A')}&reply_markup=${show ? keyboard : ''}`
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
		<div className="profile">
			<div className="profile__sectionW profile__sectionW--personal">
				<div className="profile__avatar-wrapper profile__avatar-worker" ref={divBlock}>
					{
						user?.avatar
							? <img src={user?.avatar} alt={user?.name} width='100%' height={heightImage.width} style={{objectFit: 'cover'}} />//<img src={`${host}${user.avatar}`} alt={user?.name} className="avatar-adm" />
							: <img src={defaultAvatar} alt={user?.name} width='100%' height={heightImage.width} style={{objectFit: 'cover'}} />
					}
					<button onClick={closeSidebar} style={{position: 'absolute', top: '0', right: '-15px'}}>
						<Icon id="cancel" className="chat-sidebar__header-icon" />
					</button>
				</div>
				<h2 className="profile__name" style={{textAlign: 'center'}}>{user.name}</h2>
			</div>

			<ul className="profile__sectionW profile__section--actions">	
				{/* <li className="profile__actionW">
					<CFormSelect 
						style={{marginTop: '10px', marginBottom: '10px',  display: "block"}}
                        aria-label="Default select example"
                        options={scenarios}  
						value={scenari}
						selectedElement={selectedElement}
                    	setSelectedElement={setSelectedElement}
                        onChange={onSelectChange}
					/>
					<button className="profile__action-right" style={{padding: '6px'}} onClick={sendMyMessage}>
						<CIcon icon={cilMediaPlay} style={{color: 'white'}}/>{" "}
					</button>
				</li> */}

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

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text profile__action-text--bottom">
							Последний отклик на проект
						</span>
						
						<span className="profile__action-text profile__action-text--top profile__notion">
							0000
						</span>
					</p>
				</li>			
			</ul>


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
