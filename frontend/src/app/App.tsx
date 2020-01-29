import * as React from "react";
import { Layout, Menu, Icon } from 'antd';
import {SiderSubMenu} from '../components/SiderSubMenu/SiderSubMenu';
import {Board, BoardProps} from '../components/Board/Board';
import { DataSource } from "../services/DataSource";
//import { hot } from 'react-hot-loader';

const { Header, Content, Footer, Sider } = Layout;
const PRODUCT_NAME: string = "Open KB";

export interface AppState {
    collapsed: boolean,
    boards: Array<BoardProps>
}

export class App extends React.Component<{}, AppState> {
    state : AppState;

    constructor(props: {}) {
        super(props);
        this.state = {
            collapsed: false,
            boards : []
        };
    }

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }

    componentDidMount() {
        DataSource.getBoards().then(
            (data) => {
                this.setState({
                    boards: data
                });
                console.log('data:' + data);
                console.log('store.data' + this.state.boards);
            }
        );
    }

    render() {
      return (
        <Layout style={{ minHeight: '100vh'}}>
            <Sider
            collapsible
            collapsed={this.state.collapsed}
            trigger={null}
            >
                <div className="logo" >{PRODUCT_NAME}</div>
                    <SiderSubMenu id="subBoards" title="Boards" icon="project" menuEntries={this.state.boards} />
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
                    {this.renderBoard()}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                {PRODUCT_NAME} ©2018 Created by Query-Interface
            </Footer>
        </Layout>
      </Layout>
      );
   }

   renderBoard() {
        if (this.state.boards.length > 0) {
            return <Board id={this.state.boards[0].id} title={this.state.boards[0].title}
                description={this.state.boards[0].description}></Board>
        }
        return <div>&nbsp;</div>
   }
}

//export default hot(App);
