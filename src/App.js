import React, { useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import SessionWindow from './components/SessionWindow';
import ConnectionManager from './components/ConnectionManager';
import ConfigPanel from './components/ConfigPanel';
import ChatBox from './components/ChatBox';
import MediaSettingsPanel from './components/MediaSettingsPanel';
import MediaSettingsContainer from './components/MediaSettingsContainer';
import { mainContext } from './state/main/mainProvider';


function App() {

    const {setters} = useContext(mainContext)

    useEffect(() => {

        const audioCtx = new AudioContext()
        const masterGain = audioCtx.createGain()
        
        masterGain.gain.value = 1
        masterGain.connect(audioCtx.destination)
        
        setters.setAudioContext(audioCtx)
        setters.setMasterGain(masterGain)

    }, [])

    return (
        <Router basename={process.env.PUBLIC_URL + '/'}>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        Maestro Streamer
                        {/* <Redirect to={"/session/umd"} /> */}
                        {/* <Link to="/session/123">LINK</Link> */}
                    </Route>

                    <Route exact path="/session/:sessionID">
                        <ConnectionManager />
                        <ConfigPanel />
                        <SessionWindow />
                        <ChatBox />
                        <MediaSettingsContainer />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
