import React, { useState, useContext, useEffect, useRef }  from "react";
import Icon from "./../../../components/Icon";
import OptionsBtn from "./../../../components/OptionsButton";
import avatarDefault from "./../../../../chat-app-new/assets/images/no-avatar.png";
import { 
	CButton
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPhone } from '@coreui/icons'

import sendSound from './../../../../chat-app-new/assets/sounds/sendmessage.mp3';
import ishodCall from './../../../../assets/sound/ishod.mp3';

import { getSendCall } from './../../../../http/adminAPI';
  
const Header = ({ user, openProfileSidebar, openSearchSidebar, closeSidebar, showCloseButton, clearFile, setClearFile, clickClearFile  }) => {

	const [press, setPress] = useState(false)

	const audio = new Audio(sendSound);
	const audioIshodCall = new Audio(ishodCall);

	const host = process.env.REACT_APP_API_URL

	//console.log("user: ", user)

	const onSelected = (index) => {
		switch(index) {
			case 0: //данные о контакте
				openProfileSidebar()
				break
		  
			case 1: 
				console.log('1')
				break
		  
			default:
				console.log("В разработке")
				break
		  }
	};

	const onImageError = (e) => {
		e.target.src = avatarDefault
	}


	const clickToCall = async(id) => {
		// Button begins to shake
		setPress(true);
		console.log(id)
        
		// Buttons stops to shake after 2 seconds
		setTimeout(() => setPress(false), 200);

		audioIshodCall.play();
		await getSendCall(id)
	}

	return (
		<header className="headerB chat__header">
			<div className="chat__avatar-wrapper" onClick={openProfileSidebar}>
				{
					user.avatar
					? <img src={`${user.avatar}`} onError={onImageError} alt={user?.name} className="avatar-adm" />
					: <img src={avatarDefault} alt={user?.name} className="avatar-adm" />
				}
			</div>

			<div className="chat__contact-wrapper" onClick={openProfileSidebar}>
				<h2 className="chat__contact-name"> {user?.name}</h2>
				<p className="chat__contact-desc">
					{user.typing ? "печатает..." : "данные контакта"}
				</p>
			</div>
			<div className="chat__actions">
				{clearFile ? <CButton color="danger" onClick={clickClearFile}>Очистить</CButton> : ''}

				<button
					className="chat__action"
					aria-label="Phone"
					onClick={()=>clickToCall(user?.id)} 
					style={{transform: 'rotate(90deg)', color: '#aaabad'}}
				>
					<CIcon icon={cilPhone} size="lg"/>
				</button>
				
				<button
					className="chat__action"
					aria-label="Search"
					onClick={openSearchSidebar}
				>
					<Icon
						id="search"
						className="chat__action-icon chat__action-icon--search"
					/>
				</button>


				{/* <OptionsBtn
					className="chat__action"
					ariaLabel="Menu"
					iconId="menu"
					iconClassName="chat__action-icon"
					onSelected={onSelected}
					options={[
						"Данные о контакте",
						"Очистить переписку",
						"Удалить чат",
					]}
				/> */}

				<button onClick={closeSidebar} style={{marginLeft: '15px', display: showCloseButton ? "block": "none"}}>
					<Icon id="cancel" className="chat-sidebar__header-icon-close" />
				</button>
			</div>
		</header>
	);
};

export default Header;
