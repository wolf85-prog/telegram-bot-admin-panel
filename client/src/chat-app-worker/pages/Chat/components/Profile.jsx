import React, { useState, useContext, useEffect, useRef } from "react";
import media from "./../../../../chat-app-new/assets/images/placeholder.jpeg";
import Checkbox from "./../../../components/Checkbox";
import Icon from "./../../../components/Icon";
import { editContact, uploadFile, editContactAvatar } from './../../../../http/chatAPI';
import { getWorkerNotionId, getWorkerChildrenId, getLastPretendent, getProjectId, blockedWorkers, getWorker } from './../../../../http/workerAPI';
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

import { $host } from './../../../../http/index';
import sendSound from './../../../../chat-app-new/assets/sounds/sendmessage.mp3';

const Profile = ({ user, closeSidebar }) => {

	//console.log('user: ', user)
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
	const [blockWorker, setBlockWorker] = useState(false)

	const audio = new Audio(sendSound);

	//select
    const [selectedElement, setSelectedElement] = useState("")
	const [scenari, setScenari] = useState("")

	const [heightImage, setHeightImage] = useState({})

	const divBlock = useRef(null);

	const [crmId, setCrmId] = useState("")
	const [crmId2, setCrmId2] = useState("")
	const [crmId3, setCrmId3] = useState("")

	useEffect(() => {
		setImg(`${host}${user.avatar}`)

		//получить данные из ноушена по телеграм id
		const fetchData = async () => {
			//console.log("user: ", user)
			const fio_notion = await getWorkerNotionId(user.chatId)
			//console.log("worker: ", fio_notion[0])
			setWorker(fio_notion[0])

			//const avatars = await getWorkerChildrenId(fio_notion[0]?.id)
			//const avatars = await getWorker(user.chatId)
			setAvatar(user.avatar)
		}

		fetchData();
	}, [user]);

	useEffect(() => {

		setTimeout(()=>{
			setHeightImage(divBlock.current.getBoundingClientRect())

			var imgsize = new Image();

			imgsize.onload = function(){
				var height = imgsize.height;
				var width = imgsize.width;

				// code here to use the dimensions
				//console.log("height: ", height, "width: ", width)
			}

			imgsize.src = user?.avatar;
		}, 2000)
		
		setPhone(user.phone)
		
		// if (user.phone?.includes('-')) {
		// 	setPhone(user.phone)
		// } else {
		// 	let str = user.phone
		// 	//setPhone(`+7 (${str.slice(1, 4)}) ${str.slice(4, 7)}-${str.slice(7, 9)}-${str.slice(9, 11)}`)
		// 	setPhone(user.phone)
		// }
		
	}, [user])


	useEffect(()=>{

		const fetch = async() => {
			const pretendentArray = await getLastPretendent(user.chatId)
			console.log("pretendentArray: ", pretendentArray.length)
			
			if (pretendentArray.length > 0) {
				const projectId = pretendentArray[pretendentArray.length-1]?.projectId
				const projectId2 = pretendentArray[pretendentArray.length-2]?.projectId
				const projectId3 = pretendentArray[pretendentArray.length-3]?.projectId
				//получить CrmId по id проекта
				const project = await getProjectId(projectId)
				const project2 = await getProjectId(projectId2)
				const project3 = await getProjectId(projectId3)

				const crmId = project?.properties ? project?.properties?.Crm_ID.rich_text[0].plain_text : '-'
				const crmId2 = project?.properties ? project2?.properties?.Crm_ID.rich_text[0].plain_text : '-'
				const crmId3 = project?.properties ? project3?.properties?.Crm_ID.rich_text[0].plain_text : '-' 

				setCrmId(crmId)
				setCrmId2(crmId2)
				setCrmId3(crmId3)
			} else {
				setCrmId('-')
			}	
			
			const blocked = await getWorker(user.chatId)
			//console.log("blocked: ", blocked)
			setBlockWorker(blocked?.block ? blocked?.block : false)
		}
		
		fetch()
	}, [user])

	const clickSetBlocked = () => {
		setBlockWorker(!blockWorker)
		//заблокировать/разблокировать пользователю рассылки
		blockedWorkers(user.chatId)
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
							{user ? 
							user.age
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
							<table className="table-noborder">{worker ? worker.spec?.map((worker, index) => <tr key={index}><td>{worker.name}</td></tr> ) : '-'}</table>
						</span>	
					</p>
				</li>

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text profile__action-text--bottom">
							Последний отклик на проект
						</span>
						
						<span className="profile__action-text profile__action-text--top profile__notion">
							{crmId3}
						</span>
						<span className="profile__action-text profile__action-text--top profile__notion">
							{crmId2}
						</span>
						<span className="profile__action-text profile__action-text--top profile__notion">
							{crmId}
						</span>
					</p>
				</li>			
			</ul>


			<div className="profile__sectionW profile__section--danger">
				<Icon id="block" className="profile__danger-icon" />
				<p className="profile__danger-text profile__worker" style={{cursor: 'pointer'}} onClick={clickSetBlocked}>{blockWorker ? 'Разблокировать' : 'Заблокировать'}</p>
			</div>

			<div className="profile__sectionW profile__section--danger">
				<Icon id="delete" className="profile__danger-icon" />
				<p className="profile__danger-text profile__worker"> Удалить чат </p>
			</div>
		</div>
	);
};

export default Profile;
