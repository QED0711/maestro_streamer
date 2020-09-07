import React, { useContext, useEffect, useRef, useState } from 'react';
import "../css/chat-box.css"

// ======================== STATE ========================
import { mainContext } from '../state/main/mainProvider';
import { useParams } from 'react-router-dom';

// ======================== HELPERS ========================
import socket from '../helpers/socket'
import parseQueryString from '../helpers/parseQueryString'

const ChatBox = () => {

    const { state, setters } = useContext(mainContext);
    
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
    const queryParams = parseQueryString(window.location.search);
    const {sessionID} = useParams()

    
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

    
    const submitMessage = element => {
        console.log("SUBMITTING")
        // e.preventDefault()

        const value = element.value

        element.value = ""


        if(!/\w{1,}/.test(value)) return // user must type at least 1 character to submit

        const chatMessage = { name: queryParams.name || "anonymous", message: value }

        socket.emit("chat-message", chatMessage)


        setters.appendChatMessage({ ...chatMessage, self: true, time: Date.now() })

    }

    // EVENTS
    const handleTextareaKey = e => {
        if(e.keyCode === 13 && !e.shiftKey){
            e.preventDefault()
            submitMessage(e.target)
        }
    }

    const handleScroll = e => {
        const currentScroll = e.target.scrollTop + e.target.clientHeight
        if(
            e.target.scrollHeight - 100 <= currentScroll // 100 us the allowable margin
        ){
            setIsScrolledToBottom(true)
        } else {
            setIsScrolledToBottom(false)
        }
    }


    
    useEffect(() => {
        // handles scrolling to bottom on new message
        const element = messageContainer.current    
        if(isScrolledToBottom) element.scrollTop = element.scrollHeight;
    }, [state.chat, isScrolledToBottom])


    return (
        <div id="chat-box">

            <div id="chat-box-display" ref={messageContainer} onScroll={handleScroll}>
                {renderChat(state.chat)}
            </div>

            <div id="chat-box-entry-field">
                <textarea onKeyDown={handleTextareaKey} placeholder="Your message here..."></textarea>
            </div>

            {
                // if we're not already in the chat window
                !(/\/chat\//.test(window.location.href))
                &&
                <a href={`${process.env.NODE_ENV === "production" ? "/maestro_streamer" : ""}/chat/${sessionID}?name=${queryParams.name || "anonymous"}`} target="_blank">Open Chat in new Window</a>
            }
        </div>
    )

}

export default ChatBox;