import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from './App';
import Home from './homepage/homepage'
import Upload from './upload/upload'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/upload" component={Upload}/>
            </Switch>
        </App>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
