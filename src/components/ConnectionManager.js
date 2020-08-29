import React, { useEffect, useContext } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import Peer from 'peerjs'

// ========================= STATE =========================
import { mainContext } from '../state/main/mainProvider';

// ========================= HELPERS =========================
import socket from '../helpers/socket';
import parseQueryString from '../helpers/parseQueryString'

// ========================= CONFIG =========================
import config from '../config.json'

const DEFAULT_AUDIO_SETTINGS = {
    autoGainControl: {exact: false},
    echoCancellation: {exact: false},
    noiseSuppression: false,
    sampleSize: {exact: 16},
    channelCount: 1
}

const ConnectionManager = () => {

    const { state, setters, methods } = useContext(mainContext);
    const { sessionID, name, location } = useParams()

    
    
    
    
    useEffect(() => {

        const queryParams = parseQueryString(window.location.search)
        
        setters.setAuthority(queryParams.authority || 'basic')

        console.log(queryParams)



        queryParams.showIDs && setters.setShowIDs(true)

        // 1. Peer initialization
        const peer = new Peer(undefined, {
            path: "/peerjs",
            host: config.server_host,
            // port: 80,
            // secure: true
            // debug: 3
        })


        peer.on("open", id => {
            setters.setUserID(id)
            // console.log({ id, peer })
            // console.log("PEER OPENING")
            socket.emit("join-session", { sessionID, userID: id, part: "PART STAND-IN" })
        })


        // 2. getting media devices
        navigator.mediaDevices.getUserMedia({
            video: queryParams.video === false ? false : true,
            audio: {
                ...DEFAULT_AUDIO_SETTINGS,
                ...queryParams
            }
        }).then(rawStream => {
            // var ctx = new AudioContext();
            // var source = ctx.createMediaStreamSource(rawStream);
            // var dest = ctx.createMediaStreamDestination();
            // var gainNode = ctx.createGain();
            // console.log({rawStream, source, dest})

            // source.connect(gainNode);
            // gainNode.connect(dest);

            // gainNode.gain.value = 0.9

            setters.appendStream(rawStream, "local") // this propagates down and adds video to dom

            // HANDLE UNLOAD
            // if the session the person who started the session leaves, these unload event handlers will inform other session members of their departure so they can clean up any stale user data.
            const handlePageUnload = e => {
                socket.emit("user-leaving", { streamID: rawStream.id })
            }

            window.addEventListener("unload", handlePageUnload)
            window.addEventListener("beforeunload", handlePageUnload)

            peer.on("call", call => {

                call.answer(rawStream)
                // const video = document.createElement("video")
                // video.muted = true;


                call.on("stream", userVideoStream => {
                    // userVideoStreams are from users who were already connected
                    socket.emit("request-user-data", { streamID: userVideoStream.id }) // requests data from the user based on their stream id
                    setters.appendStream(userVideoStream)
                    // addVideoStream(video, userVideoStream)
                })

                // call.on("close", () => {
                //     console.log("REMOVING")
                //     // video.parentElement.remove()
                //     // video.remove()
                // })
            })

            socket.on("user-connected", ({ userID }) => {
                console.log(`RING: ${userID}`)
                console.log("CONNECTED USERS", methods.getConnectedUsers())

                if (!methods.getConnectedUsers().includes(userID)) { // if we have not connected to this user already
                    // 1. mark the user as seen



                    // 2. call the user using their ID, and send them your stream
                    const call = peer.call(userID, rawStream)

                    setters.appendUser(userID);
                    // call.open && setters.appendUser(userID);
                    // console.log(call.open)

                    call.on("stream", userVideoStream => {
                        setters.appendStream(userVideoStream)
                        // addVideoStream(video, userVideoStream, part)
                    })
                }
            })

            socket.on("data-requested", (data) => { // responds to data requests based on own stream id
                if (data.streamID === rawStream.id) {
                    socket.emit("data-response", { streamID: rawStream.id, ...queryParams })
                }
            })

        })


        // secondary scope
        socket.on("user-data-response", data => {
            setters.appendStreamData(data.streamID, data)
        })

        socket.on("user-disconnected", userID => {
            // peers[userID] && peers[userID].close()
        })

        socket.on("remove-stale-user", data => {
            console.log("WILL REMOVE STALE USER")
            console.log(data)
            setters.removeStream(data.streamID)
            // const staleStream = document.getElementById(data.streamID)
            // staleStream.remove()
        })


        /* 
        /////////////////////////////////////////////////////
        NOTES: Somewhere (maybe not in this component) there needs to be an interval that calls all users in the socket room.
        This interval should be triggered by a button press, and can be stopped by the same button press
        In this interval, if a call is not open, it halts there and tries again at the next interval until the call is open
        /////////////////////////////////////////////////////        
        */


    }, [])

    return <></>

}

export default ConnectionManager;