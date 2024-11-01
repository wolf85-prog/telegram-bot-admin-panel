import React, { createContext, useContext, useEffect, useState } from "react";

import { useSocketContext } from "./socketContext";
import { getAllMessages, getContacts, getConversation, getMessages } from '../../http/chatAPI'
import { getAllPretendent, getWContacts, getWConversation, 
	getWConversations, getWMessages, getWorkers, getWorker, getAllWMessages, 
	getWMessagesCount, getWorkersCount} from '../../http/workerAPI'

import { getSpecialist, getSpecCount, editSpecialist, getSpecialistId } from './../../http/specAPI'
import { getManager } from './../../http/managerAPI'
import { getCompany } from './../../http/companyAPI'
import { getPlatforms } from './../../http/platformAPI'

import { getDistributionsW, 
	getDistributionsCountW,
	getDistributionsWPlan,
	getProjectsApi, 
	//getCompanys,
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
import { getManagerCountAll } from "src/http/managerAPI";
import { getCompanyCountAll } from "src/http/companyAPI";

const UsersContext = createContext();

const useUsersContext = () => useContext(UsersContext);

const UsersProvider = ({ children }) => {
	const socket = useSocketContext();
	const [users, setUsers] = useState( () => {
		const savedUsers = localStorage.getItem("users");
	   	const parsedUsers = JSON.parse(savedUsers);
	   	return parsedUsers || "";
	});  //useState(contacts);	
	const [contacts, setContacts] = useState([]); //useState(contacts);
	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
	const [count, setCount] = useState(0)
	const [countMessage, setCountMessage] = useState(0)
	const [countMessageRent, setCountMessageRent] = useState(0)

	const [specialistAll, setSpecialistAll] = useState([]);
	const [managersAll, setManagersAll]= useState([]); // менеджеры (заказчики)
	//const [companysAll, setCompanysAll]= useState([]); // менеджеры (заказчики)
	const [usersOnline, setUsersOnline] = useState([]);
	const [managers, setManagers]= useState([]); // менеджеры (заказчики)

	const [companys, setCompanys]= useState([]);
	const [companysAll, setCompanysAll] =  useState( () => {
		const savedUserWorkers = localStorage.getItem("companys");
	   	const parsedUserWorkers = JSON.parse(savedUserWorkers);
	   	return parsedUserWorkers || "";
	});  //все компании;

	const [platformsAll, setPlatformsAll] = useState([])

	const [projects, setProjects] = useState([]); 
	const [newProject, setNewProject]= useState(false);
	const [countProjects, setCountProjects] = useState(0)

	const [pretendents, setPretendents] = useState([])
	const [newPretendent, setNewPretendent] = useState(false);
	const [countPretendent, setCountPretendent] = useState(0)

	const [userWorkers, setUserWorkers] = useState( () => {
		const savedUserWorkers = localStorage.getItem("userWorkers");
	   	const parsedUserWorkers = JSON.parse(savedUserWorkers);
	   	return parsedUserWorkers || "";
	}); 
	const [workers, setWorkers] = useState([]); //100 последних специалистов;
	//const [workersAll, setWorkersAll] = useState([]); //все специалисты;
	const [workersAll, setWorkersAll] =  useState( () => {
		const savedUserWorkers = localStorage.getItem("specialist");
	   	const parsedUserWorkers = JSON.parse(savedUserWorkers);
	   	return parsedUserWorkers || "";
	});  //все специалисты;

	const [specialist, setSpecialist] =  useState([])

	const [specialistsCount, setSpecialistsCount] = useState(0)
	const [managersCount, setManagersCount] = useState(0)
	const [companysCount, setCompanysCount] = useState(0)


	const [userRenthub, setUserRenthub] = useState( () => {
		const savedUserRenthub = localStorage.getItem("userRenthub");
	   	const parsedUserRenthub = JSON.parse(savedUserRenthub);
	   	return parsedUserRenthub || "";
	}); 

	const [countMessageWork, setCountMessageWork] = useState(() => {
		// getting stored value
		const saved = localStorage.getItem("countMessageWork");
		const initialValue = saved;
		return initialValue || 0;
	});


	//const [distributionsWork, setDistributionsWork] = useState([]); 

	const [conversations, setConversations] = useState([]); 
	const [wuserbots, setWuserbots] = useState([]); 

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

	const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
	const MONTHS = ['Январь', 'Февраль', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    // // Will be implemented below
    const today = new Date();
    const [date, setDate] = useState(today);
	const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
	const [currentDays, setCurrentDays] = useState([]);
    //const [showButtonAdd, setShowButtonAdd] = useState([])

	useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekdayOfFirstDay = firstDayOfMonth.getDay();
        
        let arr = []
        for (let day = 0; day < 35; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }
    
        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === date.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === date.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }
    
        arr.push(calendarDay);
        setCurrentDays(arr)
        //console.log(currentDays)
        }
    }, [date]);

	function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

	function getStartDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

//-------------get count messages------------------------------------------
	// useEffect(() => {

	// 	const fetchData = async () => {
	// 		const kol = await getCountMessage()
	// 		console.log("kol: ", kol)

	// 		setCountMessage(kol.managers)
	// 		setCountMessageWork(kol.workers)

	// 		setCountProjects(kol.projects)
	// 		setCountPretendent(kol.pretendents)
	// 	}

	// 	fetchData()

	// }, [])

	// useEffect(() => {
	// 	const saved = localStorage.getItem("countMessageWork");
	// 	setCountMessageWork(saved)
	// })


//----------------------------------------------------------------------

	useEffect(() => {	
		// storing input name
		console.log("volume: ", soundVolume)

		localStorage.setItem("soundVolume", soundVolume);
		localStorage.setItem("soundMute", soundMute);
		
	}, [soundVolume, soundMute]);
	


	useEffect(() => {	
		// storing input name
		localStorage.setItem("countMessageWork", countMessageWork);
	}, [countMessageWork]);


	useEffect(() => {	
		// storing input name
		localStorage.setItem("currentTask", JSON.stringify([]));
	}, []);

//---------get Userbots---------------------------------------------------
	useEffect(() => {
		const fetchData = async () => {
			let response = await getContacts();
			//console.log("contacts: ", response)

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
					
					//сохранить кэш
					//localStorage.setItem("users", JSON.stringify(sortedClients));
				}
			})
	}
	
	fetchData()

	}, [])

//---------get Specialist----------------------------------------------------

useEffect(() => {
	//---------get UserSpecialist-----------------------------------------
	const fetchUserSpecData = async () => {
	
		//0 все специалисты
		let all = await getManagerCountAll()
		//console.log("specialist all: ", all)

		setManagersCount(all)
	}
	
	//все специалисты
	fetchUserSpecData();
	
},[])

//---------get Managers----------------------------------------------------

useEffect(() => {
	//---------get UserManagers-----------------------------------------
	const fetchUserManagerData = async () => {
	
		//0 все специалисты
		let all = await getManagerCountAll()
		console.log("managers all: ", all)

		setManagersCount(all)
	}
	
	//все менеджеры
	fetchUserManagerData();
	
},[])

useEffect(() => {
	//---------get UserManagers-----------------------------------------
	const fetchCompanysData = async () => {

		let all = await getCompanyCountAll()
		console.log("companys all: ", all)
		if (all) {
			setCompanysCount(all)
		}
	}
	
	//все менеджеры
	fetchCompanysData();
	
},[])

	
//---------get Workers----------------------------------------------------

	useEffect(() => {
		//---------get UserWorkers-----------------------------------------
		const fetchUserWorkerData = async () => {
			//console.log("userWorkers: ", userWorkers)
		
			//0 все специалисты
			//let all = await getWorkers()
			let all = await getSpecialist()
			//console.log("specialist all: ", all)
			const arrayWorkerAll = []
		
			all.map(async (user) => {
				const newWorker = {
				  id: user.id,
				  userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
				  username: '',//user.username,
				  phone: user.phone,
				  dateborn: user.age,
				  city: user.city, 
				  //newcity: user.newcity, 
				  companys: user.company,
				  //stag: user.stag,
				  worklist:  user.specialization,
				  chatId: user.chatId,
				  createDate: user.createdAt,
				  avatar: user.profile,
				  //from: user.from,
				  promoId: user.promoId,
				  block: user.block,
				  deleted: user.deleted,
				}
		
				arrayWorkerAll.push(newWorker)
			})
		
			setWorkersAll(arrayWorkerAll)

			//сохранить кэш
			localStorage.setItem("specialist", JSON.stringify(arrayWorkerAll));

			//1 все специалисты 100
			//let response = await getWorkersCount(100, workers.length);
			let response = await getSpecCount(100, specialist.length);
			//console.log("specialist 100: ", response)
		
			const arrayWorker = []
		
			response.reverse().map(async (user) => {
				const newWorker = {
					id: user.id,
					userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
					username: '',//user.username,
					phone: user.phone,
					dateborn: user.age,
					city: user.city, 
					//newcity: user.newcity, 
					companys: user.company,
					//stag: user.stag,
					worklist:  user.specialization,
					chatId: user.chatId,
					createDate: user.createdAt,
					avatar: user.profile,
					//from: user.from,
					promoId: user.promoId,
					block: user.block,
					deleted: user.deleted,
				}
		
				arrayWorker.push(newWorker)
			})
		
			setWorkers(arrayWorker)	
		
			//2 все пользователи бота
			let wuserbots = await getWContacts();
			//console.log("wuserbots size: ", wuserbots.length)
			const arrayContact = []

			//3 все беседы (conversations)
			let convers = await getWConversations()
			//console.log("conversations: ", convers.length)
			setConversations(convers)

			//4 все сообщения бота
			let messagesAll = await getWMessagesCount(1000) //getWMessagesCount(1000) //getAllWMessages()
			//console.log("messagesAll: ", messagesAll.length)

			let count = 0
			convers.forEach(async (user, index) => {
		
				let worker = arrayWorkerAll.find((item)=> item.chatId === user.members[0])
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
				
				if (worker) {
					const newUser = {
						id: worker.id,
						username: userbot?.username ? userbot?.username : '', // user.username ? user.username : '',
						name: worker?.userfamily + " " + worker?.username, //notion[0]?.fio ? notion[0]?.fio : '',
						city: worker?.city, //notion[0]?.city ? notion[0]?.city : '',
						//newcity: worker?.newcity,
						phone: worker?.phone, //notion[0]?.phone ? notion[0]?.phone : '',
						age: worker?.dateborn, //notion[0]?.age ? notion[0]?.age : "",
						chatId: worker?.chatId,
						avatar: worker?.avatar, //avatars[0]?.image ? avatars[0]?.image : '', //user.avatar,
						conversationId: conversationId ? conversationId : 0,
						block: userbot?.block ? userbot?.block : '',
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
				
				//console.log(arrayContact)
			
				//если элемент массива последний
				if (index === convers.length-1) {
					const sortedClients = [...arrayContact].sort((a, b) => {       
						var dateA = new Date(a.date), dateB = new Date(b.date) 
						return dateB-dateA  //сортировка по убывающей дате  
					})

					//console.log("sortedClients: ", sortedClients.length)
		
					setUserWorkers(sortedClients)

					//сохранить кэш
					localStorage.setItem("userWorkers", JSON.stringify(sortedClients));
				}				
			})	
		}
		
		//все сообщения специалистов
		fetchUserWorkerData();
		
	},[])


//-----------------------------------------------------------------------------------------
//			get specialist
//-----------------------------------------------------------------------------------------
  useEffect(() => {
    const arrWorkers = []

    const fetchData = async () => {
      // 1 Все специалисты
      const res = await getSpecialist()

      let arrAllWorkers = []
      res.map(async (worker, i) => {
        let str_spec = ''
        worker.specialization && JSON.parse(worker.specialization).map((item, index)=> {
          str_spec = str_spec + item.spec + (index+1 !== JSON.parse(worker.specialization).length ? ', ' : '')
        })

        let str_skill = ''
        worker.skill && JSON.parse(worker.skill).map((item, index)=> {
          str_skill = str_skill + item.name + (index+1 !== JSON.parse(worker.skill).length ? ', ' : '')
        })

        let str_merch = ''
        worker.merch && JSON.parse(worker.merch).map((item, index)=> {
          str_merch = str_merch + item.name + (index+1 !== JSON.parse(worker.merch).length ? ', ' : '')
        })

        let str_komteg = ''
        worker.comteg && JSON.parse(worker.comteg).map((item, index)=> {
          str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(worker.comteg).length ? ', ' : '')
        })

        let str_komteg2 = ''
        worker.comteg2 && JSON.parse(worker.comteg2).map((item, index)=> {
          str_komteg2 = str_komteg2 + item.name + (index+1 !== JSON.parse(worker.comteg2).length ? ', ' : '')
        })

        let str_company = ''
        worker.company && JSON.parse(worker.company).map((item, index)=> {
          str_company = str_company + item.name + (index+1 !== JSON.parse(worker.company).length ? ', ' : '')
        })

        let str_comment = ''
        worker.comment && JSON.parse(worker.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(worker.comment).length ? ', ' : '')
        })

        let str_comment2 = ''
        worker.comment2 && JSON.parse(worker.comment2).map((item, index)=> {
          str_comment2 = str_comment2 + item.content + (index+1 !== JSON.parse(worker.comment2).length ? ', ' : '')
        })

        const newWorker = {
          id: worker.id,
          fio: worker.fio,
          chatId: worker.chatId, 
          phone: worker.phone, 
          phone2: worker.phone2,
          speclist: str_spec,
          city: worker.city, 
          skill: str_skill,
          promo: worker.promoId === '0' ? '' : worker.promoId, 
          rank: worker.rank, 
          merch: str_merch,  
          company: str_company, 
          comteg: str_komteg, 
          comteg2: str_komteg2, 
          comment: str_comment, 
          comment2: str_comment2, 
          age: worker.age, 
          reyting: worker.reyting, 
          inn: worker.inn, 
          passport: worker.passport, 
          profile: worker.profile, 
          dogovor: worker.dogovor ? '🟢' : '🔴', 
          samozanjatost: worker.samozanjatost ? '🟢' : '🔴', 
          passportScan: worker.passportScan, 
          email: worker.email, 
		  blockW: worker.blockW,
          block18: worker.block18,
        }
        arrAllWorkers.push(newWorker)
      }) 
      //console.log("specialistAll: ", res)
      setSpecialistAll(arrAllWorkers)
      
    }

    fetchData();
    
  },[])


//------------------------------------------------------------------------------------------
//get Managers
//------------------------------------------------------------------------------------------		
	useEffect(() => {
    	const fetchData = async () => {
			let response = await getManager();
      		console.log("managers context: ", response)

			let arr = []
			response.map(async (user, i) => {

				let str_sfera = ''
				user.sfera && JSON.parse(user.sfera).map((item, index)=> {
				  str_sfera = str_sfera + item.name + (index+1 !== JSON.parse(user.sfera).length ? ', ' : '')
				})
		  
				let str_komteg = ''
				user.comteg && JSON.parse(user.comteg).map((item, index)=> {
				  str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(user.comteg).length ? ', ' : '')
				})
		  
				let str_comment = ''
				user.comment && JSON.parse(user.comment).map((item, index)=> {
				  str_comment = str_comment + item.content + (index+1 !== JSON.parse(user.comment).length ? ', ' : '')
				})
		  
				let str_company = ''
				let str_company_name = ''
				const comp = companysAll.find(item=> parseInt(item.id) === parseInt(user.companyId))
				if (comp) {
				  str_company = comp.id
				  str_company_name = comp.title
				}
		  
				const newUser = {
				  id: user.id,
				  fio: user.fio,
				  chatId: user.chatId, 
				  phone: user.phone, 
				  phone2: user.phone2,
				  city: user.city, 
				  sfera: str_sfera,
				  dolgnost: user.dolgnost,
				  company: str_company, 
				  companyName: str_company_name,
				  comteg: str_komteg, 
				  comment: str_comment, 
				  inn: user.inn, 
				  profile: user.profile, 
				  dogovor: user.dogovor ? '🟢' : '🔴', 
				  email: user.email, 
				  projects: user.projects,
				  block: user.block,
				}
				arr.push(newUser)

			  }) 

			setManagersAll(arr)
		}

	  	fetchData();

	},[])

//------------------------------------------------------------------------------------------
// get Companys
//------------------------------------------------------------------------------------------	
	useEffect(() => {
    	const fetchData = async () => {
			let company = await getCompany();
      		console.log("companys context: ", company)

			  let arrManagers = []
			  let managersDB = await getManager()
			  
			  managersDB.map((item, index)=> {
				const obj = {
				  value: index,
				  label: item.fio,
				}
				arrManagers.push(obj)
			  })

			  //setManagersData(arrManagers)
			  //console.log("managersDB: ", arrManagers)
		
			  let arrCompanys = []
		
			  company.map(async (user, i) => {
				const d = new Date(user.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
				const d2 = new Date(d)
				const month = String(d2.getMonth()+1).padStart(2, "0");
				const day = String(d2.getDate()).padStart(2, "0");
				const chas = d2.getHours();
				const min = String(d2.getMinutes()).padStart(2, "0");
				const newDate = `${day}.${month} ${chas}:${min}`;
		
				let str_sfera = ''
				user.sfera && JSON.parse(user.sfera).map((item, index)=> {
				str_sfera = str_sfera + item.name + (index+1 !== JSON.parse(user.sfera).length ? ', ' : '')
				})

				let str_comteg = ''
				user.comteg && JSON.parse(user.comteg).map((item, index)=> {
				str_comteg = str_comteg + item.name + (index+1 !== JSON.parse(user.comteg).length ? ', ' : '')
				})
		
				let str_comment = ''
				user.comment && JSON.parse(user.comment).map((item, index)=> {
				  str_comment = str_comment + item.content + (index+1 !== JSON.parse(user.comment).length ? ', ' : '')
				})
		
				let str_manager = ''
				let str_manager2 = ''
				user.managers && JSON.parse(user.managers).map((item, index)=> {
				  const fioManager = managersDB.find(item2 => item2.id === item.name)
				  if (fioManager) {
					str_manager = str_manager + fioManager.fio + (index+1 !== JSON.parse(user.managers).length ? ', ' : '')
					str_manager2 = str_manager2 + JSON.stringify(fioManager) + (index+1 !== JSON.parse(user.managers).length ? ', ' : '')
				  }
				})		
		
				const newUser = {
				  id: user.id,
				  title: user.title,
				  city: user.city,
				  office: user.office,
				  sklad: user.sklad,
				  comment: str_comment,
				  managers: str_manager,
				  managersObj: str_manager2,
				  inn: user.inn,
				  //GUID: user.GUID,
				  bugalterFio: user.bugalterFio, 
				  bugalterEmail: user.bugalterEmail,
				  bugalterPhone: user.bugalterPhone,
				  profile: user.profile,
				  sfera: str_sfera,
				  comteg: str_comteg,
				}
				arrCompanys.push(newUser)
		
				//если элемент массива последний
				if (i === company.length-1) {
					const sortedUser = [...arrCompanys].sort((a, b) => {       
						var idA = a.id, idB = b.id 
						return idB-idA  //сортировка по возрастанию 
					})
		
					setCompanysAll(sortedUser)
				  	//setCompanys(sortedUser)
							
					//сохранить кэш
					localStorage.setItem("companys", JSON.stringify(sortedUser));
				}
		
			  })

			//setCompanysAll(response)
		}

	  	fetchData();

	},[])

//------------------------------------------------------------------------------------------
// get Platforms
//------------------------------------------------------------------------------------------	
useEffect(() => {
	const fetchData = async () => {
		let platforms = await getPlatforms();
		  console.log("platforms context: ", platforms)
	
		  let arrCompanys = []
	
		  platforms.map(async (user, i) => {
	
			const newUser = {
			  id: user.id,
			  title: user.title,
			  city: user.city,
			  address: user.address,
			  track: user.track, //
			  url: user.url,
			  karta: user.karta,
			}
			arrCompanys.push(newUser)
	
			//если элемент массива последний
			if (i === platforms.length-1) {
				const sortedUser = [...arrCompanys].sort((a, b) => {       
					var idA = a.id, idB = b.id 
					return idB-idA  //сортировка по возрастанию 
				})
	
				setPlatformsAll(sortedUser)
				  //setCompanys(sortedUser)
						
				//сохранить кэш
				//localStorage.setItem("companys", JSON.stringify(sortedUser));
			}
	
		  })

		//setCompanysAll(response)
	}

	  fetchData();

},[])


//------------------------------------------------------------------------------------------

	//get Projects
	// useEffect(() => {
    // 	const fetchData = async () => {
	// 		let projects = await getProjectsApi();
	// 		//console.log("projects size: ", projects.length)

	// 		setProjects(projects)

	// 		//сохранить кэш
	// 		localStorage.setItem("projects", JSON.stringify(projects));
	// 	}

	//   	fetchData();

	// },[])
//------------------------------------------------------------------------------------------

	//get Companys
	// useEffect(() => {
    // 	const fetchData = async () => {
	// 		let companys = await getCompanys();
	// 		//console.log("companys size: ", companys.length)

	// 		setCompanys(companys)
	// 	}

	//   	fetchData();

	// },[])

//------------------------------------------------------------------------------------------
	//звонок по телефону
	useEffect(()=>{
		if (showCallCard) {
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioCall.volume = parseFloat(savedVolume)
				audioCall.play();
			} 
		} else {
			//audioCall.pause()
		}

		if (showCallCardNo) {
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioCall2.volume = parseFloat(savedVolume)
				audioCall2.play();
			}
		} else {
			//audioCall2.pause()
		}
		
	},[showCallCard, showCallCardNo])



//------------------------------------------------------------------------------------------
	//подключение админа к сокету и вывод всех подключенных
	// useEffect(()=>{
	// 	socket.emit("addUser", chatAdminId)
	// 	socket.on("getUsers", users => {
	// 		//console.log("users socket: ", users);
	// 		setUsersOnline(users)
	// 	})
		
	// },[chatAdminId])
	
//------------------------------------------------------------------------------------------

	//получить сообщение из телеграмма
	const fetchMessageResponse = async(data) => {
		//пришло новое сообщение
		const kol = await getCountMessage()
		setCountMessage(count+1)
		//const res = await newCountMessage(kol.managers + 1)
		console.log("Пришло новое сообщение в renthub: ", count + 1)
		setShowGetMess(true)


		if (data.text.startsWith('Предварительная смета одобрена!')) {
			//console.log("Предварительная смета одобрена!")
			//play sound

			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioSmeta.volume = parseFloat(savedVolume)
				audioSmeta.play();
			}
			
		} else if (data.text.startsWith('Проект успешно создан') && !data.text.includes('_reply_')) {

			//пришел новый проект
			const kol = await getCountMessage()
			setCountProjects(count + 1)
			//const res = await newCountProjects(kol.projects + 1)
			console.log("Пришел новое проект в renthub: ", count + 1)

			//play sound
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioProject.volume = parseFloat(savedVolume)
				audioProject.play();
			}

			
			//get all projects
			let projects = await getProjectsApi();
			setProjects(projects)
		}
		else {
			console.log("Пришло новое сообщение: ", count+1)
			//play sound
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioMessage.volume = parseFloat(savedVolume)
				audioMessage.play();
			}		
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
		//audioSend.play();
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");

		if (savedMute === 'false') {
			console.log("savedMute: ", savedMute)
			audioSend.volume = parseFloat(savedVolume)
			audioSend.play();
		}

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

	

	//получить процесс
	const fetchProcess = async (dataAll) => {
		console.log("Ответ о процессе получен: ", dataAll)
		const { process, data, interval, time } = dataAll

		if (process === '1') {
			setStatusProcess(data)
			setIntervalProcess(interval)
			setTimeProcess(time)
		}
		else if (process === '2') {
			setStatusProcess2(data)
			setIntervalProcess2(interval)
			setTimeProcess2(time)
		}
		else if (process === '3') {
			setStatusProcess3(data)
			setIntervalProcess3(interval)
			setTimeProcess3(time)
		}
		else if (process === '4') {
			setStatusProcess4(data)
			setIntervalProcess4(interval)
			setTimeProcess4(time)
		}
		else if (process === '5') {
			setStatusProcess5(data)
			setIntervalProcess5(interval)
			setTimeProcess5(time)
		}
		
	}

	//получить всех специалистов
	const fetchSpecialist = (data) => {

		setSpecialist((specialist) => {	

			const {id, fio, profile} = data

			const usersCopy = [...specialist];

			const newWorker = {
				id: id,
				fio: fio,
				telegram: "", 
				phone: "", 
				phone2: "",
				spec: "",
				city: "", 
				skill: "",
				promo: "", 
				rank: "", 
				merch: "",  
				company: "",  
				comteg: "", 
				comteg2: "",  
				comment: "", 
				comment2: "", 
				age: "", 
				reyting: "", 
				inn: "", 
				passport: "", 
				profile: profile, 
				dogovor: '🔴', 
				samozanjatost: '🔴', 
				passportScan: "",  
				email: "",
			}
			usersCopy.push(newWorker)
	  
			  //если элемент массива последний
			const sortedWorker = [...usersCopy].sort((a, b) => {       
				var idA = a.id, idB = b.id 
				return idA-idB  //сортировка по возрастанию 
			})
	  

			return sortedWorker;
		});
	}

//------------------------------------------------------------------------------------
	useEffect(() => {
		socket.on("getMessage", fetchMessageResponse);
		socket.on("getMessageSpec", fetchMessageSpecResponse);
		socket.on("getMessageRent", fetchMessageRentResponse);
		
		socket.on("getAdmin", fetchAdmin);	
		socket.on("getDelAdmin", fetchDelAdmin);	
		
		socket.on("getAdminSpec", fetchAdminSpec);	
		socket.on("getDelAdminSpec", fetchDelAdminSpec);

		socket.on("getNotif", fetchNotifAdmin);

		//socket.on("getDistrib", fetchDistribution);

		socket.on("getProcess", fetchProcess);

		socket.on("getSpecialist", fetchSpecialist);	

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

	const addNewSpecialist = (id, fio, profile) => {
		socket.emit("sendSpecialist", { 
			id,
			fio,
			profile,
		})
	}


//=======================================================================
// 						Workhub
//=======================================================================

//получить сообщение из телеграмма WorkersBot
const fetchMessageSpecResponse = async(data) => {
	
	console.log("Получено сообщение от специалиста: ", data)
	const { isBot} = data;

	let arrWorkers = []

	if (data.text.startsWith('Пользователь нажал кнопку "Принять" в рассылке') && !data.text.includes('_reply_')) {
		
		//console.log("Добавился новый претендент: ")
		//play sound
		//audioPretendent.play();

		//пришел новый претендент
		const kol = await getCountMessage()
		setCountPretendent(count + 1)
		//const res = await newCountMessagePretendent(kol.pretendents + 1)	
		console.log("Пришло новый претендент: ", count + 1)

		//get all pretendent
		//let pretendents = await getAllPretendent();

		//let workers = await getWorkers()
      	//let projects = await getProjects3();
      	//setProjects(projects) 

		// pretendents.map(async (worker, i) => {

		// 	let userObject = projects.find((proj) => proj.id === worker.projectId);  
		// 	const projectName = userObject?.name

		// 	let userObject2 = workers.find((item) => item.chatId === worker.receiverId);  
		// 	const workerName = userObject2?.userfamily + " "+ userObject2?.username
	
		// 	const worklist = userObject2?.worklist ? JSON.parse(userObject2?.worklist) : ''
		// 	const rang = userObject2?.rank ? userObject2?.rank : ''
		// 	const comment = userObject2?.comment ? userObject2?.comment : ''
		// 	const phone = userObject2?.phone

		// 	const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
		// 	const d2 = new Date(d)

		// 	const month = String(d2.getMonth()+1).padStart(2, "0");
		// 	const day = String(d2.getDate()).padStart(2, "0");
		// 	const chas = d2.getHours();
		// 	const min = String(d2.getMinutes()).padStart(2, "0");
			
		// 	const newDate = `${day}.${month} ${chas}:${min}`;
		
		// 	//worklist
		// 	const newWorker = {
		// 		date: newDate, //newDate,
		// 		project: projectName,
		// 		//worker: workerName, 
		// 		workerFamily: userObject2?.userfamily,
		// 		workerName: userObject2?.username,
		// 		worklist: worklist, //workNotions[0].spec,
		// 		rang: rang, //workNotions[0]?.rank,
		// 		comment: comment, //workNotions[0]?.comment,
		// 		phone: phone, //workNotions[0]?.phone,
		// 		accept: worker.accept,
		// 	}
		// 	arrWorkers.push(newWorker)

		// 	setPretendents(arrWorkers) 
		// })

		//setPretendents(pretendents)
	}
	else if (data.text.startsWith('Пользователь нажал кнопку "Отклонить" в рассылке') && !data.text.includes('_reply_')) {
		//get all pretendent
		let pretendents = await getAllPretendent();
		//setPretendents(pretendents)
		//let workers = await getWorkers()
      	//let projects = await getProjects3();
      	//setProjects(projects) 

		// pretendents.map(async (worker, i) => {

		// 	let userObject = projects.find((proj) => proj.id === worker.projectId);  
		// 	const projectName = userObject?.name

		// 	let userObject2 = workers.find((item) => item.chatId === worker.receiverId);  
		// 	const workerName = userObject2?.userfamily + " "+ userObject2?.username
	
		// 	const worklist = userObject2?.worklist ? JSON.parse(userObject2?.worklist) : ''
		// 	const rang = userObject2?.rank ? userObject2?.rank : ''
		// 	const comment = userObject2?.comment ? userObject2?.comment : ''
		// 	const phone = userObject2?.phone

		// 	const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
		// 	const d2 = new Date(d)

		// 	const month = String(d2.getMonth()+1).padStart(2, "0");
		// 	const day = String(d2.getDate()).padStart(2, "0");
		// 	const chas = d2.getHours();
		// 	const min = String(d2.getMinutes()).padStart(2, "0");
			
		// 	const newDate = `${day}.${month} ${chas}:${min}`;
		
		// 	//worklist
		// 	const newWorker = {
		// 		date: newDate, //newDate,
		// 		project: projectName,
		// 		//worker: workerName, 
		// 		workerFamily: userObject2?.userfamily,
		// 		workerName: userObject2?.username,
		// 		worklist: worklist, //workNotions[0].spec,
		// 		rang: rang, //workNotions[0]?.rank,
		// 		comment: comment, //workNotions[0]?.comment,
		// 		phone: phone, //workNotions[0]?.phone,
		// 		accept: worker.accept,
		// 	}
		// 	arrWorkers.push(newWorker)

		// 	setPretendents(arrWorkers) 
		// })
	}
	else if (data.text.endsWith('раз нажали кнопку Отклонить') && !data.text.includes('_reply_')) {
		//без звука
		console.log("раз нажали кнопку Отклонить в workhub: ")
	}
	else if (data.text.startsWith('Твоя ставка отправлена') && !data.text.includes('_reply_')) {
		//console.log("Твоя ставка отправлена: ")
		//play sound
		//audioPretendent.play();
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");

		if (savedMute === 'false') {
			console.log("savedMute: ", savedMute)
			audioPretendent.volume = parseFloat(savedVolume)
			audioPretendent.play();
		}

		//пришел новый претендент
		const kol = await getCountMessage()
		setCountPretendent(count + 1)
		//const res = await newCountMessagePretendent(kol.pretendents + 1)	
		console.log("Пришло новый претендент: ", count + 1)


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
			
		//пришло новое сообщение
		const kol = await getCountMessage()
		setCountMessageWork(count + 1)
		//const res = await newCountWMessage(kol.workers + 1)
		console.log("Пришло новое сообщение в workhub: ", count + 1)

		if (!isBot || isBot === null) {
			//play sound
			//audioMessageW.play();
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioMessageW.volume = parseFloat(savedVolume)
				audioMessageW.play();
			}	
		} 
		
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
		//audioPretendent.play();
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");

		if (savedMute === 'false') {
			console.log("savedMute: ", savedMute)
			audioPretendent.volume = parseFloat(savedVolume)
			audioPretendent.play();
		}
	}

	setUserWorkers((userWorkers) => {
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


//=======================================================================
// 						Renthub
//=======================================================================

//получить сообщение из телеграмма
const fetchMessageRentResponse = async(data) => {
	//пришло новое сообщение
	//const kol = await getCountMessage()
	setCountMessageRent(count+1)
	//const res = await newCountMessage(kol.managers + 1)
	console.log("Пришло новое сообщение в renthub: ", count + 1)

};


//отправить номер процесса и данные
const sendNumberProcess = (number, data, interval, time) => {
	console.log("send: ", number, data, interval, time)
	socket.emit("sendProcess", { 
		process: number,
		data: data,
		interval,
		time,
	})
};


//===============================================================
//                  Notifications
//===============================================================
const fetchNotifAdmin = async (dataAll) => {
	console.log("Получено уведомление: ", dataAll)
	const { task, 
		tg_id,
		fio,
		sity,
		year_of_birth, 
		rating, 
		projects, 
		specialities, 
		comtags, 
		workers_update,
		processUpdateD,
		phone,
		processDistrib,
		telegram_id, 
		srm_id, 
		chat_link,
	} = dataAll;

	if (task === 1) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");
		const savedTask = localStorage.getItem("currentTask");

		console.log("savedVolume: ", savedVolume)
		
		const currentDate = new Date().getTime()
		let arrTemp = JSON.parse(savedTask)
		
		const newObj = {
			task: 1,
			date: currentDate
		}
		arrTemp.push(newObj)
		localStorage.setItem("currentTask", JSON.stringify(arrTemp));



		if (task !== arrTemp[arrTemp.length-1].task && (currentDate < new Date(arrTemp[arrTemp.length-1].date).getTime()+10000 || currentDate > new Date(arrTemp[arrTemp.length-1].date).getTime()-10000)) {
			console.log("no play 120")
			setTimeout(()=> {
				if (savedMute === 'false') {
					console.log("savedMute: ", savedMute)
					audio120.volume = parseFloat(savedVolume)
					audio120.play();
				}
			}, 60000)
		} else {
			console.log("play 120")
			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audio120.volume = parseFloat(savedVolume)
				audio120.play();
			}
		}
		
		// setSoundsNotif((soundsNotif) => {	
		// 	const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
		// 	soundsNotifCopy.push("Звуковое оповещение - 120 минут")
		// 	return soundsNotifCopy;
		// });	

	} else if (task === 2) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");
		const savedTask = localStorage.getItem("currentTask");

		console.log("savedVolume: ", savedVolume)

		const currentDate = new Date().getTime()
		let arrTemp = JSON.parse(savedTask)

		
		if (task !== arrTemp[arrTemp.length-1].task && (currentDate < new Date(arrTemp[arrTemp.length-1].date).getTime()+10000 || currentDate > new Date(arrTemp[arrTemp.length-1].date).getTime()-10000)) {
			console.log("no play 60")
			setTimeout(()=> {
				if (savedMute === 'false') {
					console.log("savedMute: ", savedMute)
					audio60.volume = parseFloat(savedVolume)
					audio60.play();
				}
			}, 60000)
		} else {
			console.log("play 60")
			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audio60.volume = parseFloat(savedVolume)
				audio60.play();
			}
		}

		const newObj = {
			task: 2,
			date: currentDate
		}
		arrTemp.push(newObj)
		localStorage.setItem("currentTask", JSON.stringify(arrTemp));

		 

		// setSoundsNotif((soundsNotif) => {	
		// 	const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
		// 	soundsNotifCopy.push("Звуковое оповещение - 60 минут")
		// 	return soundsNotifCopy;
		// });

	} else if (task === 3) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");
		const savedTask = localStorage.getItem("currentTask");

		const currentDate = new Date().getTime()
		let arrTemp = JSON.parse(savedTask)


		if (task !== arrTemp[arrTemp.length-1].task && (currentDate < new Date(arrTemp[arrTemp.length-1].date).getTime()+10000 || currentDate > new Date(arrTemp[arrTemp.length-1].date).getTime()-10000)) {
			console.log("no play 30")
			setTimeout(()=> {
				if (savedMute === 'false') {
					audio30.volume = parseFloat(savedVolume)
					audio30.play();
				}
			}, 60000)
		} else {
			console.log("play 30")
			if (savedMute === 'false') {
				audio30.volume = parseFloat(savedVolume)
				audio30.play();
			}
		}

		const newObj = {
			task: 3,
			date: currentDate
		}
		arrTemp.push(newObj)
		localStorage.setItem("currentTask", JSON.stringify(arrTemp));



		// setSoundsNotif((soundsNotif) => {	
		// 	const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
		// 	soundsNotifCopy.push("Звуковое оповещение - 30 минут")
		// 	return soundsNotifCopy;
		// });

	} else if (task === 4) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");
		const savedTask = localStorage.getItem("currentTask");

		const currentDate = new Date().getTime()
		let arrTemp = JSON.parse(savedTask)

		if (task !== arrTemp[arrTemp.length-1].task && (currentDate < new Date(arrTemp[arrTemp.length-1].date).getTime()+10000 || currentDate > new Date(arrTemp[arrTemp.length-1].date).getTime()-10000)) {
			console.log("no play 15")
			setTimeout(()=> {
				if (savedMute === 'false') {
					audio15.volume = parseFloat(savedVolume)
					audio15.play();
				}
			}, 60000)
		} else {
			console.log("play 15")
			if (savedMute === 'false') {
				audio15.volume = parseFloat(savedVolume)
				audio15.play();
			}
		}


		const newObj = {
			task: 4,
			date: currentDate
		}
		arrTemp.push(newObj)
		localStorage.setItem("currentTask", JSON.stringify(arrTemp));


		// setSoundsNotif((soundsNotif) => {	
		// 	const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
		// 	soundsNotifCopy.push("Звуковое оповещение - 15 минут")
		// 	return soundsNotifCopy;
		// });

	} else if (task === 5) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");
		const savedTask = localStorage.getItem("currentTask");

		const currentDate = new Date().getTime()
		let arrTemp = JSON.parse(savedTask)

		if (task !== arrTemp[arrTemp.length-1].task && (currentDate < new Date(arrTemp[arrTemp.length-1].date).getTime()+10000 || currentDate > new Date(arrTemp[arrTemp.length-1].date).getTime()-10000)) {
			console.log("no play 10")
			setTimeout(()=> {
				if (savedMute === 'false') {
					audio10.volume = parseFloat(savedVolume)
					audio10.play();
				}
			}, 60000)
		} else {
			console.log("play 10")
			if (savedMute === 'false') {
				audio10.volume = parseFloat(savedVolume)
				audio10.play();
			}
		} 

		const newObj = {
			task: 5,
			date: currentDate
		}
		arrTemp.push(newObj)
		localStorage.setItem("currentTask", JSON.stringify(arrTemp));


		// setSoundsNotif((soundsNotif) => {	
		// 	const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
		// 	soundsNotifCopy.push("Звуковое оповещение - 10 минут")
		// 	return soundsNotifCopy;
		// });

	} else if (task === 6) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");
		const savedTask = localStorage.getItem("currentTask");

		const currentDate = new Date().getTime()
		let arrTemp = JSON.parse(savedTask)

		if (task !== arrTemp[arrTemp.length-1].task && (currentDate < new Date(arrTemp[arrTemp.length-1].date).getTime()+10000 || currentDate > new Date(arrTemp[arrTemp.length-1].date).getTime()-10000)) {
			console.log("no play 5")
			setTimeout(()=> {
				if (savedMute === 'false') {
					audio5.volume = parseFloat(savedVolume)
					audio5.play();
				}
			}, 60000)
		} else {
			console.log("play 5")
			if (savedMute === 'false') {
				audio5.volume = parseFloat(savedVolume)
				audio5.play();
			}
		}

		const newObj = {
			task: 6,
			date: currentDate
		}
		arrTemp.push(newObj)
		localStorage.setItem("currentTask", JSON.stringify(arrTemp));


		// setSoundsNotif((soundsNotif) => {	
		// 	const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
		// 	soundsNotifCopy.push("Звуковое оповещение - 5 минут")
		// 	return soundsNotifCopy;
		// });
		
	} else if (task === 7) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");
		const savedTask = localStorage.getItem("currentTask");

		const currentDate = new Date().getTime()
		let arrTemp = JSON.parse(savedTask)

		if (task !== arrTemp[arrTemp.length-1].task && (currentDate < new Date(arrTemp[arrTemp.length-1].date).getTime()+10000 || currentDate > new Date(arrTemp[arrTemp.length-1].date).getTime()-10000)) {
			console.log("no play 0")
			setTimeout(()=> {
				if (savedMute === 'false') {
					audio0.volume = parseFloat(savedVolume)
					audio0.play();
				}
			}, 60000)
		} else {
			console.log("play 0")
			if (savedMute === 'false') {
				audio0.volume = parseFloat(savedVolume)
				audio0.play();
			}
		}

		const newObj = {
			task: 7,
			date: currentDate
		}
		arrTemp.push(newObj)
		localStorage.setItem("currentTask", JSON.stringify(arrTemp));


		// setSoundsNotif((soundsNotif) => {	
		// 	const soundsNotifCopy = JSON.parse(JSON.stringify(soundsNotif));
		// 	soundsNotifCopy.push("Звуковое оповещение - 0 минут")
		// 	return soundsNotifCopy;
		// });
	}
	else if (task === 100) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");

		if (savedMute === 'false') {
			console.log("savedMute: ", savedMute)
			audioNarush.volume = parseFloat(savedVolume)
		   	audioNarush.play();
		} 
	}
	else if (task === 101) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");

		if (savedMute === 'false') {
			console.log("savedMute: ", savedMute)
			audioNarush2.volume = parseFloat(savedVolume)
			audioNarush2.play();
		} 
	}
	//звонок специалиста
	else if (task === 200) {
		//console.log("fio: ", fio)

		const worker = await getSpecialistId(tg_id)
		console.log("worker: ", worker)
		setWorkerCall({
			tg_id,
			fio,
            sity,
            year_of_birth, 
            rating, 
            projects, 
            specialities, 
            comtags,
			avatar: worker?.profile,
		})

		setShowCallCard(true)

		setCallIndex(2)
		setCallIndex2(1)
	}
	//неизвестный номер
	else if (task === 201) {
		//console.log("fio: ", data)
		setShowCallCardNo(true)

		setWorkerCallNo(phone)


		setCallIndex(1)
		setCallIndex2(2)
	}
	//обновление данных
	else if (task === 300) {
		setShowUpdate(processUpdateD)
		setWorkerUpdate(workers_update)
	}
	//рассылка
	else if (task === 400) {
		setShowDistrib(processDistrib)
	}

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
			setUserAsUnread, 
			addNewMessage,
			delMessageContext,
			addNewName,
			addNewAvatar,
			usersOnline,
			companys,
			count,
			countMessage,
			setCountMessage,
			countMessageRent,
			setCountMessageRent,
			newProject,
			setNewProject,
			projects,
			setProjects,
			userWorkers,
			setUserWorkers,
			setUserWorkerAsUnread,
			userRenthub,
			setUserRenthub,
			conversations, 
			setConversations,
			workers,
			setWorkers,
			workersAll,
			setWorkersAll,
			specialist, 
			setSpecialist,
			specialistAll,
			setSpecialistAll,
			addNewMessage2,
			delWMessageContext,
			countMessageWork,
			setCountMessageWork,
			newPretendent,
			setNewPretendent,
			countPretendent, 
			setCountPretendent,
			soundsNotif, 
			setSoundsNotif,
			pretendents,
			setPretendents,
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
			sendNumberProcess,
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
			addNewSpecialist,
			managers, 
			setManagers,
			managersCount,
			setManagersCount,
			companysCount,
			setCompanysCount,
			companys,
			setCompanys,
			managersAll, 
			setManagersAll,
			companysAll,
			setCompanysAll,
			platformsAll,
			specialistsCount, 
			setSpecialistsCount,
			date, 
			setDate,
			MONTHS,
			DAYS_OF_THE_WEEK,
			month,
			setMonth,
			year,
			setYear,
			startDay, 
			setStartDay,
			currentDays,

		}}>
			{children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };
