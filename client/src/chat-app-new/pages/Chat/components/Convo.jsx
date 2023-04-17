import Icon from "./../../../components/Icon";
import React, { useContext, useState } from "react";
import media from "./../../../assets/images/profile-picture-boy-1.jpeg";
import pdf from "./../../../assets/images/PDFicon.png";
import formatTime from "./../../../utils/formatTime";
import { AccountContext } from './../../../context/AccountProvider';
import { useUsersContext } from "./../../../context/usersContext";
import { $host } from './../../../../http/index'
import { delMessage } from "src/http/chatAPI";
import Dropdown from 'react-bootstrap/Dropdown';

const Convo = ({ lastMsgRef, messages: allMessages }) => {
	const { person } = useContext(AccountContext);
	const dates = Object.keys(allMessages);  //['01/01/2023', 'Сегодня']
	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID 
	const token = process.env.REACT_APP_TELEGRAM_API_TOKEN

	const { delMessageContext } = useUsersContext();

	const optViewRef = React.createRef(null);
	const content = React.createRef(null);

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<button
			aria-label="Message options"
			className="chat__msg-options"
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
			<Icon id="downArrow" className="chat__msg-options-icon" />											
		</button>
	));

	CustomToggle.displayName = "Search";

	const CustomMenu = React.forwardRef(
		({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
		  const [value, setValue] = useState('');
	  
		  return (
			<div
			  ref={ref}
			  style={{backgroundColor: '#20272b'}}
			  className={className}
			  aria-labelledby={labeledBy}
			>
			  <ul className="list-unstyled">
				{React.Children.toArray(children).filter(
				  (child) =>
					!value || child.props.children.toLowerCase().startsWith(value),
				)}
			  </ul>
			</div>
		  );
		},
	);

	CustomMenu.displayName = CustomMenu

	const change = (eventkey) => {
		//alert(`you chosen: ${eventkey}`)
		const message = JSON.parse(eventkey);

		console.log("id:", message.id)

		//удалить сообщение через сокет
		delMessageContext(message.id, message.date, message.chatId)

		//удалить сообщение в базе данных
		delMessage(message.id)

		const url_del_msg = `https://api.telegram.org/bot${token}/deleteMessage?chat_id=${person.id}&message_id=${message.id}`
		//console.log(url_del_msg)
		const delToTelegram = $host.get(url_del_msg);

		console.log("Удаляемое сообщение: ", message.id)
		console.log("Дата сообщения: ", message.date)

		//Выводим сообщение об успешной отправке
		if (delToTelegram) {
			console.log('Ваше сообщение удалено из телеграм! ', delToTelegram);	
		}           
		//А здесь сообщение об ошибке при отправке
		else {
			console.log('Что-то пошло не так. Попробуйте ещё раз.');
		}		
	}

	return dates.map((date, dateIndex) => {
		const messages = allMessages[date];
		//console.log("allMessages: ", messages);
		return (
			<div key={dateIndex}>
				<div className="chat__date-wrapper">
					<span className="chat__date"> {date}</span>
				</div>
				{dateIndex === 0 && (
					<p className="chat__encryption-msg">
						<Icon id="lock" className="chat__encryption-icon" />
						Сообщения шифруются сквозным шифрованием. Никто за пределами этого чата не может читать или слушать их
					</p>
				)}
				<div className="chat__msg-group" >
					{messages.map((message, msgIndex) => {
						const assignRef = () =>
							dateIndex === dates.length - 1 && msgIndex === messages.length - 1
								? lastMsgRef
								: undefined;
						return (
							<>
								{message.image ? (
									<div
										className={`chat__msg chat__img-wrapper ${
											message.sender !== chatAdminId ? "chat__msg--rxd" : "chat__msg--sent"
										}`}
										ref={assignRef()}
									>
										{message.content.endsWith('.pdf') ? (<figure>
											<img src={pdf} width={30}/>
											<a href={message.content} target="_blank" rel="noreferrer">{message.content}</a>
											<span className="chat__msg-footer">
													<span>{formatTime(message.time)}</span>
													{!message.sender && (
														<Icon
															id={
																message?.status === "sent"
																	? "singleTick"
																	: "doubleTick"
															}
															aria-label={message?.status}
															className={`chat__msg-status-icon ${
																message?.status === "read"
																	? "chat__msg-status-icon--blue"
																	: ""
															}`}
														/>
													)}
												</span>

												<button
													aria-label="Message options"
													className="chat__msg-options"
												>
													<Icon id="downArrow" className="chat__msg-options-icon" />
												</button>
										</figure>) : (
											<figure>
												<a href={message.content} target="_blank" rel="noreferrer"><img src={message.content} alt="" className="chat__img" /></a>
												<span className="chat__msg-footer">
													<span>{formatTime(message.time)}</span>
													{!message.sender && (
														<Icon
															id={
																message?.status === "sent"
																	? "singleTick"
																	: "doubleTick"
															}
															aria-label={message?.status}
															className={`chat__msg-status-icon ${
																message?.status === "read"
																	? "chat__msg-status-icon--blue"
																	: ""
															}`}
														/>
													)}
												</span>

												<button
													aria-label="Message options"
													className="chat__msg-options"
												>
													<Icon id="downArrow" className="chat__msg-options-icon" />
												</button>
												<figcaption style={{textAlign: 'center', backgroundColor: '#607a7a', borderRadius: '5px'}}>{message.descript}</figcaption>
											</figure>
											)
										}
										
									</div>
								) : message.sender !== chatAdminId ? (
									<p className="chat__msg chat__msg--rxd" ref={assignRef()}>
										<span>
											{message.content?.startsWith('http') 
											? <a className="chat__href" href={message.content} target="_blank" rel="noreferrer">{message.content}</a> 
											: message.content}
										</span>
										<span className="chat__msg-filler"> </span>
										<span className="chat__msg-footer">
											{formatTime(message.time)}
										</span>
										{/* <button
											aria-label="Message options"
											className="chat__msg-options"
										>
											<Icon id="downArrow" className="chat__msg-options-icon" />
										</button> */}
										<Dropdown onSelect={change} style={{backgroundColor: '#2a2f32'}}>
											<Dropdown.Toggle 
												as={CustomToggle} 
												id="dropdown-custom-components"
												align={{lg: "start" }}
											>											
											</Dropdown.Toggle>
											<Dropdown.Menu as={CustomMenu}>
											<Dropdown.Item eventKey={JSON.stringify({id: message.id, date: message.date, chatId: person.id})}>Удалить сообщение</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</p>
								) : (
									<p className="chat__msg chat__msg--sent" ref={assignRef()}>
										<span>
											{message.content?.startsWith('http') 
											? <a className="chat__href" href={message.content} target="_blank" rel="noreferrer">{message.content}</a> 
											: message.content}
										</span>
										<span className="chat__msg-filler"> </span>
										<span className="chat__msg-footer">
											<span> {formatTime(message.time)} </span>
											<Icon
												id={
													message?.status === "sent"
														? "singleTick"
														: "doubleTick"
												}
												aria-label={message?.status}
												className={`chat__msg-status-icon ${
													message?.status === "read"
														? "chat__msg-status-icon--blue"
														: ""
												}`}
											/>
										</span>
										{/* <button
											aria-label="Message options"
											className="chat__msg-options"
										>
											<Icon id="downArrow" className="chat__msg-options-icon" />											
										</button> */}

										<Dropdown onSelect={change}>
											<Dropdown.Toggle 
												as={CustomToggle} 
												id="dropdown-custom-components"
												align={{lg: "start" }}
											>											
											</Dropdown.Toggle>
											<Dropdown.Menu as={CustomMenu}>
											<Dropdown.Item eventKey={JSON.stringify({id: message.id, date: message.date, chatId: person.id})}>Удалить сообщение</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</p>
								)}
							</>
						);
					})}
				</div>
			</div>
		);
	});
};

export default Convo;
