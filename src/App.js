import { React } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import ContextProvider from './context/withContext.js';
import Home from './Layout/Home.js';

import Login from './Layout/Login.js';

import DetailUser from './Layout/DetailUser';

import HistoryGame from './Layout/HistoryGame';
import HistoryGameOfUser from './Layout/HistoryGameUser';

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
                        <Route path="/view-detail-user" search="?userid=id" component={DetailUser}/>
                        <Route path="/history-game" component={HistoryGame}/>
                        <Route path="/history-game-user" search="?userid=id" component={HistoryGameOfUser}/>
                    </Switch>
                </div>
            </ContextProvider>       
        </Router>
    );
}