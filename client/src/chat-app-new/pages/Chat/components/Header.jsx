import React from "react";
import Icon from "./../../../components/Icon";
import OptionsBtn from "./../../../components/OptionsButton";


const Header = ({ user, openProfileSidebar, openSearchSidebar }) => {
	return (
		<header className="headerB chat__header">
			<div className="chat__avatar-wrapper" onClick={openProfileSidebar}>
				<img src={'https://ui-avatars.com/api/?background=random&name=' + user?.name} alt={user?.name} className="avatar-adm" />
			</div>

			<div className="chat__contact-wrapper" onClick={openProfileSidebar}>
				<h2 className="chat__contact-name"> {user?.name}</h2>
				<p className="chat__contact-desc">
					{user.typing ? "typing..." : "online"}
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
					options={[
						"Данные о контакте",
						"Выбрать сообщения",
						"Отключить уведомления",
						"Очистить переписку",
						"Удалить чат",
					]}
				/>
			</div>
		</header>
	);
};

export default Header;
