import React, { useEffect, useState } from 'react'
import "./conversation.css"
import { CContainer, CSpinner } from '@coreui/react'
import { $authHost, $host } from './../../../http/index'

const Conversation = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null)
    console.log("currentUser ", currentUser)

    useEffect(()=> {
        const friendId = conversation.members.find(m=>m !== currentUser)

        const getUser = async ()=>{
            try {
                const res = await $host.get("api/users?userId=" + '534534545');
                console.log(res)
                //setConversations(res.data);
            } catch (err) {
                console.log(err);
            } 
        }
        getUser()
    }, [])



    return (
        <div className='conversation'>
            <img className='conversationImg' src="/static/media/2.0c06e43dc16bee6cdfed.jpg" alt="" />
            <span className="conversationName">{user}</span>
        </div>
    )
}

export default Conversation