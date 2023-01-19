import React from 'react'
import "./chatOnline.css"

export default function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className='messageImg' src="/static/media/2.0c06e43dc16bee6cdfed.jpg" alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span><div className="chatOnlineName">John Doe</div></span>
            </div>

        </div>
    )
}