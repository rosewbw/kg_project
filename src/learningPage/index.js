import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
    Route,
    Link
} from "react-router-dom";

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;


class LearningPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    componentDidMount() {
    }

    render() {
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
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>课程管理</span></span>}
                        >
                            <Menu.Item key="3">已学课程</Menu.Item>
                            <Menu.Item key="4">当前课程</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="sub2">
                            <Icon type="team" />
                            <span>个人中心</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>

                </Layout>
            </Layout>
        )
    }
}
export default LearningPage;

