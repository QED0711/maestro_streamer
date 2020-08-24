import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SessionWindow from './components/SessionWindow';
import ConnectionManager from './components/ConnectionManager';


function App() {

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        LOGIN FORM
                    </Route>

                    <Route exact path="/session/:sessionID">
                        <ConnectionManager />
                        <SessionWindow  />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
