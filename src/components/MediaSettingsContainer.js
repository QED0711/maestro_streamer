import React, { useState } from 'react';

// ========================== CHILDREN ==========================
import MediaSettingsPanel from './MediaSettingsPanel';

// ========================== MEDIA ==========================
import menu from '../media/menu.svg'
import close from '../media/close.svg'

const MediaSettingsContainer = () => {

    const [showSettingsPanel, setShowSettingsPanel] = useState(false)

    const handleClick = e => {
        setShowSettingsPanel(!showSettingsPanel)
    }

    return (
        <div id="media-settings-container">
            <div onClick={handleClick} style={{ cursor: "pointer", display: "inline-block" }}>
                {
                    showSettingsPanel
                        ? <img src={close} />
                        : <img src={menu} />
                }
            </div>
            {
                showSettingsPanel
                &&
                <MediaSettingsPanel />
            }
            <br />
            <a href={window.location.href}>Reload</a>
        </div>
    )


}

export default MediaSettingsContainer;