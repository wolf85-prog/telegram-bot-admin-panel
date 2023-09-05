import React, { useState, useContext, useEffect } from "react";
import media from "./../../../../chat-app-new/assets/images/placeholder.jpeg";
import Checkbox from "./../../../components/Checkbox";
import Icon from "./../../../components/Icon";
import { editContact, uploadFile, editContactAvatar } from './../../../../http/chatAPI';
import { useUsersContext } from "../../../../chat-app-new/context/usersContext";
import { AccountContext } from './../../../../chat-app-new/context/AccountProvider';
import defaultAvatar from "./../../../../chat-app-new/assets/images/no-avatar.png";

const Profile = ({ user }) => {
	const [username, setUsername] = useState("")
	const [form, setForm] = useState(false)
	const { addNewName, addNewAvatar } = useUsersContext();
	const { setPerson } = useContext(AccountContext);
	const [img, setImg] = useState(null)
	const [showEdit, setShowEdit] = useState(false)
	const input = React.useRef();

	const host = process.env.REACT_APP_HOST

	useEffect(() => {
		setImg(`${host}${user.avatar}`)
	}, [user]);
	

	//кнопка Изменить
	const changeUsername = () => {
		setUsername(user.name);  
		setForm(true)
	}
	
	const handleChange = (e) => {
		e.preventDefault();
		setUsername(e.target.value);
	}

	const getUser = async () => {
        setPerson({
            name: user.name, 
            id: user.chatId, 
			avatar: user.avatar
        });
    }
	
	//сохранить новое имя
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newName = {
			username, 
		}
		//сохранить в БД
		await editContact(newName, user.chatId)

		//сохранить в контексте
		addNewName(user.chatId, username);
		getUser()

		setForm(false)
	}

	const handleAvatar = async (e) => {
		e.preventDefault();
		setImg(e.target.files[0])
		setShowEdit(true)
	}

	//сохранить новый аватар
	const sendFile = React.useCallback(async () => {
		try {
			const data = new FormData();
            data.append("photo", img);

            let response = await uploadFile(data);
			//console.log("response: ", response.data)
			//setAvatar(response.data.path)

			const newAvatar = {
				avatar: response.data.path.split('.team')[1], 
			}

			//сохранить в БД
			await editContactAvatar(newAvatar, user.chatId)
			
			//сохранить в контексте
			addNewAvatar(user.chatId, response.data.path.split('.team')[1]);

			//получить данные из контекста
			getUser()

			setShowEdit(false)

		} catch (error) {
			
		}
	}, [img])

	return (
		<div className="profile">
			<div className="profile__section profile__section--personal">
				<div className="profile__avatar-wrapper upload">
					{
						user.avatar
							? <img src={`${host}${user.avatar}`} alt={user?.name} className="avatar-adm" />
							: <img src={defaultAvatar} alt={user?.name} className="avatar-adm" />
					}
					
					
					<div className="round_adm">
						<input type="file" name="photo" onChange={handleAvatar}/>
						<i className = "fa fa-camera" style={{color: '#fff'}}></i>
					</div>						
				</div>

				{
					showEdit 
					? <button className="btn_save" onClick={sendFile}>Сохранить</button>
					: ""
				}

				

				<p style={{ color: '#d5d5d5'}}>{user.chatId}</p>
				{
					form ? <form onSubmit={handleSubmit}>
								<input 
									type="text" 
									value={username} 
									onChange={handleChange} 
									ref={input}
        							onFocus={() => input.current.select()}
									style={{borderBottom: '1px solid #0e892e', color: '#d5d5d5'}}
								/>
								<input type="submit" value="Сохранить" style={{ color: '#6a6a6a'}} />
							</form>
							: <h2 className="profile__name"> {user.name} </h2> 
				}
				
				{
					!form ? <span onClick={changeUsername} style={{cursor: 'pointer', color: '#6a6a6a'}}>Редактировать</span>
					: ""
				}
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
						Несколько слов о компании...
					</li>
					<li className="profile__about-item">+7 123-12-12</li>
				</ul>
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
