import React, {Component} from 'react';
import './login.css';
import fetch from 'isomorphic-fetch';

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
        this.toRegister = this.toRegister.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    getToken(){
        return localStorage.getItem('token');
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
    toRegister(){
        this.props.history.push('Reg')
    }

    saveUser() {
        let token = this.getToken();
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
            headers: {
                "Content-Type": "application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                username:username,
                password:password,
                type:type,
                email:email
            })
        }).then( res => res.json()).then(res => {
            console.log(res);
            if(res.status === 'success'){
                let options =res.data;
                localStorage.setItem('token', options.token);
                if(options.usertype === 'student'){
                    this.props.history.push(`/learningPage/${options.username}`);
                }else{
                    // this.props.history.push(`/editorPage/${options.username}`);
                    this.props.history.push({pathname:'/editorPage',state:{
                        username:options.username
                    }});
                }

            }else{
                alert("登录失败，请重新登录");
                this.props.history.push('login');
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
                    <button onClick={this.toRegister}>Go Register</button>
                </div>
            </div>
        );
    }
}

export default Login;