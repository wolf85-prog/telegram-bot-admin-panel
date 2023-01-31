import React, { useContext, Suspense, useState, useRef, useEffect } from 'react'
import "./messenger.css"
import { CContainer, CSpinner } from '@coreui/react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index'
import Conversation from '../../components/chat/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import {Context} from "../../index";
import {io} from "socket.io-client"

import { $authHost, $host } from './../../http/index'

export default function Messenger() {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null);
    const [friendId, setFriendId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef(io("https://proj.uley.team:9000"))
    const scrollRef = useRef();
    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
    const token = process.env.REACT_APP_TELEGRAM_API_TOKEN

    const {user} = useContext(Context)

    useEffect(() => {
        socket.current = io("https://proj.uley.team:9000");
        socket.current.on("getMessage", data => {
            console.log(data)
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
        socket?.current.on("welcome", message=> {
            console.log(message)
        })
    },[socket])


    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
        setMessages((prev) => [...prev, arrivalMessage])
    },[arrivalMessage, currentChat])

    useEffect(()=>{
        socket.current.emit("addUser", chatAdminId)
        socket.current.on("getUsers", users => {
            console.log("users: ", users);
        })
    },[chatAdminId])


    useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await $host.get("api/conversations/" + chatAdminId);
            setConversations(res.data);
          } catch (err) {
            console.log(err);
          }
        };

        getConversations();

    }, [chatAdminId]);

    useEffect(() => {
        const getMessages = async () => {
          try {
            const res = await $host.get("api/messages/" + currentChat?.id);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const friendId = currentChat.members.find((m) => m !== chatAdminId);

        const message = {
            from: chatAdminId, //user.id,
            to: friendId,
            text: newMessage,
            messageType: 'text',
            conversationId: currentChat.id,
            is_bot: false
        };

        // socket.current.emit("sendMessage", {
        //     senderId: chatAdminId,
        //     receiverId: friendId,
        //     text: newMessage,
        // })

        try {
            //сохранение сообщения в БД
            const res = await $host.post("api/messages", message);
            setMessages([...messages, res.data]);

            //Передаем данные боту
            const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${friendId}&parse_mode=html&text=${newMessage}`
            const sendToTelegram = await $host.get(url_send_msg);

            //Выводим сообщение об успешной отправке
            if (sendToTelegram) {
                console.log('Спасибо! Ваша сообщение отправлено!');
            }           
            //А здесь сообщение об ошибке при отправке
            else {
                console.log('Что-то пошло не так. Попробуйте ещё раз.');
            }

            setNewMessage("");

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);


 
    return (
        <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
            <Suspense fallback={<CSpinner color="primary" />}>
                <div className='messenger'>
                    <div className='chatMenu'>
                        <div className='chatMenuWrapper'>
                            <input placeholder="Поиск пользователей" className="chatMenuInput" />

                            {conversations.map((c, index) => (
                            <div className='userchat' key={`${c}+${index}`} onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={chatAdminId}/>
                            </div>
                            ))}

                        </div> 
                    </div>

                    <div className='chatBox'>
                        <div className='chatBoxWrapper'>
                            {
                                currentChat ?
                            <>
                            <div className="chatBoxTop">
                                {messages.map((m, index) => (
                                    <div ref={scrollRef} key={`${m}+${index}`}>
                                    <Message message={m} own={m.from === chatAdminId} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea
                                    className="chatMessageInput"
                                    placeholder="Напишите что-нибудь..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                            </div></> : <span className='noConversationText'>Чтобы начать беседу, нажмите на чат.</span>}
                        </div>
                    </div>
                    <div className='chatOnline'>
                        <div className='chatOnlineWrapper'>
                            <ChatOnline />
                            <ChatOnline />
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
        <AppFooter />
      </div>
    </div>
        
    )
}