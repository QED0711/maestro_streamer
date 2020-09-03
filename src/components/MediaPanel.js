import React, { useContext, useEffect, useState } from 'react';
import webAudioPeakMeter from 'web-audio-peak-meter';

import "../css/media-panel.css"

// =========================== STATE ===========================
import { mainContext } from '../state/main/mainProvider';

// =========================== HELPERS ===========================
import parseQueryString from '../helpers/parseQueryString';

const MediaPanel = () => {

    const { state, setters } = useContext(mainContext);
    const queryParams = parseQueryString(window.location.search);

    const [initMasterGainMeter, setInitMasterGainMeter] = useState(true)
    const [masterGainLevel, setMasterGainLevel] = useState(1)

    // EVENTS
    const handleMasterGainChange = e => {
        state.masterGain.gain.value = parseFloat(e.target.value)
        setMasterGainLevel(e.target.value)
    }

    // HELPERS
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
                    {/* <div className="meters">
                        <div id={`pre-meter-${stream.id}`} className="peak-meter"></div>
                        <div id={`post-meter-${stream.id}`} className="peak-meter"></div>

                    </div> */}

                    <input id={`gain-${stream.id}`} className="stream-gain" type="range" min="0" max="1" step="0.01" /* onChange={handleGainChange(streamObj.gainNode)} */ />
                    <button id={`mute-btn-${stream.id}`}>Mute</button>
                </div>
            )
        })


    }

    useEffect(() => {
        const addStreamsToVideos = () => {
            let video, 
                gainSlider, 
                source, 
                gainNode, 
                muteButton,
                preMeter, 
                postMeter, 
                preMeterNode,
                postMeterNode;

            state.streams.forEach(stream => {

                video = document.getElementById(`video-${stream.id}`)
                gainSlider = document.getElementById(`gain-${stream.id}`)
                muteButton = document.getElementById(`mute-btn-${stream.id}`)

                // preMeter = document.getElementById(`pre-meter-${stream.id}`)
                // postMeter = document.getElementById(`post-meter-${stream.id}`)
                
                // if we have added events listeners to any of the elements retrieved above, then they have already been created and we should bail out early
                if (!video.paused || muteButton.onclick) return // break out early
                

                try {
                    // source = state.audioContext.createMediaElementSource(video)
                    source = state.audioContext.createMediaStreamSource(stream)
                    gainNode = state.audioContext.createGain()
                    
                    // preMeterNode = webAudioPeakMeter.createMeterNode(source, state.audioContext)
                    // postMeterNode = webAudioPeakMeter.createMeterNode(gainNode, state.audioContext)

                    // webAudioPeakMeter.createMeter(preMeter, preMeterNode)
                    // webAudioPeakMeter.createMeter(postMeter, postMeterNode)
                } catch (err) {
                    console.log(err)
                    // if there was an error here, it is because we already connected the video to an output source
                    return
                }
                
                source.connect(gainNode)
                gainNode.connect(state.masterGain)

                // set the self gain to 0
                if (stream.id === state.localStreamID) {
                    gainNode.gain.value = 0
                    gainSlider.disabled = true
                    muteButton.innerText = "Unmute"
                }


                gainSlider.onchange = function (e) {
                    // video.volume = parseFloat(e.target.value)
                    gainNode.gain.value = parseFloat(e.target.value)
                }

                muteButton.onclick = function(e) {
                    gainSlider.disabled = !gainSlider.disabled
                    if(gainSlider.disabled) {
                        gainNode.gain.value = 0
                        this.innerText = "Unmute"
                    } else {
                        const value = document.getElementById(`gain-${stream.id}`).value
                        gainNode.gain.value = value
                        this.innerText = "Mute"
                    }
                }


                video.srcObject = stream;
                // video.volume = 0; // allows for the gain node to take over the output gain
                video.muted = true
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

        // INIT MASTER GAIN METER
        if(initMasterGainMeter && state.masterGain){

            const masterMeter = document.getElementById("master-gain-meter")
            const masterGainMeterNode = webAudioPeakMeter.createMeterNode(state.masterGain, state.audioContext) 
            webAudioPeakMeter.createMeter(masterMeter, masterGainMeterNode)

            setInitMasterGainMeter(false) // so we don't redo on each new stream
        }

    }, [state.streams])


    return (
        <>
            <div className="master-gain-container">
                <label htmlFor="master-gain">Master Gain: {masterGainLevel}</label>
                <br />
                <input id="master-gain" type="range" min="0" max="1" step="0.01" onChange={handleMasterGainChange} />
                <div id="master-gain-meter"></div>
            </div>
            <div id="media-panel">
                {renderVideos(state.streams)}
            </div>
        </>
    )

}

export default MediaPanel;