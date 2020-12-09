import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import ContextProvider from './context/withContext.js';

import Home from './Layout/Home.js';

import Login from './Layout/Login.js';

import MenuAppBar from './components/AppBar.js';


export default function App() {
    return (
        <Router>
            <ContextProvider>
                <div>
                    <MenuAppBar/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </div>
            </ContextProvider>       
        </Router>
    );
}