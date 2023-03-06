import React, { useEffect, useState, useContext, Suspense } from "react";
import "./../chat-app-new/App.css";
import "./../chat-app-new/index.css";
import "./../chat-app-new/assets/css/index.css";
//import Loader from "../chat-app-new/components/Loader";
//import Home from "../chat-app-new/pages/Home";
//import Sidebar from "../chat-app-new/components/Sidebar";
//import Chat from "../chat-app-new/pages/Chat";

import { AccountContext } from "../chat-app-new/context/AccountProvider";

const Sidebar = React.lazy(() => import('../chat-app-new/components/Sidebar'))
const Home = React.lazy(() => import('../chat-app-new/pages/Home'))
const Loader = React.lazy(() => import('../chat-app-new/components/Loader'))
const Chat = React.lazy(() => import('../chat-app-new/pages/Chat'))

const userPrefersDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
)

const Chats = () => {
    const [appLoaded, setAppLoaded] = useState(false);
	const [startLoadProgress, setStartLoadProgress] = useState(false);

    const { person } = useContext(AccountContext); 

	useEffect(() => {
		if (userPrefersDark) document.body.classList.add("dark-theme");
		stopLoad();
	});   

	const stopLoad = () => {
		setStartLoadProgress(true);
		setTimeout(() => setAppLoaded(true), 3000);
	};       

	if (!appLoaded) return <Loader done={startLoadProgress} />;

	return (
		<div className="app">
			<p className="app__mobile-message"> Доступно только на компьютере 😊. </p>
			<div className="app-content">
				<Suspense fallback={loading}>
					<Sidebar />
                	{Object.keys(person).length ? <Chat /> : <Home /> }
				</Suspense>
			</div>
		</div>
	);
}

export default Chats
