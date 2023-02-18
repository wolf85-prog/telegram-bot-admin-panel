
import React, { useContext } from 'react'
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import ChatDialog from "./chat/ChatDialog";
import { AccountContext } from "../context/AccountProvider";

const Messenger = () => {

    const { account } = useContext(AccountContext);
    console.log("account: ", account)

    //const {user} = useContext(Context)
    //console.log("user context: ", user)

    return (
        <Component>
            {
                <>
                <Header >
                    <Toolbar>
                    </Toolbar>
                </Header>

                <ChatDialog /> 
                </>                   
            }
        </Component>
    )
}

//синяя шапка
const Header = styled(AppBar)`
    height:125px;
    background-color: #3567e5; 
    box-shadow: none;
`

//серый фон
const Component = styled(Box)`
 height: 100vh;
 background-color: #DCDCDC;
`


export default Messenger;