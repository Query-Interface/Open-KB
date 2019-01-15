import * as React from "react";
import { Layout, Menu, Icon } from 'antd';
import {SiderSubMenu} from './components/SiderSubMenu/SiderSubMenu';
import {Board} from './components/Board/Board';

const { Header, Content, Footer, Sider } = Layout;
//const { SubMenu } = Menu;

const boards = [
    {"id": 12, "title": "Backlog Items", "icon": "project"},
    {"id": 13, "title": "Todos", "icon": "book"}
];
/*const subMenu1 = {
    "id": "subBoards",
    "menuEntries":boards,
    "icon": "project",
    "title": "Boards"
};*/

export class App extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }

    render() {
      return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
            collapsible
            collapsed={this.state.collapsed}
            trigger={null}
            >
                <div className="logo" style={{color:'white'}}>OPEN TRELLO</div>
                    <SiderSubMenu id="subBoards" title="Boards" icon="project" menuEntries={boards} />
            </Sider>
        <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
                <div>
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                        className="right"
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            }}
            >
                <Board id="test" title="Kanban" description="My First board" lists={[{id:"1", "title":"Open"},{id:"2", "title":"In Process"},{id:"3", "title":"Blocked"},{id:"4", "title":"Closed"}]}></Board>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
      </Layout>
      );
   }
}