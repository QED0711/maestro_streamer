import React, { useContext, useEffect } from 'react';

// ============================ STATE ============================
import { mainContext } from "../state/main/mainProvider"

// ============================ HELPERS ============================
import socket from '../helpers/socket'
import { useParams } from 'react-router-dom';

const ConfigPanel = () => {

    // STATE
    const { state, setters, methods } = useContext(mainContext)
    const {sessionID} = useParams()

    // EVENTS
    const handleRingClick = async e => {
        setters.toggleRing()



    }

    useEffect(() => {

        if (state.ring) {
            const ringInterval = setInterval(() => {
                const userID = methods.getUserID()
                const ring = methods.getRing();
                if (userID) {
                    ring ? socket.emit("ring", { sessionID, userID }) : clearInterval(ringInterval);
                }
            }, 1000)
        }

    }, [state.ring])

    return (
        <div id="config-panel">

            <button onClick={handleRingClick}>
                {
                    state.ring
                        ? "Stop Ringing"
                        : "Ring"
                }
            </button>

        </div>
    )

}

export default ConfigPanel