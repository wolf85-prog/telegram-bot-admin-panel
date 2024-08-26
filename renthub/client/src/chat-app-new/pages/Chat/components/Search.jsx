import Icon from "./../../../components/Icon";
import React from "react";

const Search = () => {
	return (
		<>
			<div className="search-wrapper">
				<div className="search-icons">
					<Icon id="search" className="search-icon" />
					<button className="search__back-btn">
						<Icon id="back" />
					</button>
				</div>
				<input className="search" placeholder="Поиск..." />
			</div>
			<div className="chat-sidebar__search-results">
				<p> Поиск сообщений в чате</p>
			</div>
		</>
	);
};

export default Search;
