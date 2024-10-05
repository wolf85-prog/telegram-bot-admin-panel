import React from 'react'

const Chats = React.lazy(() => import('./pages/Chats'))
const Chats2 = React.lazy(() => import('./pages/Chats2'))
const Chats3 = React.lazy(() => import('./pages/Chats3'))
const ChatWorker = React.lazy(() => import('./pages/ChatWorker'))
const Admin = React.lazy(() => import('./pages/Admin'))
const Admin2 = React.lazy(() => import('./pages/Admin2'))
const Notifications = React.lazy(() => import('./pages/Notifications'))
const MessagesBot = React.lazy(() => import('./pages/MessagesBot'))
const Reports = React.lazy(() => import('./pages/Reports'))
const Distribution = React.lazy(() => import('./pages/Distribution'))
const DistributionAdd = React.lazy(() => import('./pages/DistributionAdd'))
const Settings = React.lazy(() => import('./pages/Settings'))
const DistributionW = React.lazy(() => import('./pages/DistributionW'))
const Workers = React.lazy(() => import('./pages/Workers'))
const Workers2 = React.lazy(() => import('./pages/Workers2'))

const Specialist = React.lazy(() => import('./pages/Specialist'))
const Managers = React.lazy(() => import('./pages/Managers'))
const Companys = React.lazy(() => import('./pages/Companys'))
const Projects = React.lazy(() => import('./pages/Projects'))

const routes = [
  { path: '/', exact: true, name: 'Пункт управления / ' },
  { path: '/dashboard', name: 'Пункт управления / ', Component: Admin },
  { path: "/chat", name: 'Чаты', Component: Chats },
  { path: "/chat2", name: 'Чаты 2.0', Component: Chats2 },
  { path: "/chatwork", name: 'Workhub', Component: ChatWorker }, 
  { path: '/distribution', name: 'Renthub / Рассылки', Component: Distribution },
  { path: '/distribution_add', name: 'Создать рассылку', Component: DistributionAdd },
  { path: '/reports', name: 'Отчеты', Component: Reports },
  { path: '/messagesbot', name: 'Сообщения от бота', Component: MessagesBot },
  { path: "/notifications", name: 'Renthub / Уведомления', Component: Notifications },
  { path: '/settings', name: 'Настройки', Component: Settings },
  { path: '/distributionw', name: 'Workhub / Рассылки', Component: DistributionW },
  { path: "/workers", name: 'Workhub / Уведомления', Component: Workers },
  { path: "/workers2", name: 'Workhub / Уведомления', Component: Workers2 },
  { path: '/dashboard2', name: 'Пункт управления / Renthub', Component: Admin2 },
  { path: "/chat3", name: 'Менеджеры 2.0', Component: Chats3 },
  { path: "/specialist", name: 'Специалисты / Профиль', Component: Specialist },
  { path: "/managers", name: 'Менеджеры / Профиль', Component: Managers },
  { path: "/companys", name: 'Компании / Профиль', Component: Companys },
  { path: "/projects", name: 'Проекты', Component: Projects },
]

export default routes
