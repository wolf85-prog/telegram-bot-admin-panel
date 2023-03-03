import React, { Suspense, useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter';
import './scss/style.scss'
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const App = observer(() => {
  //render() {
    //const {user} = useContext(Context)
    //const [loading, setLoading] = useState(true)

    //console.log("user App: ", user.isAuth)

    // useEffect(() => {
    //   console.log("1")
    //   check().then(data => {
    //       user.setUser(true)
    //       user.setIsAuth(true)
    //       console.log("Проверка авторизации")
    //   }).finally(() => setLoading(false))
    // }, [])
    
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
