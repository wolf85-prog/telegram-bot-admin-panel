import React, {useRef} from "react";
import Icon from "./../../../components/Icon";

import useAutosizeTextArea from "./useAutosizeTextArea.ts";

const attachButtons = [
	{ icon: "attachContacts", label: "Choose contact", click: "contact" },
	{ icon: "attachDocument", label: "Choose document", click: "doc" },
	{ icon: "attachImage", label: "Choose image", click: "image" },
];

const ChatInput = ({
	showAttach,
	setShowAttach,
	showEmojis,
	setShowEmojis,
	value,
	setValue,
	submitNewMessage,
	onFileChange,
}) => {

	const textAreaRef = useRef(null);

	//useAutosizeTextArea(textAreaRef.current, value);

	const detectEnterPress = (e) => {
		if ((e.key === "Enter" && !e.shiftKey) || (e.keyCode === 13 && !e.shiftKey) ) {
			submitNewMessage();
		} 
	};

	const handleChange = (e) => {
		setValue(e.target.value)
	};

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

				<div
					className={`chat__attach ${showAttach ? "chat__attach--active" : ""}`}
				>
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
								name="filedata"
								style={{ display: "none" }}
								onChange={(e) => onFileChange(e)}
							/>							
							
						</button>
					))}
				</div>
			</div>
			<textarea
				className="chat__input"
				placeholder="Введите сообщение"
				value={value} //{newMessage}
				onChange={handleChange} //setNewMessage(e.target.value)}
				// onKeyDown={detectEnterPress}
				ref={textAreaRef}
				rows={1}
			/>
			{value ? (
				<button aria-label="Send message" onClick={submitNewMessage}>
					<Icon id="send" className="chat__input-icon" />
				</button>
			) : (
				<button aria-label="Record voice note">
					<Icon id="microphone" className="chat__input-icon" />
				</button>
			)}
		</div>
	);
};

export default ChatInput;
