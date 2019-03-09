import React, { Component } from 'react';
import './register.css';
import fetch from 'isomorphic-fetch';

class Reg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 初始化state
      username: '',
      password: '',
      type: 'teacher',
      email: ''
    };
    this.stateChange = this.stateChange.bind(this);
    this.handleType = this.handleType.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.toLoginIn = this.toLoginIn.bind(this);
  }
  stateChange(e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }
  toLoginIn() {
    this.props.history.push('login');
  }

  saveUser() {
    const { username, password, type, email } = this.state;
    if (!username) return alert('用户名不能为空');
    if (!password) return alert('密码不能为空');
    fetch('/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        type: type,
        email: email
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 'success') {
          // localStorage.setItem('token', res.data.token);//res.token
          this.props.history.push('login');
          alert('恭喜您注册成功了');
        } else if (res.status === 'exist') {
          alert('用户名已被注册');
          this.props.history.push('Reg');
        } else {
          alert('注册失败，请重新注册');
          this.props.history.push('Reg');
        }
      })
      .catch(e => console.log(e));
  }

  handleType(e) {
    let value = e.target.value;
    this.setState({
      type: value
    });
  }

  render() {
    return (
      <div onChange={e => this.stateChange(e)}>
        <input
          name="username"
          value={this.state.username}
          placeholder="请输入用户名"
        />
        <input
          name="password"
          value={this.state.password}
          placeholder="请输入密码"
        />
        <input name="email" value={this.state.email} placeholder="邮箱" />
        <select value={this.state.type} onChange={this.handleType}>
          <option value="student">学生</option>
          <option value="teacher">教师</option>
        </select>
        <button onClick={this.saveUser}>Register</button>
        <button onClick={this.toLoginIn}>Log in</button>
      </div>
    );
  }
}

export default Reg;
