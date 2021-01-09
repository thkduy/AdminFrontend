import { React, useContext } from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { Typography } from "@material-ui/core";
import Home from './Layout/Home.js';

import Login from './Layout/Login.js';

import DetailUser from './Layout/DetailUser';

import HistoryGame from './Layout/HistoryGame';
import HistoryGameOfUser from './Layout/HistoryGameUser';

import ViewChat from './Layout/Chat/ViewChat';

import MenuAppBar from './components/AppBar.js';

import Error404 from './Layout/Error';

import authUserContext from './context/context';

export default function App() {
    const { isAuthenticated } = useContext(authUserContext);
    return (
        <div>
            <MenuAppBar/>
            <Switch>
                <Route exact path="/">
                    {isAuthenticated ? <Home/> : <Typography variant="h3">admin Caro online 🔥</Typography>}
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/view-detail-user" search="?userid=id">
                    {isAuthenticated ? <DetailUser/> : <Redirect to={{ pathname: "/login", state: { from: '/' }}}/>}
                </Route>
                <Route path="/history-game">
                    {isAuthenticated ? <HistoryGame/> : <Redirect to={{ pathname: "/login", state: { from: '/history-game' }}}/>}
                </Route>
                <Route path="/history-game-user" search="?userid=id">
                    {isAuthenticated ? <HistoryGameOfUser/> : <Redirect to={{ pathname: "/login", state: { from: '/' }}}/>}
                </Route>
                <Route path="/view-chat" search="?roomid=id">
                    {isAuthenticated ? <ViewChat/> : <Redirect to={{ pathname: "/login", state: { from: '/' }}}/>}
                </Route>
                <Route component={Error404}/>
            </Switch>
        </div>
    );
}