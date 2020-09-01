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
        gainNode.gain.value = parseFloat(e.target.value)
    }

    const renderVideos = (streams) => {
        

        return streams.map(streamObj => {
            return (
                <div className="video-container" key={streamObj.source.mediaStream.id} id={streamObj.source.mediaStream.id}>

                    {/* <p>{stream.id}</p> */}

                    <h3 className="video-header user-name">
                        {
                            state.localStreamID === streamObj.source.mediaStream.id
                                ? queryParams.name
                                : state.streamsData[streamObj.source.mediaStream.id]?.name || "--"
                        }
                    </h3>

                    <h4 className="video-header user-location">
                        {
                            state.localStreamID === streamObj.source.mediaStream.id
                                ? queryParams.location
                                : state.streamsData[streamObj.source.mediaStream.id]?.location || "--"
                        }
                    </h4>
                    <video id={`video-${streamObj.source.mediaStream.id}`}></video>
                    {state.showIDs && <em><sub className="sub-id">{streamObj.source.mediaStream.id}</sub></em>}

                    <input id={`gain-${streamObj.source.mediaStream.id}`} type="range" min="0" max="1" step="0.01" onChange={handleGainChange(streamObj.gainNode)} />
                </div>
            )
        })


    }

    useEffect(() => {
        const addStreamsToVideos = () => {
            let video, gainSlider;
            state.streams.forEach(streamObj => {
                
                video = document.getElementById(`video-${streamObj.source.mediaStream.id}`)

                if (!video.paused) return // break out early

                // video.controls = "controls"
                video.volume = 0; // allows for the gain node to take over the output gain
                // gainSlider.value = streamObj.source.mediaStream.id === state.localStreamID ? 0 : 1
                // video.muted = streamObj.source.mediaStream.id === state.localStreamID // mute only the local stream
                video.srcObject = streamObj.source.mediaStream;

                video.addEventListener("loadedmetadata", () => {
                    video.play();
                })

                video.addEventListener("mousedown", e => {
                    e.preventDefault()
                    if (e.altKey) setters.removeStream(streamObj.source.mediaStream.id)
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