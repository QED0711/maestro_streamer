import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SessionWindow from './components/SessionWindow';
import ConnectionManager from './components/ConnectionManager';
import ConfigPanel from './components/ConfigPanel';


function App() {

    return (
        <Router basename={process.env.PUBLIC_URL + '/'}>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        LOGIN FORM
                    </Route>

                    <Route exact path="/session/:sessionID">
                        <ConnectionManager />
                        <ConfigPanel />
                        <SessionWindow  />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
