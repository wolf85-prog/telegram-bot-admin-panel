import React from 'react'
import { 
    ADMIN_ROUTE, 
    NOTIF_ROUTE,
    MESS_BOT_ROUTE,
    REPORTS_ROUTE,
    DISTRIBUTION_ROUTE,
    SETTINGS_ROUTE,
    CHAT_ROUTE,
    CHAT_ROUTE2,
} from "./utils/consts";

const Chats = React.lazy(() => import('./pages/Chats'))
const Chats2 = React.lazy(() => import('./pages/Chats2'))
const Admin = React.lazy(() => import('./pages/Admin'))
const Notifications = React.lazy(() => import('./pages/Notifications'))
const MessagesBot = React.lazy(() => import('./pages/MessagesBot'))
const Reports = React.lazy(() => import('./pages/Reports'))
const Distribution = React.lazy(() => import('./pages/Distribution'))
const Settings = React.lazy(() => import('./pages/Settings'))

export const authRoutes = [
    { path: ADMIN_ROUTE, name: 'Панель управления', Component: Admin },
    { path: CHAT_ROUTE, name: 'Чаты', Component: Chats },
    { path: CHAT_ROUTE2, name: 'Чаты', Component: Chats2 },
    { path: DISTRIBUTION_ROUTE, name: 'Рассылки', Component: Distribution },
    { path: REPORTS_ROUTE, name: 'Отчеты', Component: Reports },
    { path: MESS_BOT_ROUTE, name: 'Сообщения от бота', Component: MessagesBot },
    { path: NOTIF_ROUTE, name: 'Уведомления', Component: Notifications },
    { path: SETTINGS_ROUTE, name: 'Настройки', Component: Settings },
    { path: '/', name: 'Панель управления', Component: Admin },
]
