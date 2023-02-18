import React, { useEffect, useState, useContext } from "react";
import "./../chat-app-new/App.css";
import "./../chat-app-new/index.css";
import "./../chat-app-new/assets/css/index.css";
import Loader from "./../chat-app-new/components/Loader";
import Home from "./../chat-app-new/pages/Home";
import Sidebar from "./../chat-app-new/components/Sidebar";
import Chat from "./../chat-app-new/pages/Chat";

import { AccountContext } from "../chat-app/context/AccountProvider";

const userPrefersDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;

const Chat_new = () => {
    const [appLoaded, setAppLoaded] = useState(false);
	const [startLoadProgress, setStartLoadProgress] = useState(false);

    const { person } = useContext(AccountContext); 

	useEffect(() => {
		if (userPrefersDark) document.body.classList.add("dark-theme");
		stopLoad();
	}, []);

	const stopLoad = () => {
		setStartLoadProgress(true);
		setTimeout(() => setAppLoaded(true), 3000);
	};

	if (!appLoaded) return <Loader done={startLoadProgress} />;

	return (
		<div className="app">
			<p className="app__mobile-message"> Only available on desktop 😊. </p>
			{/* <Router> */}
				<div className="app-content">
					<Sidebar />
					{/* <Routes>
						<Route path="/chat/:id" component={Chat} />
						<Route component={Home} />
					</Routes> */}
                    {/* <Home/> */}
                    {Object.keys(person).length ? <Chat /> : <Home /> }
				</div>
			{/* </Router> */}
		</div>
	);
}

export default Chat_new
