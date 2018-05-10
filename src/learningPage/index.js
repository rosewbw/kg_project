import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
    Redirect
} from "react-router-dom";

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;


class LearningPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false
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

    getSubMenuAndItemKeyFromLocation({ pathname }) {
        // TODO: 获取 SubMenu 的 Key，从而自动展开导航栏
        return {
            itemKey: pathname.split('/').pop(),
            subMenuKey: ''
        }
    }

    render() {
        const { username, location }= this.props;
        if (!username) {
            return <Redirect push to={{
                pathname: '/',
                state: { from: location },
            }} />
        }

        let { itemKey } = this.getSubMenuAndItemKeyFromLocation(this.props.location);
        if (itemKey === "learning-page") itemKey = 'home';

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
                        defaultSelectedKeys={[itemKey]}
                        mode="inline"
                        onClick={this.onMenuItemClick}
                    >
                        <Menu.Item key="home">
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Menu.Item>
                        <SubMenu
                            key="course"
                            title={<span><Icon type="user" /><span>课程管理</span></span>}
                        >
                            <Menu.Item key="list">
                                已学课程
                            </Menu.Item>
                            <Menu.Item key="learned">已学课程</Menu.Item>
                            <Menu.Item key="current">当前课程</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>个人中心</span></span>}
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="logout" >
                            <Icon type="logout" />
                            <span>登出</span>
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

