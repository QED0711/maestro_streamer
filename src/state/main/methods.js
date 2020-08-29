
const methods = {

    getAuthority(){
        return this.state.authority
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
