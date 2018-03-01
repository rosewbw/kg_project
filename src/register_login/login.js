import React, { Component } from 'react';
import './login.css';
import fetch from 'isomorphic-fetch';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = { // 初始化state
            username: '',
            password: ''
        }
    }
    stateChange(e){
        const target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }
    saveUser() {
        const {
            username,
            password
        } = this.state;
        if(!username) return alert('用户名不能为空');
        if(!password) return alert('密码不能为空');
        fetch('/login', {
            method: 'GET',
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: { username,password }
        }).then( res => res.json() ).then( res => {
            this.props.history.push('app');
            alert('恭喜您注册成功了');
        })
    }
    render() {
        return (
            <div onChange={(e)=>this.stateChange(e)}>
                <input name="username" value={this.state.username} placeholder="请输入用户名"/>
                <input name="password" value={this.state.password} placeholder="请输入密码"/>
                <button onClick={this.saveUser.bind(this)}>立即登录</button>
            </div>
        );
    }
}

export default Login;