import React from 'react'

const Chats = React.lazy(() => import('./pages/Chats'))
const Chats2 = React.lazy(() => import('./pages/Chats2'))
const Admin = React.lazy(() => import('./pages/Admin'))
const Notifications = React.lazy(() => import('./pages/Notifications'))
const MessagesBot = React.lazy(() => import('./pages/MessagesBot'))
const Reports = React.lazy(() => import('./pages/Reports'))
const Distribution = React.lazy(() => import('./pages/Distribution'))
const Settings = React.lazy(() => import('./pages/Settings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Панель управления', Component: Admin },
  { path: "/chat", name: 'Чаты', Component: Chats },
  { path: "/chat2", name: 'Чаты 2.0', Component: Chats2 },
  { path: '/distribution', name: 'Рассылки', Component: Distribution },
  { path: '/reports', name: 'Отчеты', Component: Reports },
  { path: '/messagesbot', name: 'Сообщения от бота', Component: MessagesBot },
  { path: "/notifications", name: 'Уведомления', Component: Notifications },
  { path: '/settings', name: 'Настройки', Component: Settings },
]

export default routes
