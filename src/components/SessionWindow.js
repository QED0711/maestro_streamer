import React, { useContext } from 'react';

import {useParams, Redirect} from 'react-router-dom';

// ====================== STATE ======================
import { mainContext } from '../state/main/mainProvider';

// ====================== CHILDREN ======================
import MediaPanel from './MediaPanel';

const SessionWindow = (props) => {
    
    const {state} = useContext(mainContext);
    const {sessionID} = useParams();
    


    if(!state.sessionAuthorization) return <Redirect to="/" />

    return (
        <div id="session-window">
            <MediaPanel />
        </div>
    )
}

export default SessionWindow;