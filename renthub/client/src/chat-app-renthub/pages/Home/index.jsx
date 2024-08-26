import React, { useState } from "react";
import "./styles/main.css";
import Icon from "./../../components/Icon";
import introImgLight from "./../../assets/images/home_chat.jpeg";
// import introImgDark from "./../../assets/images/intro-connection-dark.jpg";
import introImgDark from "./../../assets/images/home_chat.jpeg";

const Home = () => {
	const darkTheme = document.body.classList.contains("dark-theme");

	return (
		<div className="home">
			{/* <div className="home__img-wrapper">
				<img
					src={darkTheme ? introImgDark : introImgLight}
					alt=""
					className="home__img"
				/>
			</div> */}

		</div>
	);
};

export default Home;
