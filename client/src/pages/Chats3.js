import React, { Suspense, useEffect, useContext } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeaderChat } from '../components/index'

import "./../chat-app-new/App.css";
import "./../chat-app-new/assets/css/index.css";


import { AccountContext } from "../chat-app-new/context/AccountProvider";

const Chats3 = () => {  

  const { personR } = useContext(AccountContext); 

  useEffect(() => {
		document.body.classList.add("dark-theme");
	}); 

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
      <AppHeaderChat />
        <div className="body flex-grow-1 px-3" style={{textAlign: 'center'}}>

          <iframe 
            width="950" 
            style={{height: '90vh'}}
            src="https://proj.uley.team:3002/chatwork" 
            title="description" 
            //onLoad={() => setLoadingIframe(false)} 
            loading = "lazy">
          </iframe>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Chats3
