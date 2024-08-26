import React, { createContext, useContext, useEffect, useState } from "react";
import useSound from 'use-sound';

import { useSocketContext } from "./socketContext";
import { getAllMessages, getContacts, getConversation, getMessages } from '../../http/chatAPI'
import { getAllPretendent, getWContacts, getWConversation, 
	getWConversations, getWMessages, getWorkers, getWorker, getAllWMessages, 
	getWMessagesCount, getWorkersCount} from '../../http/workerAPI'

import { getRManagers, getRManager, getRManagerCount, newRMessage, getRContacts, getRConversation, 
	getRConversations, getRMessages, getRenthub, getAllRMessages, 
	getRMessagesCount, getRCompanys, 
	getRUserbot} from '../../http/renthubAPI'

import { getDistributions, 
	getDistributionsW, 
	getDistributionsCountW,
	getDistributionsWPlan,
	getManagers, 
	getProjectsApi, 
	getCompanys,
	newCountMessage,
	newCountMessagePretendent,
	newCountWMessage,
	newCountProjects,
	getCountMessage, 
	getWorkerId,
	getProjects3,
	getProjectAll,
	getProjects,
	getProjectNewCash,
} from "src/http/adminAPI";

import boopSfx from './../assets/sounds/zvuk-icq.mp3';
import soundMessage from './../assets/sounds/U.L.E.Y_messageNew.mp3';
import soundProject from './../assets/sounds/project_new2.mp3';
import soundSmeta from './../assets/sounds/predvarit_smeta2.mp3';
import sound120 from './../../assets/sound/120_minut_ULEY_new.mp3';
import sound60 from './../../assets/sound/60_minut_ULEY_new.mp3';
import sound30 from './../../assets/sound/30_minut_ULEY_new.mp3';
import sound15 from './../../assets/sound/15_minut_ULEY.mp3';
import sound0 from './../../assets/sound/0_minut_ULEY_new.mp3';

import sound5 from './../../assets/sound/5_minut_ULEY.mp3';
import sound10 from './../../assets/sound/10_minut_ULEY.mp3';

import soundNarush from './../../assets/sound/narush_ULEY.mp3';
import soundNarush2 from './../../assets/sound/narush2_ULEY.mp3';

import soundCall from './../../assets/sound/Skype.mp3';

import sendSound from './../assets/sounds/sendmessage.mp3';
import smsWorkhub from './../../chat-app-worker/assets/sounds/sms_iphone.mp3';
import notifPretendent from './../../chat-app-worker/assets/sounds/pretendent2.mp3';


const UsersContext = createContext();

const useUsersContext = () => useContext(UsersContext);

const UsersProvider = ({ children }) => {
	const socket = useSocketContext();
	const [users, setUsers] = useState([]); //useState(contacts);	
	const [contacts, setContacts] = useState([]); //useState(contacts);
	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
	const [count, setCount] = useState(0)
	const [countMessage, setCountMessage] = useState(0)
	
	const [usersOnline, setUsersOnline] = useState([]);
	const [distributions, setDistributions] = useState([]); 
	const [managers, setManagers]= useState([]);
	const [companys, setCompanys]= useState([]);
	const [projects, setProjects] = useState([]); 
	const [newProject, setNewProject]= useState(false);
	const [countProjects, setCountProjects] = useState(0)

	const [pretendents, setPretendents] = useState([])
	const [newPretendent, setNewPretendent] = useState(false);
	const [countPretendent, setCountPretendent] = useState(0)

	const [workers, setWorkers] = useState([]); //100 последних специалистов;
	const [workersAll, setWorkersAll] = useState([]); //все специалисты;

	const [userRenthub, setUserRenthub] = useState([]); 
	const [rmanagers, setRmanagers] = useState([]); //100 последних менеджеров;
	const [rmanagersAll, setRmanagersAll] = useState([]); //все менеджеры;

	//const [countMessageWork, setCountMessageWork] = useState(0)
	const [countMessageWork, setCountMessageWork] = useState(() => {
		// getting stored value
		const saved = localStorage.getItem("countMessageWork");
		const initialValue = saved;
		return initialValue || 0;
	});


	const [distributionsWork, setDistributionsWork] = useState([]); 

	const [conversations, setConversations] = useState([]); 
	const [wuserbots, setWuserbots] = useState([]); 

	const [rconversations, setRconversations] = useState([]); 
	const [ruserbots, setRuserbots] = useState([]);

	const [soundsNotif, setSoundsNotif] = useState([]); 

	const [showCallCard, setShowCallCard] = useState(false);
	const [workerCall, setWorkerCall] = useState('');

	const [showCallCardNo, setShowCallCardNo] = useState(false);
	const [workerCallNo, setWorkerCallNo] = useState('');
	const [callIndex, setCallIndex] = useState(0)
	const [callIndex2, setCallIndex2] = useState(0)
	//update workers
	const [showUpdate, setShowUpdate] = useState(false);
	const [workerUpdate, setWorkerUpdate] = useState(100);
	//update avatar
	const [showUpdate2, setShowUpdate2] = useState(false);
	const [avatarUpdate, setAvatarUpdate] = useState(100);
	//show distrib
	const [showDistrib, setShowDistrib] = useState(false);

	const [projectsNew, setProjectsNew] = useState([])

	const [statusProcess, setStatusProcess] = useState(false)
	const [statusProcess2, setStatusProcess2] = useState(true)
	const [statusProcess3, setStatusProcess3] = useState(true)
	const [statusProcess4, setStatusProcess4] = useState(true)
	const [statusProcess5, setStatusProcess5] = useState(false)
	const [statusProcess6, setStatusProcess6] = useState(true)

	const [intervalProcess, setIntervalProcess] = useState('10') //бот заказчика
	const [intervalProcess2, setIntervalProcess2] = useState('10') // бот специалиста
	const [intervalProcess3, setIntervalProcess3] = useState('10') // бот специалиста
	const [intervalProcess4, setIntervalProcess4] = useState('4') // бот специалиста
	const [intervalProcess5, setIntervalProcess5] = useState('1') // бот рассылки
  	const [intervalProcess6, setIntervalProcess6] = useState('2') // бот рассылки (планировщик)

	const [timeProcess, setTimeProcess] = useState('M')
	const [timeProcess2, setTimeProcess2] = useState('M')
	const [timeProcess3, setTimeProcess3] = useState('M')
	const [timeProcess4, setTimeProcess4] = useState('S')
	const [timeProcess5, setTimeProcess5] = useState('S')
  	const [timeProcess6, setTimeProcess6] = useState('M')

	const [showGetMess, setShowGetMess ] = useState(false);

	const [soundVolume, setSoundVolume] = useState(() => {
		const savedItem = localStorage.getItem("soundVolume");
		const parsedItem = JSON.parse(savedItem);
		return parsedItem || 1.0;
	})
	//const [soundMute, setSoundMute] = useState(false)
	const [soundMute, setSoundMute] = useState(() => {
		const savedItem = localStorage.getItem("soundMute");
		const parsedItem = JSON.parse(savedItem);
		return parsedItem || false;
	})


	const audioMessage = new Audio(soundMessage);
	const audioMessageW = new Audio(boopSfx);
	const audioProject = new Audio(soundProject);
	const audioSmeta = new Audio(soundSmeta);


	const audioNarush = new Audio(soundNarush)
	const audioNarush2 = new Audio(soundNarush2)
	
	const audioSend = new Audio(sendSound);
	const audioWorkhub = new Audio(smsWorkhub);
	const audioPretendent = new Audio(notifPretendent)

	const audioCall = new Audio(soundCall)
	const audioCall2 = new Audio(soundCall)

	
	const audio120 = new Audio(sound120);
	const audio60 = new Audio(sound60);
	const audio30 = new Audio(sound30);
	const audio15 = new Audio(sound15);
	const audio0 = new Audio(sound0);
	const audio10 = new Audio(sound10);
	const audio5 = new Audio(sound5);
	


//---------get Managers----------------------------------------------------

	useEffect(() => {
		//---------get UserManagerы-----------------------------------------
		const fetchUserManagerData = async () => {
		
			//0 все специалисты
			let all = await getRManagers()
			//console.log("all: ", all)
			const arrayWorkerAll = []

			let userbot = await getRUserbot()

			//массив компаний
			let comps = await getRCompanys()
			//console.log("comps: ", comps)
			
		
			all.map(async (user) => {
				//поиск компании по id
				let compName
				if (comps) {
					compName = comps.find(item=> item.id === user.company)
					//console.log("compName: ", compName)
				}	

				const res = userbot.find(item2 => item2.chatId === user.chatId)

				const newWorker = {
					id: user.id,
					fio: user.fio,
					username: res ? res.username : '',
					phone: user.phone,
					doljnost: user.dojnost,
					city: user.city, 
					company: compName ? compName.title : '',
					projects: user.projects,
					bisnes:  user.worklist,
					chatId: user.chatId,
					createDate: user.createdAt,
					avatar: user.avatar,
					from: user.from,
					block: user.block,
					deleted: user.deleted,
				}
		
				arrayWorkerAll.push(newWorker)
			})
		
			setWorkersAll(arrayWorkerAll)

			//1 все специалисты 100
			let response = await getRManagerCount(100, userRenthub.length);
			console.log("manager size: ", response)
		
			const arrayWorker = []
		
			response.reverse().map(async (user) => {
				//поиск компании по id
				// let compName
				// if (comps) {
				// 	compName = comps.find(item=> item.id === user.company)
				// }	
				const newWorker = {
					id: user.id,
					fio: user.fio,
					username: user.username,
					phone: user.phone,
					doljnost: user.dojnost,
					city: user.city, 
					company: user.company,
					projects: user.projects,
					bisnes:  user.worklist,
					chatId: user.chatId,
					createDate: user.createdAt,
					avatar: user.avatar,
					from: user.from,
					block: user.block,
					deleted: user.deleted,
				}
		
				arrayWorker.push(newWorker)
			})
		
			setWorkers(arrayWorker)	
		
			//2 все пользователи бота
			let wuserbots = await getRContacts();
			console.log("wuserbots size: ", wuserbots.length)
			const arrayContact = []

			//3 все беседы (conversations)
			let convers = await getRConversations()
			console.log("conversations: ", convers.length)
			setConversations(convers)

			//4 все сообщения бота
			let messagesAll = await getRMessagesCount(1000) //getWMessagesCount(1000) //getAllWMessages()
			console.log("messagesAll: ", messagesAll.length)

			let count = 0
			convers.forEach(async (user, index) => {
		
				let manager = arrayWorkerAll.find((item)=> item.chatId === user.members[0])
				let userbot = wuserbots.find((item)=> item.chatId === manager?.chatId)	
					
				let conversationId = user.id //await getWConversation(user.members[0])

				let messages = []
				let messages2 = []
				
				//messages = messagesAll.filter(item => item.conversationId === conversationId.toString()) //await getWMessages(conversationId)
				//messagesAll.reverse()

				//выбрать из всех сообщений только пользователя в кол-ве 10 шт.
				for (let i = messagesAll.length-1; i >= 0; i--) {
					if (messagesAll[i].conversationId === conversationId.toString())
						messages.push(messagesAll[i])
					
					if (messages.length === 20)
					break;
				}

				//console.log("messages: ", messages)

				//получить последнее сообщение (без сообщений из рассылки)
				if (messages.length > 0) {
					[...messages].reverse().map((message) => {
						if (message.isBot === false || message.isBot === null) {
							messages2.push(message)
						}	
					})
				}

				//console.log("last messages: ", user, messages2)
					
				const messageDates = Object.keys(messages2); //messages

				const recentMessageDate = messageDates[messageDates.length - 1];
				const message = messages2[recentMessageDate];
				
				const dateMessage = message ? messages2[recentMessageDate].createdAt : "2000-01-01T00:00:00";
				const lastMessage = message ? messages2[recentMessageDate].text : "";			
				
				const arrayMessage = []
				const allDate = []
				
				if (messages) {
					[...messages].reverse().map(message => {
						const d = new Date(message.createdAt);
						const year = d.getFullYear();
						const month = String(d.getMonth()+1).padStart(2, "0");
						const day = String(d.getDate()).padStart(2, "0");
						const chas = d.getHours();
						const minut = String(d.getMinutes()).padStart(2, "0");
					
						const newDateMessage = `${day}.${month}.${year}`
				
						const newMessage = {
							date: newDateMessage,
							content: message.text,
							image: message.type === 'image' ? true : false,
							descript: message.buttons ? message.buttons : '',
							sender: message.senderId,
							time: chas + ' : ' + minut,
							status: 'sent',
							id:message.messageId,
							reply:message.replyId,
						}
						arrayMessage.push(newMessage)
						allDate.push(newDateMessage)
					})
				}	
				
				const dates = [...allDate].filter((el, ind) => ind === allDate.indexOf(el));
				
				let obj = {};
				for (let i = 0; i < dates.length; i++) {
					const arrayDateMessage = []
					for (let j = 0; j < arrayMessage.length; j++) {
						if (arrayMessage[j].date === dates[i]) {
							arrayDateMessage.push(arrayMessage[j])							
						}
					}	
					obj[dates[i]] = arrayDateMessage;
				}	
				
				if (manager) {
					const newUser = {
						id: manager.id,
						username: manager.username ? manager.username : '',
						name: manager?.fio, //notion[0]?.fio ? notion[0]?.fio : '',
						city: manager?.city, //notion[0]?.city ? notion[0]?.city : '',
						phone: manager?.phone, //notion[0]?.phone ? notion[0]?.phone : '',
						doljnost: manager?.doljnost, //notion[0]?.phone ? notion[0]?.phone : '',
						company: manager?.company,
						bisnes: manager?.bisnes,
						chatId: manager?.chatId,
						avatar: manager?.avatar ? manager?.avatar : '', //avatars[0]?.image ? avatars[0]?.image : '', //user.avatar,
						conversationId: conversationId ? conversationId : 0,
						block: '',
						blockw: manager?.block,
						unread: 0, 
						pinned: false,
						typing: false,
						message:  lastMessage,
						date: dateMessage,
						messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
					}
					//console.log(newUser)
					arrayContact.push(newUser)
				}		
						
			
				//если элемент массива последний
				if (index === convers.length-1) {
					const sortedClients = [...arrayContact].sort((a, b) => {       
						var dateA = new Date(a.date), dateB = new Date(b.date) 
						return dateB-dateA  //сортировка по убывающей дате  
					})

					console.log("sortedClients: ", sortedClients.length)
		
					setUserRenthub(sortedClients)

					//сохранить кэш
					localStorage.setItem("userRenthub", JSON.stringify(sortedClients));
				}				
			})	
		}
		
		//все сообщения менеджеров
		fetchUserManagerData();
		
	},[])

//------------------------------------------------------------------------------------------

	//получить сообщение из телеграмма
	const fetchMessageResponse = async(data) => {
		//пришло новое сообщение
		//const kol = await getCountMessage()
		setCountMessage(count+1)
		//const res = await newCountMessage(kol.managers + 1)
		console.log("Пришло новое сообщение в renthub: ", count + 1)
		//setShowGetMess(true)


		if (data.text.startsWith('Предварительная смета одобрена!')) {
			
		} else if (data.text.startsWith('Проект успешно создан') && !data.text.includes('_reply_')) {
	
		}
		else {
			console.log("Пришло новое сообщение: ", count+1)
			//play sound
			
			//пришло новое сообщение
			
			//const res = await newCountWMessage(kol.workers + 1)
			console.log("Пришло новое сообщение в workhub: ", count + 1)

		}

		setUserRenthub((userWorkers) => {
			const { senderId, text, type, messageId, convId, replyId, isBot } = data;
			//console.log("users: ", users)
			let userIndex = userWorkers.findIndex((user) => user.chatId === senderId.toString());
			const usersCopy = JSON.parse(JSON.stringify(userWorkers));
	
			if (userIndex === -1) {
				const newUser = {
					id: usersCopy.length,
					name: 'Новый менеджер',
					chatId: `${senderId}`,
					avatar: '',
					conversationId: convId,
					unread: 0, 
					pinned: false,
					typing: false,
					message:  '',
					date: '2000-01-01T00:00:00',
					messages: {}, 
				}	
				usersCopy.push(newUser)
				//console.log("usersCopy: ", usersCopy)
	
				userIndex = usersCopy.length-1; //usersCopy.findIndex((user) => user.chatId === senderId.toString());
	
				//("userIndex new: ", userIndex)
			}
			
			const newMsgObject = {
				date: new Date().toLocaleDateString(),
				content: text,
				image: type === 'image' ? true : false,
				sender: senderId,
				time: new Date().toLocaleTimeString(),
				status: null,
				id: messageId,
				reply: replyId,
				isBot: isBot,  
			};
	
			const currentDate = new Date().toLocaleDateString()
	
			if (usersCopy[userIndex].messages[currentDate]) {
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			} else {
				usersCopy[userIndex].messages[currentDate] = [];
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			}
			
			const userObject = usersCopy[userIndex];
			if (isBot) {
				usersCopy[userIndex] = { ...userObject, ['date']: '2000-01-01T00:00:00', ['message']: newMsgObject.content};
			} else {
				usersCopy[userIndex] = { ...userObject, ['unread']: count + 1, ['date']: new Date(), ['message']: newMsgObject.content};
			}
			
	
			//сортировка
			const userSort = [...usersCopy].sort((a, b) => {       
				var dateA = new Date(a.date), dateB = new Date(b.date) 
				return dateB-dateA  //сортировка по убывающей дате  
			})
	
			return userSort;
		});
		

		//_updateUserProp(data.senderId, "uread", value +1);
	};


	//получить исходящее сообщение в админку
	const fetchAdmin = (data) => {
		console.log("Пришло сообщение в Админку: ", data)
		//play send message
		audioSend.play();

		setUserRenthub((userWorkers) => {
			const { senderId, receiverId, text, type, buttons, messageId, isBot } = data;
	
			//console.log("userWorkers: ", userWorkers)
	
			let userIndex = userWorkers.findIndex((user) => user.chatId === receiverId.toString());
			const usersCopy = JSON.parse(JSON.stringify(userWorkers));
			//console.log("usersCopy: ", usersCopy)
	
			const newMsgObject = {
				date: new Date().toLocaleDateString(),
				content: text,
				image: type === 'image' ? true : false,
				descript: buttons ? buttons : '',
				sender: senderId,
				time: new Date().toLocaleTimeString(),
				status: 'delivered',
				id: messageId,
			};
	
			const currentDate = new Date().toLocaleDateString()
	
			//if (usersCopy[userIndex].messages[currentDate]) {
			if (!isObjectEmpty(usersCopy[userIndex].messages)) {
				if (usersCopy[userIndex].messages[currentDate]) {
					usersCopy[userIndex].messages[currentDate].push(newMsgObject);
				} else {
					usersCopy[userIndex].messages[currentDate] = [];
					usersCopy[userIndex].messages[currentDate].push(newMsgObject);
				}
			} else {
				usersCopy[userIndex].messages[currentDate] = [];
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			}
			
			const userObject = usersCopy[userIndex];
			if (isBot) {
				usersCopy[userIndex] = { ...userObject, ['date']: '2000-01-01T00:00:00', ['message']: newMsgObject.content};
			} else {
				usersCopy[userIndex] = { ...userObject, ['date']: new Date(), ['message']: newMsgObject.content};
			}
			
	
			//сортировка
			const userSort = [...usersCopy].sort((a, b) => {       
				var dateA = new Date(a.date), dateB = new Date(b.date) 
				return dateB-dateA  //сортировка по убывающей дате  
			})
	
			//console.log(userSort)
	
			return userSort;
		});
	}

	//получить исходящее сообщение в админку
	const fetchDelAdmin = (data) => {
		//console.log("Удаление сообщение в Админке: ", data)

		
	}


//------------------------------------------------------------------------------------
	useEffect(() => {
		socket.on("getMessageRent", fetchMessageResponse);
		
		socket.on("getAdmin", fetchAdmin);	
		socket.on("getDelAdmin", fetchDelAdmin);	
		
	}, [socket]);

//------------------------------------------------------------------------------------


	//отправить сообщение из админки 
	const addNewMessage = (userId, message, type, textButton, convId, messageId, isBot) => {

		socket.emit("sendAdmin", { 
			senderId: chatAdminId,
			receiverId: userId,
			text: message,
			type: type,
			buttons: textButton,
			convId: convId,
			messageId,
			isBot: isBot,
		})
	};

	const delMessageContext = (messageId, messageDate, chatId) => {
		socket.emit("delAdmin", { 
			messageId,
			messageDate,
			chatId,
		})
	}

	//сохранить новое имя пользователя
	const addNewName = (userId, name) => {
		let userIndex = users.findIndex((user) => user.chatId === userId);
		const usersCopy = [...users];
		usersCopy[userIndex].name = name;
		setUsers(usersCopy);
	}

	//сохранить новое имя пользователя
	const addNewAvatar = (userId, avatar) => {
		let userIndex = users.findIndex((user) => user.chatId === userId);
		const usersCopy = [...users];
		usersCopy[userIndex].avatar = avatar;
		setUsers(usersCopy);
	}



function isObjectEmpty(obj) {
	return Object.keys(obj).length === 0;
}

	return (
		<UsersContext.Provider value={{ 
			users, 
			setUsers,
			contacts,
			setContacts,
			addNewMessage,
			delMessageContext,
			addNewName,
			addNewAvatar,
			usersOnline,
			// distributions, 
			// setDistributions,
			managers,
			companys,
			count,
			countMessage,
			setCountMessage,
			newProject,
			setNewProject,
			projects,
			setProjects,
			userRenthub,
			setUserRenthub,
			conversations, 
			setConversations,
			workers,
			setWorkers,
			workersAll,
			setWorkersAll,
			countMessageWork,
			setCountMessageWork,
			workerCall,
			showCallCard,
			setShowCallCard,
			showCallCardNo,
			setShowCallCardNo,
			workerCallNo,
			callIndex,
			callIndex2,
			showUpdate,
			setShowUpdate,
			showUpdate2,
			setShowUpdate2,
			workerUpdate,
			setWorkerUpdate,
			avatarUpdate,
			setAvatarUpdate,
			showDistrib,
			setShowDistrib,
			projectsNew,
			countProjects, 
			setCountProjects,
			showGetMess,
			setShowGetMess,
			soundVolume, 
			setSoundVolume,
			soundMute, 
			setSoundMute,
			statusProcess, 
			statusProcess2, 
			statusProcess3, 
			statusProcess4, 
			statusProcess5, 
			statusProcess6,
			intervalProcess,
			intervalProcess2,
			intervalProcess3,
			intervalProcess4,
			intervalProcess5,
			setIntervalProcess,
			setIntervalProcess2,
			setIntervalProcess3,
			setIntervalProcess4,
			setIntervalProcess5,
			timeProcess,
			timeProcess2,
			timeProcess3,
			timeProcess4,
			timeProcess5,
			setTimeProcess,
			setTimeProcess2,
			setTimeProcess3,
			setTimeProcess4,
			setTimeProcess5,
		}}>
			{children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };
