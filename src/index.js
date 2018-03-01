import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch, HashRouter} from "react-router-dom";
import App from './App';
import Home from './homepage/homepage'
import Upload from './upload/upload'
import MediaGallery from './media-gallery/media-gallery'
import registerServiceWorker from './registerServiceWorker';

import Reg from './register_login/register';
import Login from './register_login/login';
import Editor from './editor/editor'

const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition)
}
const supportsHistory = 'pushState' in window.history;

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/upload" component={MediaGallery}/>
                <Route path="/editor" component={Editor}/>
            </Switch>
        </App>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
