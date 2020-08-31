
const state = {

    audioContext: null,
    audioDestination: null,

    authority: null,
    knownAuthorities: {},
    
    sessionAuthorization: true,
    ring: false,
    
    userID: null,
    connectedUsers: [],
    localStreamID: null,
    streams: [],
    streamsData: {},

    showIDs: false,

    chat: []


}

export default state;
