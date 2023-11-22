import React, {useRef, useState} from "react";
import Icon from "./../../../components/Icon";

import CIcon from '@coreui/icons-react'
import {
  cilPen,
  cilMediaPlay
} from '@coreui/icons'

import useAutosizeTextArea from "./useAutosizeTextArea.ts";
import {Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';

const attachButtons = [
	// { icon: "attachContacts", label: "Choose contact", click: "contact" },
	{ icon: "attachDocument", label: "Choose document", click: "doc" },
	{ icon: "attachImage", label: "Choose image", click: "image" },
];

const ChatInput = ({
	showAttach,
	setShowAttach,
	showEmojis,
	setShowEmojis,
	mess,
	setMess,
	submitNewMessage,
	onFileChange,
	setSelectedElement,
}) => {

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

	return (
		<div className="chat__input-wrapper">
			{showEmojis && (
				<button aria-label="Close emojis" onClick={() => setShowEmojis(false)}>
					<Icon id="cancel" className="chat__input-icon" />
				</button>
			)}
			<button aria-label="Emojis" onClick={() => setShowEmojis(true)}>
				<Icon
					id="smiley"
					className={`chat__input-icon ${
						showEmojis ? "chat__input-icon--highlight" : ""
					}`}
				/>
			</button>
			{showEmojis && (
				<>
					<button aria-label="Choose GIF">
						<Icon id="gif" className="chat__input-icon" />
					</button>
					<button aria-label="Choose sticker">
						<Icon id="sticker" className="chat__input-icon" />
					</button>
				</>
			)}
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
					{attachButtons.map((btn) => (
						<button
							className="chat__attach-btn"
							aria-label={btn.label}
							key={btn.label}
						>
							<label htmlFor='fileInput'>
								<Icon id={btn.icon} className="chat__attach-icon" />
							</label>
							<input
								type="file"
								id="fileInput"
								name="photo"
								style={{ display: "none" }}
								onChange={(e) => onFileChange(e)}
							/>							
							
						</button>
					))}
				</div>

			</div>

			<div style={{marginLeft: '8px', marginRight: '8px'}}>
				{/* <Dropdown onSelect={change}>
					<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">											
					</Dropdown.Toggle>
					<Dropdown.Menu as={CustomMenu}>
					<Dropdown.Item eventKey="">Удалить сообщение</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown> */}

				<DropdownButton
					onSelect={change}
					as={ButtonGroup}
					id={`dropdown-button-drop-up`}
					drop='up'
					variant="secondary"
					title=''
					// 
				>
					<Dropdown.Item class="dropdown-menu" eventKey="0">Стандартный ответ</Dropdown.Item>
					<Dropdown.Item eventKey="1">Паспорт</Dropdown.Item>
					<Dropdown.Item eventKey="2">Кнопка с номером</Dropdown.Item>
					<Dropdown.Item eventKey="3">Запас</Dropdown.Item>
					<Dropdown.Item eventKey="4">Офис U.L.E.Y</Dropdown.Item>
					<Dropdown.Item eventKey="5">Оплата / смета</Dropdown.Item>
					<Dropdown.Item eventKey="6">Заявка отклонена</Dropdown.Item>
					<Dropdown.Item eventKey="7">Заявка одобрена</Dropdown.Item>
					<Dropdown.Item eventKey="8">Запрос ключевых данных</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item eventKey="9"></Dropdown.Item>
				</DropdownButton>
				{/* <CFormSelect 
						style={{marginTop: '10px', marginBottom: '10px',  display: "block"}}
                        aria-label="Default select example"
                        options={scenarios}  
						// value={scenari}
						selectedElement={selectedElement}
                    	setSelectedElement={setSelectedElement}
                        onChange={onSelectChange}
				/> */}
				{/* <button className="profile__action-right" style={{padding: '6px'}}>
					<CIcon icon={cilMediaPlay} 
					<Icon id="downArrow" style={{color: 'white'}}/>{" "} 
				</button> */}
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
