import React, {useContext, useEffect} from 'react'
import {Routes, Route, Navigate } from 'react-router-dom';
import {authRoutes} from "./routes_start";
import { Context } from './index';
import {observer} from "mobx-react-lite"

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const AppRouter = observer(() => {

  // const {user} = useContext(Context)
  // console.log("user AppRouter: ", user.isAuth)
  const isAuth = true

  // useEffect(() => {
  //   console.log("2")
  //   console.log("isAuth AppRouter: ", user.isAuth)
    
  // }, [])

  return (
    <Routes>  
        {isAuth
        ? authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact/>
        ) 
        : <Route exact path="*" element={<Navigate to='/login' />} /> 
        }

        <Route exact path="/" name="Login Page" element={<Login />} />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
    </Routes>
  );
});

export default AppRouter;