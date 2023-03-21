import React, { useContext } from "react";
import Icon from "./../../components/Icon";
import { Link } from "react-router-dom";
import formatTime from "./../../utils/formatTime";
import { useUsersContext } from "./../../context/usersContext";
import { AccountContext } from '../../../chat-app-new/context/AccountProvider'
import AvatarDefault from "./../../assets/images/no-avatar.png";
import Status from "./../../assets/images/status.jpg";

const Contact = ({ contact }) => {
	
	const { setPerson } = useContext(AccountContext);
	
	//сделать пользователя непрочитанным
	const { setUserAsUnread } = useUsersContext();


    const getUser = async () => {
        setPerson({
            name: contact.name, 
            id: contact.chatId
        });
		setUserAsUnread(contact.chatId)
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
			<div className="sidebar-contact__status-wrapper">
				<img
					src={Status} //{contact.profile_picture}
					alt="status" //{contact.profile_picture}
					className="status-adm"
				/>
			</div>
			<div className="sidebar-contact__avatar-wrapper">
				<img
					src={AvatarDefault} //{contact.profile_picture}
					alt={contact.name} //{contact.profile_picture}
					className="avatar-adm"
				/>
			</div>
			<div className="sidebar-contact__content">
				<div className="sidebar-contact__top-content">
					<h2 className="sidebar-contact__name"> {contact.name}</h2>
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
