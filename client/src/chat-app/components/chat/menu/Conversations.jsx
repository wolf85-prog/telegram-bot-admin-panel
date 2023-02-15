import React, { useEffect, useState, useContext } from 'react'
//import { getUsers } from '../../../service/api';
import { Box, styled, Divider } from '@mui/material';
import Conversation from './Conversation';
import { AccountContext } from '../../../context/AccountProvider';
import { $authHost, $host } from './../../../../http/index'


function Conversations({ text }) {

    const [users, setUsers] = useState([]);
    //const { account, socket, setActiveUsers }= useContext(AccountContext);

    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
    const token = process.env.REACT_APP_TELEGRAM_API_TOKEN

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let response = await getUsers();
    //         const filteredData = response.filter(user=> user.name.toLowerCase().includes(text.toLowerCase()));
    //         setUsers(filteredData);
    //     }
    //     fetchData();
    // }, [text]);

    // useEffect(()=>{
    //     socket.current.emit("addUsers", account);
    //     socket.current.on("getUsers", users =>{
    //         setActiveUsers(users);
    //     })
    // }, [account])

    //------------------------------------------------------
    useEffect(() => {
        const getUsers = async () => {
            let response = await $host.get("api/userbots/get");
            const filteredData = response.data.filter(user=> (user.firstname + user.lastname).toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredData);
        }
        getUsers();
    },[text]);


    return (
            
        <Component>
            {
                users.map(user =>(
                    //user.sub !== account.sub &&
                    <>   
                        <Conversation user={user} />
                        <StyledDivider />
                    </>
                ))
            }
        </Component>

        )
}

const Component= styled(Box)`
    height: 81vh;
    overflow: overlay;
`
const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background: #e9edef;
    opacity: 0.6
`

export default Conversations