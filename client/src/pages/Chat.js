import React from 'react'
import Messenger from "./../chat-app/components/Messenger";
import AccountProvider from './../chat-app/context/AccountProvider';
import './../chat-app/style/index.css';

const Chat = () => {
    return (        
       <AccountProvider>
            <Messenger />
       </AccountProvider>
    );
}

export default Chat
