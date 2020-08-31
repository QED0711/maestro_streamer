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
        

        return streams.map(streamObj => {
            return (
                <div className="video-container" key={streamObj.stream.mediaStream.id} id={streamObj.stream.mediaStream.id}>

                    {/* <p>{stream.id}</p> */}

                    <h3 className="video-header user-name">
                        {
                            state.localStreamID === streamObj.stream.mediaStream.id
                                ? queryParams.name
                                : state.streamsData[streamObj.stream.mediaStream.id]?.name || "--"
                        }
                    </h3>

                    <h4 className="video-header user-location">
                        {
                            state.localStreamID === streamObj.stream.mediaStream.id
                                ? queryParams.location
                                : state.streamsData[streamObj.stream.mediaStream.id]?.location || "--"
                        }
                    </h4>
                    <video id={`video-${streamObj.stream.mediaStream.id}`}></video>
                    {state.showIDs && <em><sub className="sub-id">{streamObj.stream.mediaStream.id}</sub></em>}
                </div>
            )
        })


    }

    useEffect(() => {
        const addStreamsToVideos = () => {
            let video;
            state.streams.forEach(streamObj => {
                
                video = document.getElementById(`video-${streamObj.stream.mediaStream.id}`)

                if (!video.paused) return // break out early

                video.muted = streamObj.stream.mediaStream.id === state.localStreamID // mute only the local stream
                video.controls = "controls"
                video.srcObject = streamObj.stream.mediaStream;

                video.addEventListener("loadedmetadata", () => {
                    video.play();
                })

                video.addEventListener("mousedown", e => {
                    e.preventDefault()
                    if (e.altKey) setters.removeStream(streamObj.stream.mediaStream.id)
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