import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './App.css';
import {
    Route,
    Link
} from "react-router-dom";

import Home from '../homepage/homepage'
// import FileUpload from '../upload/fileupload'
import EditorControl from '../editor/editorcontrol'
import MediaGallery from '../media-gallery/media-gallery'

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            collapsed: false,
        };

        this.menuItemClickEvents = {
            "logout": props.onLogout,
        };

        this.onCollapse = this.onCollapse.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    onMenuItemClick({key}) {
        this.menuItemClickEvents && this.menuItemClickEvents[key]
            && this.menuItemClickEvents[key]();
    }

    render() {
        const { username: name, location }= this.props;
        if (!name) {
            return <Redirect push to={{
                pathname: '/',
                state: { from: location },
            }} />
        }

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
                >
                    <div className="logo" >
                    </div>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        onClick={this.onMenuItemClick}
                    >
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>首页</span>
                            <Link to={`${this.props.match.url}/home`}/>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>课程制作</span></span>}
                        >
                            <Menu.Item key="3">课程管理
                                <Link to={`${this.props.match.url}/course-manage`}/>
                            </Menu.Item>

                            {/*<Menu.Item key="4">已有课程</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>个人中心</span></span>}
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>资源管理</span>
                            <Link to={`${this.props.match.url}/upload`}/>
                        </Menu.Item>
                        <Menu.Item key="logout" >
                            <Icon type="logout" /> 登出
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Route path={`${this.props.match.url}/home`} component={Home} />
                    <Route path={`${this.props.match.url}/upload`} component={MediaGallery} />
                    <Route path={`${this.props.match.url}/course-manage/`}
                           render={(props) => (
                               <EditorControl
                                   username={name}
                                   {...props}
                               />
                           )}
                    />
                    <Route
                        exact path={this.props.match.url}
                        component={Home}
                    />
                </Layout>
            </Layout>

        );
    }
}

export default App;

