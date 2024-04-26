import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocketContext } from "./socketContext";
import { getAllMessages, getContacts, getConversation, getMessages } from '../../http/chatAPI'
import { getAllPretendent, getWContacts, getWConversation, 
	getWConversations, getWMessages, getWorkers, getAllWMessages, 
	getWMessagesCount, 
	getWorkersCount} from '../../http/workerAPI'

import { getDistributions, 
	getDistributionsW, 
	getDistributionsWPlan,
	getManagers, 
	getProjectsApi, 
	getCompanys,
	newCountMessagePretendent,
	newCountWMessage,
	getCountMessage, 
	getWorkerId,
	getProjects3,
	getProjectAll,
	getProjects,
} from "src/http/adminAPI";

import boopSfx from './../assets/sounds/zvuk-icq.mp3';
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

	const [pretendents, setPretendents] = useState([])
	const [newPretendent, setNewPretendent] = useState(false);
	const [countPretendent, setCountPretendent] = useState(0)

	const [userWorkers, setUserWorkers] = useState([]); //useState(contacts);
	const [workers, setWorkers] = useState([]); //useState(contacts);
	const [countMessageWork, setCountMessageWork] = useState(0)
	const [distributionsWork, setDistributionsWork] = useState([]); 

	const [conversations, setConversations] = useState([]); 
	const [wuserbots, setWuserbots] = useState([]); 

	const [soundsNotif, setSoundsNotif] = useState([]); 

	const audio = new Audio(boopSfx);
	const audioProject = new Audio(soundProject);
	const audioSmeta = new Audio(soundSmeta);
	
	const audio120 = new Audio(sound120);
	const audio60 = new Audio(sound60);
	const audio30 = new Audio(sound30);
	const audio15 = new Audio(sound15);
	const audio0 = new Audio(sound0);

	const audio10 = new Audio(sound10);
	const audio5 = new Audio(sound5);

	const audioNarush = new Audio(soundNarush)
	const audioNarush2 = new Audio(soundNarush2)
	
	const audioSend = new Audio(sendSound);
	const audioWorkhub = new Audio(smsWorkhub);
	const audioPretendent = new Audio(notifPretendent)

//-------------------------------------------------------------------------
	const refreshPage = ()=>{
		window.location.reload();
	}

//---------get Userbots---------------------------------------------------
	useEffect(() => {
		const fetchData = async () => {
			let response = await getContacts();
			//console.log("contacts size: ", response.length)

			const arrayContact = []

			response.map(async (user, index) => {
				
				let conversationId = await getConversation(user.chatId)
				let messages = await getMessages(conversationId)

				//console.log("count message: ", messages.length)

				//получить последнее сообщение
				const messageDates = Object.keys(messages);
				const recentMessageDate = messageDates[messageDates.length - 1];
				const message = messages[recentMessageDate];

				const dateMessage = message ? messages[recentMessageDate].createdAt : "2000-01-01T00:00:00";
				const lastMessage = message ? messages[recentMessageDate].text : "";			

				const arrayMessage = []
				const allDate = []

				messages.map(message => {
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

				let first_name = user.firstname != null ? user.firstname : ''
				let last_name = user.lastname != null ? user.lastname : ''

				let chatName = user.username ? user.username : first_name + ' ' + last_name

				const newUser = {
					id: user.id,
					name: chatName,
					chatId: user.chatId,
					avatar: user.avatar,
					conversationId: conversationId,
					unread: 0, 
					pinned: false,
					typing: false,
					message:  lastMessage,
					date: dateMessage,
					messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
				}

				arrayContact.push(newUser)

				//если элемент массива последний
				if (index === response.length-1) {
					const sortedClients = [...arrayContact].sort((a, b) => {       
						var dateA = new Date(a.date), dateB = new Date(b.date) 
						return dateB-dateA  //сортировка по убывающей дате  
					})

					setUsers(sortedClients)
					//console.log("managers contacts: ", arrayContact)
				}
			})
	}
	
	fetchData()

	}, [])

//---------get Workers----------------------------------------------------
	useEffect(() => {
		const fetchData = async () => {
			//const res1 = await get
		}

		fetchData()

	}, [])

	useEffect(() => {
		//---------get UserWorkers-----------------------------------------
		const fetchUserWorkerData = async () => {
		
			//1 все специалисты
			let response = await getWorkersCount(100);
			console.log("workers size: ", response.length)
		
			const arrayWorker = []
		
			response.map(async (user) => {
				const newWorker = {
				  id: user.id,
				  userfamily: user.userfamily,
				  username: user.username,
				  phone: user.phone,
				  dateborn: user.dateborn,
				  city: user.city, 
				  companys: user.companys,
				  stag: user.stag,
				  worklist:  user.worklist,
				  chatId: user.chatId,
				  createDate: user.createdAt,
				  avatar: user.avatar,
				  from: user.from,
				  promoId: user.promoId,
				  block: user.block,
				  deleted: user.deleted,
				}
		
				arrayWorker.push(newWorker)
			})
		
			setWorkers(arrayWorker)	
		
			//2 все пользователи бота
			let wuserbots = await getWContacts();
			console.log("wuserbots size: ", wuserbots.length)
			const arrayContact = []

			//3 все беседы (conversations)
			let convers = await getWConversations()

			//4 все сообщения бота
			let messagesAll = await getWMessagesCount(1000) //getWMessagesCount(1000) //getAllWMessages()
			//console.log("messagesAll: ", messagesAll)

			let count = 0
			convers.forEach(async (user, index) => {
		
				let worker = arrayWorker.find((item)=> item.chatId === user.members[0])
				let userbot = wuserbots.find((item)=> item.chatId === worker?.chatId)	
					
				let conversationId = user.id //await getWConversation(user.members[0])

				let messages = []
				let messages2 = []
				
				//messages = messagesAll.filter(item => item.conversationId === conversationId.toString()) //await getWMessages(conversationId)
				//messagesAll.reverse()

				//выбрать из всех сообщений только пользователя в кол-ве 10 шт.
				for (let i = messagesAll.length-1; i >= 0; i--) {
					if (messagesAll[i].conversationId === conversationId.toString())
						messages.push(messagesAll[i])
					
					if (messages.length === 10)
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
				
				if (worker) {
					const newUser = {
						id: worker.id,
						username: userbot.username ? userbot.username : '', // user.username ? user.username : '',
						name: worker?.userfamily + " " + worker?.username, //notion[0]?.fio ? notion[0]?.fio : '',
						city: worker?.city, //notion[0]?.city ? notion[0]?.city : '',
						phone: worker?.phone, //notion[0]?.phone ? notion[0]?.phone : '',
						age: worker?.dateborn, //notion[0]?.age ? notion[0]?.age : "",
						chatId: worker?.chatId,
						avatar: worker?.avatar ? worker?.avatar : '', //avatars[0]?.image ? avatars[0]?.image : '', //user.avatar,
						conversationId: conversationId ? conversationId : 0,
						block: userbot.block ? userbot.block : '',
						blockw: worker?.block,
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
		
					setUserWorkers(sortedClients)
				}				
			})	
		}
		
		//все сообщения специалистов
		fetchUserWorkerData();
		
	},[])
	
//------------------------------------------------------------------------------------------

	//get Managers
	useEffect(() => {
    	const fetchData = async () => {
			let response = await getManagers();
      		//console.log("managers: ", response.length)

			setManagers(response)
		}

	  	fetchData();

	},[])
//------------------------------------------------------------------------------------------

  	//get Distribution
  	// useEffect(() => {
    // 	const fetchData = async () => {
	// 		let response = await getDistributions();
    //   		//console.log("distribution: ", response.length)

	// 		setDistributions(response)
	// 	}

	//   	fetchData();

	// },[])
//------------------------------------------------------------------------------------------

  	//get DistributionW
  	useEffect(() => {
    	const fetchData = async () => {
			let response = await getDistributionsW();
      		//console.log("distributionW: ", response.length)

			let response2 = await getDistributionsWPlan();
      		//console.log("distributionWPlan: ", response2.length)

			//сортировка
			const messageSort = [...response].sort((a, b) => {       
				var dateA = new Date(a.datestart), dateB = new Date(b.datestart) 
				return dateB-dateA  //сортировка по убывающей дате  
			})

			const messageSort2 = [...response2].sort((a, b) => {       
				var dateA = new Date(a.datestart), dateB = new Date(b.datestart) 
				return dateA-dateB  //сортировка по убывающей дате  
			})

			let all = [...messageSort2, ...messageSort]

			setDistributionsWork(all)
		}

	  	fetchData();

	},[])
//------------------------------------------------------------------------------------------

	//get Projects
	useEffect(() => {
    	const fetchData = async () => {
			let projects = await getProjectsApi();
			//console.log("projects size: ", projects.length)

			setProjects(projects)
		}

	  	fetchData();

	},[])
//------------------------------------------------------------------------------------------

	//get Companys
	useEffect(() => {
    	const fetchData = async () => {
			let companys = await getCompanys();
			//console.log("companys size: ", companys.length)

			setCompanys(companys)
		}

	  	fetchData();

	},[])



//------------------------------------------------------------------------------------------
	//подключение админа к сокету и вывод всех подключенных
	useEffect(()=>{
		socket.emit("addUser", chatAdminId)
		socket.on("getUsers", users => {
			//console.log("users socket: ", users);
			setUsersOnline(users)
		})
		
	},[chatAdminId])
	
	//users
	const _updateUserProp = (userId, prop, value) => {
		setUsers((users) => {
			const usersCopy = [...users];
			let userIndex = users.findIndex((user) => user.chatId === userId);
			const userObject = usersCopy[userIndex];
			usersCopy[userIndex] = { ...userObject, [prop]: value };
			return usersCopy;
		});
	};

	//workhub
	const _updateUserWorkerProp = (userId, prop, value) => {
		setUserWorkers((userWorkers) => {
			const usersCopy = [...userWorkers];
			let userIndex = userWorkers.findIndex((user) => user.chatId === userId);
			const userObject = usersCopy[userIndex];
			usersCopy[userIndex] = { ...userObject, [prop]: value };
			return usersCopy;
		});
	};

	const setUserAsTyping = (data) => {
		const { userId } = data;
		_updateUserProp(userId, "typing", true);
	};

	const setUserAsNotTyping = (data) => {
		const { userId } = data;
		_updateUserProp(userId, "typing", false);
	};
//------------------------------------------------------------------------------------------

	//получить сообщение из телеграмма
	const fetchMessageResponse = async(data) => {
		//console.log("date: ", data)
		getCountMessage()
		
		setCount(count+1);
		setCountMessage(countMessage + 1)

		if (data.text.startsWith('Предварительная смета одобрена!')) {
			//console.log("Предварительная смета одобрена!")
			//play sound
			audioSmeta.play(); 
		} else if (data.text.startsWith('Проект успешно создан') && !data.text.includes('_reply_')) {
			console.log("Пришел новый проект: ", newProject)
			//play sound
			audioProject.play();
			//пришел новый проект
			setNewProject(true)
			
			//get all projects
			let projects = await getProjectsApi();
			setProjects(projects)
		}
		else {
			console.log("Пришло новое сообщение: ", count+1)
			//play sound
			audio.play();		
		}

		setUsers((users) => {
			const { senderId, text, type, messageId, convId, replyId } = data;	

			let userIndex = users.findIndex((user) => user.chatId === senderId.toString());
			const usersCopy = JSON.parse(JSON.stringify(users));			

			//console.log("userIndex: ", userIndex)
			if (userIndex === -1) {
				const newUser = {
					id: usersCopy.length,
					name: 'Новый заказчик',
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

				//console.log("userIndex new: ", userIndex)
			}		
			
		//-----------------------------------------------------------------------------------------------			
			const newMsgObject = {
				date: new Date().toLocaleDateString(),
				content: text,
				image: type === 'image' ? true : false,
				sender: senderId,
				time: new Date().toLocaleTimeString(),
				status: null,
				id: messageId,
				reply: replyId,
			};

			const currentDate = new Date().toLocaleDateString()

			//console.log("messages: ", usersCopy[userIndex].messages[currentDate])

			if (usersCopy[userIndex].messages[currentDate]) {
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			} else {
				//console.log("add current date")
				usersCopy[userIndex].messages[currentDate] = [];
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			}
			
			const userObject = usersCopy[userIndex];
			usersCopy[userIndex] = { ...userObject, ['unread']: count + 1, ['date']: new Date(), ['message']: newMsgObject.content};

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

		setUsers((users) => {
			const { senderId, receiverId, text, type, buttons, messageId } = data;

			let userIndex = users.findIndex((user) => user.chatId === receiverId.toString());
			const usersCopy = JSON.parse(JSON.stringify(users));
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
			console.log("currentDate: ", currentDate)

			if (usersCopy[userIndex].messages[currentDate]) {
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			} else {
				usersCopy[userIndex].messages[currentDate] = [];
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			}
			
			const userObject = usersCopy[userIndex];
			usersCopy[userIndex] = { ...userObject, ['date']: new Date(), ['message']: newMsgObject.content};

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

		setUsers((users) => {
			const { messageId, messageDate, chatId } = data;

			let userIndex = users.findIndex((user) => user.chatId === chatId);
			const usersCopy = JSON.parse(JSON.stringify(users));

			const messageIndex = usersCopy[userIndex].messages[messageDate].map(el => el.id).lastIndexOf(messageId);
			usersCopy[userIndex].messages[messageDate].splice(messageIndex, 1); 

			const userObject = usersCopy[userIndex];
			const userSort = [...usersCopy]

			return userSort;
		});
	}

	//получить рассылку
	const fetchDistribution = async () => {
		let response = await getDistributionsW();
		  //console.log("distributionW: ", response.length)

		let response2 = await getDistributionsWPlan();
		  //console.log("distributionWPlan: ", response2.length)

		//сортировка
		const messageSort = [...response].sort((a, b) => {       
			var dateA = new Date(a.datestart), dateB = new Date(b.datestart) 
			return dateB-dateA  //сортировка по убывающей дате  
		})

		const messageSort2 = [...response2].sort((a, b) => {       
			var dateA = new Date(a.datestart), dateB = new Date(b.datestart) 
			return dateA-dateB  //сортировка по убывающей дате  
		})

		let all = [...messageSort2, ...messageSort]

		setDistributionsWork(all)
	}

//------------------------------------------------------------------------------------
	useEffect(() => {
		socket.on("getMessage", fetchMessageResponse);
		socket.on("getMessageSpec", fetchMessageSpecResponse);
		
		socket.on("getAdmin", fetchAdmin);	
		socket.on("getDelAdmin", fetchDelAdmin);	
		
		socket.on("getAdminSpec", fetchAdminSpec);	
		socket.on("getDelAdminSpec", fetchDelAdminSpec);

		socket.on("getNotif", fetchNotifAdmin);

		socket.on("getDistrib", fetchDistribution);

		socket.on("start_typing", setUserAsTyping);
		socket.on("stop_typing", setUserAsNotTyping);
		
	}, [socket]);

//------------------------------------------------------------------------------------
	const setUserAsUnread = (userId) => {
		_updateUserProp(userId, "unread", 0);
	};

	const setUserWorkerAsUnread = (userId) => {
		_updateUserWorkerProp(userId, "unread", 0);
	};


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


	//обновить список рассылки
	const addNewDistrib = (task) => {
		socket.emit("sendDistrib", { 
			task,
		})
	};


//=======================================================================
// 						Workhub
//=======================================================================

//получить сообщение из телеграмма WorkersBot
const fetchMessageSpecResponse = async(data) => {
	//audio.play();
	//console.log("date: ", data)
	//console.log("Пришло новое сообщение в workhub: ", count+1)
	//setCount(count+1);
	let arrWorkers = []

	if (data.text.startsWith('Пользователь нажал кнопку "Принять" в рассылке') && !data.text.includes('_reply_')) {
		
		//console.log("Добавился новый претендент: ")
		//play sound
		//audioPretendent.play();

		//пришел новый претендент
		//const res = await newCountMessagePretendent(countPretendent + 1)
		//setCountPretendent(countPretendent + 1);

		//get all pretendent
		let pretendents = await getAllPretendent();

		let workers = await getWorkers()
      	let projects = await getProjects3();
      	//setProjects(projects) 

		pretendents.map(async (worker, i) => {

			let userObject = projects.find((proj) => proj.id === worker.projectId);  
			const projectName = userObject?.name

			let userObject2 = workers.find((item) => item.chatId === worker.receiverId);  
			const workerName = userObject2?.userfamily + " "+ userObject2?.username
	
			const worklist = userObject2?.worklist ? JSON.parse(userObject2?.worklist) : ''
			const rang = userObject2?.rank ? userObject2?.rank : ''
			const comment = userObject2?.comment ? userObject2?.comment : ''
			const phone = userObject2?.phone

			const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
			const d2 = new Date(d)

			const month = String(d2.getMonth()+1).padStart(2, "0");
			const day = String(d2.getDate()).padStart(2, "0");
			const chas = d2.getHours();
			const min = String(d2.getMinutes()).padStart(2, "0");
			
			const newDate = `${day}.${month} ${chas}:${min}`;
		
			//worklist
			const newWorker = {
				date: newDate, //newDate,
				project: projectName,
				//worker: workerName, 
				workerFamily: userObject2?.userfamily,
				workerName: userObject2?.username,
				worklist: worklist, //workNotions[0].spec,
				rang: rang, //workNotions[0]?.rank,
				comment: comment, //workNotions[0]?.comment,
				phone: phone, //workNotions[0]?.phone,
				accept: worker.accept,
			}
			arrWorkers.push(newWorker)

			setPretendents(arrWorkers) 
		})

		//setPretendents(pretendents)
	}
	else if (data.text.startsWith('Пользователь нажал кнопку "Отклонить" в рассылке') && !data.text.includes('_reply_')) {
		//get all pretendent
		let pretendents = await getAllPretendent();
		//setPretendents(pretendents)
		let workers = await getWorkers()
      	let projects = await getProjects3();
      	//setProjects(projects) 

		pretendents.map(async (worker, i) => {

			let userObject = projects.find((proj) => proj.id === worker.projectId);  
			const projectName = userObject?.name

			let userObject2 = workers.find((item) => item.chatId === worker.receiverId);  
			const workerName = userObject2?.userfamily + " "+ userObject2?.username
	
			const worklist = userObject2?.worklist ? JSON.parse(userObject2?.worklist) : ''
			const rang = userObject2?.rank ? userObject2?.rank : ''
			const comment = userObject2?.comment ? userObject2?.comment : ''
			const phone = userObject2?.phone

			const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
			const d2 = new Date(d)

			const month = String(d2.getMonth()+1).padStart(2, "0");
			const day = String(d2.getDate()).padStart(2, "0");
			const chas = d2.getHours();
			const min = String(d2.getMinutes()).padStart(2, "0");
			
			const newDate = `${day}.${month} ${chas}:${min}`;
		
			//worklist
			const newWorker = {
				date: newDate, //newDate,
				project: projectName,
				//worker: workerName, 
				workerFamily: userObject2?.userfamily,
				workerName: userObject2?.username,
				worklist: worklist, //workNotions[0].spec,
				rang: rang, //workNotions[0]?.rank,
				comment: comment, //workNotions[0]?.comment,
				phone: phone, //workNotions[0]?.phone,
				accept: worker.accept,
			}
			arrWorkers.push(newWorker)

			setPretendents(arrWorkers) 
		})
	}
	else if (data.text.endsWith('раз нажали кнопку Отклонить') && !data.text.includes('_reply_')) {
		//без звука
		console.log("раз нажали кнопку Отклонить в workhub: ")
	}
	else if (data.text.startsWith('Твоя ставка отправлена') && !data.text.includes('_reply_')) {
		//console.log("Твоя ставка отправлена: ")
		//play sound
		audioPretendent.play();

		//пришел новый претендент
		//console.log("countPretendent: ", countPretendent + 1)
		setCountPretendent(countPretendent + 1);

		//get all pretendent
		let pretendents = await getAllPretendent();
		//setPretendents(pretendents)
		let workers = await getWorkers()
      	let projects = await getProjects3();
      	//setProjects(projects) 

		pretendents.map(async (worker, i) => {

			let userObject = projects.find((proj) => proj.id === worker.projectId);  
			const projectName = userObject?.name

			let userObject2 = workers.find((item) => item.chatId === worker.receiverId);  
			const workerName = userObject2?.userfamily + " "+ userObject2?.username
	
			const worklist = userObject2?.worklist ? JSON.parse(userObject2?.worklist) : ''
			const rang = userObject2?.rank ? userObject2?.rank : ''
			const comment = userObject2?.comment ? userObject2?.comment : ''
			const phone = userObject2?.phone

			const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
			const d2 = new Date(d)

			const month = String(d2.getMonth()+1).padStart(2, "0");
			const day = String(d2.getDate()).padStart(2, "0");
			const chas = d2.getHours();
			const min = String(d2.getMinutes()).padStart(2, "0");
			
			const newDate = `${day}.${month} ${chas}:${min}`;
		
			//worklist
			const newWorker = {
				date: newDate, //newDate,
				project: projectName,
				//worker: workerName, 
				workerFamily: userObject2?.userfamily,
				workerName: userObject2?.username,
				worklist: worklist, //workNotions[0].spec,
				rang: rang, //workNotions[0]?.rank,
				comment: comment, //workNotions[0]?.comment,
				phone: phone, //workNotions[0]?.phone,
				accept: worker.accept,
			}
			arrWorkers.push(newWorker)

			setPretendents(arrWorkers) 
		})
	}
	else {
		setCountMessageWork(countMessageWork + 1)
		
		//пришло новое сообщение
		const res = await newCountWMessage(countMessageWork + 1)
		//console.log("Пришло новое сообщение в workhub: ", count+1)

		//play sound
		audioWorkhub.play();		
	}

	setUserWorkers((userWorkers) => {
		const { senderId, text, type, messageId, convId, replyId, isBot } = data;
		//console.log("users: ", users)
		let userIndex = userWorkers.findIndex((user) => user.chatId === senderId.toString());
		const usersCopy = JSON.parse(JSON.stringify(userWorkers));

		if (userIndex === -1) {
			const newUser = {
				id: usersCopy.length,
				name: 'Новый специалист',
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


//получить исходящее сообщение в админку workhub
const fetchAdminSpec = (data) => {
	//console.log("Пришло сообщение в Админку: ", data)

	if (data.text.startsWith('Заявка принята! Мы свяжемся с вами в ближайшее время.') && !data.text.includes('_reply_')) {
		
		//console.log("Добавился новый претендент: ")
		//play sound
		audioPretendent.play();
	}

	setUserWorkers((userWorkers) => {
		const { senderId, receiverId, text, type, buttons, messageId, isBot } = data;

		//console.log("is_bot: ", isBot)

		let userIndex = userWorkers.findIndex((user) => user.chatId === receiverId.toString());
		const usersCopy = JSON.parse(JSON.stringify(userWorkers));
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
const fetchDelAdminSpec = (data) => {
	//console.log("Удаление сообщение в Админке: ", data)

	setUserWorkers((userWorkers) => {
		const { messageId, messageDate, chatId } = data;

		let userIndex = userWorkers.findIndex((user) => user.chatId === chatId);
		const usersCopy = JSON.parse(JSON.stringify(userWorkers));

		const messageIndex = usersCopy[userIndex].messages[messageDate].map(el => el.id).lastIndexOf(messageId);
		usersCopy[userIndex].messages[messageDate].splice(messageIndex, 1); 

		const userObject = usersCopy[userIndex];
		const userSort = [...usersCopy]

		return userSort;
	});
}

//отправить сообщение из админки workhub
const addNewMessage2 = (userId, message, type, textButton, convId, messageId, isBot) => {
	console.log("isBot: ", isBot)

	socket.emit("sendAdminSpec", { 
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

//удалить сообщение из админки workhub
const delWMessageContext = (messageId, messageDate, chatId) => {
	socket.emit("delAdminSpec", { 
		messageId,
		messageDate,
		chatId,
	})
}

//===============================================================
//                  Notifications
//===============================================================
const fetchNotifAdmin = (data) => {
	//console.log("Получено звуковое уведомление: ", data)
	const { task } = data;

	if (task === 1) {
		audio120.play();
		
		setSoundsNotif((soundsNotif) => {	
			const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
			soundsNotifCopy.push("Звуковое оповещение - 120 минут")
			return soundsNotifCopy;
		});	

	} else if (task === 2) {
		audio60.play();

		setSoundsNotif((soundsNotif) => {	
			const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
			soundsNotifCopy.push("Звуковое оповещение - 60 минут")
			return soundsNotifCopy;
		});
	} else if (task === 3) {
		audio30.play();

		setSoundsNotif((soundsNotif) => {	
			const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
			soundsNotifCopy.push("Звуковое оповещение - 30 минут")
			return soundsNotifCopy;
		});
	} else if (task === 4) {
		audio15.play();

		setSoundsNotif((soundsNotif) => {	
			const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
			soundsNotifCopy.push("Звуковое оповещение - 15 минут")
			return soundsNotifCopy;
		});
	} else if (task === 5) {
		audio0.play();

		setSoundsNotif((soundsNotif) => {	
			const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
			soundsNotifCopy.push("Звуковое оповещение - 0 минут")
			return soundsNotifCopy;
		});
	
	} else if (task === 6) {
		audio10.play();

		setSoundsNotif((soundsNotif) => {	
			const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
			soundsNotifCopy.push("Звуковое оповещение - 10 минут")
			return soundsNotifCopy;
		});
	} else if (task === 7) {
		audio5.play();

		setSoundsNotif((soundsNotif) => {	
			const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
			soundsNotifCopy.push("Звуковое оповещение - 5 минут")
			return soundsNotifCopy;
		});
	}
	else if (task === 100) {
		audioNarush.play();
	}
	else if (task === 101) {
		audioNarush2.play();
	}
}

	return (
		<UsersContext.Provider value={{ 
			users, 
			setUsers,
			contacts,
			setContacts,
			setUserAsUnread, 
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
			userWorkers,
			setUserWorkers,
			setUserWorkerAsUnread,
			workers,
			setWorkers,
			addNewMessage2,
			delWMessageContext,
			countMessageWork,
			setCountMessageWork,
			distributionsWork, 
			setDistributionsWork,
			addNewDistrib,
			newPretendent,
			setNewPretendent,
			countPretendent, 
			setCountPretendent,
			soundsNotif, 
			setSoundsNotif,
			pretendents
		}}>
			{children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };
