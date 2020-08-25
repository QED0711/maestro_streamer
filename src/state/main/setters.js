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
    }

}

export default setters;
