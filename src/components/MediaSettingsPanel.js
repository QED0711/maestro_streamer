import React, { useState, useContext, useEffect } from 'react';
import "../css/media-settings.css"

// ======================= STATE =======================
import { mainContext } from '../state/main/mainProvider';

// ======================= HELPERS =======================
import parseQueryString from '../helpers/parseQueryString';

const MediaSettingsPanel = () => {

    const { state, setters } = useContext(mainContext);

    const [queryString, setQueryString] = useState(null)
    useEffect(() => {
        const queryString = parseQueryString(window.location.search)
        setQueryString(queryString)
    }, [])

    return (

        <form id="media-settings-panel">
            {
                queryString
                &&
                <>
                    {/* USER */}
                    <div className="media-settings-section">

                        <label htmlFor="user-name">Name </label>
                        <input id="user-name" defaultValue={queryString.name || ""} />

                        <br />

                        <label htmlFor="user-location">Location </label>
                        <input id="user-location" defaultValue={queryString.location || ""} />

                        <br />

                        <label htmlFor="user-location">Authority </label>
                        <select defaultValue={queryString.authority || "basic"}>
                            <option value="admin">Admin</option>
                            <option value="monitor">Monitor</option>
                            <option value="basic">Performer</option>
                        </select>

                    </div>

                    {/* AUDIO */}
                    <div className="media-settings-section">

                        <label htmlFor="audio-include">Include Audio </label>
                        <input type="checkbox" defaultChecked={queryString.audio || true} />

                        <br />

                        <label htmlFor="audio-gain">Auto Gain Control </label>
                        <input type="checkbox" defaultChecked={queryString.autoGainControl || false} />

                        <br />

                        <label htmlFor="audio-echo">Echo Cancellation </label>
                        <input type="checkbox" defaultChecked={queryString.echoCancellation || false} />

                        <br />

                        <label htmlFor="audio-noise">Noise Suppression </label>
                        <input type="checkbox" defaultChecked={queryString.noiseSuppression || false} />

                        <br />

                        <label htmlFor="audio-channels">Channel Count </label>
                        <select defaultValue={queryString.channelCount || "1"}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>

                        <br />

                        <label htmlFor="audio-samples">Sample Size </label>
                        <select defaultValue={queryString.sampleSize || "16"}>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="24">24</option>
                            <option value="32">32</option>
                        </select>

                    </div>

                    {/* VIDEO */}
                    <div className="media-settings-section">
                        <label htmlFor="video-include">Include Video </label>
                        <input type="checkbox" defaultChecked={queryString.video || true} />

                        <br/>

                        <label htmlFor="video-width">Width </label>
                        <input type="number" step="1" min="10" max="9999" defaultValue={queryString.width || "1920"} />
                        
                        <br/>

                        <label htmlFor="video-height">Height </label>
                        <input type="number" step="1" min="10" max="9999" defaultValue={queryString.height || "1080"} />
                    </div>
                </>
            }
        </form>
    )

}

export default MediaSettingsPanel