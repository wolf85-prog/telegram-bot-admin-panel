import React, {useContext, useEffect} from 'react'
import {Routes, Route, useNavigate } from 'react-router-dom';
import {authRoutes} from "./routes_start";
import {observer} from "mobx-react-lite";
import { AccountContext } from "./chat-app-new/context/AccountProvider";


// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const AppRouter = observer((acc) => {
  const navigate = useNavigate();
  const { account } = useContext(AccountContext);

  useEffect(() => {
    
   // setTimeout(() => {
      console.log("account: ", account)
      if (!account) {
        navigate("/login");
      } 
   // }, "4000");
    
  }, [navigate]);

  return (
    <Routes>  
        {authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact/>
        ) 
        }    

        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
    </Routes>
  );
});

export default AppRouter;