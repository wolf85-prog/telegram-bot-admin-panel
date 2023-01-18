import React from 'react'
import "./conversation.css"
import { CContainer, CSpinner } from '@coreui/react'

const Conversation = () => {
    return (
        <div className='conversation'>
            <img className='conversationImg' src="/static/media/2.0c06e43dc16bee6cdfed.jpg" alt="" />
            <span className="conversationName">Name</span>
        </div>
    )
}

export default Conversation