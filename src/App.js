import React from 'react';
import {Switch, Route} from "react-router-dom"
import {Batalha, Home} from "./screens";
// import { StorageService } from "./service";
import './App.css';

function App() {
    return (
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/batalha" component={Batalha} exact/>
        </Switch>
    );
}

export default App;