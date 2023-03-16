import Icon from "./../../../components/Icon";
import React from "react";
import media from "./../../../assets/images/profile-picture-boy-1.jpeg";
import formatTime from "./../../../utils/formatTime";
import OptionsBtn from "./../../../components/OptionsButton";

const Convo = ({ lastMsgRef, messages: allMessages }) => {
	const dates = Object.keys(allMessages);  //['01/01/2023', 'Сегодня']
	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID 

	const onSelected = (index) => {
		switch(index) {
			case 0: 
				alert("Удалить сообщение")
				break
		  
		  
			default:
				console.log("В разработке")
				break
		  }
	};

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
				<div className="chat__msg-group">
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
										<img src={media} alt="" className="chat__img" />
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
									</div>
								) : message.sender !== chatAdminId ? (
									<p className="chat__msg chat__msg--rxd" ref={assignRef()}>
										<span>
											{message.content?.includes('https://') 
											? <a className="chat__href" href={message.content} target="_blank" rel="noreferrer">{message.content}</a> 
											: message.content}
										</span>
										<span className="chat__msg-filler"> </span>
										<span className="chat__msg-footer">
											{formatTime(message.time)}
										</span>
										<button
											aria-label="Message options"
											className="chat__msg-options"
										>
											<Icon id="downArrow" className="chat__msg-options-icon" />
										</button>
									</p>
								) : (
									<p className="chat__msg chat__msg--sent" ref={assignRef()}>
										<span>
											{message.content?.includes('https://') 
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
										<button
											aria-label="Message options"
											className="chat__msg-options"
										>
											{/* <Icon id="downArrow" className="chat__msg-options-icon" /> */}
											<OptionsBtn
												className="chat__action"
												ariaLabel="Menu"
												iconId="downArrow"
												iconClassName="chat__msg-options-icon"
												onSelected={onSelected}
												showPressed={false}
												options={[
													"Удалить сообщение",
												]}
											/>
										</button>
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
