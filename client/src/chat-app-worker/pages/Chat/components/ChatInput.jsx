import React, {useRef, useState, useEffect} from "react";
import Icon from "./../../../components/Icon";
import EmojiPicker from 'emoji-picker-react';

import CIcon from '@coreui/icons-react'
import {
  cilPen,
  cilMediaPlay
} from '@coreui/icons'

import useAutosizeTextArea from "./useAutosizeTextArea.ts";
import {Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';

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
		//console.log(e.target.value)
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
		console.log(eventkey)
		setSelectedElement(eventkey)
	}


	// useEffect(()=> {

	// }, [selectedElement])

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
					//onSelect={change}
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
							<Dropdown.Item onClick={()=>change(1)}>
								Правила работы
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(2)}>
								Первый проект
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(3)}>
								Форс-мажор
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(4)}>
								Штраф
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(5)}>
								Нестандартная ситуация
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(6)}>
								Регламент начала
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(7)}>
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
							<Dropdown.Item onClick={()=>change(8)}>
								Самозанятость
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(9)}>
								Договор
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(10)}>
							Оплата №1
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(11)}>
							Оплата №2
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(12)}>
							Акция и промокод
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(13)}>
							Такси
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(14)}>
							Проекты ночью №1
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(15)}>
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
							<Dropdown.Item onClick={()=>change(16)}>
								Постер [инструкция]
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(17)}>
							Новая специальность [инструкция]
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(18)}>
							Новая специальность [инструкция]
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(19)}>
							Следи за балансом 24/7
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(20)}>
							Ставка
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(21)}>
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
							<Dropdown.Item onClick={()=>change(22)}>
								Анбординг
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(23)}>
								Аккредитация ФИО и номер телефона
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(24)}>
								Аккредитация на проект
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(25)}>
								Анкета для аккредитации
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(26)}>
								Заявка принята
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(27)}>
								Ваша кандидатура на рассмотрении
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(28)}>
								Заявка отклонена
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(29)}>
								Запасной состав
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(30)}>
								Ссылка на чат
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(31)}>
								Обработка претендентов
							</Dropdown.Item>

						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave5(true)} onMouseOut={()=>setShowSave5(false)}>
						Ответ 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave5 ? 'block' : 'none', top: '0px'}}>
							<Dropdown.Item onClick={()=>change(32)}>
							Стандартный ответ
							</Dropdown.Item >
							<Dropdown.Item onClick={()=>change(33)}>
							Диалог по телефону
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(34)}>
							Повторная рассылка
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(35)}>
							Все предложения работы
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(36)}>
							Положительный ответ
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(37)}>
							Обратная связь по работе сервиса
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(38)}>
							Обновление системы / ошибки
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(39)}>
							Обработка претендентов
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave6(true)} onMouseOut={()=>setShowSave6(false)}>
						Быстрый ответ 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave6 ? 'block' : 'none', top: '0px'}}>
							<Dropdown.Item onClick={()=>change(40)}>
								Принято, спасибо
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(41)}>
							Информация получена, ваш вопрос уже в работе
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(42)}>
							Информация получена, мы уже работаем в этом направлении
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(43)}>
							Информация зафиксирована, мы уже работаем над этим
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(44)}>
							Спасибо за информацию, сообщим вам, как только все будет готово
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(45)}>
							Мы работаем над вашим запросом и уже скоро предоставим вам результаты
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(46)}>
							Информация принята, постараемся ответить на ваш вопрос в ближайшее время
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(47)}>
							На данный момент мы изучаем ваш вопрос и постараемся вернуться к вам с ответом как можно скорее
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

					<Dropdown.Item class="dropdown-menu" onMouseOver={()=>setShowSave7(true)} onMouseOut={()=>setShowSave7(false)} style={{position: 'relative'}}>
						Контакты 
						<span style={{position: 'absolute', right: '15px'}}>
							&raquo;
						</span>
						<ul className="dropdown-menu dropdown-submenu" style={{display: showSave7 ? 'block' : 'none', top: '0px'}}>
							<Dropdown.Item onClick={()=>change(48)}>
							Контакты
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(49)}>
							Офис «U.L.E.Y»
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(50)}>
							Чат Office
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(51)}>
							Реквизиты №1
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(52)}>
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
							<Dropdown.Item onClick={()=>change(53)}>
							Приветствие
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(54)}>
							Дорогие коллеги
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(55)}>
							Новости
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(56)}>
							СПИСОК ПАСПОРТНЫХ ДАННЫХ
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(57)}>
							Инструкция подачи заявки
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(58)}>
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
							<Dropdown.Item onClick={()=>change(59)}>
							Заявка принята
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(60)}>
							Данный вопрос мы настоятельно рекомендуем вам обсудить с нашим менеджером по телефону
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(61)}>
							Готовы выйти на проект?
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(62)}>
							Отказ???
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(63)}>
							На проект нужны специалисты
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(64)}>
							Аккредитация ФИО и номер телефона
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(65)}>
							Ссылка на чат ?
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(66)}>
							Рассылка/Вакансия закрыта
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(67)}>
							Не получаешь рассылку?
							</Dropdown.Item>
							<Dropdown.Item onClick={()=>change(68)}>
							На проект нужны специалисты
							</Dropdown.Item>
						</ul>						
					</Dropdown.Item>

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
