import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './App.css';
import {
    Route,
    Link
} from "react-router-dom";

import Home from './homepage/homepage'
import FileUpload from './upload/fileupload'
import EditorControl from './editor/ediorcontrol'
import MediaGallery from './media-gallery/media-gallery'

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render() {
        console.log(`${this.props.match.url}/home`);
        const {children} = this.props;
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
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>首页</span>
                            <Link to={`${this.props.match.url}/home`}/>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>课程制作</span></span>}
                        >
                            <Menu.Item key="3">新建课程
                                <Link to={`${this.props.match.url}/editor`}/>
                            </Menu.Item>

                            <Menu.Item key="4">已有课程</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>个人中心</span></span>}
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>资源管理</span>
                            <Link to={`${this.props.match.url}/upload`}/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Route path={`${this.props.match.url}/home`} component={Home} />
                    <Route path={`${this.props.match.url}/upload`} component={MediaGallery} />
                    <Route path={`${this.props.match.url}/editor`} component={EditorControl} />
                    <Route
                        exact
                        path={this.props.match.url}
                        component={Home}
                    />
                </Layout>
            </Layout>

        );
    }
}

export default App;

