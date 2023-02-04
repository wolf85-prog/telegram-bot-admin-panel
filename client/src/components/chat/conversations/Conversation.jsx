import React, { useEffect, useState } from 'react'
import "./conversation.css"
import { CContainer, CSpinner } from '@coreui/react'
import { $authHost, $host } from './../../../http/index'
import { Avatar, Badge } from "@mui/material"

const Conversation = (conversation) => {
    const [user, setUser] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(()=> {
        const friendId = conversation.conversation.members.find(m=>m !== conversation.currentUser)

        const getUser = async ()=>{
            try {
                const res = await $host.get("api/userbots/" + friendId);

                setUser(res.data);
            } catch (err) {
                console.log(err);
            } 
        }
        getUser()
    }, [conversation.conversation, conversation.currentUser])

    useEffect(()=> {
        //setCount
    }, [])



    return (
        // <div className='conversation'>
        //     <img className='conversationImg' src="/static/media/2.0c06e43dc16bee6cdfed.jpg" alt="" />
        //     <span className="conversationName">{user ? user.firstname  : '' } {user ? user.lastname  : '' }</span>
        //     {(conversation.count > 0 && conversation.conversation.id == 4) ? <div className="chatCountMessageBadge"><span className="spanTextBadge">{conversation.count}</span></div>: ''}
        // </div>

        <div
            className="user"
            >
            <div className="history-cont">
                <div>{<Avatar />}</div>
                <div>
                    <p className="name"></p>
                <p className="chat">
                    {user ? user.firstname  : '' } {user ? user.lastname  : '' }
                </p>
                </div>
            </div>
            <div>
                <p className="unseen-chat">5</p>
            </div>
        </div>
    )
}

export default Conversation