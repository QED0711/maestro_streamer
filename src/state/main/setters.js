const setters = {

    appendStream(stream){
        this.setStateMaster(prevState => {
            const streams = [...prevState.streams]
            const streamIDs = streams.map(stream => stream.id)
            // const streams = [...this.state.streams]
            if(!streamIDs.includes(stream.id)) streams.push(stream)

            return {streams}
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
