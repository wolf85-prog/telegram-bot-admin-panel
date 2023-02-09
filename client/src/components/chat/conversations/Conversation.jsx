import React, { useEffect, useState } from 'react'
import "./conversation.css"
import { CContainer, CSpinner } from '@coreui/react'
import { $authHost, $host } from './../../../http/index'
import { Avatar, Badge } from "@mui/material"

const Conversation = (conv) => {
    const [user, setUser] = useState(null)
    const [latestMessage, setLatestMessage] = useState({content: "Текст последнего сообщения", updatedAt: "01-01-2023T12:00"})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(()=> {
        const friendId = conv.conversation.members.find(m=>m !== conv.currentUser)

        const getUser = async ()=>{
            try {
                const res = await $host.get("api/userbots/" + friendId);

                setUser(res.data);
            } catch (err) {
                console.log(err);
            } 
        }
        getUser()
    }, [conv.conversation, conv.currentUser, conv.index])

    useEffect(()=> {
        //setCount
        //setLatestMessage({content: "Например", updatedAt: "01-01-2023T12:00"})
    }, [])

    const handleSelectChat = () => {
        //   dispatch(
        //     selectChat({
        //       isGroupChat,
        //       index,
        //       user: users.find((el) => el._id != id),
        //       _id,
        //       chatName,
        //     })
        //   );
    };



    return (
        <div
            onClick={handleSelectChat}
            className="user"
        >
            <div className="history-cont">
                <div>{<Avatar />}</div>
                <div>
                    <p className="name">{conv.conversation.id} {conv.userId} {user ? user.firstname  : '' } {user ? user.lastname  : '' }</p>
                    <p className="chat">
                        {latestMessage
                            ? latestMessage.content.length > 8
                            ? latestMessage.content.substring(0, 30) + " ..."
                            : latestMessage.content
                            : ""}
                    </p>
                </div>
            </div>
            <div>
                {latestMessage ? (
                    <p className="time">
                    {new Date().getHours() +
                        ":" +
                        new Date().getMinutes()}
                    </p>
                ) : (
                    ""
                )}
                 {(conv.count > 0 && conv.conversation.id === conv.userId) ? <p className="unseen-chat">{conv.count}</p>: ''}
            </div>
        </div>
    )
}

export default Conversation