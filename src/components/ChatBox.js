import React, { useContext, useEffect, useRef } from 'react';
import "../css/chat-box.css"

// ======================== STATE ========================
import { mainContext } from '../state/main/mainProvider';

// ======================== HELPERS ========================
import socket from '../helpers/socket'
import parseQueryString from '../helpers/parseQueryString'

const ChatBox = () => {

    const { state, setters } = useContext(mainContext);
    const queryParams = parseQueryString(window.location.search);

    
    const messageContainer = useRef(null);
    const formRef = useRef(null);


    // HELPERS

    const formatTimeNumber = (num, type=null) => {
        if(type === "hours"){
            if (num > 12) num = num - 12
        }
        return num >= 10 ? num : `0${num}`
    }

    const renderChat = messages => {
        return messages.map(message => {

            const d = new Date(message.time)
            const formattedTime = `${formatTimeNumber(d.getHours(), "hours")}:${formatTimeNumber(d.getMinutes())}:${formatTimeNumber(d.getSeconds())}`
            console.log(message)
            return (
                <div className={`chat-message-container from-self-${message.self}`} key={message.time}>
                    <div className="chat-message-header">
                        <div className="chat-message-sender">
                            {message.name}
                        </div>

                        <div className="chat-message-time">{formattedTime}</div>
                    </div>

                    <div className="chat-message-content">{message.message}</div>
                </div>
            )
        })
    }

    // EVENTS
    const handleSubmit = e => {
        console.log("SUBMITTING")
        e.preventDefault()

        const textElement = e.target.firstChild

        const value = textElement.value
        textElement.value = ""

        console.log(value)

        const chatMessage = { name: queryParams.name || "anonymous", message: value }
        console.log({ name: queryParams.name || "anonymous", message: value })
        socket.emit("chat-message", chatMessage)


        setters.appendChatMessage({ ...chatMessage, self: true, time: Date.now() })

    }

    const handleTextareaKey = e => {
        console.log(e)
        if(e.keyCode === 13 && !e.shiftKey){
            e.preventDefault()
            formRef.current.dispatchEvent(new Event("submit"))
        }
    }


    
    useEffect(() => {
        // handles scrolling to bottom on new message
        const element = messageContainer.current    
        element.scrollTop = element.scrollHeight;
    }, [state.chat])


    return (
        <div id="chat-box">

            <div id="chat-box-display" ref={messageContainer}>
                {renderChat(state.chat)}
            </div>

            <form id="chat-box-form" onSubmit={handleSubmit} ref={formRef}>
                {/* <input type="text" /> */}
                <textarea onKeyDown={handleTextareaKey}></textarea>
            </form>

        </div>
    )

}

export default ChatBox;