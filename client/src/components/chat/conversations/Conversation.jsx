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
    }, [conv.conversation, conv.currentUser])

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
        // <div className='conversation'>
        //     <img className='conversationImg' src="/static/media/2.0c06e43dc16bee6cdfed.jpg" alt="" />
        //     <span className="conversationName">{user ? user.firstname  : '' } {user ? user.lastname  : '' }</span>
        //     {(conversation.count > 0 && conversation.conversation.id == 4) ? <div className="chatCountMessageBadge"><span className="spanTextBadge">{conversation.count}</span></div>: ''}
        // </div>

        <div
            onClick={handleSelectChat}
            className="user"
        >
            <div className="history-cont">
                <div>{<Avatar />}</div>
                <div>
                    <p className="name">{user ? user.firstname  : '' } {user ? user.lastname  : '' }</p>
                    <p className="chat">
                        {latestMessage
                            ? latestMessage.content.length > 8
                            ? latestMessage.content.substring(0, 30) + " . . ."
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
                {/* <p className="unseen-chat">5</p> */}
            </div>
        </div>

        // <div className="history-cont">
        // <div>{<Avatar src={users?.pic} />}</div>
        // <div>
        //     <p className="name">{users?.name}</p>
        //     <p className="chat">
        //     {latestMessage
        //         ? latestMessage.content.length > 8
        //         ? latestMessage.content.substring(0, 30) + " . . ."
        //         : latestMessage.content
        //         : ""}
        //     </p>
        // </div>
        // </div>
        // <div>
        // {latestMessage ? (
        //     <p className="time">
        //     {new Date(latestMessage?.updatedAt).getHours() +
        //         ":" +
        //         new Date(latestMessage?.updatedAt).getMinutes()}
        //     </p>
        // ) : (
        //     ""
        // )}
        // {/* <p className="unseen-chat">5</p> */}
        // </div>
        // </div>
    )
}

export default Conversation