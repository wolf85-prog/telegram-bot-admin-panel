import React from 'react'
import Messenger from "./../chat-app/components/Messenger";
import './../chat-app/style/index.css';
import { AppHeaderChat } from '../components/index'
import { CContainer, CSpinner } from '@coreui/react'

const Chat = () => {
    return (  
        <div>
            <AppHeaderChat />
            <Messenger /> 
        </div>              
    );
}

export default Chat
