import React, { useContext, useState, useEffect } from "react";
import Icon from "src/chat-app-new/components/Icon";
import { Link } from "react-router-dom";
import formatTime from "./../../../chat-app-new/utils/formatTime";
import { AccountContext } from './../../../chat-app-new/context/AccountProvider'
import avatarDefault from "./../../../chat-app-new/assets/images/no-avatar.png";
import avatarBlacklist from "./../../../chat-app-worker/assets/images/uncheck.png";
import blockUser from "./../../../chat-app-worker/assets/images/stop.png";

import { useUsersContext } from "./../../../chat-app-new/context/usersContext";

const Contact = ({ contact, worker }) => {
	console.log("worker contact: ", worker)
	const { setPersonW } = useContext(AccountContext);
	const host = process.env.REACT_APP_API_URL
	
	//сделать пользователя непрочитанным
	const { setUserWorkerAsUnread, setCountMessageWork } = useUsersContext();

	//обработка нажатия на пользователя из списка
    const getUser = async () => {
        setPersonW({
            name: contact.name, 
            id: contact.chatId, 
			avatar: contact.avatar
        });
		setUserWorkerAsUnread(contact.chatId)
		setCountMessageWork(0)

		//console.log("click")
    }
	
	const getLastMessage = () => {
			const messageDates = Object.keys(contact.messages);	
			let recentMessageDate
			
			messageDates.length !== 0 	
			? recentMessageDate = messageDates[messageDates.length - 1]
			: recentMessageDate = '2000-01-01'

			let messages = [];
			if (JSON.stringify(contact.messages) !== '{}') {
				messages = [...contact.messages[recentMessageDate]];
			}	

			if (messages.length) {
				const lastMessage = messages.pop();
				return lastMessage;
			} 
			const lastMessage = '';
			return lastMessage;
	};

	const lastMessage = getLastMessage(contact);

	return (
		<Link
			className="sidebar-contact"
			onClick={() => getUser()}
		>
			<div className="sidebar-contact__avatar-wrapper" style={{position: 'relative'}}>
				{
					contact.avatar
					? <> {contact.blockw ? <img src={blockUser} alt='' className="avatar-adm" style={{position: 'absolute', top: '0', zIndex: '2'}} /> : <></>}
						<img src={`${contact.avatar}`} alt='' className="avatar-adm" style={{position: 'absolute', top: '0', zIndex: '0'}} />
					</>
					: <> {contact.blockw ? <img src={blockUser} alt='' className="avatar-adm" style={{position: 'absolute', top: '0', zIndex: '2'}} /> : <></>}
						<img src={avatarDefault} alt='' className="avatar-adm" style={{position: 'absolute', top: '0', zIndex: '0'}} />
					</>
				}
				{
				worker.length !== 0 ? 
				((JSON.parse(worker[0].worklist)).findIndex(item => item.spec === 'Blacklist') === 0 ? 
				<img src={avatarBlacklist} alt='' width={18} style={{position: 'absolute', top: '34px', left: '32px'}}/>
				: "")
				: ""
				}
			</div>
			<div className="sidebar-contact__content">
				<div className="sidebar-contact__top-content">
					<h2 className="sidebar-contact__name">{contact.name}</h2>
					<span className="sidebar-contact__time">
						{lastMessage === ''  ? '' : formatTime(lastMessage.time)}
					</span>
				</div>
				<div className="sidebar-contact__bottom-content">
					<p className="sidebar-contact__message-wrapper">
						{lastMessage.status && (
							<Icon
								id={
									lastMessage?.status === "sent" ? "singleTick" : "doubleTick"
								}
								aria-label={lastMessage?.status}
								className={`sidebar-contact__message-icon ${
									lastMessage?.status === "read"
										? "sidebar-contact__message-icon--blue"
										: ""
								}`}
							/>
						)}
						<span
							className={`sidebar-contact__message ${
								!!contact.unread ? "sidebar-contact__message--unread" : ""
							}`}
						>
							{contact.typing ? <i> печатает...</i> : lastMessage?.content}
						</span>
					</p>
					<div className="sidebar-contact__icons">
						{contact.pinned && (
							<Icon id="pinned" className="sidebar-contact__icon" />
						)}
						{!!contact.unread && (
							<span className="sidebar-contact__unread">{contact.unread}</span>
						)}
						<button aria-label="sidebar-contact__btn">
							<Icon
								id="downArrow"
								className="sidebar-contact__icon sidebar-contact__icon--dropdown"
							/>
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Contact;
