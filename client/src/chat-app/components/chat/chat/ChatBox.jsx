import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material";
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { getConversation } from './../../../../http/chatAPI';


function ChatBox() {
    
    const { person, account } = useContext(AccountContext);
    const [conversation, setConversation] = useState({});

    useEffect(()=>{
        const getConversationDetails = async()=>{
           let data = await getConversation({ senderId: person.chatId, reciverId: person.chatId})
           setConversation(data);
           //console.log(conversation,"adasfa");
        }
        getConversationDetails();
    },[person.sub]);
  
    return (
        <Box style={{ height: "75%" }}>
            {/* <ChatHeader person={person} />
            <Messages person={person} conversation={conversation} /> */}
            <ChatHeader />
            <Messages />
        </Box>
    )
}

export default ChatBox