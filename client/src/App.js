import React, { Suspense, useContext, useEffect, useState } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import AppRouter from './AppRouter';
import './scss/style.scss'
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import {Context} from "./index";
import Loader from './components/Loader/Loader';
import Login from './views/pages/login/Login';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setLoading(true)
      check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
      }).finally(() => setLoading(false))

    }, [])

    if (loading) {
      return <Loader/>
    }
    
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <AppRouter /> 
        </Suspense>              
      </BrowserRouter>     
    )
  //}
})

export default App
