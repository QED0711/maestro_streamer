import state from "./state";

const setters = {

    appendStream(stream){
        console.log(stream)
        const streams = [...this.state.streams]

        streams.push(stream)

        console.log(streams)
        this.setState({streams})
    },

}

export default setters;
