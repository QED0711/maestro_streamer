const setters = {

    appendStream(stream, gainNode, source=null){
        this.setStateMaster(prevState => {
            // 1. append string to streams state
            const streams = [...prevState.streams]
            const streamIDs = streams.map(stream => stream.id)
            // const streams = [...this.state.streams]
            if(!streamIDs.includes(stream.id)) streams.push({stream, gainNode})

            // 2. if the stream source is the local stream, set the localStreamID
            if(source === "local") return {streams, localStreamID: stream.mediaStream.id}
 
            // else, just set streams
            return {streams}
        })
    },

    appendStreamData(streamID, data){
        this.setStateMaster(prevState => {
            const streamsData = {...prevState.streamsData}

            streamsData[streamID] = data

            return {streamsData}

        })
    },

    appendKnownAuthority(userID, authorityLevel){
        this.setStateMaster(prevState => {
            const knownAuthorities = {...prevState.knownAuthorities}

            knownAuthorities[userID] = authorityLevel
            return {knownAuthorities}

        })
    },

    appendChatMessage(chatObj){
        this.setStateMaster(prevState => {
            const chat = [...prevState.chat];

            chat.push(chatObj)
            return {chat}
        })
    },

    removeStream(streamID){
        this.setStateMaster(prevState => {

            let streams = [...prevState.streams]
            streams = streams.filter(stream => streamID !== stream.id)

            return {streams}
        })
    },

    appendUser(userID){
        this.setStateMaster(prevState => {
            let connectedUsers = [...prevState.connectedUsers];
            connectedUsers.push(userID)
            return {connectedUsers}
        })
    },

    toggleRing(){
        this.setStateMaster(prevState => {
            return {ring: !prevState.ring}
        })
    }

}

export default setters;
