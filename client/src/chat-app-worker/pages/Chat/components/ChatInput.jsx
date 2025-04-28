import React, {useRef, useState} from "react";
import Icon from "./../../../components/Icon";
import EmojiPicker from 'emoji-picker-react';

import CIcon from '@coreui/icons-react'
import {
  cilPen,
  cilMediaPlay
} from '@coreui/icons'

import useAutosizeTextArea from "./useAutosizeTextArea.ts";
import {Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBContainer } from 'mdb-react-ui-kit';

const ChatInput = ({
	showAttach,
	setShowAttach,
	showEmojis,
	setShowEmojis,
	showPicker,
	setShowPicker,
	chosenEmoji,
	mess,
	setMess,
	submitNewMessage,
	onFileChange,
	setSelectedElement,
}) => {

	const [showSave, setShowSave] = useState(false);
	const [showSave2, setShowSave2] = useState(false);
	const [showSave3, setShowSave3] = useState(false);
	const [showSave4, setShowSave4] = useState(false);
	const [showSave5, setShowSave5] = useState(false);
	const [showSave6, setShowSave6] = useState(false);
	const [showSave7, setShowSave7] = useState(false);
	const [showSave8, setShowSave8] = useState(false);
	const [showSave9, setShowSave9] = useState(false);
	const [showSave10, setShowSave10] = useState(false);
	const [showSave11, setShowSave11] = useState(false);
	
	const textAreaRef = useRef(null);
	useAutosizeTextArea(textAreaRef.current, mess);

	const handleChange = (e) => {
		console.log(e.target.value)
		setMess(e.target.value)
	};

	const detectEnterPress = (e) => {
		if ((e.key === "Enter" && !e.shiftKey) || (e.keyCode === 13 && !e.shiftKey) ) {
			submitNewMessage();
		} 
	};


	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<button
			aria-label="Message options"
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
			<Icon id="downArrow"/>											
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
					!value || child.props.children?.toLowerCase().startsWith(value),
				)}
			  </ul>
			</div>
		  );
		},
	);

	CustomMenu.displayName = CustomMenu

	const change = async (eventkey) => {
		//alert(`you chosen: ${eventkey}`)
		setSelectedElement(eventkey)
	}

	const clickEmojis = () => {
		setShowPicker(true)
		setShowEmojis(true)
	}

	const clickClose = () => {
		setShowEmojis(false)
		setShowPicker(false)
	}

	return (
		<div className="chat__input-wrapper">
			{showEmojis && (
				<button aria-label="Close emojis" onClick={clickClose}>
					<Icon id="cancel" className="chat__input-icon" />
				</button>
			)}
			<button aria-label="Emojis" onClick={clickEmojis}>
				<Icon
					id="smiley"
					className={`chat__input-icon ${
						showEmojis ? "chat__input-icon--highlight" : ""
					}`}
				/>
			</button>
			{/* {showEmojis && (
				<>
					<button aria-label="Choose GIF">
						<Icon id="gif" className="chat__input-icon" />
					</button>
					<button aria-label="Choose sticker">
						<Icon id="sticker" className="chat__input-icon" />
					</button>
				</>
			)} */}
			<div className="pos-rel">
				<button aria-label="Attach" onClick={() => setShowAttach(!showAttach)}>
					<Icon
						id="attach"
						className={`chat__input-icon ${
							showAttach ? "chat__input-icon--pressed" : ""
						}`}
					/>
				</button>

				<div className={`chat__attach ${showAttach ? "chat__attach--active" : ""}`}>
						<button
							className="chat__attach-btn"
							aria-label="Choose document"
							key="Choose document"
							// onClick={()=>console.log("Choose document")}
						>
							<label htmlFor='fileInput2'>
								<Icon id="attachDocument" className="chat__attach-icon" />
							</label>
							<input
								type="file"
								id="fileInput2"
								name="photo"
								style={{ display: "none" }}
								onChange={(e)=>onFileChange(e, 'doc')}
							/>							
							
						</button>

						<button
							className="chat__attach-btn"
							aria-label="attachImage"
							key="attachImage"
							// onClick={()=>console.log("Choose image")}
						>
							<label htmlFor='fileInput'>
								<Icon id="attachImage" className="chat__attach-icon" />
							</label>
							<input
								type="file"
								id="fileInput"
								name="photo"
								style={{ display: "none" }}
								onChange={(e)=>onFileChange(e, 'image')}
							/>							
							
						</button>
				</div>


			</div>

			<div style={{marginLeft: '8px', marginRight: '8px'}}>
			

				<DropdownButton
					onSelect={change}
					as={ButtonGroup}
					id={`dropdown-button-drop-up`}
					drop='up'
					variant="secondary"
					title=''
					// 
				>
					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave(true)} onMouseOut={()=>setShowSave(false)}>
						Правила 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave ? 'block' : 'none'}}>
							<Dropdown.Item>
								Правила работы
							</Dropdown.Item>
							<Dropdown.Item>
								Первый проект
							</Dropdown.Item>
							<Dropdown.Item>
								Форс-мажор
							</Dropdown.Item>
							<Dropdown.Item>
								Штраф
							</Dropdown.Item>
							<Dropdown.Item>
								Нестандартная ситуация
							</Dropdown.Item>
							<Dropdown.Item>
								Регламент начала
							</Dropdown.Item>
							<Dropdown.Item>
								Регламент окончания
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave2(true)} onMouseOut={()=>setShowSave2(false)}>
						Условия 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave2 ? 'block' : 'none'}}>
							<Dropdown.Item>
								Самозанятость
							</Dropdown.Item>
							<Dropdown.Item>
								Договор
							</Dropdown.Item>
							<Dropdown.Item>
							Оплата №1
							</Dropdown.Item>
							<Dropdown.Item>
							Оплата №2
							</Dropdown.Item>
							<Dropdown.Item>
							Акция и промокод
							</Dropdown.Item>
							<Dropdown.Item>
							Такси
							</Dropdown.Item>
							<Dropdown.Item>
							Проекты ночью №1
							</Dropdown.Item>
							<Dropdown.Item>
							Проекты ночью №2
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave3(true)} onMouseOut={()=>setShowSave3(false)}>
						Информация 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave3 ? 'block' : 'none'}}>
							<Dropdown.Item>
								Постер [инструкция]
							</Dropdown.Item>
							<Dropdown.Item>
							Новая специальность [инструкция]
							</Dropdown.Item>
							<Dropdown.Item>
							Новая специальность [инструкция]
							</Dropdown.Item>
							<Dropdown.Item>
							Следи за балансом 24/7
							</Dropdown.Item>
							<Dropdown.Item>
							Ставка
							</Dropdown.Item>
							<Dropdown.Item>
							Новости VK | Telegram
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave4(true)} onMouseOut={()=>setShowSave4(false)}>
						Проект 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave4 ? 'block' : 'none'}}>
							<Dropdown.Item>
								Анбординг
							</Dropdown.Item>
							<Dropdown.Item>
								Аккредитация ФИО и номер телефона
							</Dropdown.Item>
							<Dropdown.Item>
								Аккредитация на проект
							</Dropdown.Item>
							<Dropdown.Item>
								Анкета для аккредитации
							</Dropdown.Item>
							<Dropdown.Item>
								Заявка принята
							</Dropdown.Item>
							<Dropdown.Item>
								Ваша кандидатура на рассмотрении
							</Dropdown.Item>
							<Dropdown.Item>
								Заявка отклонена
							</Dropdown.Item>
							<Dropdown.Item>
								Запасной состав
							</Dropdown.Item>
							<Dropdown.Item>
								Ссылка на чат
							</Dropdown.Item>
							<Dropdown.Item>
								Обработка претендентов
							</Dropdown.Item>

						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave5(true)} onMouseOut={()=>setShowSave5(false)}>
						Ответ 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave5 ? 'block' : 'none'}}>
							<Dropdown.Item>
							Стандартный ответ
							</Dropdown.Item>
							<Dropdown.Item>
							Диалог по телефону
							</Dropdown.Item>
							<Dropdown.Item>
							Повторная рассылка
							</Dropdown.Item>
							<Dropdown.Item>
							Все предложения работы
							</Dropdown.Item>
							<Dropdown.Item>
							Положительный ответ
							</Dropdown.Item>
							<Dropdown.Item>
							Обратная связь по работе сервиса
							</Dropdown.Item>
							<Dropdown.Item>
							Обновление системы / ошибки
							</Dropdown.Item>
							<Dropdown.Item>
							Обработка претендентов
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave6(true)} onMouseOut={()=>setShowSave6(false)}>
						Быстрый ответ 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave6 ? 'block' : 'none'}}>
							<Dropdown.Item>
								Принято, спасибо
							</Dropdown.Item>
							<Dropdown.Item>
							Информация получена, ваш вопрос уже в работе
							</Dropdown.Item>
							<Dropdown.Item>
							Информация получена, мы уже работаем в этом направлении
							</Dropdown.Item>
							<Dropdown.Item>
							Информация зафиксирована, мы уже работаем над этим
							</Dropdown.Item>
							<Dropdown.Item>
							Спасибо за информацию, сообщим вам, как только все будет готово
							</Dropdown.Item>
							<Dropdown.Item>
							Мы работаем над вашим запросом и уже скоро предоставим вам результаты
							</Dropdown.Item>
							<Dropdown.Item>
							Информация принята, постараемся ответить на ваш вопрос в ближайшее время
							</Dropdown.Item>
							<Dropdown.Item>
							На данный момент мы изучаем ваш вопрос и постараемся вернуться к вам с ответом как можно скорее
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave7(true)} onMouseOut={()=>setShowSave7(false)}>
						Контакты 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave7 ? 'block' : 'none'}}>
							<Dropdown.Item>
							Контакты
							</Dropdown.Item>
							<Dropdown.Item>
							Офис «U.L.E.Y»
							</Dropdown.Item>
							<Dropdown.Item>
							Чат Office
							</Dropdown.Item>
							<Dropdown.Item>
							Реквизиты №1
							</Dropdown.Item>
							<Dropdown.Item>
							Реквизиты №2
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave8(true)} onMouseOut={()=>setShowSave8(false)}>
						Renthub | Плашка 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave8 ? 'block' : 'none'}}>
							<Dropdown.Item>
							Приветствие
							</Dropdown.Item>
							<Dropdown.Item>
							Дорогие коллеги
							</Dropdown.Item>
							<Dropdown.Item>
							Новости
							</Dropdown.Item>
							<Dropdown.Item>
							СПИСОК ПАСПОРТНЫХ ДАННЫХ
							</Dropdown.Item>
							<Dropdown.Item>
							Инструкция подачи заявки
							</Dropdown.Item>
							<Dropdown.Item>
							Продолжаем поиски
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave9(true)} onMouseOut={()=>setShowSave9(false)}>
						Workhub | Текст 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave9 ? 'block' : 'none'}}>
							<Dropdown.Item>
							Заявка принята
							</Dropdown.Item>
							<Dropdown.Item>
							Данный вопрос мы настоятельно рекомендуем вам обсудить с нашим менеджером по телефону
							</Dropdown.Item>
							<Dropdown.Item>
							Готовы выйти на проект?
							</Dropdown.Item>
							<Dropdown.Item>
							Отказ???
							</Dropdown.Item>
							<Dropdown.Item>
							На проект нужны специалисты
							</Dropdown.Item>
							<Dropdown.Item>
							Аккредитация ФИО и номер телефона
							</Dropdown.Item>
							<Dropdown.Item>
							Ссылка на чат ?
							</Dropdown.Item>
							<Dropdown.Item>
							Рассылка/Вакансия закрыта
							</Dropdown.Item>
							<Dropdown.Item>
							Не получаешь рассылку?
							</Dropdown.Item>
							<Dropdown.Item>
							На проект нужны специалисты
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave10(true)} onMouseOut={()=>setShowSave10(false)}>
						Первый проект 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave10 ? 'block' : 'none'}}>
							<Dropdown.Item>
								Submenu item 1
							</Dropdown.Item>
							<Dropdown.Item>
								Submenu item 2
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave11(true)} onMouseOut={()=>setShowSave11(false)}>
						Постер 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave11 ? 'block' : 'none'}}>
							<Dropdown.Item>
								Submenu item 1
							</Dropdown.Item>
							<Dropdown.Item>
								Submenu item 2
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>



				

					{/* <Dropdown.Item eventKey="2">Информация</Dropdown.Item> */}

					{/* <Dropdown.Item eventKey="3">Проект</Dropdown.Item>

					<Dropdown.Item eventKey="4">Ответ</Dropdown.Item>

					<Dropdown.Item eventKey="5">Быстрый ответ</Dropdown.Item>

					<Dropdown.Item eventKey="6">Контакты</Dropdown.Item>

					<Dropdown.Item eventKey="7">Renthub | Плашка</Dropdown.Item>

					<Dropdown.Item eventKey="8">Workhub | Текст</Dropdown.Item>

					<Dropdown.Divider />
					<Dropdown.Item eventKey="9">Первый проект</Dropdown.Item>

					<Dropdown.Item eventKey="10">Постер</Dropdown.Item> */}
				</DropdownButton>

			</div>
			
			<textarea
				className="chat__input"
				placeholder="Введите сообщение"
				value={mess} 
				onChange={handleChange} 
				ref={textAreaRef}			
				rows={1}
			/>

			<button aria-label="Send message" onClick={submitNewMessage}>
				<Icon id="send" className="chat__input-icon" />
			</button>
		</div>
	);
};

export default ChatInput;
