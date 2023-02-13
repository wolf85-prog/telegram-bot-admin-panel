import React, { Suspense } from 'react'
import Messenger from "./../chat-app/components/Messenger";
import AccountProvider from './../chat-app/context/AccountProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './../chat-app/style/index.css';

// routes config
import routes from '../routes'

const Chat = () => {
    return (        
       <AccountProvider>
            <Messenger />
       </AccountProvider>
    );
}

export default Chat
