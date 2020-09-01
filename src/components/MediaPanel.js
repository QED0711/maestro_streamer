import React, { useContext, useEffect } from 'react';

import "../css/media-panel.css"

// =========================== STATE ===========================
import { mainContext } from '../state/main/mainProvider';

// =========================== HELPERS ===========================
import parseQueryString from '../helpers/parseQueryString';

const MediaPanel = () => {

    const { state, setters } = useContext(mainContext);
    const queryParams = parseQueryString(window.location.search);


    const handleGainChange = gainNode => e => {
        console.log(gainNode)
        gainNode.gain.value = parseFloat(e.target.value)
    }

    const renderVideos = (streams) => {


        return streams.map(stream => {
            return (
                <div className="video-container" key={stream.id} id={stream.id}>

                    {/* <p>{stream.id}</p> */}

                    <h3 className="video-header user-name">
                        {
                            state.localStreamID === stream.id
                                ? queryParams.name
                                : state.streamsData[stream.id]?.name || "--"
                        }
                    </h3>

                    <h4 className="video-header user-location">
                        {
                            state.localStreamID === stream.id
                                ? queryParams.location
                                : state.streamsData[stream.id]?.location || "--"
                        }
                    </h4>
                    <video id={`video-${stream.id}`}></video>
                    {state.showIDs && <em><sub className="sub-id">{stream.id}</sub></em>}

                    <input id={`gain-${stream.id}`} type="range" min="0" max="1" step="0.01" /* onChange={handleGainChange(streamObj.gainNode)} */ />
                </div>
            )
        })


    }

    useEffect(() => {
        const addStreamsToVideos = () => {
            let video, gainSlider, source, gainNode;
            state.streams.forEach(stream => {
                
                video = document.getElementById(`video-${stream.id}`)
                gainSlider = document.getElementById(`gain-${stream.id}`)

                if (!video.paused) return // break out early

                
                try {
                    // source = state.audioContext.createMediaElementSource(video)
                    source = state.audioContext.createMediaStreamSource(stream)
                    gainNode = state.audioContext.createGain()
                } catch (err) {
                    console.log(err)
                    // if there was an error here, it is because we already connected the video to an output source
                    return
                }
                // debugger
                source.connect(gainNode)
                gainNode.connect(state.audioContext.destination)
                // gainNode.gain.value = 0
                
                gainSlider.addEventListener("change", function(e){
                    
                    // video.volume = parseFloat(e.target.value)
                    gainNode.gain.value = parseFloat(e.target.value)                    
                })
                
                
                video.srcObject = stream;
                video.volume = 0; // allows for the gain node to take over the output gain
                video.controls = "controls"

                // gainSlider.value = stream.id === state.localStreamID ? 0 : 1
                // video.muted = stream.id === state.localStreamID // mute only the local stream


                video.addEventListener("loadedmetadata", () => {
                    video.play();
                })

                video.addEventListener("mousedown", e => {
                    e.preventDefault()
                    if (e.altKey) setters.removeStream(stream.id)
                })
            })
        }

        addStreamsToVideos()

    }, [state.streams])


    return (
        <div id="media-panel">
            {renderVideos(state.streams)}
        </div>
    )

}

export default MediaPanel;