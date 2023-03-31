import React from "react";
import "./styles/main.css";
import Icon from "./../../components/Icon";
import introImgLight from "./../../assets/images/home_chat.jpeg";
// import introImgDark from "./../../assets/images/intro-connection-dark.jpg";
import introImgDark from "./../../assets/images/home_chat.jpeg";

const Home = () => {
	const darkTheme = document.body.classList.contains("dark-theme");

	return (
		<div className="home">
			<div className="home__img-wrapper">
				<img
					src={darkTheme ? introImgDark : introImgLight}
					alt=""
					className="home__img"
				/>
			</div>

			<h1 className="home__title"> Добро пожаловать <br/>
			в мессенджер чат-бота U.L.E.Y </h1>
			<p className="home__text">
				Выберите, кому хотели бы написать сообщение.
			</p>
			<p className="home__text">
				<Icon id="laptop" className="home__icon" />
				<span>
					Написать разработчику.{" "}
					<a
						href="mailto:seregaland@yandex.ru"
						target="_blank"
						rel="noreferrer"
						className="home__link"
					>
						{" "}
						Cюда
					</a>
					.
				</span>
			</p>
		</div>
	);
};

export default Home;
