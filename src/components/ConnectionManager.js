import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

// ========================= HELPERS =========================
import socket from '../helpers/socket';
import { mainContext } from '../state/main/mainProvider';
import setters from '../state/main/setters';

const ConnectionManager = () => {

    const {state, setters} = useContext(mainContext);
    const { sessionID } = useParams()
    
    useEffect(() => {

        socket.emit("hello")

        socket.on("world", data => {
            console.log(data)
        })

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: {
                autoGainControl: false,
                echoCancellation: false,
                noiseSuppression: false,
                sampleSize: 512,
            }
        }).then(stream => {
            
            setters.appendStream(stream)
        })

    }, [])

    return <></>

}

export default ConnectionManager;