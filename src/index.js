import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import { App } from './editorPage';
import registerServiceWorker from './registerServiceWorker';
import { Reg, Login } from './registerandlogin';
import LearningPage from './learningPage';

const IndexPage = () => (
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/reg" component={Reg} />
            <Route path="/editorPage" component={App} />
            <Route path="/learningPage" component={LearningPage} />
        </div>
    </Router>
);

ReactDOM.render(
    <IndexPage />,
    document.getElementById('root')
);
registerServiceWorker();

// 打开热更新
if (module.hot) {
    module.hot.accept();
}
