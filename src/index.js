import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import app from './editorPage/App';
import registerServiceWorker from './registerServiceWorker';
import Reg from './registerandlogin/register';
import Login from './registerandlogin/login';
import LearningPage from './learningPage/index';

const IndexPage = () => (
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/reg" component={Reg} />
            <Route path="/editorPage" component={app} />
            <Route path="/learningPage" component={LearningPage} />
        </div>
    </Router>
);



ReactDOM.render(
    <IndexPage />,
    document.getElementById('root')
);
registerServiceWorker();
