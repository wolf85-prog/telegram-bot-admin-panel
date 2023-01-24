import React from 'react'
import "./message.css"
import {format} from "timeago.js"

const Message = (own) => {
    
    return (
        <div className={ own.own ? "message own" : "message"}>
            <div className='messageTop'>
                <img className='messageImg' src="/static/media/2.0c06e43dc16bee6cdfed.jpg" alt="" />
                <p className='messageText'>
                    {own.message.text}
                 </p>
            </div>
            <div className='messageBottom'>{format(own.message.createdAt)}</div>
        </div>
    )
}

export default Message;