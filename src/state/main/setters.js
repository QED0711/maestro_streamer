const setters = {

    appendStream(stream, source=null){
        console.log(stream.id)
        this.setStateMaster(prevState => {
            // 1. append string to streams state
            const streams = [...prevState.streams]
            // const streamIDs = streams.map(streamObj => streamObj.source.mediaStream.id)
            const streamIDs = streams.map(stream => stream.id)
            
            if(!streamIDs.includes(stream.id)){
                // create gain node for stream
                // const source = this.state.audioContext.createMediaStreamSource(stream)
                // const gainNode = this.state.audioContext.createGain()
                // gainNode.gain.value = 0
                
                // connect gainNode to source and destination
                // source.connect(gainNode)
                // gainNode.connect(this.state.audioContext.destination)

                // push to streams
                streams.push(stream)
            } 

            // 2. if the stream source is the local stream, set the localStreamID
            if(source === "local") return {streams, localStreamID: stream.id}
 
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
    },

    appendHiddenVideo(streamID, name){
        this.setStateMaster(prevState => {
            const hiddenVideos = {...prevState.hiddenVideos}
            if(!(streamID in hiddenVideos)) hiddenVideos[streamID] = name

            return {hiddenVideos}
        })
    },

    showHiddenVideo(streamID) {
        this.setStateMaster(prevState => {
            let hiddenVideos = {...prevState.hiddenVideos}
            delete hiddenVideos[streamID]

            return {hiddenVideos}
        })
    }

}

export default setters;
