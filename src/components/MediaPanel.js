import React, { useContext, useEffect } from 'react';

import "../css/media-panel.css"

// =========================== STATE ===========================
import { mainContext } from '../state/main/mainProvider';

// =========================== HELPERS ===========================
import parseQueryString from '../helpers/parseQueryString';

const MediaPanel = () => {

    const { state, setters } = useContext(mainContext);
    const queryParams = parseQueryString(window.location.search);


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
                    <sub>{stream.id}</sub>
                    <video id={`video-${stream.id}`}></video>
                </div>
            )
        })


    }

    useEffect(() => {
        const addStreamsToVideos = () => {
            let video;
            state.streams.forEach(stream => {
                video = document.getElementById(`video-${stream.id}`)

                if (!video.paused) return // break out early

                video.muted = stream.id === state.localStreamID // mute only the local stream
                video.controls = "controls"
                video.srcObject = stream;

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