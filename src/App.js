import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Starred from './components/Starred';

function App() {
    return (
        <>
            <Nav />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/starred">
                    <Starred />
                </Route>

                <Route>404 not found</Route>
            </Switch>
        </>
    );
}

export default App;
