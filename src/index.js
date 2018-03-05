import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import App from './App';
import Home from './homepage/homepage'
import Upload from './upload/upload'
import MediaGallery from './media-gallery/media-gallery'
import registerServiceWorker from './registerServiceWorker';

import Reg from './registerandlogin/register';
import Login from './registerandlogin/login';
import Editor from './editor/editor'

const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition)
}
const supportsHistory = 'pushState' in window.history;



const IndexPage = () => (
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/reg" component={Reg} />
            <Route path="/app" component={App} />
        </div>
    </Router>
);



ReactDOM.render(
    <IndexPage />,
    document.getElementById('root')
);
registerServiceWorker();
