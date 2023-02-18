import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material";
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import Footer from './Footer';
import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { getConversation } from './../../../../http/chatAPI';


function ChatBox() {
    
    const { person, account } = useContext(AccountContext);
    const [conversation, setConversation] = useState({});

    console.log("chatbox person: ", person)

    useEffect(()=>{
        const getConversationDetails = async()=>{
           let data = await getConversation(person.id)
           setConversation(data);
           console.log("conversation: ", data);
        }
        getConversationDetails();
    },[person.id]);
  
    return (
        <Box style={{ height: "75%" }}>
            <ChatHeader person={person} />
            <Messages person={person} conversation={conversation} />
            <Footer/>
        </Box>
    )
}

export default ChatBox