import React, {useContext}  from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const PrivateRoute = observer(() => {
    const isAuth = false; // определить, разрешено ли, из контекста
    const {user} = useContext(Context)

    console.log(user.isAuth)

    if (!user.isAuth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" />;
    }

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page

    return user.isAuth && <Outlet /> ;
});

export default PrivateRoute;