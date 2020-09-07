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
    autoGainControl: false,
    echoCancellation: false,
    noiseSuppression: false,
    sampleSize: 16,
    channelCount: 1
}

const ConnectionManager = () => {

    const { state, setters, methods } = useContext(mainContext);
    const { sessionID, } = useParams()





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
            socket.emit("join-session", { sessionID, userID: id })
        })


        // 2. getting media devices
        navigator.mediaDevices.getUserMedia({
            video: queryParams.video === false ? false : {
                ...queryParams
            },
            audio: queryParams.audio === false ? false : {
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

                /* 
                IF STATEMENT:
                    - if the person calling me is an admin, I will answer with my stream regardless of my own authority
                    - if I am an admin, I will respond with my stream to the person calling me regardless of their authority
                
                */
                if (methods.getAuthority() === "admin" || call.metadata.authority === "admin") {
                    call.answer(rawStream)
                } else {
                    call.answer(null)
                }
                // const video = document.createElement("video")
                // video.muted = true;


                call.on("stream", userVideoStream => {
                    // userVideoStreams are from users who were already connected
                    socket.emit("request-user-data", { streamID: userVideoStream.id }) // requests data from the user based on their stream id
                    setters.appendStream(userVideoStream)
                    // addVideoStream(video, userVideoStream)
                })

            })

            socket.on("user-connected", ({ userID, authority: remoteAuthority }) => {
                // this function will call and provide YOUR STREAM to another user

                console.log(`RING: ${remoteAuthority},${userID}`)
                console.log("CONNECTED USERS", methods.getConnectedUsers())


                /* 
                IF STATEMENT
                    - if we have not already connected to you, we will send out stream.
                    - ONLY IF
                    - you are an admin or monitor, or I am an admin
                        - effectively, if I am a performer, I will only send you my stream if you have a higher authority than me
                */

                if (
                    !methods.getConnectedUsers().includes(userID)
                    && (["admin", "monitor"].includes(remoteAuthority) || methods.getAuthority() === "admin")
                ) {



                    // 1. mark the user as seen
                    setters.appendKnownAuthority(userID, remoteAuthority)


                    // 2. call the user using their ID, and send them your stream
                    const call = peer.call(userID, rawStream, { metadata: { authority: methods.getAuthority() } })

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

        }).catch(err => {
            // if there was an error with getUserMedia, then no video or audio was detected. 
            // we still want this user to be able to take in other people's streams, so we catch here and add in all above functionality except that which sends the local stream

            // handle incoming call (without local stream)
            peer.on("call", call => {

                call.answer(null)

                call.on("stream", userVideoStream => {
                    // userVideoStreams are from users who were already connected
                    socket.emit("request-user-data", { streamID: userVideoStream.id }) // requests data from the user based on their stream id
                    setters.appendStream(userVideoStream)
                    // addVideoStream(video, userVideoStream)
                })

            })


            // handle calling other user (without local stream)
            socket.on("user-connected", ({ userID, authority: remoteAuthority }) => {
                // this function will call and provide YOUR STREAM to another user

                console.log(`RING: ${remoteAuthority},${userID}`)
                console.log("CONNECTED USERS", methods.getConnectedUsers())


                /* 
                IF STATEMENT
                    - if we have not already connected to you, we will send out stream.
                    - ONLY IF
                    - you are an admin or monitor, or I am an admin
                        - effectively, if I am a performer, I will only send you my stream if you have a higher authority than me
                */

                if (
                    !methods.getConnectedUsers().includes(userID)
                    && (["admin", "monitor"].includes(remoteAuthority) || methods.getAuthority() === "admin")
                ) {



                    // 1. mark the user as seen
                    setters.appendKnownAuthority(userID, remoteAuthority)


                    // 2. call the user using their ID, and send them your stream
                    const call = peer.call(userID, null, { metadata: { authority: methods.getAuthority() } })

                    setters.appendUser(userID);
                    // call.open && setters.appendUser(userID);
                    // console.log(call.open)

                    call && call.on("stream", userVideoStream => {
                        setters.appendStream(userVideoStream)
                        // addVideoStream(video, userVideoStream, part)
                    })
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
        \\\\\\\\\\\\\\\\\
        \\ CHAT MESSAGE \\
        \\\\\\\\\\\\\\\\\\\
        */

        socket.on("message-received", ({ name, message }) => {
            // in the event that the user has two chats open, we check the `self` property by checking the name
            setters.appendChatMessage({ name, message, self: name === queryParams.name, time: Date.now() })
        })



    }, [])

    return <></>

}

export default ConnectionManager;