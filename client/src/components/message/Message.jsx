import React from 'react'
import "./message.css"

export default function Message() {
    return (
        <div className='message'>
            <div className='messageTop'>
                <img className='messageImg' src="" alt="" />
                <p>Hello this a message</p>
            </div>
            <div className='messageBottom'>1 hour ago</div>
        </div>
    )
}