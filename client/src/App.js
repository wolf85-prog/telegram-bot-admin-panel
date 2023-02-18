import React, { Component, Suspense, useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import AppRouter from './components/AppRouter';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = observer(() => {
  //render() {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      check().then(data => {
          user.setUser(true)
          user.setIsAuth(true)
      }).finally(() => setLoading(false))
    }, [])
    
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          {/* <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes> */}
               
          <AppRouter />

        </Suspense>
      </BrowserRouter>     
    )
  //}
})

export default App
