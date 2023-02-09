import React, { useContext, createRef, Suspense, useState, useRef, useEffect } from 'react'
import InputEmoji from "react-input-emoji";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import { ChatlogicStyling, isSameSender } from "./../../components/chat/ChatstyleLogic";
import { Avatar, Badge, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import "./messenger.css"
import "./../../Chat.css";
import { CContainer, CSpinner } from '@coreui/react'
import { AppContent, AppSidebar, AppFooter, AppHeaderChat, AppBreadcrumb } from '../../components/index'
import Conversation from '../../components/chat/conversations/Conversation'
import Message from '../../components/message/Message'
import Notificationcomp from '../../components/chat/Notificationcomp'
import {Context} from "../../index";
import {io} from "socket.io-client"


import { $authHost, $host } from './../../http/index'

export default function Messenger() {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [search, setSearch] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [countMess, setCountMess] = useState(0)

    const socket = useRef(io("https://proj.uley.team:9000"))
    const scrollRef = useRef();
    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
    const token = process.env.REACT_APP_TELEGRAM_API_TOKEN

    const scrolldiv = createRef();

    //const {user} = useContext(Context)

//socket
//-----------------------------------------------------------------------------    
    useEffect(() => {

        socket.current = io("https://proj.uley.team:9000");
        socket.current.on("getMessage", data => {
           
            setCountMess(countMess + 1)
            console.log("count: ", countMess + 1) 

            setUserId(data.convId)
            console.log("userId: ", data.convId) 
            console.log("senderId: ", data.senderId)

            const getConversations = async () => {
                try {
                  const res = await $host.get("api/conversations/" + chatAdminId);
                  setConversations([...res.data, {id: Date.now(), members: [data.senderId, chatAdminId], createdAt: '', updatedAt: ''}]);
                } catch (err) {
                  console.log(err);
                }
            };
      
            getConversations();
    

            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
        socket?.current.on("welcome", message=> {
            console.log(message)
        })
    },[socket, conversations, chatAdminId])

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
//------------------------------------------------------------------------------------------------    

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


    useEffect(() => {

        const friendId = currentChat?.members.find((m) => m !== chatAdminId);
        const getUser = async () => {
            try {
                const res = await $host.get("api/userbots/" + friendId);
                setUser(res.data);
                console.log('currentUser: ', user)
            } catch (err) {
              console.log(err);
            }
          };
          getUser();
    },[currentChat, chatAdminId])


    const handleChat = async (c) => {
        setCurrentChat(c);
        setCurrentChatId(c.id)

        setCountMess(0)
    }


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


    const ColorButton = styled(Button)(() => ({
        color: "white",
        fontSize: "20px",
        textTransform: "none",
        padding: "8px",
        marginRight: "15px",
        marginBottom: "10px",
        backgroundColor: "#5865f2",
        "&:hover": {
          backgroundColor: "#3a45c3",
        },
    }));
 
    return (
        <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeaderChat />
        <div className="body flex-grow-1 px-3">
            
                <Suspense fallback={<CSpinner color="primary" />}>
                    <div className='messenger'>
                        <div className="mychat-cont">
                            <div className="notification">
                                <h2>Чаты</h2>
                                <Badge color="error">
                                    <Notificationcomp />
                                </Badge>
                            </div>
                            <div className="search-cont">
                                <SearchIcon />
                                <input
                                    type="text"
                                    placeholder="Поиск пользователя"
                                />
                            </div>
                            <div className="recent-chat">                            
                                <div className="recent-user">
                                    {conversations.slice(0).reverse().map((c, index) => (
                                        <div key={c.id} onClick={()=>handleChat(c)}>
                                            <Conversation 
                                                conversation={c} 
                                                index={index}
                                                currentUser={chatAdminId} 
                                                count={countMess}
                                                userId={userId}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='chatBox'>
                            
                            <div>
                                {
                                    currentChat ?
                                <>
                                <div className="chattingpage">
                                    <div className="top-header">
                                        <div className="user-header">
                                        <Avatar />
                                        <p className="user-name"> {user ? user.firstname  : '' } {user ? user.lastname  : '' }</p>
                                        </div>
                                        <div>
                                        <div className="user-fet">
                                            <SearchIcon />
                                            <CallIcon />
                                            <VideoCallIcon />
                                            <MoreHorizIcon />
                                        </div>
                                        </div>
                                    </div>
                                    <div ref={scrolldiv} className="live-chat">
                                        {messages.map((el, index) => (
                                        <div
                                            ref={scrollRef}
                                            key={index}
                                            className={
                                                el.from === chatAdminId ? "rihgtuser-chat" : "leftuser-chat"
                                            }
                                        >
                                            <div
                                                className={el.from === chatAdminId ? "right-avt" : "left-avt"}
                                            >
                                            <div className={ChatlogicStyling(el.from, chatAdminId)}>
                                                <p>{el.text}</p>
                                                <p className="time chat-time">
                                                {new Date(el.createdAt).getHours() +
                                                    ":" +
                                                    new Date(el.createdAt).getMinutes()}
                                                </p>
                                            </div>                                          
                                            <div className="blank-div"></div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                    <div className="sender-cont">
                                        {/* <InputContWithEmog id={_id} token={token} socket={socket} /> */}
                                        <div className="search-cont send-message">
                                        <InputEmoji
                                            onChange={setNewMessage}
                                            value={newMessage}
                                            cleanOnEnter
                                            placeholder="Напишите сообщение"
                                            />
                                        </div>
                                        <ColorButton
                                            onClick={handleSubmit}
                                            variant="contained"
                                            endIcon={<SendIcon />}
                                        ></ColorButton>
                                            </div>
                                        </div>`
                                
                                {/* <div className='chatBoxHeader'>
                                    {user ? user.firstname  : '' } {user ? user.lastname  : '' }
                                </div>

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
                                </div> */}
                                </> 
                                : 
                                // <span className='noConversationText'>Чтобы начать беседу, нажмите на чат.</span>
                                <div className="chattingpage start-msg">
                                    <div>
                                        <Avatar sx={{ width: 70, height: 70 }} />
                                        <h3>Добро пожаловать</h3>
                                        <p>Выберите чат, чтобы начать обмен сообщениями.</p>
                                    </div>
                                </div>
                                }
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
  