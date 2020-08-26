import React, { useContext, useEffect } from 'react';
import { mainContext } from '../state/main/mainProvider';

import "../css/media-panel.css"

const MediaPanel = () => {

    const { state, setters } = useContext(mainContext);

    const renderVideos = (streams) => {
        console.log(streams)
        return streams.map(stream => {
            return (
                <div className="video-container" key={stream.id}>
                    <p>{stream.id}</p>
                    <video key={stream.id} id={stream.id}></video>
                </div>
            )
        })


    }

    useEffect(() => {
        const addStreamsToVideos = () => {
            let video;
            state.streams.forEach(stream => {
                video = document.getElementById(stream.id)
                console.log(video.paused)
                if (!video.paused) return // break out early

                video.muted = true
                video.controls = "controls"
                video.srcObject = stream;

                video.addEventListener("loadedmetadata", () => {
                    video.play();
                })

                video.addEventListener("mousedown", e => {
                    e.preventDefault()
                    if(e.altKey) setters.removeStream(stream.id)
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