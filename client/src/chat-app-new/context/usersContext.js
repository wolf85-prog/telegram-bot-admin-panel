import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocketContext } from "./socketContext";
import { getContacts, getConversation, getMessages } from '../../http/chatAPI'

const UsersContext = createContext();

const useUsersContext = () => useContext(UsersContext);

const UsersProvider = ({ children }) => {
	//const socket = useSocketContext();
	const [users, setUsers] = useState([]); //useState(contacts);
	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID

	useEffect(() => {
		const fetchData = async () => {
			let response = await getContacts();
	
			const arrayContact = []
	
			response.map(async (user) => {
				
				let conversationId = await getConversation(user.chatId)
				let messages = await getMessages(conversationId)
	
				const arrayMessage = []
	
				messages.map(message => {
					let time_mess = message.createdAt.split('T')
					const newMessage = {
						content: message.text,
						sender: message.senderId,
						time: time_mess[1],
						status: 'sent',
					}
					arrayMessage.push(newMessage)
				})
	
				let first_name = user.firstname != null ? user.firstname : ''
				let last_name = user.lastname != null ? user.lastname : ''
				const newUser = {
					id: user.id,
					name: first_name + ' ' + last_name,
					chatId: user.chatId,
					conversationId: conversationId,
					unread: 0, 
					pinned: false,
					typing: false,
					messages: {"01/01/2023": arrayMessage}
				}
				arrayContact.push(newUser)
				//console.log("arrayMessage: ", arrayMessage)
			})
	
			setUsers(arrayContact)
			console.log("contacts: ", arrayContact)
		}

		fetchData();

	},[])

	const _updateUserProp = (userId, prop, value) => {
		setUsers((users) => {
			const usersCopy = [...users];
			let userIndex = users.findIndex((user) => user.id === userId);
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

	const fetchMessageResponse = (data) => {
		setUsers((users) => {
			const { userId, response } = data;

			let userIndex = users.findIndex((user) => user.id === userId);
			const usersCopy = JSON.parse(JSON.stringify(users));
			const newMsgObject = {
				content: response,
				sender: userId,
				time: new Date().toLocaleTimeString(),
				status: null,
			};

			usersCopy[userIndex].messages.TODAY.push(newMsgObject);

			return usersCopy;
		});
	};

	// useEffect(() => {
	// 	socket.on("fetch_response", fetchMessageResponse);
	// 	socket.on("start_typing", setUserAsTyping);
	// 	socket.on("stop_typing", setUserAsNotTyping);
	// 	socket.on("getMessage", getMessageData);
	// 	socket.on("welcome", message=> { console.log(message) } )
	// }, [socket]);

	// useEffect(()=>{
    //     socket.emit("addUser", chatAdminId)
    //     socket.on("getUsers", users => {
    //         console.log("users socket: ", users);
    //     })
    // },[chatAdminId])

	const setUserAsUnread = (userId) => {
		_updateUserProp(userId, "unread", 0);
	};

	const getMessageData = () => {

	}

	// const addNewMessage = (userId, message) => {
	// 	let userIndex = users.findIndex((user) => user.id === userId);
	// 	const usersCopy = [...users];
	// 	const newMsgObject = {
	// 		content: message,
	// 		sender: null,
	// 		time: new Date().toLocaleTimeString(),
	// 		status: "delivered",
	// 	};

	// 	usersCopy[userIndex].messages.TODAY.push(newMsgObject);
	// 	setUsers(usersCopy);

	// 	socket.emit("fetch_response", { userId });
	// };

	return (
		<UsersContext.Provider value={{ 
			users, 
			setUsers,
			setUserAsUnread, 
			//addNewMessage 
		}}>
			{children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };
