import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";
import {App} from './editorPage';
import registerServiceWorker from './registerServiceWorker';
import {Reg, Login} from './registerandlogin';
import LearningPage from './learningPage';

class IndexPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            usertype: '',
            loginChecked: false,
        };

        this.logIn = this.logIn.bind(this);
        this.getToken = this.getToken.bind(this);


    }

    getToken() {
        return localStorage.getItem('token');
    }

    logIn(username, password) {
        if (!username) return alert('用户名不能为空');
        if (!password) return alert('密码不能为空');

        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(res => res.json()).then(res => {
            console.log(res);

            if (res.status === 'success') {
                const options = res.data;

                localStorage.setItem('token', options.token);
                this.setState({
                    username,
                    usertype: options.usertype,
                });
                this.props.history.push('/');


            } else {
                alert("登录失败，请重新登录");
                this.props.history.push('login');
            }

        })
    }
    componentDidMount(){
        const token = this.getToken();
        const confirmLoginChecked = () => {
            this.setState({
                loginChecked: true,
            })
        };

        if (!token) { return confirmLoginChecked(); }

        // 根据 Token 获取用户信息并存入
        fetch('/fetchUserInfoWithToken', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res && res.status === 'success') {
                    this.setState({
                        username: res.data.username,
                        usertype: res.data.usertype,
                    }, confirmLoginChecked);
                }
                else {
                    confirmLoginChecked();
                }
            })
            .catch(err => confirmLoginChecked());
    }
    render() {
        return (
            <div>
                <Route exact path="/"
                       render={() => {
                           const token = this.getToken();
                           const {usertype, loginChecked} = this.state;
                           if (token && usertype) {
                               return usertype === 'student'
                                   ? <Redirect to={"/learning-page"}/>
                                   : <Redirect to={"/editor-page"}/>
                           } else {
                               return loginChecked
                                   ? <Redirect to={"/login"}/>
                                   : <p>正在验证登录...</p>
                           }
                       }}
                />
                <Route path="/login"
                       render={() => (
                           <Login
                               onLogin={this.logIn}
                           />
                       )}
                />
                <Route path="/reg" component={Reg}/>
                <Route path="/editor-page"
                       render={(props) => (
                           <App username={this.state.username}
                                {...props}
                           />
                       )}
                />
                <Route path="/learning-page" component={LearningPage}/>
            </div>
        );
    }
}

const IndexPageWithRouter = withRouter(IndexPage);

ReactDOM.render(
    <Router>
        <IndexPageWithRouter/>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();

// 打开热更新
if (module.hot) {
    module.hot.accept();
}
