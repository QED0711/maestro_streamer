import React, { useContext } from 'react';

// ======================== STATE ========================
import { mainContext } from '../state/main/mainProvider';

// ======================== HELPERS ========================
import socket from '../helpers/socket'
import parseQueryString from '../helpers/parseQueryString'

const ChatBox = () => {

    const { state, setters } = useContext(mainContext);

    const queryParams = parseQueryString(window.location.search);


    // HELPERS
    const renderChat = messages => {
        return messages.map(message => {
            return (
                <div className="chat-message" key={message.time}>
                    <span>{message.name}</span>
                    <span>{message.message}</span>
                    <div>{message.time}</div>
                </div>
            )
        })
    }

    // EVENTS
    const handleSubmit = e => {
        e.preventDefault()

        const textElement = e.target.firstChild

        const value = textElement.value
        textElement.value = ""

        const chatMessage = { name: queryParams.name || "anonymous", message: value }
        console.log({ name: queryParams.name || "anonymous", message: value })
        socket.emit("chat-message", chatMessage)


        setters.appendChatMessage({ ...chatMessage, self: true, time: Date.now() })

    }

    return (
        <div id="chat-box">

            <div id="chat-box-display">
                {renderChat(state.chat)}
            </div>

            <form id="chat-box-form" onSubmit={handleSubmit}>
                <input type="text" />
            </form>

        </div>
    )

}

export default ChatBox;