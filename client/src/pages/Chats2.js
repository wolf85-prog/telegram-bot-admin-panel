import React, { Suspense, useEffect, useState, useContext } from 'react'
import { CContainer, CSpinner, CNav, CNavLink, CNavItem } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeaderChat } from '../components/index'

import "./../chat-app-new/App.css";
import "./../chat-app-new/assets/css/index.css";

// import Loader from "../chat-app-new/components/Loader";
import Home from "../chat-app-new/pages/Home";
import Sidebar from "../chat-app-new/components/Sidebar";
import Chat from "../chat-app-new/pages/Chat";
import { useUsersContext } from "./../chat-app-new/context/usersContext"

import { AccountContext } from "../chat-app-new/context/AccountProvider";
import { getContacts, getConversation, getMessages } from '../http/chatAPI'

const Chats2 = () => {

  	const { person } = useContext(AccountContext); 

	useEffect(() => {
		document.body.classList.add("dark-theme");
	});   


  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeaderChat />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>                 
                  
                  <div className="app">
                    <p className="app__mobile-message"> Доступно только на компьютере 😊. </p> 
                    <div className="app-content">
                      <Sidebar />
                      {Object.keys(person).length ? <Chat /> : <Home /> }
                    </div>
                  </div>

                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Chats2
