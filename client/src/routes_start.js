import React from 'react'
import { ADMIN_ROUTE, ANALITIKA_ROUTE, MESSENGER_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";
import Auth from "./views/pages/login/Login";
import Admin from "./pages/Admin";
import Analitic from "./pages/Admin";

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Chat = React.lazy(() => import('./views/chat/Chat'))
const Messenger = React.lazy(() => import('./pages/messenger/Messenger'))

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        name: 'Панель управления', 
        Component: Admin
    },
    {
        path: ANALITIKA_ROUTE,
        name: 'Аналитика', 
        Component: Accordion
    },
    {
        path: MESSENGER_ROUTE,
        name: 'Чаты', 
        Component: Messenger
    },
    // { 
    //     path: '/dashboard', 
    //     name: 'Dashboard', 
    //     element: Dashboard  
    // },
    // { 
    //     path: '/theme', 
    //     name: 'Theme', 
    //     element: Colors, 
    //     exact: true 
    // }
    // {
    //     path: '*', 
    //     name: 'Home', 
    //     Component: DefaultLayout
    // }
]

// export const publicRoutes = [
//     {
//         path: LOGIN_ROUTE,
//         Component: Auth
//     },
//     {
//         path: REGISTRATION_ROUTE,
//         Component: Auth
//     }
// ]