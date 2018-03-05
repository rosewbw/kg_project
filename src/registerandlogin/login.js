import React, {Component} from 'react';
import './login.css';
import fetch from 'isomorphic-fetch';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import Reg from './register'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { // 初始化state
            username: '',
            password: '',
            type:'student',

        };
        this.stateChange = this.stateChange.bind(this);
        this.handleType = this.handleType.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    stateChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }

    handleType(e) {
        let value = e.target.value;
        this.setState({
            type: value,
        });
    }


    saveUser() {
        const {
            username,
            password,
            type,
            email
        } = this.state;
        if (!username) return alert('用户名不能为空');
        if (!password) return alert('密码不能为空');
        fetch('/login', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password,type,email})
        }).then(res => res.json()).then(res => {
            console.log(res);
            if(res.status === 200){
                this.props.history.push(`app`);
            }else{
                this.props.history.push('Reg');
            }

        })
    }

    render() {
        return (
            <div>
                <div onChange={(e) => this.stateChange(e)}>
                    <input name="username" value={this.state.username} placeholder="请输入用户名"/>
                    <input name="password" value={this.state.password} placeholder="请输入密码"/>
                    <select value={this.state.type} onChange={this.handleType} >
                        <option value ="student">学生</option>
                        <option value ="teacher">教师</option>
                    </select>
                    <button onClick={this.saveUser}>Log in</button>
                </div>
            </div>
        );
    }
}

export default Login;