import React, { Suspense } from 'react'
import "./messenger.css"
import { CContainer, CSpinner } from '@coreui/react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index'
import Conversation from '../../components/chat/conversations/Conversation'
import Message from '../../components/message/Message'

export default function Messenger() {
    return (
        <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
            <Suspense fallback={<CSpinner color="primary" />}>
                <div className='messenger'>
                    <div className='chatMenu'>
                        <div className='chatMenuWrapper'>
                            <input placeholder="Поиск пользователей" className="chatMenuInput" />
                            <Conversation />
                            <Conversation />
                            <Conversation />
                            <Conversation />
                        </div> 
                    </div>
                    <div className='chatBox'>
                        <div className='chatBoxWrapper'>
                            <div className="chatBoxTop">
                                <Message own={true}/>
                                <Message own={false}/>
                                <Message />
                            </div>
                            <div className="chatBoxBottom"></div>
                        </div>
                    </div>
                    <div className='chatOnline'>
                        <div className='chatOnlineWrapper'>
                            online
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
        <AppFooter />
      </div>
    </div>
        
    )
}