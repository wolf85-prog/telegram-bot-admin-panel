import React, { useContext, Suspense, useState, useEffect } from 'react'
import "./messenger.css"
import { CContainer, CSpinner } from '@coreui/react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index'
import Conversation from '../../components/chat/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import {Context} from "../../index";

import { $authHost, $host } from './../../http/index'

export default function Messenger() {
    const [conversations, setConversations] = useState([])
    const {user} = useContext(Context)

    useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await $host.get("api/conversations/" + user.id);
            setConversations(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversations();
    }, [user.id]);


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
                                <Message />
                                <Message own={true}/>
                                <Message />
                            </div>
                            <div className="chatBoxBottom">
                                <textarea
                                    className="chatMessageInput"
                                    placeholder="write something..."
                                ></textarea>
                                <button className="chatSubmitButton">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='chatOnline'>
                        <div className='chatOnlineWrapper'>
                            <ChatOnline />
                            <ChatOnline />
                            <ChatOnline />
                            <ChatOnline />
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