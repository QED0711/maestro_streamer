
const state = {

    audioContext: null,
    masterGain: null,

    authority: null,
    knownAuthorities: {},
    
    sessionAuthorization: true,
    ring: false,
    
    userID: null,
    connectedUsers: [],
    localStreamID: null,
    streams: [],
    streamsData: {},

    videosPerRow: 4,
    hiddenVideos: {},

    showIDs: false,

    chat: []


}

export default state;
