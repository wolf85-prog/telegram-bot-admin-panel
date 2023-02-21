import React from 'react'
import { 
    ADMIN_ROUTE, 
    ANALITIKA_ROUTE, 
    NOTIF_ROUTE,
    MESS_BOT_ROUTE,
    REPORTS_ROUTE,
    DISTRIBUTION_ROUTE,
    SETTINGS_ROUTE,
    CHAT_ROUTE,
    LOGIN_ROUTE, 
    REGISTRATION_ROUTE 
} from "./utils/consts";

const Chats = React.lazy(() => import('./pages/Chats'))
const Admin = React.lazy(() => import('./pages/Admin'))
const Notifications = React.lazy(() => import('./pages/Notifications'))
const MessagesBot = React.lazy(() => import('./pages/MessagesBot'))
const Reports = React.lazy(() => import('./pages/Reports'))
const Distribution = React.lazy(() => import('./pages/Distribution'))
const Settings = React.lazy(() => import('./pages/Settings'))

export const authRoutes = [
    { path: ADMIN_ROUTE, name: 'Панель управления', Component: Admin },
    { path: CHAT_ROUTE, name: 'Чаты', Component: Chats },
    { path: ANALITIKA_ROUTE,name: 'Аналитика', Component: Reports },
    { path: DISTRIBUTION_ROUTE, name: 'Рассылки', Component: Distribution },
    { path: REPORTS_ROUTE, name: 'Отчеты', Component: Reports },
    { path: MESS_BOT_ROUTE, name: 'Сообщения от бота', Component: MessagesBot },
    { path: NOTIF_ROUTE, name: 'Уведомления', Component: Notifications },
    { path: SETTINGS_ROUTE, name: 'Настройки', Component: Settings },
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