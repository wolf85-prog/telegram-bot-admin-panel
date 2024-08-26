import React from 'react'
import { 
    CHAT_WORKER,
} from "./utils/consts";

const ChatWorker = React.lazy(() => import('./pages/ChatWorker'))

//const Managers = React.lazy(() => import('./pages/Managers'))
//const DistributionR = React.lazy(() => import('./pages/DistributionR'))
// const DistributionAddR = React.lazy(() => import('./pages/DistributionAddR'))
// const DistributionEditR = React.lazy(() => import('./pages/DistributionEditR'))
// const DistributionRPlaner = React.lazy(() => import('./pages/DistributionRPlaner'))

export const authRoutes = [
    { path: CHAT_WORKER, name: 'Менеджеры 2.0', Component: ChatWorker },
]
