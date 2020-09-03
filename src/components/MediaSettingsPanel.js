import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import "../css/media-settings.css"

// ======================= STATE =======================
import { mainContext } from '../state/main/mainProvider';

// ======================= HELPERS =======================
import parseQueryString from '../helpers/parseQueryString';
import { renderIntoDocument } from 'react-dom/test-utils';

const MediaSettingsPanel = () => {

    const { state, setters } = useContext(mainContext);
    const { sessionID, } = useParams()
    const [queryString, setQueryString] = useState(null)
    const [showApplyButton, setShowApplyButton] = useState(false)
    const [modifiedQueryString, setModifiedQueryString] = useState("")

    // HELPERS
    const parseSettings = () => {
        const settings = [...document.getElementsByClassName("media-setting")]

        const settingsObj = {}

        let key, value, override;
        for (let setting of settings) {

            key = setting.dataset.key
            override = setting.dataset.override

            if (setting.type === "checkbox") {
                value = setting.checked
            } else {
                value = setting.value
            }

            // if(/override/.test(key) && value){
            //     updatedString += `${key}=${value}&`    
            // } else {
            //     continue
            // }

            if(override !== undefined){
                if(!value){ // if override was specified and it is false, delete the key
                    delete settingsObj[key]
                } 
                continue
            }

            settingsObj[key] = value


        }
        
        let updatedString = ""
        for(let [key, val] of Object.entries(settingsObj)){
            updatedString += `${key}=${val}&`

        }

        return updatedString

    }

    const renderShowVideoButtons = hiddenVideos => {
        const btns = []
        for(let [key, val] of Object.entries(hiddenVideos)){
            btns.push(
                <button key={key} onClick={handleShowVideoButtonClick(key)}>Show {val}</button>
            )
        }
        return btns
    }

    // EVENTS
    const handleShowVideoButtonClick = streamID => e => {
        setters.showHiddenVideo(streamID)
    }

    const handleChange = e => {
        setShowApplyButton(true)

        setModifiedQueryString(parseSettings())

    }

    const handleCheckNext = e => {
        e.target.nextSibling.checked = true
    }


    useEffect(() => {
        const queryString = parseQueryString(window.location.search)
        setQueryString(queryString)
    }, [])

    return (
        <>
            <div id="media-settings-panel" onChange={handleChange} >
                {
                    queryString
                    &&
                    <>
                        {/* USER */}
                        <div className="media-settings-section">

                            <label htmlFor="user-name">Name </label>
                            <input id="user-name" className="media-setting" data-key="name" defaultValue={queryString.name || ""} />

                            <br />

                            <label htmlFor="user-location">Location </label>
                            <input id="user-location" className="media-setting" data-key="location" defaultValue={queryString.location || ""} />

                            <br />

                            <label htmlFor="user-location">Authority </label>
                            <select data-key="authority" className="media-setting" defaultValue={queryString.authority || "basic"}>
                                <option value="admin">Admin</option>
                                <option value="monitor">Monitor</option>
                                <option value="basic">Performer</option>
                            </select>

                        </div>

                        {/* AUDIO */}
                        <div className="media-settings-section">

                            <label htmlFor="audio-include">Include Audio </label>
                            <input type="checkbox" className="media-setting" data-key="audio" defaultChecked={queryString.audio === false ? false : true} />

                            <br />

                            <label htmlFor="audio-gain">Auto Gain Control </label>
                            <input type="checkbox" className="media-setting" data-key="autoGainControl" defaultChecked={queryString.autoGainControl || false} />

                            <br />

                            <label htmlFor="audio-echo">Echo Cancellation </label>
                            <input type="checkbox" className="media-setting" data-key="echoCancellation" defaultChecked={queryString.echoCancellation || false} />

                            <br />

                            <label htmlFor="audio-noise">Noise Suppression </label>
                            <input type="checkbox" className="media-setting" data-key="noiseSuppression" defaultChecked={queryString.noiseSuppression || false} />

                            <br />

                            <label htmlFor="audio-channels">Channel Count </label>
                            <select data-key="channelCount" className="media-setting" defaultValue={queryString.channelCount || "1"} onChange={handleCheckNext}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            <input type="checkbox" className="media-setting" data-override="channelCount" data-key="channelCount" defaultChecked={!!queryString.channelCount} />

                            <br />

                            <label htmlFor="audio-samples">Sample Size </label>
                            <select data-key="sampleSize" className="media-setting" defaultValue={queryString.sampleSize || "16"} onChange={handleCheckNext}>
                                <option value="8">8</option>
                                <option value="16">16</option>
                                <option value="24">24</option>
                                <option value="32">32</option>
                            </select>
                            <input type="checkbox" className="media-setting" data-override="sampleSize" data-key="sampleSize" defaultChecked={!!queryString.sampleSize} />

                        </div>

                        {/* VIDEO */}
                        <div className="media-settings-section">
                            <label htmlFor="video-include">Include Video </label>
                            <input type="checkbox" className="media-setting" data-key="video" defaultChecked={queryString.video === false ? false : true} />

                            <br />

                            <label htmlFor="video-width">Width </label>
                            <input type="number" className="media-setting" data-key="width" step="1" min="10" max="9999" defaultValue={queryString.width || "852"} onChange={handleCheckNext} />
                            <input type="checkbox" className="media-setting" data-override="width" data-key="width" defaultChecked={!!queryString.width} />
                            <br />

                            <label htmlFor="video-height">Height </label>
                            <input type="number" className="media-setting" data-key="height" step="1" min="10" max="9999" defaultValue={queryString.height || "480"} onChange={handleCheckNext} />
                            <input type="checkbox" className="media-setting" data-override="height" data-key="height" defaultChecked={!!queryString.height} />

                            <br />

                            <label>Frame Rate </label>
                            <input type="number" className="media-setting" data-key="frameRate" step="1" min="1" max="99" defaultValue={queryString.frameRate || "30"} onChange={handleCheckNext}/>
                            <input type="checkbox" className="media-setting" data-override="frameRate" data-key="frameRate" defaultChecked={!!queryString.frameRate} />

                            <br />

                            <label>Resize Mode </label>
                            <select data-key="resizeMode" className="media-setting" defaultValue={queryString.resizeMode || "crop-and-scale"} onChange={handleCheckNext}>
                                <option value="none">None</option>
                                <option value="crop-and-scale">crop and scale</option>
                            </select>
                            <input type="checkbox" className="media-setting" data-override="resizeMode" data-key="resizeMode" defaultChecked={!!queryString.resizeMode} />
                        </div>

                        <div>
                            {renderShowVideoButtons(state.hiddenVideos)}
                        </div>

                    </>
                }
            </div>
            {showApplyButton && <a href={`${window.location.href.split("?")[0]}?${modifiedQueryString}`}>Apply</a>}
        </>
    )

}

export default MediaSettingsPanel