
import React, { useEffect, useState, useContext } from "react";
import {
    Container,
    Paper
} from "@material-ui/core";
import ChatBox from './ChatBox';
import { getChatRoom } from '../../api';
import authUserContext from '../../context/context';

export default function ViewChat() {
    const { 
        token,
        checkAuthenticated,
        signIn,
        setNewToken
    } = useContext(authUserContext);
    const [listMessage, setListMessage] = useState(null);

    useEffect(() => {
        async function fetchData() {
            let params = new URLSearchParams(window.location.search);
            const id = params.get('roomid');
            const response = await getChatRoom(token, id);
            const res = await response.json();
            if (response.ok) {
                setListMessage(res.data);
            } else if(response.status === 401){
                checkAuthenticated(false);
                signIn([]);
                setNewToken("");
                localStorage.removeItem("user");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("token");
            }
        }
        fetchData();
    }, [token, checkAuthenticated, signIn, setNewToken]);

    return (
        <Container maxWidth="sm">
            <Paper style={{height: '600px', overflowY: 'scroll'}}>
                {listMessage && listMessage.length > 0 ? 
                    listMessage.map((game)=> game.messages.map((message, index) => <ChatBox key={index} {...message} />))
                :null}
            </Paper>
        </Container>
    );
}

