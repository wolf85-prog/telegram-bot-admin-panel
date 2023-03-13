import React, { useState } from "react";
import groupAvatar from "./../../../assets/images/women.png";
import media from "./../../../assets/images/placeholder.jpeg";
import Checkbox from "./../../../components/Checkbox";
import Icon from "./../../../components/Icon";
import { newMessage } from './../../../../http/chatAPI';
import { useUsersContext } from "./../../../context/usersContext";

const groups = [
	{
		name: "Group 1",
		avatar: groupAvatar,
		members:
			"Michelle Obama, Sandra Bullock, Kerry Washington, Beyonce Knowles, Kamala Harris, You",
	},
	{
		name: "Group 2",
		avatar: groupAvatar,
		members:
			"Michelle Obama, Sandra Bullock, Kerry Washington, Beyonce Knowles, Kamala Harris, You",
	},
	{
		name: "Group 3",
		avatar: groupAvatar,
		members:
			"Michelle Obama, Sandra Bullock, Kerry Washington, Beyonce Knowles, Kamala Harris, You",
	},
];

const Profile = ({ user }) => {
	const [username, setUsername] = useState("")
	const { users, setUsers } = useUsersContext();

	const changeUsername = () => {
		console.log("изменить иммя пользователя")
	}
	
	const handleChange = (e) => {
		setUsername(e.target.value);
	}
	
	const handleSubmit = (e) => {
		alert('A name was submitted: ' + username);
		e.preventDefault();
	}

	return (
		<div className="profile">
			<div className="profile__section profile__section--personal">
				<div className="profile__avatar-wrapper">
					<img src={'https://ui-avatars.com/api/?background=random&name=' + user?.name} alt={user?.name} className="avatar-adm" />
				</div>
				<form onSubmit={handleSubmit}>
					<label>
					Name:
					<input type="text" value={username} onChange={handleChange} />
					</label>
					<input type="submit" value="Обновить" />
				</form>
				<h2 className="profile__name"> {user.name} </h2> <span onClick={changeUsername}>Изменить</span>
			</div>

			<div className="profile__section profile__section--media">
				<div className="sb profile__heading-wrapper">
					<h2 className="profile__heading"> Медиа, ссылки и документы </h2>
					<button>
						<Icon id="rightArrow" className="profile__heading-icon" />
					</button>
				</div>
				<div className="profile__media-wrapper">
					<img src={media} alt="media" className="profile__media" />
					<img src={media} alt="media" className="profile__media" />
					<img src={media} alt="media" className="profile__media" />
				</div>
			</div>

			<ul className="profile__section profile__section--actions">
				<li className="profile__action">
					<p className="profile__action-left">
						<span className="profile__action-text profile__action-text--top">
							Отключить уведомления
						</span>
					</p>
					<div className="profile__action-right">
						<Checkbox />
					</div>
				</li>
				<li className="profile__action">
					<p className="profile__action-left">
						<span className="profile__action-text profile__action-text--top">
							Отмеченные сообщения
						</span>
					</p>
					<button className="profile__action-right">
						<Icon id="rightArrow" className="profile__heading-icon" />
					</button>
				</li>
				<li className="profile__action">
					<p className="profile__action-left">
						<span className="profile__action-text profile__action-text--top">
							Исчезающие сообщения
						</span>
						<span className="profile__action-text profile__action-text--bottom">
							Off
						</span>
					</p>
					<button className="profile__action-right">
						<Icon id="rightArrow" className="profile__heading-icon" />{" "}
					</button>
				</li>
			</ul>

			<div className="profile__section profile__section--about">
				<div className="sb profile__heading-wrapper">
					<h2 className="profile__heading"> О компании и номер телефона </h2>
				</div>
				<ul>
					<li className="profile__about-item">
						Out here saving the world, one block of code at a time.
					</li>
					<li className="profile__about-item">+23423456789</li>
				</ul>
			</div>

			<div className="profile__section profile__section--groups">
				<div className="profile__heading-wrapper">
					<h2 className="sb profile__heading profile__group-heading">
						<span> Общие группы </span> <span> 3</span>
					</h2>
				</div>
				{groups.map((group) => (
					<div className="profile__group" key={group.name}>
						<div className="profile__group-avatar-wrapper">
							<img src={group.avatar} alt="Group 3" className="avatar" />
						</div>
						<div className="profile__group-content">
							<p className="profile__group-text profile__group-text--top">
								{group.name}
							</p>
							<p className="profile__group-text profile__group-text--bottom">
								{group.members}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="profile__section profile__section--danger">
				<Icon id="block" className="profile__danger-icon" />
				<p className="profile__danger-text"> Заблокировать </p>
			</div>

			<div className="profile__section profile__section--danger">
				<Icon id="thumbsDown" className="profile__danger-icon" />
				<p className="profile__danger-text"> Сообщить о контакте </p>
			</div>

			<div className="profile__section profile__section--danger">
				<Icon id="delete" className="profile__danger-icon" />
				<p className="profile__danger-text"> Удалить чат </p>
			</div>
		</div>
	);
};

export default Profile;
