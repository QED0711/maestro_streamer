
const methods = {

    getAuthority(){
        return this.state.authority
    },

    getKnownAuthorites(){
        return this.state.knownAuthorities
    },

    getRing(){
        return this.state.ring;
    },

    getUserID(){
        return this.state.userID;
    },

    getConnectedUsers(){
        return this.state.connectedUsers;
    }

}

export default methods;
