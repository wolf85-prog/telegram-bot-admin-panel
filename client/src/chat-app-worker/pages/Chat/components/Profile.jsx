import React, { useState, useContext, useEffect, useRef } from "react";
import media from "./../../../../chat-app-new/assets/images/placeholder.jpeg";
import Checkbox from "./../../../components/Checkbox";
import Icon from "./../../../components/Icon";
import { editContact, uploadFile, editContactAvatar } from './../../../../http/chatAPI';
import { getLastPretendent, blockedWorkers, getWorker } from './../../../../http/workerAPI';
import { getSendCall } from './../../../../http/adminAPI';
import { getProjectId } from './../../../../http/projectAPI';
import { useUsersContext } from "../../../../chat-app-new/context/usersContext";
import { AccountContext } from './../../../../chat-app-new/context/AccountProvider';

import defaultAvatar from "./../../../../chat-app-new/assets/images/no-avatar.png";
import avatarKrest from "./../../../../chat-app-worker/assets/images/uncheck.png";
import block18 from "./../../../../assets/images/block18.png";
import krest from "./../../../../assets/images/krestik.png";

import CIcon from '@coreui/icons-react'
import {
  cilPen,
  cilMediaPlay,
  cilPhone
} from '@coreui/icons'
import { 
	CFormSelect,
  } from '@coreui/react'

import { $host } from './../../../../http/index';
import sendSound from './../../../../chat-app-new/assets/sounds/sendmessage.mp3';
import ishodCall from './../../../../assets/sound/ishod.mp3';
import { getSpecialistId, blockedSpecialist, getSpecialistChatId } from "src/http/specAPI";

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
	const { userWorkers, workersAll } = useUsersContext();
	const { addNewMessage2 } = useUsersContext();

	const { setPersonW } = useContext(AccountContext);
	const [img, setImg] = useState(null)
	const [showEdit, setShowEdit] = useState(false)
	const input = React.useRef();

	const [phone, setPhone] = useState("")
	const [showButton, setShowButton] = useState(false)
	const [blockWorker, setBlockWorker] = useState(false)
	const [press, setPress] = useState(false)

	const audio = new Audio(sendSound);
	const audioIshodCall = new Audio(ishodCall);

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

			const fioBD = await getSpecialistChatId(user.chatId)
			//console.log("worker: ", fioBD)
			
			setWorker(fioBD)
			setAvatar(user.avatar)
		}

		fetchData();
	}, [user]);

	useEffect(() => {
		//console.log("user: ", user)

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
			//console.log("pretendentArray: ", pretendentArray)
			
			if (pretendentArray.length > 0) {
				const projectId = pretendentArray[pretendentArray.length-1]?.projectId
				const projectId2 = pretendentArray[pretendentArray.length-2]?.projectId
				const projectId3 = pretendentArray[pretendentArray.length-3]?.projectId
				
				//получить CrmId по id проекта
				const project = await getProjectId(projectId)
				//console.log("project profile: ", project)
				const project2 = await getProjectId(projectId2)
				const project3 = await getProjectId(projectId3)

				const crmId = project ? project.crmID : '—'
				const crmId2 = project2 ? project2.crmID : '—'
				const crmId3 = project3 ? project3.crmID : '—' 

				//console.log("crmId: ", crmId, crmId2, crmId3)

				setCrmId(crmId)
				setCrmId2(crmId2)
				setCrmId3(crmId3)
			} else {
				setCrmId('—')
				setCrmId2('—')
				setCrmId3('—')
			}	
			
			const profile = await getSpecialistChatId(user.chatId)
			//console.log("profile: ", profile, user.chatId)
			setBlockWorker(profile?.blockW ? profile?.blockW : false)
		}
		
		fetch()
	}, [user])

	const clickSetBlocked = async() => {
		setBlockWorker(!blockWorker)
		//заблокировать/разблокировать пользователю рассылки
		const res = await blockedSpecialist(user.chatId)
		console.log("res block: ", res)
	}
	
	const onImageError = (e) => {
		e.target.src = defaultAvatar
	}

	const clickToCall = async(id) => {
		// Button begins to shake
		setPress(true);
		console.log(press)
        
		// Buttons stops to shake after 2 seconds
		setTimeout(() => setPress(false), 200);

		audioIshodCall.play();
		await getSendCall(id)
	}

	return (
		<div className="profile">
			<div className="profile__sectionW profile__sectionW--personal">
				<div className="profile__avatar-wrapperW profile__avatar-worker" ref={divBlock}>
					{
						user?.avatar
							? <img src={user?.avatar} onError={onImageError} alt={user?.name} width='100%' height={heightImage.width} style={{objectFit: 'cover'}} />//<img src={`${host}${user.avatar}`} alt={user?.name} className="avatar-adm" />
							: <img src={defaultAvatar} alt={user?.name} width='100%' height={heightImage.width} style={{objectFit: 'cover'}} />
					}

					{
						worker ? 
						(worker.block18 ?   
						<img src={block18} alt='' width={18} style={{position: 'absolute', top: '2px', right: '5px', width: '55px'}}/>
						: "")
						: ""
					}

					{
						worker ? 
						(worker.krest ?   
						<img src={krest} alt='' width={18} style={{position: 'absolute', top: '310px', right: '10px', width: '40px'}}/>
						: "")
						: ""
					}
				</div>
				{worker ?  
					((JSON.parse(worker.specialization)).find(item => item.spec === 'Blacklist') ? 
					<h2 className="profile__name" style={{textAlign: 'center', color: 'red', fontWeight: '700', position: 'absolute', top: '378px'}}>Blacklist</h2>
					: "")
				: ""}
				
				<h2 className="profile__name" style={{textAlign: 'center'}}>{user?.name.split(' ')[0] === user?.name.split(' ')[1] ? user?.name.split(' ')[0] : user?.name}</h2>
			</div>

			<ul className="profile__sectionW profile__section--actions">	

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text--bottom">
							Телефон
						</span>
						<span className="profile__action-text--top profile__notion">
							{user ? 
							(user.phone !== '' ? user.phone : "—")
							: "—"}
						</span>
					</p>
				</li>			

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text--bottom">
							Город
						</span>
						<span className="profile__action-text--top profile__notion">
						{user ? 
							(user.city !== '' ? user.city : "—")
							: "—"}
						</span>	
					</p>
				</li>			

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text--bottom">
							Дата рождения
						</span>
						<span className="profile__action-text--top profile__notion">
							{user ? 
							(user.age ? user.age.split('-')[2] +'.'+user.age.split('-')[1]+'.'+user.age.split('-')[0] : "—")
							: "—"}
						</span>
					</p>
				</li>

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text--bottom">
							Telegram ID
						</span>
						
						<span className="profile__action-text--top profile__notion">
							{user.chatId}
							<div style={{fontSize: '16px', color: '#656565'}}>{user.username ? `@${user.username}` : user.username}</div>				
						</span>
					</p>
				</li>

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text--bottom">
							Специальность
						</span>
						<span className="profile__action-text--top" style={{textAlign: 'right'}}>
							{/* {worker.spec?.map((item)=>item.name).join('')} */}
							<table className="table-noborder">{worker ? JSON.parse(worker.specialization)?.map((worker, index) => <tr key={index}><td>{worker.spec}</td></tr> ) : '—'}</table>
						</span>	
					</p>
				</li>

				<li className="profile__actionW">
					<p className="profile__actionW-left">
						<span className="profile__action-text--bottom">
							Последний отклик на проект
						</span>
						
						<span className="profile__action-text--top profile__notion">
							{crmId3}
						</span>
						<span className="profile__action-text--top profile__notion">
							{crmId2}
						</span>
						<span className="profile__action-text--top profile__notion">
							{crmId}
						</span>
					</p>
				</li>			
			</ul>

			<div 
				className="profile__sectionW profile__section--success" 
				onClick={()=>clickToCall(user.chatId)} 
				style={{cursor: 'pointer', backgroundColor: press ? '#0e1518' : '#131c21'}} 
			>
				{/* <CIcon icon={cilPhone} className="profile__success-icon" /> */}
				<Icon id="phone" className="profile__success-icon" />
				<p className="profile__success-text profile__worker">Позвонить</p>
			</div>

			<div className="profile__sectionW profile__sectionW--danger">
				<Icon id="block" className="profile__danger-icon" />
				<p className="profile__danger-text profile__worker" style={{cursor: 'pointer'}} onClick={clickSetBlocked}>{blockWorker ? 'Разблокировать' : 'Заблокировать'}</p>
			</div>

			<div className="profile__sectionW profile__sectionW--danger">
				<Icon id="delete" className="profile__danger-icon" />
				<p className="profile__danger-text profile__worker"> Очистить переписку </p>
			</div>

			<div className="profile__sectionW profile__sectionW--danger">
				<Icon id="delete" className="profile__danger-icon" />
				<p className="profile__danger-text profile__worker"> Удалить чат </p>
			</div>
		</div>
	);
};

export default Profile;
