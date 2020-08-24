import React, { useContext, useEffect } from 'react';
import { mainContext } from '../state/main/mainProvider';

const MediaPanel = () => {

    const {state} = useContext(mainContext);

    const renderVideos = (streams) => {
        return streams.map(stream => {
            return (
                <video key={stream.id} id={stream.id}></video>
            )
        })


    }

    useEffect(() => {

        let video;
        state.streams.forEach(stream => {
            video = document.getElementById(stream.id)
            video.muted = true
            video.controls = "controls"
            video.srcObject = stream;

            video.addEventListener("loadedmetadata", () => {
                video.play();
            })
        })

    }, [state.streams])


    return (
        <div id="media-panel">
            {renderVideos(state.streams)}
        </div>
    )

}

export default MediaPanel;