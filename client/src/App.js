import React, { Suspense, useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter';
import './scss/style.scss'
import './App.css'
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import {Context} from "./index";
import Loader from './components/Loader/Loader';

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
      return <div className='bg-uley'><Loader/></div>
    }
    
    return (
      <BrowserRouter>
        <Suspense fallback={<Loader/>}>
          <AppRouter /> 
        </Suspense>              
      </BrowserRouter>     
    )
  //}
})

export default App
