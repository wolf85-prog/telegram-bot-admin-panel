import React from 'react'
import "./message.css"

const Message = () => {
    return (
        <div className="message">
            <div className='messageTop'>
                <img className='messageImg' src="/static/media/2.0c06e43dc16bee6cdfed.jpg" alt="" />
                <p className='messageText'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Laudantium earum explicabo velit repellendus incidunt amet ullam id eius.
                 </p>
            </div>
            <div className='messageBottom'>1 hour ago</div>
        </div>
    )
}

export default Message;