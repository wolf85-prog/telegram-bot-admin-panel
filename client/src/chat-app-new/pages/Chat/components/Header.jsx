import React from "react";
import Icon from "./../../../components/Icon";
import OptionsBtn from "./../../../components/OptionsButton";
import avatarDefault from "./../../../assets/images/no-avatar.png";

const Header = ({ user, openProfileSidebar, openSearchSidebar }) => {

	const host = process.env.REACT_APP_API_URL

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

	return (
		<header className="headerB chat__header">
			<div className="chat__avatar-wrapper" onClick={openProfileSidebar}>
				{
					user.avatar
					? <img src={`${host}/${user.avatar}`} alt={user?.name} className="avatar-adm" />
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
				<OptionsBtn
					className="chat__action"
					ariaLabel="Menu"
					iconId="menu"
					iconClassName="chat__action-icon"
					onSelected={onSelected}
					options={[
						"Данные о контакте",
						// "Выбрать сообщения",
						// "Отключить уведомления",
						"Очистить переписку",
						"Удалить чат",
					]}
				/>
			</div>
		</header>
	);
};

export default Header;
