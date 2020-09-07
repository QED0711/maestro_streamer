import React, { useContext } from 'react';
import { mainContext } from '../state/main/mainProvider';

const VideoRowSettings = () => {

    const {state, setters} = useContext(mainContext);


    const handleChange = e => {
        const value = parseInt(e.target.value)

        setters.setVideosPerRow(value)
    }

    return (
        <div id="video-row-settings">
            <h3>Videos per Row</h3>
            <input type="number" min="1" max="99" step="1" value={state.videosPerRow} onChange={handleChange} />
        </div>
    )

}

export default VideoRowSettings;