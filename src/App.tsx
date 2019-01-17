import * as React from "react";
import { Layout, Menu, Icon } from 'antd';
import {SiderSubMenu} from './components/SiderSubMenu/SiderSubMenu';
import {Board} from './components/Board/Board';

const { Header, Content, Footer, Sider } = Layout;
const PRODUCT_NAME: string = "Open Trello";

const boards = [
    {"id": 10, "title": "Kanban", "icon": "project",
        lists:
        [{id:"1", "title":"Open", cards:[{id:"1", "title":"Finalize cards"},{id:"2", "title":"Add events for button"}]},
        {id:"2", "title":"In Process", cards:[{id:"3", "title":"Cards rendering"}]},
        {id:"3", "title":"Blocked"},
        {id:"4", "title":"Closed", cards:[{id:"4", "title":"List rendering"},{id:"5", "title":"Basic Board layout"}]}]
    },
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
        <Layout style={{ minHeight: '100vh'}}>
            <Sider
            collapsible
            collapsed={this.state.collapsed}
            trigger={null}
            >
                <div className="logo" style={{color:'white', textTransform:'uppercase'}}>{PRODUCT_NAME}</div>
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
                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, position:'relative'}} >
                <Board id={boards[0].id} title={boards[0].title} description="My First board" lists={boards[0].lists}></Board>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                {PRODUCT_NAME} ©2018 Created by Query-Interface
            </Footer>
        </Layout>
      </Layout>
      );
   }
}
