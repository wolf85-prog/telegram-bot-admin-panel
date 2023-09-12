import Icon from "./../../../components/Icon";
import React, { useContext, useState, useRef } from "react";
// import pdf from "./../../../assets/images/PDFicon.png";
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

	const msgRef = useRef([]);

	let replyMessage;
	
	const { delMessageContext } = useUsersContext();

	//прокрутка
	const scrollToMsg = (id) => {
		console.log(id)
		//alert(id)
		console.log(msgRef.current)
		msgRef.current[id].scrollIntoView({transition: "smooth"});
	};

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

	const change = async (eventkey) => {
		//alert(`you chosen: ${eventkey}`)
		const message = JSON.parse(eventkey);

		console.log("id:", message.id)

		//удалить сообщение через сокет
		delMessageContext(message.id, message.date, message.chatId)

		//удалить сообщение в базе данных
		delMessage(message.id)

		const url_del_msg = `https://api.telegram.org/bot${token}/deleteMessage?chat_id=${person.id}&message_id=${message.id}`
		//console.log(url_del_msg)
		const delToTelegram = await $host.get(url_del_msg);

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
											{/* <img src={pdf} width={30}/>
											<a href={message.content} target="_blank" rel="noreferrer">{message.content}</a>*/}
											<iframe src={message.content} height="235px" width="100%" title="myFramePdf"/>
										</figure>) : (
											<figure>
												<a href={message.content} target="_blank" rel="noreferrer"><img src={message.content} alt="" className="chat__img" /></a>
												
												<figcaption style={{textAlign: 'center', backgroundColor: '#607a7a', borderRadius: '5px'}}>{message.descript}</figcaption>
											</figure>
											)
										}
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

										<Dropdown onSelect={change}>
											<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">											
											</Dropdown.Toggle>
											<Dropdown.Menu as={CustomMenu}>
											<Dropdown.Item eventKey={JSON.stringify({id: message.id, date: message.date, chatId: person.id})}>Удалить сообщение</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>	
									</div>
								) : message.sender !== chatAdminId ? (
									<p className="chat__msg chat__msg--rxd" ref={assignRef()}>
										<div className="flex-row" ref={el => msgRef.current[message.id] = el} >
											{/* пересылаемое сообщение */}
											{message.content?.includes('_reply_') 
											? <div className="chat__msg--reply" onClick={()=>scrollToMsg(message.reply)}>
												<div className="reply__content">
													<div className="reply__full">
														<span className="reply__left"></span>
														<div className="reply__pad">
															<div className="reply__contact">U.L.E.Y</div>
															<div className="reply__text">
																{/* {replyMessage?.content.endsWith('.pdf') ? (
																<figure>
																	<iframe src={message.content} height="50px" width="50px" title="myFramePdf"/>
																</figure>) : (
																<figure>
																	<a href={replyMessage?.content} target="_blank" rel="noreferrer"><img src={replyMessage?.content} alt="" width='50px' height='50px' /></a>
																	<figcaption style={{textAlign: 'center', backgroundColor: '#607a7a', borderRadius: '5px'}}></figcaption>
																</figure>
																)} */}
																{replyMessage?.startsWith('http') ?
																	<a href={replyMessage} target="_blank" rel="noreferrer"><img src={replyMessage} alt='' width='50px' height='50px' /></a>
																	: replyMessage
																}
															</div>
														</div>
													</div>
													
												</div>
											</div>
											: <></>}
											<span>
												{/* {message.content?.startsWith('http') 
												? <a className="chat__href" href={message.content} target="_blank" rel="noreferrer">{message.content}</a> 
												: message.content.includes('_reply_') ? message.content.split('_reply_')[1] : message.content}  */}
												{message.content?.includes('_reply_') 
												? message.content.split('_reply_')[1] 
												: message.content}
											</span>
											<span className="chat__msg-filler"> </span>
											<span className="chat__msg-footer">
												{formatTime(message.time)}
											</span>
										</div>	
											<Dropdown onSelect={change}>
												<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">											
												</Dropdown.Toggle>
												<Dropdown.Menu as={CustomMenu}>
												<Dropdown.Item eventKey={JSON.stringify({id: message.id, date: message.date, chatId: person.id})}>Удалить сообщение</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>									
									</p>
								) : (
									<p className="chat__msg chat__msg--sent" ref={assignRef()}>
										<div ref={el => msgRef.current[message.id] = el}>
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

											<Dropdown onSelect={change}>
												<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">											
												</Dropdown.Toggle>
												<Dropdown.Menu as={CustomMenu}>
												<Dropdown.Item eventKey={JSON.stringify({id: message.id, date: message.date, chatId: person.id})}>Удалить сообщение</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</div>
										
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
