import React, { Suspense, useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter';
import './scss/style.scss'
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import { AccountContext } from "./chat-app-new/context/AccountProvider";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const App = observer(() => {
    const { isAuth, setAccount, setIsAuth } = useContext(AccountContext);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      check().then(data => {
        console.log("data: ", data)
        console.log("isAuth: ", isAuth)
        setAccount(data)
        setIsAuth(true)
      })

    }, [])
    
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <AppRouter isLogin={isAuth}/> 
        </Suspense>              
      </BrowserRouter>     
    )
  //}
})

export default App
