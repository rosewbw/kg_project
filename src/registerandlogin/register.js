import React, { Component } from 'react';
import './register.css';
import fetch from 'isomorphic-fetch';

class Reg extends Component {
    constructor(props){
        super(props);
        this.state = { // 初始化state
            username: '',
            password: '',
            type:'teacher',
            email:''
        }
        this.stateChange = this.stateChange.bind(this);
        this.handleType = this.handleType.bind(this);
        this.saveUser = this.saveUser.bind(this);

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
            password,
            type,
            email
        } = this.state;
        if(!username) return alert('用户名不能为空');
        if(!password) return alert('密码不能为空');
        fetch('/register', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                type,
                email
            })
        }).then( res => res.json() ).then( res => {

            if(res.type){
                localStorage.setItem('token', res.token);
                // 成功, 处理逻辑
                this.props.history.push('login');
                alert('恭喜您注册成功了');
            }else{
                this.props.history.push('Reg')
            }


        })
    }

    handleType(e) {
        let value = e.target.value;
        this.setState({
            type: value,
        });
    }

    render() {
        return (
            <div onChange={(e)=>this.stateChange(e)}>
                <input name="username" value={this.state.username} placeholder="请输入用户名"/>
                <input name="password" value={this.state.password} placeholder="请输入密码"/>
                <input name="email" value={this.state.email} placeholder="邮箱"/>
                <select value={this.state.type} onChange={this.handleType} >
                    <option value ="student">学生</option>
                    <option value ="teacher">教师</option>
                </select>
                <button onClick={this.saveUser}>Log in</button>
            </div>
        );
    }
}

export default Reg;
