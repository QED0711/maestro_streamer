import React, { useEffect, useContext } from 'react';

// ========================= STATE =========================
import { mainContext } from '../state/main/mainProvider';
import { useParams } from 'react-router-dom';

// ========================= HELPERS =========================
import socket from '../helpers/socket'
import parseQueryString from '../helpers/parseQueryString';


const ChatConnectionManager = () => {

    const {setters} = useContext(mainContext)

    const {sessionID} = useParams()

    const queryString = parseQueryString(window.location.search)

    useEffect(() => {

        socket.emit("join-session", {sessionID})

        socket.on("message-received", ({name, message}) => {

            setters.appendChatMessage({name, message, self: name === queryString.name, time: Date.now()})
        })

    }, [])

    return(
        <></>
    )


}

export default ChatConnectionManager;